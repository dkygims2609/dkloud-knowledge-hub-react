import { ArrowRight, Database, Zap, Users, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              dKloud
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Decoding Knowledge - Library Of Unique Discoveries
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your ultimate educational & creative tech hub. Discover curated movies, AI tools, tech resources, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-gradient">
                <Link to="/movies">
                  Explore Content
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="dkloud-card bounce-in text-center">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Google Sheets</CardTitle>
                <CardDescription>Data stored and managed in organized spreadsheets</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dkloud-card bounce-in text-center" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Live APIs</CardTitle>
                <CardDescription>Real-time data fetching via Google Apps Script</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="dkloud-card bounce-in text-center" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <Sparkles className="h-12 w-12 text-success mx-auto mb-4" />
                <CardTitle>Dynamic Site</CardTitle>
                <CardDescription>Always up-to-date content without manual updates</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Tabs Preview */}
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Explore Our Sections</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "Movies", href: "/movies", emoji: "🎬", desc: "Curated films" },
                { name: "TV Series", href: "/tvseries", emoji: "📺", desc: "Best shows" },
                { name: "YouTube", href: "/ytchannels", emoji: "📹", desc: "Top channels" },
                { name: "AI Tools", href: "/aitools", emoji: "🤖", desc: "Latest AI" },
                { name: "Tech Corner", href: "/techcorner", emoji: "📚", desc: "Documentation" },
                { name: "Tech News", href: "/technews", emoji: "📰", desc: "Latest updates" },
                { name: "Gadgets", href: "/gadgets", emoji: "💡", desc: "Smart devices" },
                { name: "Poetry", href: "/poetry", emoji: "✍️", desc: "Creative writing" },
                { name: "Portfolio", href: "/portfolio", emoji: "💼", desc: "My work" },
              ].map((tab, index) => (
                <Card key={tab.name} className="dkloud-card hover:scale-105 transition-transform cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link to={tab.href}>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{tab.emoji}</div>
                      <h4 className="font-semibold text-sm">{tab.name}</h4>
                      <p className="text-xs text-muted-foreground">{tab.desc}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="slide-up">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Meet the Founder</h3>
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-4xl font-bold">
                DK
              </div>
              <h4 className="text-xl font-semibold mb-4">Tech Enthusiast & Knowledge Curator</h4>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Passionate about Windows Server, VMware, AWS, and creating educational content. 
                Building dKloud to scale knowledge sharing and connect with fellow tech enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/portfolio">View Full Portfolio</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/dkygims2609" target="_blank" rel="noopener noreferrer">
                    GitHub Profile
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
