import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, User, Music, PenTool, Briefcase, Brain, Code, BookOpen } from "lucide-react";
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
              {/* Three Main Category Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                
                {/* Card 1: Founder Note */}
                <Card className="dkloud-card lg:col-span-3">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 relative">
                      <img 
                        src="/lovable-uploads/ee1833ab-bad9-4cb7-9fba-b36f2c77858b.png" 
                        alt="Dileep Yadav - Founder & Creative Director"
                        className="w-full h-full rounded-full object-cover border-4 border-primary glow float"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-full h-full bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center text-white text-4xl font-bold glow float">
                        DK
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2">🧑‍💻 Founder Bio: Dileep Yadav</CardTitle>
                    <p className="text-lg text-accent font-medium mb-4">Passionate Creative Techy | Founder of dKloud.in</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-6 border border-primary/20">
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        Hi, I'm Dileep — the mind and spirit behind dKloud.in.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        After spending over a decade in the IT industry — working with global companies like <span className="text-primary font-medium">Wipro</span>, <span className="text-accent font-medium">Capita</span>, and <span className="text-success font-medium">Capgemini</span> — I've lived through the evolution of tech firsthand. From on-prem Windows servers to complex VMware infrastructures and now the era of cloud and AI, I've worked on real-world projects that shaped how businesses run behind the scenes.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        But tech is only one side of the story.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        🎼 I'm also a music composer, lyricist, and someone who believes that creativity is not separate from logic — it enhances it. I've collaborated with music director <span className="text-accent font-medium">Arya Sharma</span>, created original compositions, and blended AI tools with human expression to craft everything from custom wedding songs to logos and story-driven visuals.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        This duality — of engineering systems by day and composing melodies by night — inspired the creation of dKloud.in.
                      </p>
                      <blockquote className="text-xl italic text-primary text-center border-l-4 border-primary pl-6">
                        "A platform that isn't just built with code...<br/>
                        It's built with soul."
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: The dKloud Vision */}
                <Card className="dkloud-card lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-xl text-success flex items-center gap-2">
                      <Briefcase className="h-6 w-6" />
                      🧠 My Mission with dKloud.in
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      I didn't grow up with access to high-end tech labs or online bootcamps. I used to travel <span className="text-primary font-medium">60 km every day</span> just to touch a computer. That hunger — to learn, to create, to build something meaningful — shaped everything I do today.
                    </p>
                    <p className="text-lg text-primary font-medium">
                      dKloud.in is the product of that journey.
                    </p>
                    <div className="bg-gradient-to-r from-success/10 via-primary/10 to-accent/10 rounded-lg p-4 border border-success/20">
                      <p className="text-lg font-medium mb-3">It's a space for:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Badge className="bg-primary/10 text-primary p-2 justify-center">Dreamers with no roadmap</Badge>
                        <Badge className="bg-accent/10 text-accent p-2 justify-center">Learners who want more than theory</Badge>
                        <Badge className="bg-success/10 text-success p-2 justify-center">Creators who want to be seen</Badge>
                        <Badge className="bg-warning/10 text-warning p-2 justify-center">Tech professionals ready to grow smart, not just fast</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3: Beyond the Code */}
                <Card className="dkloud-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-accent flex items-center gap-2">
                      <Music className="h-6 w-6" />
                      🎼 Beyond the Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Music composition and lyricist work with <span className="text-accent font-medium">music director Arya Sharma</span>.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      AI-enhanced creative work including custom wedding songs, meaningful logos, and story-driven visuals.
                    </p>
                    <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-success/10 rounded-lg p-4 border border-accent/20">
                      <p className="text-lg font-medium text-center">
                        "The duality of engineering by day and composing by night — where creativity enhances logic rather than being separate from it."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Collaboration Section */}
              <Card className="dkloud-card">
                <CardHeader>
                  <CardTitle className="text-xl text-warning flex items-center gap-2">
                    <User className="h-6 w-6" />
                    👥 Backed by a Team of Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    From musicians and writers to cloud engineers and designers, I've built a team that shares this vision. Together, we collaborate to deliver real value — through tools, content, art, and education — on a platform that grows every day.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: <Music className="h-6 w-6" />, text: "Musicians & Composers" },
                      { icon: <PenTool className="h-6 w-6" />, text: "Writers & Creators" },
                      { icon: <Code className="h-6 w-6" />, text: "Cloud Engineers" },
                      { icon: <Brain className="h-6 w-6" />, text: "AI & Design Experts" }
                    ].map((member, index) => (
                      <div key={index} className="flex flex-col items-center p-4 bg-background/50 rounded-lg border border-muted/20">
                        <div className="text-primary mb-2">{member.icon}</div>
                        <span className="text-sm font-medium text-center">{member.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="btn-gradient text-lg px-8 py-3">
                    <Link to="/services">Explore Services</Link>
                  </Button>
                  <Button asChild size="lg" className="btn-glass text-lg px-8 py-3">
                    <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer">
                      Get In Touch
                    </a>
                  </Button>
                </div>
              </div>
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
            <Poetry />
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
