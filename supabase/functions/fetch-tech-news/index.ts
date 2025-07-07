import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
}

interface RSSFeed {
  id: string;
  name: string;
  feed_url: string;
  category: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get active RSS feeds
    const { data: feeds, error: feedsError } = await supabase
      .from('rss_feeds')
      .select('*')
      .eq('is_active', true);

    if (feedsError) throw feedsError;

    console.log(`Processing ${feeds?.length || 0} RSS feeds`);

    const allNews: any[] = [];

    for (const feed of feeds || []) {
      try {
        console.log(`Fetching feed: ${feed.name}`);
        
        // Fetch RSS feed
        const response = await fetch(feed.feed_url);
        const xmlText = await response.text();
        
        // Parse RSS XML (simple parsing for common RSS format)
        const items = parseRSSItems(xmlText, feed);
        
        // Convert to database format
        const newsItems = items.map(item => ({
          title: item.title.slice(0, 500), // Limit title length
          description: item.description?.slice(0, 2000) || null, // Limit description
          url: item.link,
          category: determineCategoryFromContent(item.title + ' ' + (item.description || ''), feed.category),
          published_date: new Date(item.pubDate || Date.now()).toISOString(),
          source: feed.name,
          image_url: extractImageFromDescription(item.description),
          tags: extractTagsFromContent(item.title + ' ' + (item.description || ''))
        }));

        allNews.push(...newsItems);

        // Update last_fetched timestamp
        await supabase
          .from('rss_feeds')
          .update({ last_fetched: new Date().toISOString() })
          .eq('id', feed.id);

      } catch (error) {
        console.error(`Error processing feed ${feed.name}:`, error);
        continue; // Skip this feed and continue with others
      }
    }

    // Insert news items (using upsert to avoid duplicates)
    if (allNews.length > 0) {
      const { error: insertError } = await supabase
        .from('tech_news')
        .upsert(allNews, { 
          onConflict: 'url',
          ignoreDuplicates: true 
        });

      if (insertError) {
        console.error('Error inserting news:', insertError);
        throw insertError;
      }
    }

    console.log(`Successfully processed ${allNews.length} news items`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: allNews.length,
        feeds: feeds?.length || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-tech-news function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function parseRSSItems(xmlText: string, feed: RSSFeed): RSSItem[] {
  const items: RSSItem[] = [];
  
  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item[^>]*>(.*?)<\/item>/gs;
  const titleRegex = /<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/s;
  const descriptionRegex = /<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/s;
  const linkRegex = /<link[^>]*>(.*?)<\/link>/s;
  const pubDateRegex = /<pubDate[^>]*>(.*?)<\/pubDate>/s;

  let match;
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemXml = match[1];
    
    const titleMatch = titleRegex.exec(itemXml);
    const descMatch = descriptionRegex.exec(itemXml);
    const linkMatch = linkRegex.exec(itemXml);
    const dateMatch = pubDateRegex.exec(itemXml);

    const title = (titleMatch?.[1] || titleMatch?.[2] || '').trim();
    const description = (descMatch?.[1] || descMatch?.[2] || '').trim();
    const link = (linkMatch?.[1] || '').trim();
    const pubDate = (dateMatch?.[1] || '').trim();

    if (title && link) {
      items.push({
        title: cleanHtml(title),
        description: cleanHtml(description),
        link: link,
        pubDate: pubDate
      });
    }
  }

  return items.slice(0, 20); // Limit to latest 20 items per feed
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .trim();
}

function determineCategoryFromContent(content: string, defaultCategory: string): string {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('ai') || lowerContent.includes('artificial intelligence') || lowerContent.includes('machine learning')) {
    return 'AI';
  }
  if (lowerContent.includes('smartphone') || lowerContent.includes('phone') || lowerContent.includes('mobile')) {
    return 'Mobile';
  }
  if (lowerContent.includes('startup') || lowerContent.includes('funding') || lowerContent.includes('investment')) {
    return 'Startups';
  }
  if (lowerContent.includes('space') || lowerContent.includes('nasa') || lowerContent.includes('spacex')) {
    return 'Space';
  }
  
  return defaultCategory;
}

function extractImageFromDescription(description: string): string | null {
  if (!description) return null;
  
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = imgRegex.exec(description);
  return match ? match[1] : null;
}

function extractTagsFromContent(content: string): string[] {
  const tags: string[] = [];
  const lowerContent = content.toLowerCase();
  
  const commonTags = [
    'ai', 'smartphone', 'startup', 'funding', 'apple', 'google', 'microsoft',
    'tesla', 'spacex', 'crypto', 'blockchain', 'india', 'innovation'
  ];
  
  for (const tag of commonTags) {
    if (lowerContent.includes(tag)) {
      tags.push(tag);
    }
  }
  
  return tags.slice(0, 5); // Limit to 5 tags
}