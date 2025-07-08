import { useState, useEffect } from 'react';
import { useGadgetData, GadgetItem } from './useGadgetData';

// Enhanced gadget data with more comprehensive information
const ENHANCED_GADGETS = [
  {
    id: 'enhanced-1',
    name: 'iPhone 15 Pro Max',
    category: 'Smartphone',
    brand: 'Apple',
    description: 'Latest flagship iPhone with titanium design, A17 Pro chip, and advanced camera system. Features ProRes video recording and Action Button.',
    price_usd: 1199,
    price_inr: 159900,
    rating: 4.8,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1592286130895-6e4b19efb85c?w=500&h=400&fit=crop',
    product_url: 'https://www.apple.com/in/iphone-15-pro/',
    affiliate_url: 'https://amzn.to/iPhone15ProMax',
    release_date: '2023-09-22',
    tags: ['5G', 'AI Photography', 'Titanium', 'ProRes', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'enhanced-2',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphone',
    brand: 'Samsung',
    description: 'Flagship Android phone with S Pen, 200MP camera, and Galaxy AI features. Built for productivity and creativity.',
    price_usd: 1299,
    price_inr: 129999,
    rating: 4.7,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=400&fit=crop',
    product_url: 'https://www.samsung.com/in/smartphones/galaxy-s24/',
    affiliate_url: 'https://amzn.to/GalaxyS24Ultra',
    release_date: '2024-01-17',
    tags: ['Galaxy AI', 'S Pen', '200MP Camera', '5G', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'enhanced-3',
    name: 'MacBook Air M3',
    category: 'Laptop',
    brand: 'Apple',
    description: 'Ultra-thin laptop powered by M3 chip with up to 18 hours battery life. Perfect for students and professionals.',
    price_usd: 1099,
    price_inr: 114900,
    rating: 4.9,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=400&fit=crop',
    product_url: 'https://www.apple.com/in/macbook-air/',
    affiliate_url: 'https://amzn.to/MacBookAirM3',
    release_date: '2024-03-08',
    tags: ['M3 Chip', 'Retina Display', 'All-day Battery', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'enhanced-4',
    name: 'Sony WH-1000XM5',
    category: 'Audio',
    brand: 'Sony',
    description: 'Industry-leading noise canceling headphones with 30-hour battery life and superior sound quality.',
    price_usd: 399,
    price_inr: 29990,
    rating: 4.6,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=400&fit=crop',
    product_url: 'https://www.sony.co.in/electronics/headband-headphones/wh-1000xm5',
    affiliate_url: 'https://amzn.to/SonyWH1000XM5',
    release_date: '2022-05-12',
    tags: ['Noise Canceling', 'Wireless', 'Hi-Res Audio', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'enhanced-5',
    name: 'Dell XPS 13 Plus',
    category: 'Laptop',
    brand: 'Dell',
    description: 'Premium ultrabook with 13th Gen Intel processors, stunning OLED display option, and modern design.',
    price_usd: 1299,
    price_inr: 105999,
    rating: 4.4,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop',
    product_url: 'https://www.dell.com/en-in/shop/laptops/xps-13-plus/spd/xps-13-9320-laptop',
    affiliate_url: 'https://amzn.to/DellXPS13Plus',
    release_date: '2023-04-15',
    tags: ['Intel i7', 'OLED Display', 'Ultra-portable', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'enhanced-6',
    name: 'iPad Pro M4',
    category: 'Tablet',
    brand: 'Apple',
    description: 'Most advanced iPad with M4 chip, Ultra Retina XDR display, and Apple Pencil Pro support.',
    price_usd: 999,
    price_inr: 99900,
    rating: 4.8,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=400&fit=crop',
    product_url: 'https://www.apple.com/in/ipad-pro/',
    affiliate_url: 'https://amzn.to/iPadProM4',
    release_date: '2024-05-15',
    tags: ['M4 Chip', 'Apple Pencil Pro', 'Ultra Retina XDR', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'enhanced-7',
    name: 'OnePlus 12',
    category: 'Smartphone',
    brand: 'OnePlus',
    description: 'Flagship killer with Snapdragon 8 Gen 3, 50MP Hasselblad camera, and 100W SuperVOOC charging.',
    price_usd: 799,
    price_inr: 64999,
    rating: 4.5,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=400&fit=crop',
    product_url: 'https://www.oneplus.in/12',
    affiliate_url: 'https://amzn.to/OnePlus12',
    release_date: '2024-01-23',
    tags: ['Snapdragon 8 Gen 3', 'Hasselblad Camera', '100W Charging', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'enhanced-8',
    name: 'Meta Quest 3',
    category: 'VR Headset',
    brand: 'Meta',
    description: 'Next-gen mixed reality headset with improved graphics, passthrough technology, and wireless freedom.',
    price_usd: 499,
    price_inr: 41999,
    rating: 4.3,
    availability_india: false,
    image_url: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=500&h=400&fit=crop',
    product_url: 'https://www.meta.com/quest/quest-3/',
    affiliate_url: 'https://amzn.to/MetaQuest3',
    release_date: '2023-10-10',
    tags: ['Mixed Reality', 'Wireless VR', 'Passthrough', 'Limited India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function useEnhancedGadgets() {
  const originalGadgets = useGadgetData();
  const [enhancedGadgets, setEnhancedGadgets] = useState(ENHANCED_GADGETS);

  // Use enhanced gadgets only for now to avoid type conflicts
  useEffect(() => {
    // In a real implementation, you would merge data here
    setEnhancedGadgets(ENHANCED_GADGETS);
  }, []);

  return {
    ...originalGadgets,
    gadgets: enhancedGadgets
  };
}