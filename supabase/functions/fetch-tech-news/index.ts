import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsAPIArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
  urlToImage?: string;
}

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

    const requestBody = await req.json();
    const { sources, categories, days = 7, limit = 20 } = requestBody;

    console.log(`Fetching fresh tech news for last ${days} days`);

    const allNews: any[] = [];

    // Try to fetch from NewsAPI if available
    const newsApiKey = Deno.env.get('NEWS_API_KEY');
    if (newsApiKey) {
      try {
        console.log('Fetching from NewsAPI...');
        
        const searchQueries = [
          'AI innovation 2025',
          'space technology',
          'cloud computing',
          'Indian tech market',
          'electric vehicles India',
          'quantum computing',
          'enterprise software'
        ];

        for (const query of searchQueries) {
          const newsResponse = await fetch(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&domains=techcrunch.com,theverge.com,wired.com,economictimes.indiatimes.com&sortBy=publishedAt&pageSize=10&language=en&apiKey=${newsApiKey}`
          );

          if (newsResponse.ok) {
            const newsData = await newsResponse.json();
            
            if (newsData.articles) {
              const processedArticles = newsData.articles.map((article: NewsAPIArticle) => ({
                title: article.title.slice(0, 500),
                description: article.description?.slice(0, 2000) || null,
                url: article.url,
                category: determineCategoryFromContent(article.title + ' ' + (article.description || ''), 'Technology'),
                published_date: new Date(article.publishedAt).toISOString(),
                source: article.source.name,
                image_url: article.urlToImage,
                tags: extractTagsFromContent(article.title + ' ' + (article.description || ''))
              }));

              allNews.push(...processedArticles);
            }
          }
        }

        console.log(`Fetched ${allNews.length} articles from NewsAPI`);
      } catch (error) {
        console.error('NewsAPI fetch failed:', error);
      }
    }

    // Fallback to RSS feeds if NewsAPI is not available or didn't return enough data
    if (allNews.length < 10) {
      console.log('Fetching from RSS feeds as fallback...');
      
      // Get active RSS feeds
      const { data: feeds, error: feedsError } = await supabase
        .from('rss_feeds')
        .select('*')
        .eq('is_active', true);

      if (!feedsError && feeds) {
        for (const feed of feeds) {
          try {
            console.log(`Fetching RSS feed: ${feed.name}`);
            
            const response = await fetch(feed.feed_url);
            const xmlText = await response.text();
            
            const items = parseRSSItems(xmlText, feed);
            
            const newsItems = items.map(item => ({
              title: item.title.slice(0, 500),
              description: item.description?.slice(0, 2000) || null,
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
            continue;
          }
        }
      }
    }

    // Filter articles from last 'days' period
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentNews = allNews.filter(article => {
      const articleDate = new Date(article.published_date);
      return articleDate >= cutoffDate;
    });

    // Sort by date (newest first) and limit
    const sortedNews = recentNews
      .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
      .slice(0, limit);

    // Insert/update news items in database
    if (sortedNews.length > 0) {
      const { error: insertError } = await supabase
        .from('tech_news')
        .upsert(sortedNews, { 
          onConflict: 'url',
          ignoreDuplicates: true 
        });

      if (insertError) {
        console.error('Error inserting news:', insertError);
      } else {
        console.log(`Successfully processed ${sortedNews.length} fresh news items`);
      }
    }

    // Clean up old articles (older than 3 months)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    await supabase
      .from('tech_news')
      .delete()
      .lt('published_date', threeMonthsAgo.toISOString());

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: sortedNews.length,
        sources: sources?.length || 0,
        categories: categories?.length || 0,
        daysFilter: days
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

  return items.slice(0, 20);
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
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
  
  if (lowerContent.includes('ai') || lowerContent.includes('artificial intelligence') || lowerContent.includes('machine learning') || lowerContent.includes('chatgpt') || lowerContent.includes('gemini')) {
    return 'AI Innovation';
  }
  if (lowerContent.includes('space') || lowerContent.includes('nasa') || lowerContent.includes('spacex') || lowerContent.includes('isro') || lowerContent.includes('mars') || lowerContent.includes('lunar')) {
    return 'Space Science';
  }
  if (lowerContent.includes('cloud') || lowerContent.includes('aws') || lowerContent.includes('azure') || lowerContent.includes('google cloud') || lowerContent.includes('vmware')) {
    return 'Cloud Computing';
  }
  if (lowerContent.includes('windows server') || lowerContent.includes('enterprise') || lowerContent.includes('microsoft') || lowerContent.includes('oracle')) {
    return 'Enterprise Software';
  }
  if (lowerContent.includes('smartphone') || lowerContent.includes('iphone') || lowerContent.includes('samsung') || lowerContent.includes('phone') || lowerContent.includes('mobile')) {
    return 'Consumer Tech';
  }
  if (lowerContent.includes('electric vehicle') || lowerContent.includes('tesla') || lowerContent.includes('ev') || lowerContent.includes('battery')) {
    return 'Electric Vehicles';
  }
  if (lowerContent.includes('india') || lowerContent.includes('indian') || lowerContent.includes('mumbai') || lowerContent.includes('bengaluru') || lowerContent.includes('startup india')) {
    return 'Indian Market';
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
    'ai', 'chatgpt', 'gemini', 'openai', 'google', 'microsoft', 'apple', 'samsung',
    'tesla', 'spacex', 'isro', 'nasa', 'space exploration', 'electric vehicle',
    'cloud computing', 'vmware', 'aws', 'azure', 'enterprise software',
    'smartphone', 'consumer tech', 'innovation', 'india', 'startup', 'funding',
    'quantum computing', 'cybersecurity', 'blockchain', 'crypto'
  ];
  
  for (const tag of commonTags) {
    if (lowerContent.includes(tag)) {
      tags.push(tag);
    }
  }
  
  return tags.slice(0, 5);
}
