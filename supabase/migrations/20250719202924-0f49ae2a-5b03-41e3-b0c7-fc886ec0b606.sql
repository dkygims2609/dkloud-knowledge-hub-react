
-- Create content management tables for admin panel
CREATE TABLE IF NOT EXISTS public.content_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create banner content table
CREATE TABLE IF NOT EXISTS public.banner_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table for admin roles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for content_sections
CREATE POLICY "Content sections are publicly readable" 
  ON public.content_sections 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can modify content sections" 
  ON public.content_sections 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create RLS policies for banner_content
CREATE POLICY "Banner content is publicly readable" 
  ON public.banner_content 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can modify banner content" 
  ON public.banner_content 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    )
  );

-- Insert some initial banner content
INSERT INTO public.banner_content (title, content, display_order) VALUES
('Movie Release', '🎬 New Movie Releases: Top AI-generated films now streaming on major platforms', 1),
('TV Series', '📺 Latest TV Series: Tech thriller series "Cloud Nine" premieres this week', 2),
('dKloud Updates', '🚀 dKloud Updates: New AI Tools section with 50+ curated productivity apps', 3),
('Music Tech', '🎵 Music Tech: AI composition tools revolutionizing music production industry', 4),
('Cloud Computing', '☁️ Cloud Computing: Latest serverless architecture trends and tutorials added', 5),
('AI Breakthrough', '🤖 AI Breakthrough: ChatGPT-5 rumors and next-gen language model predictions', 6),
('Smart Tech', '📱 Smart Tech: IoT devices integration guide for home automation systems', 7),
('Upcoming Projects', '🎯 Upcoming Projects: dKloud mobile app development starting next quarter', 8);

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_sections_updated_at BEFORE UPDATE ON public.content_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_banner_content_updated_at BEFORE UPDATE ON public.banner_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
