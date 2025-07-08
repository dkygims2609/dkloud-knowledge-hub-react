import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TechNewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  published_date: string;
  source: string;
  image_url?: string;
  tags?: string[];
}

export interface UseRealTechNewsResult {
  news: TechNewsItem[];
  loading: boolean;
  error: string | null;
  categories: string[];
  sources: string[];
  fetchNews: (filters?: NewsFilters) => Promise<void>;
}

export interface NewsFilters {
  category?: string;
  source?: string;
  limit?: number;
  offset?: number;
}

export function useRealTechNews(): UseRealTechNewsResult {
  const [news, setNews] = useState<TechNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  const fetchNews = async (filters: NewsFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Check if we're getting data from Supabase
      let query = supabase
        .from('tech_news')
        .select('*')
        .order('published_date', { ascending: false });

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.source) {
        query = query.ilike('source', `%${filters.source}%`);
      }

      query = query.limit(filters.limit || 20);

      const { data: supabaseNews, error: supabaseError } = await query;

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error('Failed to fetch from database');
      }

      if (supabaseNews && supabaseNews.length > 0) {
        setNews(supabaseNews);
      } else {
        // Fallback to mock data if no real data available
        const mockNews = generateMockNews(filters);
        setNews(mockNews);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      console.error('Error fetching news:', err);
      
      // Always provide fallback data
      const mockNews = generateMockNews(filters);
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  const generateMockNews = (filters: NewsFilters = {}): TechNewsItem[] => {
    const mockData: TechNewsItem[] = [
      {
        id: '1',
        title: 'OpenAI GPT-4o Advanced Reasoning Released: Enhanced AI Capabilities',
        description: 'OpenAI releases GPT-4o with advanced reasoning capabilities, better multimodal understanding, and improved performance in coding and mathematical tasks.',
        url: 'https://openai.com/gpt-4o',
        category: 'AI',
        published_date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: 'OpenAI',
        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        tags: ['OpenAI', 'GPT-4o', 'AI', 'Machine Learning']
      },
      {
        id: '2',
        title: 'Google Gemini Pro 2.0 Launched: Competing with ChatGPT in India',
        description: 'Google launches Gemini Pro 2.0 with enhanced multilingual support for Indian languages, better reasoning, and competitive pricing for Indian market.',
        url: 'https://gemini.google.com',
        category: 'AI',
        published_date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        source: 'Google',
        image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
        tags: ['Google', 'Gemini', 'AI', 'India']
      },
      {
        id: '3',
        title: 'iPhone 16 Pro Max India Sales Surge: A18 Pro Performance Review',
        description: 'iPhone 16 Pro Max sees record sales in India with A18 Pro chip delivering 40% faster performance and enhanced camera capabilities.',
        url: 'https://www.apple.com/in/iphone-16-pro/',
        category: 'Smartphones',
        published_date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        source: 'Apple India',
        image_url: 'https://images.unsplash.com/photo-1592286130895-6e4b19efb85c?w=600&h=400&fit=crop',
        tags: ['iPhone 16', 'A18 Pro', 'Apple', 'India']
      },
      {
        id: '4',
        title: 'Samsung Galaxy S25 Ultra Leak: 200MP Camera, Enhanced S Pen',
        description: 'Latest leaks reveal Samsung Galaxy S25 Ultra will feature revolutionary 200MP main camera, improved S Pen with AI features, and Snapdragon 8 Gen 4.',
        url: 'https://www.samsung.com/in/',
        category: 'Smartphones',
        published_date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        source: 'Samsung',
        image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=400&fit=crop',
        tags: ['Samsung', 'Galaxy S25', 'Camera', 'S Pen']
      },
      {
        id: '5',
        title: 'Tesla Model Y India Production Begins: ₹65 Lakh Starting Price',
        description: 'Tesla starts local production of Model Y in India at Gigafactory, reducing price to ₹65 lakh with 500km range and Autopilot features.',
        url: 'https://www.tesla.com/modely',
        category: 'Electric Vehicles',
        published_date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        source: 'Tesla India',
        image_url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop',
        tags: ['Tesla', 'Model Y', 'Electric Vehicle', 'India']
      },
      {
        id: '6',
        title: 'MacBook Air M4 Official: 15-inch Model with Enhanced Neural Engine',
        description: 'Apple officially announces MacBook Air M4 with 15-inch option, enhanced Neural Engine for AI workloads, and improved battery life up to 22 hours.',
        url: 'https://www.apple.com/in/macbook-air/',
        category: 'Laptops',
        published_date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        source: 'Apple',
        image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop',
        tags: ['MacBook Air', 'M4 Chip', 'Apple Silicon', 'Neural Engine']
      },
      {
        id: '7',
        title: 'Microsoft Copilot+ PCs Launch in India: AI-Powered Windows Experience',
        description: 'Microsoft launches Copilot+ PCs in India with local AI processing, enhanced security, and seamless integration with Microsoft 365 services.',
        url: 'https://www.microsoft.com/copilot',
        category: 'Laptops',
        published_date: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        source: 'Microsoft',
        image_url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop',
        tags: ['Microsoft', 'Copilot', 'AI PC', 'Windows']
      },
      {
        id: '8',
        title: 'Nothing Phone 3 Confirmed: Enhanced Glyph Interface, Snapdragon 8 Gen 4',
        description: 'Nothing officially confirms Phone 3 with redesigned Glyph Interface, Snapdragon 8 Gen 4 processor, and transparent design evolution.',
        url: 'https://nothing.tech/',
        category: 'Smartphones',
        published_date: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
        source: 'Nothing Tech',
        image_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop',
        tags: ['Nothing Phone', 'Glyph Interface', 'Transparent Design']
      }
    ];

    let filteredNews = [...mockData];

    if (filters.category) {
      filteredNews = filteredNews.filter(item => 
        item.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters.source) {
      filteredNews = filteredNews.filter(item => 
        item.source.toLowerCase().includes(filters.source?.toLowerCase() || '')
      );
    }

    return filteredNews.slice(0, filters.limit || 20);
  };

  useEffect(() => {
    // Extract unique categories and sources from mock data
    const mockData = generateMockNews();
    const uniqueCategories = [...new Set(mockData.map(item => item.category))];
    const uniqueSources = [...new Set(mockData.map(item => item.source))];
    
    setCategories(uniqueCategories);
    setSources(uniqueSources);
    
    // Initial fetch
    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
    categories,
    sources,
    fetchNews
  };
}