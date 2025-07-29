
import { useState, useEffect } from "react";
import { ArrowRight, Database, Zap, Users, BookOpen, Sparkles, Music, Code, Brain, Clapperboard, Youtube, Newspaper, Briefcase, Package } from "lucide-react";
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
import { AudioPlayer } from "@/components/AudioPlayer";
import TeamSection from "@/components/TeamSection";

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
    const fetchPreviewData = async () => {
      try {
        // Movies & TV
        const moviesResponse = await fetch("https://script.google.com/macros/s/AKfycbwiNhiUq6yWcGQ5dUwMwclRYt_pTsz_8nNXSsYsZClcmdLJGFp3kZYZdSkfqW0LtGWd7A/exec");
        const moviesData = await moviesResponse.json();
        
        // YouTube Channels
        const youtubeResponse = await fetch("https://api.sheetbest.com/sheets/c66a0da1-d347-44f8-adc7-dc02c8627799");
        const youtubeData = await youtubeResponse.json();
        
        // AI Tools
        const aitoolsResponse = await fetch("https://script.google.com/macros/s/AKfycbyQZiNTLogFsjujIKxhFs2pXoK_iaoLkFb4D3HJ_wQjQpD17RxsqHX0G1nuKbQN2x9u/exec");
        const aitoolsData = await aitoolsResponse.json();
        
        // Tech Corner
        const techcornerResponse = await fetch("https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec");
        const techcornerData = await techcornerResponse.json();

        setPreviewData({
          movies: moviesData || [],
          youtube: youtubeData || [],
          aitools: aitoolsData || [],
          techcorner: techcornerData || [],
          smarttech: [],
          technews: []
        });
      } catch (error) {
        console.error("Error fetching preview data:", error);
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
    <div className="min-h-screen relative enhanced-landing-background particle-bg">
      <FloatingIcons />
      <IoTFloatingIcons showOnHomePage={true} />
      
      {/* Enhanced Hero Section with Modern Effects */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="scroll-reveal">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 slide-up float-gentle" style={{animationDelay: "0.2s"}}>
              <DecodingAnimation 
                text="Decoding Knowledge" 
                className="hero-title-enhanced font-black tracking-wider text-gradient-rainbow"
                delay={1000}
              />
            </div>
            
            <div className="text-lg md:text-xl lg:text-2xl font-bold mb-8 bounce-in tracking-wide magnetic-hover" style={{animationDelay: "0.3s"}}>
              <span className="hero-subtitle-enhanced font-bold tracking-wide text-gradient-primary">
                Library Of Unique Discoveries
              </span>
            </div>

            <div className="mb-8 fade-in" style={{animationDelay: "0.4s"}}>
              <AudioPlayer 
                audioSrc="/dKloudaudio.wav"
                title="Listen: What is dKloud?"
                description="Hear directly from the founder about dKloud's vision"
              />
            </div>
            
            <div className="text-center mb-8 fade-in max-w-2xl mx-auto" style={{animationDelay: "0.5s"}}>
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                <span className="text-foreground">
                  At dKloud, we're crafting a <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent font-semibold">universe</span> where <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">creativity meets the cloud</span>, <span className="neon-gradient-text font-semibold">AI fuels curiosity</span>, and <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent font-semibold">learning becomes a shared adventure</span>.
                </span>
              </p>
            </div>

            <div className="fade-in mb-8" style={{animationDelay: "0.6s"}}>
              <ColorBandSection />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center scale-in mb-12" style={{animationDelay: "0.7s"}}>
              <Button asChild size="lg" className="neon-outline-btn btn-glow text-lg px-10 py-4 magnetic-hover">
                <Link to="/aitools">
                  Dive into dKloud Tech Universe
                  <ArrowRight className="ml-3 h-6 w-6 float-gentle" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="animated-border-glow btn-glow text-lg px-10 py-4 tilt-3d">
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/40 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-6xl mx-auto p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 w-full">
                {[
                  { name: "Movies & TV", href: "/movies-tv", Icon: Clapperboard, desc: "Films & Series", color: "from-primary to-secondary" },
                  { name: "YouTube Picks", href: "/ytchannels", Icon: Youtube, desc: "Top Channels", color: "from-red-500 to-rose-600" },
                  { name: "AI Tools", href: "/aitools", Icon: Brain, desc: "Latest AI", color: "from-accent to-primary" },
                  { name: "Tech Corner", href: "/techcorner", Icon: BookOpen, desc: "SOPs & Tips", color: "from-green-500 to-emerald-600" },
                  { name: "SmartTech", href: "/smarttech", Icon: Zap, desc: "Smart Gadgets", color: "from-secondary to-accent" },
                  { name: "Digi Products", href: "/digi-products", Icon: Package, desc: "My Products", color: "from-orange-500 to-red-600" },
                  { name: "Portfolio", href: "/portfolio", Icon: Briefcase, desc: "My Work", color: "from-secondary to-primary" },
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
                    <div className="card-modern glass-card neon-glow stagger-item magnetic-hover tilt-3d" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${tab.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative p-4 text-center">
                        <div className="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500 group-hover:drop-shadow-lg flex justify-center float-gentle">
                          <tab.Icon className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-300 neon-glow" />
                        </div>
                        <h4 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors duration-300 relative text-sharp-bright">
                          {tab.name}
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sharp-bright">About <span className="neon-gradient-text font-black">dKloud</span></h2>
            <p className="text-xl text-hero-bright max-w-3xl mx-auto">
              A comprehensive platform combining <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent font-semibold">entertainment</span>, <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent font-semibold">education</span>, and <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">technology</span>. 
              All data is dynamically powered by <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-semibold">Google Sheets APIs</span> for <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">real-time updates</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <Card className="card-modern glass-card neon-glow bounce-in text-center magnetic-hover">
              <CardHeader className="pb-8">
                <Database className="h-16 w-16 text-primary mx-auto mb-6 float-gentle neon-glow" />
                <CardTitle className="text-2xl text-primary text-gradient-primary">Google Sheets</CardTitle>
                <CardDescription className="text-lg">Data stored and managed in organized spreadsheets</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-modern glass-card neon-glow-accent bounce-in text-center tilt-3d" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="pb-8">
                <Zap className="h-16 w-16 text-accent mx-auto mb-6 float-dramatic neon-glow-accent" style={{animationDelay: "1s"}} />
                <CardTitle className="text-2xl text-accent">Live APIs</CardTitle>
                <CardDescription className="text-lg">Real-time data fetching via Google Apps Script</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-modern glass-card neon-glow-secondary bounce-in text-center magnetic-hover" style={{ animationDelay: "0.4s" }}>
              <CardHeader className="pb-8">
                <Sparkles className="h-16 w-16 text-success mx-auto mb-6 float-gentle neon-glow-secondary" style={{animationDelay: "2s"}} />
                <CardTitle className="text-2xl text-success">Dynamic Site</CardTitle>
                <CardDescription className="text-lg">Always up-to-date content without manual updates</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <h3 className="text-3xl md:text-4xl font-bold slide-up neon-gradient-text">How dKloud Works</h3>
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
                className="ml-4 border-primary/30 text-primary hover:bg-primary/10"
              >
                Show/Hide
              </Button>
            </div>
            
            <div id="how-dkloud-works">
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Experience the seamless flow of data from your interaction to real-time content delivery
              </p>
              
              <div className="mb-12">
                <InfographicAnimation />
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { name: "React + TypeScript", color: "from-primary to-accent" },
                  { name: "Tailwind CSS + Shadcn UI", color: "from-secondary to-primary" }, 
                  { name: "Google Sheets + API", color: "from-green-500 to-emerald-500" },
                  { name: "GitHub Pages", color: "from-gray-500 to-slate-600" },
                  { name: "Supabase Backend", color: "from-accent to-secondary" }
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

      {/* Team Section */}
      <TeamSection />
    </div>
  );
};

export default Index;
