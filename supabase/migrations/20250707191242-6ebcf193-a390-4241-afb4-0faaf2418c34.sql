-- Create tables for tech news, smart gadgets, and RSS feeds
CREATE TABLE public.tech_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  published_date TIMESTAMP WITH TIME ZONE NOT NULL,
  source TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.smart_gadgets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  brand TEXT,
  category TEXT NOT NULL,
  price_usd DECIMAL(10,2),
  price_inr DECIMAL(10,2),
  image_url TEXT,
  product_url TEXT,
  affiliate_url TEXT,
  availability_india BOOLEAN DEFAULT false,
  rating DECIMAL(3,2),
  release_date DATE,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.rss_feeds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  feed_url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_fetched TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tech_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_gadgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_feeds ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Tech news are publicly readable" 
ON public.tech_news 
FOR SELECT 
USING (true);

CREATE POLICY "Smart gadgets are publicly readable" 
ON public.smart_gadgets 
FOR SELECT 
USING (true);

CREATE POLICY "RSS feeds are publicly readable" 
ON public.rss_feeds 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_tech_news_category ON public.tech_news(category);
CREATE INDEX idx_tech_news_published_date ON public.tech_news(published_date DESC);
CREATE INDEX idx_tech_news_source ON public.tech_news(source);
CREATE INDEX idx_smart_gadgets_category ON public.smart_gadgets(category);
CREATE INDEX idx_smart_gadgets_brand ON public.smart_gadgets(brand);
CREATE INDEX idx_smart_gadgets_price_inr ON public.smart_gadgets(price_inr);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_tech_news_updated_at
  BEFORE UPDATE ON public.tech_news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_smart_gadgets_updated_at
  BEFORE UPDATE ON public.smart_gadgets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rss_feeds_updated_at
  BEFORE UPDATE ON public.rss_feeds
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial RSS feeds
INSERT INTO public.rss_feeds (name, feed_url, category) VALUES
('TechCrunch', 'https://techcrunch.com/feed/', 'General Tech'),
('The Verge', 'https://www.theverge.com/rss/index.xml', 'General Tech'),
('Engadget', 'https://www.engadget.com/rss.xml', 'Gadgets'),
('Gizmodo', 'https://gizmodo.com/rss', 'Gadgets'),
('YourStory', 'https://yourstory.com/feed', 'Indian Startups'),
('Inc42', 'https://inc42.com/feed/', 'Indian Tech'),
('MediaNama', 'https://www.medianama.com/feed/', 'Indian Digital'),
('BGR India', 'https://www.bgr.in/feed/', 'Indian Gadgets');