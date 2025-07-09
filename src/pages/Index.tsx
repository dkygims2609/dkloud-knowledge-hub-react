import { useState, useEffect } from "react";
import { ArrowRight, Database, Zap, Users, BookOpen, Sparkles, Music, Code, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ContentGrid } from "@/components/ContentGrid";
import { DecodingAnimation } from "@/components/DecodingAnimation";
import { InfographicAnimation } from "@/components/InfographicAnimation";
import { FloatingIcons } from "@/components/FloatingIcons";
import { IoTFloatingIcons } from "@/components/IoTFloatingIcons";
import { ColorBandSection } from "@/components/ColorBandSection";
import { FeatureButtons } from "@/components/FeatureButtons";
import founderPhoto from "/lovable-uploads/40571043-185c-427c-a07e-f75d19054750.png";

const Index = () => {
  const [previewData, setPreviewData] = useState({
    movies: [],
    youtube: [],
    aitools: [],
    techcorner: [],
    smarttech: [],
    technews: []
  });

  useEffect(() => {
    // Fetch preview data for all sections
    const fetchPreviewData = async () => {
      try {
        // Movies & TV
        const moviesResponse = await fetch("https://script.google.com/macros/s/AKfycbwiNhiUq6yWcGQ5dUwMwclRYt_pTsz_8nNXSsYsZClcmdLJGFp3kZYZdSkfqW0LtGWd7A/exec");
        const moviesData = await moviesResponse.json();
        
        // YouTube Channels
        const youtubeResponse = await fetch("https://api.sheetbest.com/sheets/c66a0da1-d347-44f8-adc7-dc02c8627799");
        const youtubeData = await youtubeResponse.json();
        
        // AI Tools
        const aitoolsResponse = await fetch("https://script.google.com/macros/s/AKfycbxpIEMPY1Ji3tft5mYLNaObg9csvvzCdoWuAcOpz-KQlMWWmytkzShEgZBJNQ3r3yl7/exec");
        const aitoolsData = await aitoolsResponse.json();
        
        // Tech Corner
        const techcornerResponse = await fetch("https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec");
        const techcornerData = await techcornerResponse.json();

        setPreviewData({
          movies: moviesData || [],
          youtube: youtubeData || [],
          aitools: aitoolsData || [],
          techcorner: techcornerData || [],
          smarttech: [], // Will be populated with real API later
          technews: [] // Will be populated with real API later
        });
      } catch (error) {
        console.error("Error fetching preview data:", error);
        // Set empty arrays as fallback to prevent UI issues
        setPreviewData({
          movies: [],
          youtube: [],
          aitools: [],
          techcorner: [],
          smarttech: [],
          technews: []
        });
      }
    };

    fetchPreviewData();
  }, []);

  return (
    <div className="min-h-screen relative">
      <FloatingIcons />
      <IoTFloatingIcons showOnHomePage={true} />
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 dark:from-primary/20 dark:via-accent/10 dark:to-primary/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)/0.1_0%,_transparent_50%)]" />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl animate-pulse" style={{animationDelay: "1s"}} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="fade-in">
            {/* Modern dKloud Logo Design - Adjusted Size */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 relative" style={{ fontFamily: "'Inter', 'system-ui', sans-serif", letterSpacing: "-0.02em" }}>
              <span className="text-blue-600 dark:text-blue-400">d</span>
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">K</span>
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">loud</span>
            </h1>
            
            {/* Animated Tagline */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 slide-up" style={{animationDelay: "0.2s"}}>
              <DecodingAnimation 
                text="Decoding Knowledge" 
                className="bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 dark:from-purple-400 dark:via-violet-400 dark:to-blue-400 bg-clip-text text-transparent"
                delay={1000}
              />
            </div>
            
            {/* Restored Tagline - Library Of Unique Discoveries */}
            <div className="text-lg md:text-xl lg:text-2xl font-medium mb-8 bounce-in" style={{animationDelay: "0.3s"}}>
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 dark:from-orange-400 dark:via-red-400 dark:to-red-500 bg-clip-text text-transparent">
                Library Of Unique Discoveries
              </span>
            </div>
            
            {/* Minimalistic Mission Statement */}
            <div className="text-center mb-6 fade-in max-w-3xl mx-auto" style={{animationDelay: "0.4s"}}>
              <h2 className="text-lg md:text-xl font-medium mb-3 leading-relaxed">
                <span className="text-foreground/80">
                  At dKloud, we're crafting a <span className="text-primary font-medium">universe</span> where <span className="text-accent font-medium">creativity meets the cloud</span>, <span className="text-blue-500 font-medium">AI fuels curiosity</span>, and <span className="text-purple-500 font-medium">learning becomes a shared adventure</span>.
                </span>
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                <span className="text-foreground/60">
                  Whether you're a <span className="text-emerald-500">tech explorer</span>, a <span className="text-pink-500">digital creator</span>, or a <span className="text-indigo-500">seeker of knowledge</span> — this is your space to <span className="text-primary/80">discover, build, and belong</span>.
                </span>
              </p>
            </div>

            {/* Color Band Section - Individual Cards */}
            <div className="fade-in" style={{animationDelay: "0.5s"}}>
              <ColorBandSection />
            </div>
            
            {/* Feature Buttons */}
            <div className="fade-in" style={{animationDelay: "0.6s"}}>
              <FeatureButtons />
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center scale-in" style={{animationDelay: "0.7s"}}>
              <Button asChild size="lg" className="btn-gradient text-lg px-10 py-4 shadow-2xl">
                <Link to="/aitools">
                  Dive into dKloud Tech Universe
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-glass text-lg px-10 py-4 shadow-lg hover:shadow-xl">
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 to-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Enhanced Glassmorphism Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-6xl mx-auto p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 w-full">
                {[
                  { name: "Movies & TV", href: "/movies-tv", icon: "🎬", desc: "Films & Series", color: "from-violet-500 to-purple-600" },
                  { name: "YouTube Picks", href: "/ytchannels", icon: "📺", desc: "Top Channels", color: "from-red-500 to-rose-600" },
                  { name: "AI Tools", href: "/aitools", icon: "🤖", desc: "Latest AI", color: "from-cyan-500 to-blue-600" },
                  { name: "Tech Corner", href: "/techcorner", icon: "📖", desc: "SOPs & Tips", color: "from-emerald-500 to-teal-600" },
                  { name: "SmartTech", href: "/smarttech", icon: "⚡", desc: "Smart Gadgets", color: "from-amber-500 to-orange-600" },
                  { name: "Tech News", href: "/technews", icon: "📰", desc: "Latest Updates", color: "from-blue-500 to-indigo-600" },
                  { name: "Portfolio", href: "/portfolio", icon: "💼", desc: "My Work", color: "from-pink-500 to-purple-600" },
                ].map((tab, index) => (
                  <Link 
                    key={tab.name} 
                    to={tab.href} 
                    className="group relative"
                    onClick={() => toast.success(`${tab.name} activated`, { 
                      description: `Loading ${tab.desc.toLowerCase()}...`,
                      duration: 2000 
                    })}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-background/60 backdrop-blur-lg border border-border/40 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tab.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Glowing border effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative p-4 text-center">
                        <div className="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500 group-hover:drop-shadow-lg">{tab.icon}</div>
                        <h4 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors duration-300 relative">
                          {tab.name}
                          {/* Underline effect */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
                        </h4>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">{tab.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-primary">dKloud</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive platform combining <span className="text-purple-500 font-medium">entertainment</span>, <span className="text-blue-500 font-medium">education</span>, and <span className="text-emerald-500 font-medium">technology</span>. 
              All data is dynamically powered by <span className="text-accent font-medium">Google Sheets APIs</span> for <span className="text-primary font-medium">real-time updates</span>.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <Card className="dkloud-card dkloud-card-interactive bounce-in text-center">
              <CardHeader className="pb-8">
                <Database className="h-16 w-16 text-primary mx-auto mb-6 float" />
                <CardTitle className="text-2xl">Google Sheets</CardTitle>
                <CardDescription className="text-lg">Data stored and managed in organized spreadsheets</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dkloud-card dkloud-card-interactive bounce-in text-center" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="pb-8">
                <Zap className="h-16 w-16 text-accent mx-auto mb-6 float" style={{animationDelay: "1s"}} />
                <CardTitle className="text-2xl">Live APIs</CardTitle>
                <CardDescription className="text-lg">Real-time data fetching via Google Apps Script</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dkloud-card dkloud-card-interactive bounce-in text-center" style={{ animationDelay: "0.4s" }}>
              <CardHeader className="pb-8">
                <Sparkles className="h-16 w-16 text-success mx-auto mb-6 float" style={{animationDelay: "2s"}} />
                <CardTitle className="text-2xl">Dynamic Site</CardTitle>
                <CardDescription className="text-lg">Always up-to-date content without manual updates</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* How dKloud Works - Animated Infographic */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <h3 className="text-3xl md:text-4xl font-bold slide-up">How dKloud Works</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const section = document.getElementById('how-dkloud-works');
                  if (section) {
                    const isHidden = section.style.display === 'none';
                    section.style.display = isHidden ? 'block' : 'none';
                  }
                }}
                className="ml-4"
              >
                Show/Hide
              </Button>
            </div>
            
            <div id="how-dkloud-works">
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Experience the seamless flow of data from your interaction to real-time content delivery
              </p>
              
              {/* Interactive Infographic */}
              <div className="mb-12">
                <InfographicAnimation />
              </div>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { name: "React + TypeScript", color: "from-blue-500 to-cyan-500" },
                  { name: "Tailwind CSS + Shadcn UI", color: "from-purple-500 to-pink-500" }, 
                  { name: "Google Sheets + API", color: "from-green-500 to-emerald-500" },
                  { name: "GitHub Pages", color: "from-gray-500 to-slate-600" },
                  { name: "Supabase Backend", color: "from-indigo-500 to-purple-500" }
                ].map((tech, index) => (
                  <div key={tech.name} className={`bg-gradient-to-r ${tech.color} text-white rounded-full px-6 py-3 font-medium bounce-in shadow-lg`} style={{animationDelay: `${index * 0.1}s`}}>
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="slide-up">
            <h3 className="text-3xl md:text-4xl font-bold mb-12">Meet the Founder</h3>
            <div className="dkloud-card dkloud-card-interactive p-12">
              <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-xl border-4 border-primary/20 glow float">
                <img 
                  src={founderPhoto} 
                  alt="Dileep Yadav - Founder & Creative Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-2xl font-semibold mb-2">Dileep Yadav</h4>
              <p className="text-lg text-accent font-medium mb-6">Founder & Creative Director</p>
              <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                A passionate, <span className="text-primary font-medium">self-taught professional</span> combining <span className="text-emerald-500 font-medium">technology</span>, <span className="text-purple-500 font-medium">creativity</span>, and <span className="text-blue-500 font-medium">community upliftment</span>. 
                <span className="text-pink-500 font-medium">Music composer</span> working with Established Music Director <span className="text-accent font-medium">Arya Sharma</span>, guitarist, pianist, musician, writer, and <span className="text-cyan-500 font-medium">AI-driven design expert</span>.
                I believe in creating platforms that make <span className="text-indigo-500 font-medium">knowledge more accessible</span>, <span className="text-emerald-500 font-medium">learning more engaging</span>, and <span className="text-purple-500 font-medium">creativity more visible</span>.
                My aim is to build bridges between <span className="text-primary font-medium">tech and people</span> — one tab, one tool, one song at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <Button asChild size="lg" className="btn-gradient text-lg px-8 py-3">
                  <Link to="/portfolio">View Full Portfolio</Link>
                </Button>
                <Button asChild size="lg" className="btn-glass text-lg px-8 py-3">
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
              
              {/* Quick Services Highlight */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: <Music className="h-6 w-6" />, text: "Music Composition" },
                  { icon: <Brain className="h-6 w-6" />, text: "AI Design" },
                  { icon: <Code className="h-6 w-6" />, text: "Web Development" },
                  { icon: <BookOpen className="h-6 w-6" />, text: "Poetry & Writing" }
                ].map((service, index) => (
                  <div key={index} className="flex flex-col items-center p-4 bg-background/50 rounded-lg">
                    <div className="text-primary mb-2">{service.icon}</div>
                    <span className="text-sm font-medium text-center">{service.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;