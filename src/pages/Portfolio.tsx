import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, User, Music, PenTool } from "lucide-react";

const Portfolio = () => {
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

        {/* Portfolio Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="about" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>About Founder</span>
            </TabsTrigger>
            <TabsTrigger value="compositions" className="flex items-center space-x-2">
              <Music className="h-4 w-4" />
              <span>Original Compositions</span>
            </TabsTrigger>
            <TabsTrigger value="poetry" className="flex items-center space-x-2">
              <PenTool className="h-4 w-4" />
              <span>Penned Down</span>
            </TabsTrigger>
          </TabsList>

          {/* About Founder Tab */}
          <TabsContent value="about">
            <div className="space-y-8">
              {/* Founder Profile */}
              <Card className="dkloud-card">
                <CardContent className="p-12 text-center">
                  <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center text-white text-5xl font-bold glow float">
                    DK
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Dileep Yadav</h2>
                  <p className="text-lg text-accent font-medium mb-6">Founder & Creative Director</p>
                  
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-muted/20 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Passionate Creative Techy</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        A passionate, self-taught professional combining technology, creativity, and community upliftment. I believe in making knowledge accessible and building bridges between tech and people—one tool, one story at a time.
                      </p>
                    </div>
                    
                    <blockquote className="text-lg italic text-muted-foreground mb-8 border-l-4 border-primary pl-6">
                      "My aim is to build bridges between tech and people — one tab, one tool, one song at a time."
                    </blockquote>
                    
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      Welcome to dKloud, a space where creativity meets technology. I am the founder, a passionate music composer already working with Established Music Director Arya Sharma and released multiple original compositions with famous singers in Hindi and other regional languages, lyricist, and AI-driven design expert. My journey has been a fusion of traditional artistry as guitarist, pianist, musician and writer with cutting-edge innovation, allowing me to offer a unique range of services that blend the human touch with AI capabilities.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      With years of experience in crafting original songs, compositions, and poetry, I've ventured into the world of digital artistry, where I create personalized, AI-generated logos, design concepts, and custom songs for any occasion. My expertise lies in fusing creativity with technology to deliver something extraordinary, whether it's a heartfelt birthday song, a memorable wedding anthem, or a brand logo that speaks to your audience.
                    </p>
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
          </TabsContent>

          {/* Original Compositions Tab */}
          <TabsContent value="compositions">
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
          </TabsContent>

          {/* Poetry Tab */}
          <TabsContent value="poetry">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ✍️ Penned Down
                </h2>
                <p className="text-lg text-muted-foreground">Collection of original poetry and shayari</p>
              </div>
              
              <div className="text-center">
                <Card className="dkloud-card max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4">Poetry Collection Coming Soon</h3>
                    <p className="text-muted-foreground mb-6">
                      I'm currently working on curating and organizing my collection of original poetry and shayari. 
                      This section will feature heartfelt verses, romantic shayari, and philosophical musings.
                    </p>
                    <Button asChild className="btn-gradient">
                      <Link to="/poetry">View Available Poetry</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;