import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsItem {
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

export interface UseNewsDataResult {
  news: NewsItem[];
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

export function useNewsData(): UseNewsDataResult {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  const fetchNews = async (filters: NewsFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('tech_news')
        .select('*')
        .order('published_date', { ascending: false });

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.source) {
        query = query.eq('source', filters.source);
      }

      const { data, error: fetchError } = await query
        .range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1);

      if (fetchError) throw fetchError;

      setNews(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetadata = async () => {
    try {
      // Fetch unique categories
      const { data: categoryData } = await supabase
        .from('tech_news')
        .select('category')
        .not('category', 'is', null);

      const uniqueCategories = [...new Set(categoryData?.map(item => item.category) || [])];
      setCategories(uniqueCategories);

      // Fetch unique sources
      const { data: sourceData } = await supabase
        .from('tech_news')
        .select('source')
        .not('source', 'is', null);

      const uniqueSources = [...new Set(sourceData?.map(item => item.source) || [])];
      setSources(uniqueSources);
    } catch (err) {
      console.error('Error fetching metadata:', err);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchMetadata();
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