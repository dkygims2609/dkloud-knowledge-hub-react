import { useState, useEffect } from 'react';
import { useNewsData, NewsItem } from './useNewsData';
import techNewsPlaceholder from '@/assets/tech-news-placeholder.jpg';

// Enhanced news data with more comprehensive information
const ENHANCED_NEWS: NewsItem[] = [
  {
    id: 'enhanced-news-1',
    title: 'Apple Vision Pro India Launch: Mixed Reality Headset Finally Arrives',
    description: 'Apple Vision Pro, the company\'s revolutionary mixed reality headset, is now available in India with starting prices at ₹3,49,900. The device promises to transform how we interact with digital content.',
    url: 'https://www.apple.com/in/apple-vision-pro/',
    category: 'Apple',
    published_date: new Date().toISOString(),
    source: 'Apple India',
    image_url: techNewsPlaceholder,
    tags: ['Apple', 'Vision Pro', 'Mixed Reality', 'India Launch', 'AR/VR']
  },
  {
    id: 'enhanced-news-2',
    title: 'ChatGPT-4o Advanced Features Now Available in India',
    description: 'OpenAI has rolled out ChatGPT-4o with enhanced multimodal capabilities, voice interactions, and faster response times specifically optimized for Indian users and languages.',
    url: 'https://openai.com/gpt-4o',
    category: 'AI',
    published_date: new Date(Date.now() - 86400000).toISOString(),
    source: 'OpenAI',
    image_url: techNewsPlaceholder,
    tags: ['ChatGPT', 'AI', 'OpenAI', 'India', 'Multimodal AI']
  },
  {
    id: 'enhanced-news-3',
    title: 'Reliance Jio 5G Plus Expands to 1000+ Cities Across India',
    description: 'Jio announces massive 5G network expansion with True 5G technology reaching over 1000 cities, promising ultra-fast internet speeds and low latency for Indian consumers.',
    url: 'https://www.jio.com/5g',
    category: '5G',
    published_date: new Date(Date.now() - 172800000).toISOString(),
    source: 'Reliance Jio',
    image_url: techNewsPlaceholder,
    tags: ['Jio', '5G', 'Network', 'India', 'Telecommunications']
  },
  {
    id: 'enhanced-news-4',
    title: 'Google Pixel 8a Launched in India: AI-Powered Photography at ₹52,999',
    description: 'Google introduces Pixel 8a with advanced AI photography features, Magic Eraser, and 7 years of security updates, positioned as the best mid-range camera phone in India.',
    url: 'https://store.google.com/in/product/pixel_8a',
    category: 'Google',
    published_date: new Date(Date.now() - 259200000).toISOString(),
    source: 'Google India',
    image_url: techNewsPlaceholder,
    tags: ['Google', 'Pixel 8a', 'AI Photography', 'India Launch', 'Camera']
  },
  {
    id: 'enhanced-news-5',
    title: 'Microsoft Copilot for Office 365 Now Available for Indian Enterprises',
    description: 'Microsoft brings AI-powered Copilot to Indian businesses, integrating with Word, Excel, PowerPoint, and Teams to enhance productivity and collaboration.',
    url: 'https://www.microsoft.com/en-in/microsoft-365/copilot',
    category: 'Microsoft',
    published_date: new Date(Date.now() - 345600000).toISOString(),
    source: 'Microsoft India',
    image_url: techNewsPlaceholder,
    tags: ['Microsoft', 'Copilot', 'AI', 'Office 365', 'Enterprise']
  },
  {
    id: 'enhanced-news-6',
    title: 'Tesla Model Y India Bookings Open: Expected Price ₹60-70 Lakhs',
    description: 'Tesla officially opens bookings for Model Y in India with expected deliveries starting Q2 2024. The electric SUV promises 500km range and supercharger network access.',
    url: 'https://www.tesla.com/modely',
    category: 'Electric Vehicle',
    published_date: new Date(Date.now() - 432000000).toISOString(),
    source: 'Tesla India',
    image_url: techNewsPlaceholder,
    tags: ['Tesla', 'Model Y', 'Electric Vehicle', 'India', 'EV']
  }
];

export function useEnhancedNewsData() {
  const originalNews = useNewsData();
  const [enhancedNews, setEnhancedNews] = useState(ENHANCED_NEWS);

  // Merge original news with enhanced data
  useEffect(() => {
    if (originalNews.news.length > 0) {
      const mergedNews = [...ENHANCED_NEWS, ...originalNews.news];
      setEnhancedNews(mergedNews);
    }
  }, [originalNews.news]);

  return {
    ...originalNews,
    news: enhancedNews
  };
}