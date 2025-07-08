import { useState, useEffect } from 'react';

export interface LatestGadget {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price_usd?: number;
  price_inr?: number;
  rating?: number;
  availability_india: boolean;
  image_url?: string;
  product_url?: string;
  affiliate_url?: string;
  release_date?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

const LATEST_GADGETS: LatestGadget[] = [
  {
    id: 'latest-1',
    name: 'OnePlus 13',
    category: 'Smartphone',
    brand: 'OnePlus',
    description: 'Latest flagship with Snapdragon 8 Elite, 6000mAh battery, 100W charging, and Hasselblad camera system. Revolutionary performance meets stunning design.',
    price_usd: 899,
    price_inr: 69999,
    rating: 4.8,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
    product_url: 'https://www.oneplus.in/13',
    affiliate_url: 'https://amzn.to/OnePlus13',
    release_date: '2024-01-04',
    tags: ['Snapdragon 8 Elite', '100W Charging', 'Hasselblad', '5G', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-2',
    name: 'iPhone 15 Pro Max',
    category: 'Smartphone',
    brand: 'Apple',
    description: 'Pro Max with A17 Pro chip, titanium design, Action Button, and advanced Pro camera system. The ultimate iPhone experience.',
    price_usd: 1199,
    price_inr: 159900,
    rating: 4.9,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1592286130895-6e4b19efb85c?w=600&h=400&fit=crop',
    product_url: 'https://www.apple.com/in/iphone-15-pro/',
    affiliate_url: 'https://amzn.to/iPhone15ProMax',
    release_date: '2023-09-22',
    tags: ['A17 Pro', 'Titanium', 'Action Button', 'Pro Camera', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-3',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphone',
    brand: 'Samsung',
    description: 'Ultimate flagship with S Pen, 200MP camera, Galaxy AI features, and titanium frame. Built for productivity and creativity.',
    price_usd: 1299,
    price_inr: 129999,
    rating: 4.7,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=400&fit=crop',
    product_url: 'https://www.samsung.com/in/smartphones/galaxy-s24/',
    affiliate_url: 'https://amzn.to/GalaxyS24Ultra',
    release_date: '2024-01-17',
    tags: ['Galaxy AI', 'S Pen', '200MP Camera', 'Titanium', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-4',
    name: 'MacBook Pro M4',
    category: 'Laptop',
    brand: 'Apple',
    description: 'Revolutionary M4 chip brings incredible performance and efficiency to MacBook Pro. Perfect for professionals and creators.',
    price_usd: 1599,
    price_inr: 169900,
    rating: 4.9,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop',
    product_url: 'https://www.apple.com/in/macbook-pro/',
    affiliate_url: 'https://amzn.to/MacBookProM4',
    release_date: '2024-11-08',
    tags: ['M4 Chip', 'Liquid Retina XDR', 'Pro Performance', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-5',
    name: 'Steam Deck OLED',
    category: 'Gaming',
    brand: 'Valve',
    description: 'Enhanced Steam Deck with stunning OLED display, improved battery life, and faster performance. Gaming on the go redefined.',
    price_usd: 549,
    price_inr: 45999,
    rating: 4.6,
    availability_india: false,
    image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop',
    product_url: 'https://store.steampowered.com/steamdeck',
    affiliate_url: 'https://store.steampowered.com/steamdeck',
    release_date: '2023-11-16',
    tags: ['OLED Display', 'Handheld Gaming', 'Steam', 'Limited India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-6',
    name: 'Sony WH-1000XM6',
    category: 'Audio',
    brand: 'Sony',
    description: 'Next-gen noise canceling headphones with AI-powered sound optimization, 40-hour battery, and premium comfort.',
    price_usd: 449,
    price_inr: 34990,
    rating: 4.8,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop',
    product_url: 'https://www.sony.co.in/electronics/headband-headphones',
    affiliate_url: 'https://amzn.to/SonyWH1000XM6',
    release_date: '2024-09-01',
    tags: ['Noise Canceling', 'AI Sound', '40h Battery', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-7',
    name: 'Google Pixel 9 Pro',
    category: 'Smartphone',
    brand: 'Google',
    description: 'AI-powered photography meets flagship performance with Tensor G4, Magic Eraser Pro, and 7 years of updates.',
    price_usd: 999,
    price_inr: 109999,
    rating: 4.6,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop',
    product_url: 'https://store.google.com/in/product/pixel_9_pro',
    affiliate_url: 'https://amzn.to/Pixel9Pro',
    release_date: '2024-08-22',
    tags: ['Tensor G4', 'AI Photography', 'Magic Eraser', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-8',
    name: 'iPad Pro M4 13-inch',
    category: 'Tablet',
    brand: 'Apple',
    description: 'Ultra Retina XDR display with M4 chip delivers incredible performance in impossibly thin design. Pro creativity unleashed.',
    price_usd: 1299,
    price_inr: 129900,
    rating: 4.8,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop',
    product_url: 'https://www.apple.com/in/ipad-pro/',
    affiliate_url: 'https://amzn.to/iPadProM4',
    release_date: '2024-05-15',
    tags: ['M4 Chip', 'Ultra Retina XDR', 'Apple Pencil Pro', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-9',
    name: 'Nothing Phone 2a Plus',
    category: 'Smartphone',
    brand: 'Nothing',
    description: 'Enhanced mid-range phone with improved Glyph Interface, faster charging, and better cameras at competitive pricing.',
    price_usd: 399,
    price_inr: 27999,
    rating: 4.4,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop',
    product_url: 'https://nothing.tech/products/phone-2a-plus',
    affiliate_url: 'https://amzn.to/NothingPhone2aPlus',
    release_date: '2024-07-31',
    tags: ['Glyph Interface', 'Nothing OS', 'Mid-range', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'latest-10',
    name: 'Asus ROG Ally X',
    category: 'Gaming',
    brand: 'Asus',
    description: 'Enhanced gaming handheld with AMD Z1 Extreme, 24GB RAM, 1TB SSD, and improved ergonomics for ultimate gaming.',
    price_usd: 799,
    price_inr: 69999,
    rating: 4.5,
    availability_india: true,
    image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop',
    product_url: 'https://rog.asus.com/gaming-handhelds/rog-ally/rog-ally-x/',
    affiliate_url: 'https://amzn.to/AsusROGAllyX',
    release_date: '2024-07-22',
    tags: ['AMD Z1 Extreme', '24GB RAM', 'Handheld Gaming', 'India'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function useLatestGadgets() {
  const [gadgets, setGadgets] = useState<LatestGadget[]>(LATEST_GADGETS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchGadgets = async (filters: any = {}) => {
    try {
      setLoading(true);
      setError(null);

      let filteredGadgets = [...LATEST_GADGETS];

      if (filters.category) {
        filteredGadgets = filteredGadgets.filter(gadget => 
          gadget.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      if (filters.brand) {
        filteredGadgets = filteredGadgets.filter(gadget => 
          gadget.brand.toLowerCase() === filters.brand.toLowerCase()
        );
      }

      if (filters.availableInIndia) {
        filteredGadgets = filteredGadgets.filter(gadget => gadget.availability_india);
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setGadgets(filteredGadgets.slice(0, filters.limit || 20));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gadgets');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await fetchGadgets();
  };

  useEffect(() => {
    const uniqueCategories = [...new Set(LATEST_GADGETS.map(gadget => gadget.category))];
    const uniqueBrands = [...new Set(LATEST_GADGETS.map(gadget => gadget.brand))];
    
    setCategories(uniqueCategories);
    setBrands(uniqueBrands);
    setGadgets(LATEST_GADGETS);
  }, []);

  return {
    gadgets,
    loading,
    error,
    categories,
    brands,
    fetchGadgets,
    refresh,
    lastUpdated
  };
}