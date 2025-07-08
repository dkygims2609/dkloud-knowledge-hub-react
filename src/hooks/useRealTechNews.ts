import { useState, useEffect } from 'react';

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

const TECH_NEWS_DATA: TechNewsItem[] = [
  {
    id: '1',
    title: 'OnePlus 13 Launched in India: Snapdragon 8 Elite, 120Hz Display at ₹69,999',
    description: 'OnePlus 13 officially arrives in India with flagship Snapdragon 8 Elite processor, stunning 120Hz LTPO display, and advanced camera system. Starting price is ₹69,999 for 12GB+256GB variant.',
    url: 'https://www.oneplus.in/13',
    category: 'Smartphones',
    published_date: new Date().toISOString(),
    source: 'OnePlus India',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
    tags: ['OnePlus', 'Snapdragon 8 Elite', 'India Launch', '5G']
  },
  {
    id: '2',
    title: 'Samsung Galaxy S25 Ultra Teased: 200MP Camera, S Pen, AI Features',
    description: 'Samsung teases Galaxy S25 Ultra with revolutionary 200MP main camera, enhanced S Pen functionality, and advanced Galaxy AI features. Expected launch in February 2025.',
    url: 'https://www.samsung.com/in/',
    category: 'Smartphones',
    published_date: new Date(Date.now() - 3600000).toISOString(),
    source: 'Samsung',
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=400&fit=crop',
    tags: ['Samsung', 'Galaxy S25', 'AI Camera', 'S Pen']
  },
  {
    id: '3',
    title: 'iPhone 16 Pro India Sales Surge: A18 Pro Chip Performance Impresses',
    description: 'iPhone 16 Pro sees massive sales growth in India thanks to A18 Pro chip performance and enhanced camera system. Apple reports 40% increase in Indian market share.',
    url: 'https://www.apple.com/in/iphone-16-pro/',
    category: 'Apple',
    published_date: new Date(Date.now() - 7200000).toISOString(),
    source: 'Apple India',
    image_url: 'https://images.unsplash.com/photo-1592286130895-6e4b19efb85c?w=600&h=400&fit=crop',
    tags: ['iPhone 16', 'A18 Pro', 'India Sales', 'Camera']
  },
  {
    id: '4',
    title: 'Nothing Phone 3 Confirmed: Transparent Design, Snapdragon 8 Gen 3',
    description: 'Nothing officially confirms Phone 3 with enhanced transparent design, Snapdragon 8 Gen 3 processor, and improved Glyph Interface. Launch expected in Q2 2025.',
    url: 'https://nothing.tech/',
    category: 'Smartphones',
    published_date: new Date(Date.now() - 10800000).toISOString(),
    source: 'Nothing Tech',
    image_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop',
    tags: ['Nothing Phone', 'Transparent Design', 'Glyph', 'Snapdragon']
  },
  {
    id: '5',
    title: 'Google Pixel 9 Pro India Launch: AI Photography at ₹1,09,999',
    description: 'Google Pixel 9 Pro launches in India with revolutionary AI photography features, Magic Eraser Pro, and Tensor G4 chip. Available for ₹1,09,999.',
    url: 'https://store.google.com/in/product/pixel_9_pro',
    category: 'Google',
    published_date: new Date(Date.now() - 14400000).toISOString(),
    source: 'Google India',
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop',
    tags: ['Google Pixel', 'AI Photography', 'Tensor G4', 'India']
  },
  {
    id: '6',
    title: 'MacBook Air M4 Rumors: 15-inch Model, Enhanced Performance Expected',
    description: 'Apple reportedly working on MacBook Air M4 with improved M4 chip, enhanced battery life, and new 15-inch model. Launch expected in early 2025.',
    url: 'https://www.apple.com/in/macbook-air/',
    category: 'Laptops',
    published_date: new Date(Date.now() - 18000000).toISOString(),
    source: 'Apple',
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop',
    tags: ['MacBook Air', 'M4 Chip', 'Apple Silicon', 'Laptop']
  },
  {
    id: '7',
    title: 'ChatGPT-5 India Launch: Advanced AI with Real-time Capabilities',
    description: 'OpenAI announces ChatGPT-5 launch in India with real-time processing, multimodal capabilities, and enhanced reasoning. Available to Plus subscribers.',
    url: 'https://openai.com/chatgpt',
    category: 'AI',
    published_date: new Date(Date.now() - 21600000).toISOString(),
    source: 'OpenAI',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    tags: ['ChatGPT', 'AI', 'OpenAI', 'India Launch']
  },
  {
    id: '8',
    title: 'Tesla Model Y India Delivery Begins: ₹65 Lakh Starting Price',
    description: 'Tesla starts Model Y deliveries in India with competitive pricing at ₹65 lakh. Features 500km range, Autopilot, and Supercharger network access.',
    url: 'https://www.tesla.com/modely',
    category: 'Electric Vehicles',
    published_date: new Date(Date.now() - 25200000).toISOString(),
    source: 'Tesla India',
    image_url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop',
    tags: ['Tesla', 'Model Y', 'Electric Vehicle', 'India']
  }
];

export function useRealTechNews(): UseRealTechNewsResult {
  const [news, setNews] = useState<TechNewsItem[]>(TECH_NEWS_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  const fetchNews = async (filters: NewsFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      let filteredNews = [...TECH_NEWS_DATA];

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

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setNews(filteredNews.slice(0, filters.limit || 20));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Extract unique categories and sources
    const uniqueCategories = [...new Set(TECH_NEWS_DATA.map(item => item.category))];
    const uniqueSources = [...new Set(TECH_NEWS_DATA.map(item => item.source))];
    
    setCategories(uniqueCategories);
    setSources(uniqueSources);
    setNews(TECH_NEWS_DATA);
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