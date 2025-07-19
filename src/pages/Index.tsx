
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
import { FeatureCards } from "@/components/FeatureCards";
import { AudioPlayer } from "@/components/AudioPlayer";
import TeamSection from "@/components/TeamSection";
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
        const techcornerResponse = await fetch("https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIi epb6kUjmqKwKcVr/exec");
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
    <div className="min-h-screen relative">
      <FloatingIcons />
      <IoTFloatingIcons showOnHomePage={true} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="fade-in">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 slide-up" style={{animationDelay: "0.2s"}}>
              <DecodingAnimation 
                text="Decoding Knowledge" 
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-black tracking-wider"
                delay={1000}
              />
            </div>
            
            <div className="text-lg md:text-xl lg:text-2xl font-bold mb-8 bounce-in tracking-wide" style={{animationDelay: "0.3s"}}>
              <span className="text-red-500 font-bold tracking-wide">
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
            
            <div className="text-center mb-6 fade-in max-w-2xl mx-auto" style={{animationDelay: "0.5s"}}>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                At dKloud, we're crafting a universe where creativity meets the cloud, AI fuels curiosity, and learning becomes a shared adventure.
              </p>
            </div>

            <div className="fade-in mb-8" style={{animationDelay: "0.6s"}}>
              <ColorBandSection />
            </div>

            <div className="fade-in mb-8" style={{animationDelay: "0.7s"}}>
              <FeatureCards />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center scale-in" style={{animationDelay: "0.8s"}}>
              <Button asChild size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Link to="/aitools">
                  Dive into dKloud Tech Universe
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-10 py-4">
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-6xl mx-auto p-4">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 w-full">
                {[
                  { name: "Movies", href: "/movies-tv", Icon: Clapperboard, desc: "Films & Series", color: "from-violet-500 to-purple-600" },
                  { name: "YouTube", href: "/ytchannels", Icon: Youtube, desc: "Top Channels", color: "from-red-500 to-rose-600" },
                  { name: "AI Tools", href: "/aitools", Icon: Brain, desc: "Latest AI", color: "from-cyan-500 to-blue-600" },
                  { name: "Tech Tips", href: "/techcorner", Icon: BookOpen, desc: "SOPs & Tips", color: "from-emerald-500 to-teal-600" },
                  { name: "Smart Tech", href: "/smarttech", Icon: Zap, desc: "Gadgets", color: "from-purple-500 to-blue-600" },
                  { name: "Products", href: "/digi-products", Icon: Package, desc: "My Products", color: "from-orange-500 to-red-600" },
                  { name: "Portfolio", href: "/portfolio", Icon: Briefcase, desc: "My Work", color: "from-pink-500 to-purple-600" },
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
                    <div className="glass-card rounded-xl p-4 text-center hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer fade-in min-h-[120px] flex flex-col justify-center" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="text-xl mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tab.Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-bold text-sm mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {tab.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{tab.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">About <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-black">dKloud</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive platform combining entertainment, education, and technology. 
              All data is dynamically powered by Google Sheets APIs for real-time updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <Card className="glass-card bounce-in text-center">
              <CardHeader className="pb-8">
                <Database className="h-16 w-16 text-primary mx-auto mb-6" />
                <CardTitle className="text-2xl">Google Sheets</CardTitle>
                <CardDescription className="text-lg">Data stored and managed in organized spreadsheets</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="glass-card bounce-in text-center" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="pb-8">
                <Zap className="h-16 w-16 text-accent mx-auto mb-6" />
                <CardTitle className="text-2xl">Live APIs</CardTitle>
                <CardDescription className="text-lg">Real-time data fetching via Google Apps Script</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="glass-card bounce-in text-center" style={{ animationDelay: "0.4s" }}>
              <CardHeader className="pb-8">
                <Sparkles className="h-16 w-16 text-success mx-auto mb-6" />
                <CardTitle className="text-2xl">Dynamic Site</CardTitle>
                <CardDescription className="text-lg">Always up-to-date content without manual updates</CardDescription>
              </CardHeader>
            </Card>
          </div>

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
              
              <div className="mb-12">
                <InfographicAnimation />
              </div>
              
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

      {/* Team Section */}
      <TeamSection />
    </div>
  );
};

export default Index;
