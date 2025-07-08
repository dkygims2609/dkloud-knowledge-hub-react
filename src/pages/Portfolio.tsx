import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, User, Music, PenTool } from "lucide-react";
import { ModernTabSystem, createTabData } from "@/components/ModernTabSystem";
import Poetry from "./Poetry";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('about');
  const portfolioTabs = createTabData('portfolio');
  
  const compositions = [
    {
      title: "Pahla Pyar",
      description: "A melodious composition about first love",
      embedId: "XLgJ4EYof3M"
    },
    {
      title: "Raghuwar Ram Aa Gaye", 
      description: "A devotional composition",
      embedId: "153sNf2Z3Qc"
    },
    {
      title: "Pyar Nahi Hai Khel Dear",
      description: "A heartfelt song about love", 
      embedId: "rgFtlUeXRqI"
    },
    {
      title: "Koi Pukare Shankar",
      description: "A spiritual composition",
      embedId: "5jXH_7V3IUU"
    },
    {
      title: "Jaatikaar",
      description: "An original composition",
      embedId: "NEjGJ8A2wMI"
    }
  ];

  const handleWatchOnYouTube = (embedId: string) => {
    window.open(`https://www.youtube.com/watch?v=${embedId}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            💼 My Portfolio
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore my creative journey - music, poetry, and personal story
          </p>
        </div>

        {/* Modern Portfolio Tabs */}
        <ModernTabSystem 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={portfolioTabs}
        />

        {/* Tab Content */}
        {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Founder Profile */}
              <Card className="dkloud-card">
                <CardContent className="p-12 text-center">
                  <div className="w-40 h-40 mx-auto mb-8 relative">
                    <img 
                      src="/lovable-uploads/ee1833ab-bad9-4cb7-9fba-b36f2c77858b.png" 
                      alt="Dileep Yadav - Founder & Creative Director"
                      className="w-full h-full rounded-full object-cover border-4 border-primary glow float"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center text-white text-5xl font-bold glow float">
                      DK
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Dileep Yadav</h2>
                  <p className="text-lg text-accent font-medium mb-6">Founder & Creative Director</p>
                  
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-6 mb-6 border border-primary/20">
                      <h3 className="text-xl font-bold mb-4 text-primary">Founder Note</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        I'm Dileep Yadav, the mind and heart behind dKloud.in.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        I like to think of myself as a passionate creative techy — someone who blends the power of technology with the soul of creativity. What started as a curiosity for tech has evolved into a full-fledged mission to make digital knowledge and expression more accessible, inspiring, and beautifully organized.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        I've explored the world of cloud infrastructure and virtualization (yep, I'm certified in VMware, Azure, and AWS), but my journey doesn't stop at servers and scripts.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-lg p-6 mb-6 border border-accent/20">
                      <h4 className="text-lg font-semibold mb-4 text-accent">🎼 Beyond the Code</h4>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        I'm also a music composer, a lyricist, and someone who's always felt deeply connected to storytelling.
                        I've collaborated with music director Arya Sharma, created original compositions, and used AI to craft custom wedding songs, birthday anthems, and emotive logos that speak louder than words.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        It's not about tech or art — it's about combining both to create something meaningful.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-success/10 via-warning/10 to-success/10 rounded-lg p-6 mb-6 border border-success/20">
                      <h4 className="text-lg font-semibold mb-4 text-success">🚀 The dKloud Vision</h4>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        dKloud.in isn't just a website. It's a growing universe —
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        A space where learning meets creativity,<br/>
                        Where you can discover a new movie, learn a new skill, read poetry, or explore tech news — all in one place.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        It's built with tools, love, and a vision to empower curious minds like yours and mine.
                      </p>
                    </div>
                    
                    <blockquote className="text-xl italic text-primary mb-8 border-l-4 border-primary pl-6 text-center">
                      "So whether you're a learner, a dreamer, or a doer —<br/>
                      Welcome to dKloud. Let's decode knowledge together."
                    </blockquote>
                  </div>

                  {/* Expertise & Values */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-warning">💡 Expertise & Passion</h3>
                      <div className="space-y-2">
                        <Badge variant="outline" className="block w-full p-2">Self-Taught Tech Professional</Badge>
                        <Badge variant="outline" className="block w-full p-2">Music Composer</Badge>
                        <Badge variant="outline" className="block w-full p-2">Content Creator</Badge>
                        <Badge variant="outline" className="block w-full p-2">Creative Innovator</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-success">💖 Core Values</h3>
                      <div className="space-y-3">
                        <div>
                          <Badge className="bg-primary/10 text-primary mb-2">Accessibility</Badge>
                          <p className="text-sm text-muted-foreground">Making knowledge more accessible to everyone</p>
                        </div>
                        <div>
                          <Badge className="bg-accent/10 text-accent mb-2">Engagement</Badge>
                          <p className="text-sm text-muted-foreground">Creating engaging learning experiences</p>
                        </div>
                        <div>
                          <Badge className="bg-success/10 text-success mb-2">Creativity</Badge>
                          <p className="text-sm text-muted-foreground">Bringing visibility to creative expressions</p>
                        </div>
                        <div>
                          <Badge className="bg-warning/10 text-warning mb-2">Connection</Badge>
                          <p className="text-sm text-muted-foreground">Building bridges between technology and people</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
                    <Button asChild size="lg" className="btn-gradient text-lg px-8 py-3">
                      <Link to="/services">Explore Services</Link>
                    </Button>
                    <Button asChild size="lg" className="btn-glass text-lg px-8 py-3">
                      <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer">
                        Get In Touch
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
        )}

        {activeTab === 'compositions' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  🎵 YouTube Compositions
                </h2>
                <p className="text-lg text-muted-foreground">Original musical compositions and covers</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {compositions.map((composition, index) => (
                  <Card key={index} className="dkloud-card h-full">
                    <CardHeader>
                      <CardTitle className="text-lg mb-2">{composition.title}</CardTitle>
                      <CardDescription className="text-sm">{composition.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* YouTube Embed */}
                      <div className="aspect-video w-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${composition.embedId}`}
                          title={composition.title}
                          className="w-full h-full rounded-lg"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      
                      <div className="flex justify-center pt-4">
                        <Button
                          onClick={() => handleWatchOnYouTube(composition.embedId)}
                          className="flex items-center space-x-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Watch on YouTube</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
        )}

        {activeTab === 'poetry' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ✍️ Penned Down
              </h2>
              <p className="text-lg text-muted-foreground">Collection of original poetry and shayari from Google Docs</p>
            </div>
            
            <Poetry />
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;