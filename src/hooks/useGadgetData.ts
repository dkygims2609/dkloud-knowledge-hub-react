import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GadgetItem {
  id: string;
  name: string;
  description: string;
  brand?: string;
  category: string;
  price_usd?: number;
  price_inr?: number;
  image_url?: string;
  product_url?: string;
  affiliate_url?: string;
  availability_india: boolean;
  rating?: number;
  release_date?: string;
  tags?: string[];
}

export interface UseGadgetDataResult {
  gadgets: GadgetItem[];
  loading: boolean;
  error: string | null;
  categories: string[];
  brands: string[];
  fetchGadgets: (filters?: GadgetFilters) => Promise<void>;
}

export interface GadgetFilters {
  category?: string;
  brand?: string;
  availableInIndia?: boolean;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}

export function useGadgetData(): UseGadgetDataResult {
  const [gadgets, setGadgets] = useState<GadgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  const fetchGadgets = async (filters: GadgetFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('smart_gadgets')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.brand) {
        query = query.eq('brand', filters.brand);
      }

      if (filters.availableInIndia !== undefined) {
        query = query.eq('availability_india', filters.availableInIndia);
      }

      if (filters.minPrice !== undefined) {
        query = query.gte('price_inr', filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        query = query.lte('price_inr', filters.maxPrice);
      }

      const { data, error: fetchError } = await query
        .range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1);

      if (fetchError) throw fetchError;

      setGadgets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gadgets');
      console.error('Error fetching gadgets:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetadata = async () => {
    try {
      // Fetch unique categories
      const { data: categoryData } = await supabase
        .from('smart_gadgets')
        .select('category')
        .not('category', 'is', null);

      const uniqueCategories = [...new Set(categoryData?.map(item => item.category) || [])];
      setCategories(uniqueCategories);

      // Fetch unique brands
      const { data: brandData } = await supabase
        .from('smart_gadgets')
        .select('brand')
        .not('brand', 'is', null);

      const uniqueBrands = [...new Set(brandData?.map(item => item.brand) || [])];
      setBrands(uniqueBrands);
    } catch (err) {
      console.error('Error fetching metadata:', err);
    }
  };

  useEffect(() => {
    fetchGadgets();
    fetchMetadata();
  }, []);

  return {
    gadgets,
    loading,
    error,
    categories,
    brands,
    fetchGadgets
  };
}