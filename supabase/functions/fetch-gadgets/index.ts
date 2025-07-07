import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting gadget data fetch...');

    // Fetch gadget RSS feeds (Engadget Gadgets, etc.)
    const gadgetFeeds = [
      {
        name: 'Engadget Gadgets',
        url: 'https://www.engadget.com/rss.xml',
        category: 'Gadgets'
      },
      {
        name: 'Gizmodo Gadgets', 
        url: 'https://gizmodo.com/rss',
        category: 'Gadgets'
      }
    ];

    const allGadgets: any[] = [];

    for (const feed of gadgetFeeds) {
      try {
        console.log(`Fetching gadget feed: ${feed.name}`);
        
        const response = await fetch(feed.url);
        const xmlText = await response.text();
        
        // Parse RSS and extract gadget information
        const gadgetItems = parseGadgetRSS(xmlText, feed);
        allGadgets.push(...gadgetItems);

      } catch (error) {
        console.error(`Error processing gadget feed ${feed.name}:`, error);
        continue;
      }
    }

    // Add some sample Indian-focused gadgets
    const indianGadgets = getSampleIndianGadgets();
    allGadgets.push(...indianGadgets);

    // Insert gadgets (using upsert to avoid duplicates)
    if (allGadgets.length > 0) {
      const { error: insertError } = await supabase
        .from('smart_gadgets')
        .upsert(allGadgets, { 
          onConflict: 'name,brand',
          ignoreDuplicates: true 
        });

      if (insertError) {
        console.error('Error inserting gadgets:', insertError);
        throw insertError;
      }
    }

    console.log(`Successfully processed ${allGadgets.length} gadget items`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: allGadgets.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-gadgets function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function parseGadgetRSS(xmlText: string, feed: any): any[] {
  const gadgets: any[] = [];
  
  // Simple regex-based parsing for gadget items
  const itemRegex = /<item[^>]*>(.*?)<\/item>/gs;
  const titleRegex = /<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/s;
  const descriptionRegex = /<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/s;
  const linkRegex = /<link[^>]*>(.*?)<\/link>/s;

  let match;
  let itemCount = 0;
  
  while ((match = itemRegex.exec(xmlText)) !== null && itemCount < 10) {
    const itemXml = match[1];
    
    const titleMatch = titleRegex.exec(itemXml);
    const descMatch = descriptionRegex.exec(itemXml);
    const linkMatch = linkRegex.exec(itemXml);

    const title = (titleMatch?.[1] || titleMatch?.[2] || '').trim();
    const description = (descMatch?.[1] || descMatch?.[2] || '').trim();
    const link = (linkMatch?.[1] || '').trim();

    // Only include items that seem to be about actual gadgets
    if (title && link && isGadgetRelated(title + ' ' + description)) {
      const gadgetInfo = extractGadgetInfo(title, description);
      
      gadgets.push({
        name: cleanHtml(title).slice(0, 200),
        description: cleanHtml(description).slice(0, 1000),
        brand: gadgetInfo.brand,
        category: gadgetInfo.category,
        price_usd: gadgetInfo.priceUSD,
        price_inr: gadgetInfo.priceINR,
        product_url: link,
        availability_india: gadgetInfo.availableIndia,
        rating: gadgetInfo.rating,
        tags: gadgetInfo.tags,
        image_url: extractImageFromDescription(description)
      });
      
      itemCount++;
    }
  }

  return gadgets;
}

function isGadgetRelated(content: string): boolean {
  const gadgetKeywords = [
    'smartphone', 'phone', 'tablet', 'laptop', 'headphones', 'earbuds',
    'smartwatch', 'camera', 'gaming', 'review', 'specs', 'price',
    'iphone', 'samsung', 'oneplus', 'xiaomi', 'pixel', 'ipad'
  ];
  
  const lowerContent = content.toLowerCase();
  return gadgetKeywords.some(keyword => lowerContent.includes(keyword));
}

function extractGadgetInfo(title: string, description: string) {
  const content = (title + ' ' + description).toLowerCase();
  
  // Extract brand
  const brands = ['apple', 'samsung', 'oneplus', 'xiaomi', 'google', 'sony', 'lg', 'huawei', 'oppo', 'vivo', 'realme'];
  const brand = brands.find(b => content.includes(b)) || null;
  
  // Determine category
  let category = 'Electronics';
  if (content.includes('phone') || content.includes('smartphone')) category = 'Smartphones';
  else if (content.includes('laptop') || content.includes('computer')) category = 'Computers';
  else if (content.includes('headphones') || content.includes('earbuds')) category = 'Audio';
  else if (content.includes('watch') || content.includes('wearable')) category = 'Wearables';
  else if (content.includes('tablet') || content.includes('ipad')) category = 'Tablets';
  
  // Extract price (basic regex for common formats)
  const priceRegex = /\$(\d+(?:,\d{3})*(?:\.\d{2})?)/;
  const priceMatch = priceRegex.exec(title + ' ' + description);
  const priceUSD = priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : null;
  const priceINR = priceUSD ? Math.round(priceUSD * 83) : null; // Approximate USD to INR conversion
  
  // Determine India availability (heuristic)
  const availableIndia = brand && ['samsung', 'oneplus', 'xiaomi', 'oppo', 'vivo', 'realme'].includes(brand);
  
  // Extract tags
  const tags = [];
  if (content.includes('5g')) tags.push('5G');
  if (content.includes('ai')) tags.push('AI');
  if (content.includes('gaming')) tags.push('Gaming');
  if (content.includes('camera')) tags.push('Camera');
  if (availableIndia) tags.push('India');
  
  return {
    brand: brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : null,
    category,
    priceUSD,
    priceINR,
    availableIndia,
    rating: null, // Would need additional data source for ratings
    tags
  };
}

function getSampleIndianGadgets() {
  return [
    {
      name: 'OnePlus 12R',
      description: 'Flagship smartphone with Snapdragon 8 Gen 2, available in India',
      brand: 'OnePlus',
      category: 'Smartphones',
      price_usd: 499,
      price_inr: 41999,
      availability_india: true,
      rating: 4.5,
      tags: ['5G', 'Gaming', 'India'],
      product_url: 'https://www.oneplus.in/12r'
    },
    {
      name: 'Xiaomi 14 Ultra',
      description: 'Pro camera smartphone with Leica optics, India exclusive features',
      brand: 'Xiaomi',
      category: 'Smartphones',
      price_usd: 799,
      price_inr: 66999,
      availability_india: true,
      rating: 4.7,
      tags: ['Camera', 'India', 'Pro'],
      product_url: 'https://www.mi.com/in/product/xiaomi-14-ultra'
    },
    {
      name: 'Realme GT 6',
      description: 'Performance smartphone designed for Indian market',
      brand: 'Realme',
      category: 'Smartphones', 
      price_usd: 349,
      price_inr: 28999,
      availability_india: true,
      rating: 4.3,
      tags: ['Gaming', 'India', 'Budget'],
      product_url: 'https://www.realme.com/in/realme-gt-6'
    }
  ];
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

function extractImageFromDescription(description: string): string | null {
  if (!description) return null;
  
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = imgRegex.exec(description);
  return match ? match[1] : null;
}