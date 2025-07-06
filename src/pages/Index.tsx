import { useState, useEffect } from "react";
import { ArrowRight, Database, Zap, Users, BookOpen, Sparkles, Music, Code, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ContentCarousel } from "@/components/ContentCarousel";

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
      }
    };

    fetchPreviewData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="fade-in">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 glow">
              dKloud Tech
            </h1>
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 slide-up" style={{animationDelay: "0.2s"}}>
              Decoding Knowledge
            </p>
            <p className="text-xl md:text-2xl font-bold text-orange-500 mb-8 bounce-in" style={{animationDelay: "0.3s"}}>
              Library Of Unique Discoveries
            </p>
            <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto leading-relaxed" style={{animationDelay: "0.4s"}}>
              Powered by: dKloud Tech
            </p>
            
            {/* Mission Statement */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-10 max-w-5xl mx-auto border border-border/50 fade-in" style={{animationDelay: "0.5s"}}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're on a mission to blend creativity, cloud technology, AI, and community-driven learning into one cohesive platform.
                Whether you're a tech explorer, a creative mind, or a curious learner, you'll find something meaningful here.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center scale-in" style={{animationDelay: "0.6s"}}>
              <Button asChild size="lg" className="btn-gradient text-lg px-10 py-4">
                <Link to="/movies-tv">
                  Explore Content
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-glass text-lg px-10 py-4">
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
            <h3 className="text-3xl md:text-4xl font-bold mb-8 slide-up">Explore Our Sections</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto">
              {[
                { name: "Movies & TV", href: "/movies-tv", emoji: "🎬", desc: "Films & shows", color: "from-purple-500 to-pink-500" },
                { name: "YouTube", href: "/ytchannels", emoji: "📹", desc: "Top channels", color: "from-red-500 to-orange-500" },
                { name: "AI Tools", href: "/aitools", emoji: "🤖", desc: "Latest AI", color: "from-blue-500 to-cyan-500" },
                { name: "Tech Corner", href: "/techcorner", emoji: "📚", desc: "SOPs & Tips", color: "from-green-500 to-emerald-500" },
                { name: "SmartTech", href: "/smarttech", emoji: "💡", desc: "Smart gadgets", color: "from-yellow-500 to-amber-500" },
                { name: "Tech News", href: "/technews", emoji: "📰", desc: "Latest updates", color: "from-indigo-500 to-purple-500" },
                { name: "Portfolio", href: "/portfolio", emoji: "💼", desc: "My work", color: "from-teal-500 to-green-500" },
                { name: "Services", href: "/services", emoji: "🎵", desc: "What I Offer", color: "from-pink-500 to-rose-500" },
              ].map((tab, index) => (
                <Link key={tab.name} to={tab.href} className="group">
                  <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${tab.color} p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[120px] max-w-[140px] fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="bg-background/95 backdrop-blur-sm rounded-[10px] p-3 h-full text-center transition-colors group-hover:bg-background/90">
                      <div className="text-2xl mb-2 transition-transform group-hover:scale-110 duration-300">{tab.emoji}</div>
                      <h4 className="font-semibold text-xs mb-1 group-hover:text-primary transition-colors">{tab.name}</h4>
                      <p className="text-[10px] text-muted-foreground group-hover:text-muted-foreground/80">{tab.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Content Previews with Carousels */}
          <div className="space-y-12 mt-16">
            <ContentCarousel
              title="🎬 Featured Movies & TV Series"
              items={previewData.movies}
              type="movies"
              viewAllLink="/movies-tv"
              maxItems={6}
            />
            
            <ContentCarousel
              title="📹 Top YouTube Channels"
              items={previewData.youtube}
              type="youtube"
              viewAllLink="/ytchannels"
              maxItems={6}
            />
            
            <ContentCarousel
              title="🤖 Latest AI Tools"
              items={previewData.aitools}
              type="aitools"
              viewAllLink="/aitools"
              maxItems={6}
            />
            
            <ContentCarousel
              title="📚 Tech Corner Resources"
              items={previewData.techcorner}
              type="techcorner"
              viewAllLink="/techcorner"
              maxItems={6}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About dKloud</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive platform combining entertainment, education, and technology. 
              All data is dynamically powered by Google Sheets APIs for real-time updates.
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

          {/* How dKloud Works */}
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 slide-up">How dKloud Works</h3>
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-border/50">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-medium">
                <div className="flex items-center space-x-2 bg-primary/10 rounded-lg px-4 py-2">
                  <span>User Clicks</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90 md:rotate-0" />
                <div className="flex items-center space-x-2 bg-accent/10 rounded-lg px-4 py-2">
                  <span>Frontend Request (React)</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90 md:rotate-0" />
                <div className="flex items-center space-x-2 bg-success/10 rounded-lg px-4 py-2">
                  <span>API Gateway</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90 md:rotate-0" />
                <div className="flex items-center space-x-2 bg-warning/10 rounded-lg px-4 py-2">
                  <span>Google Sheet</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90 md:rotate-0" />
                <div className="flex items-center space-x-2 bg-primary/10 rounded-lg px-4 py-2">
                  <span>Render UI</span>
                </div>
              </div>
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                "React + TypeScript",
                "Tailwind CSS + Shadcn UI", 
                "Google Sheets + API",
                "GitHub Pages"
              ].map((tech, index) => (
                <div key={tech} className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-full px-6 py-3 font-medium bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
                  {tech}
                </div>
              ))}
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
              <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center text-white text-5xl font-bold glow float">
                DK
              </div>
              <h4 className="text-2xl font-semibold mb-2">Dileep Yadav</h4>
              <p className="text-lg text-accent font-medium mb-6">Founder & Creative Director</p>
              <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                A passionate, self-taught professional combining technology, creativity, and community upliftment. 
                Music composer working with Established Music Director Arya Sharma, guitarist, pianist, musician, writer, and AI-driven design expert.
                I believe in creating platforms that make knowledge more accessible, learning more engaging, and creativity more visible.
                My aim is to build bridges between tech and people — one tab, one tool, one song at a time.
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