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
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-8 glow">
              dKloud
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-6 max-w-4xl mx-auto font-medium slide-up" style={{animationDelay: "0.2s"}}>
              Decoding Knowledge - Library Of Unique Discoveries
            </p>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed bounce-in" style={{animationDelay: "0.4s"}}>
              Your ultimate educational & creative tech hub. Discover curated movies, AI tools, tech resources, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center scale-in" style={{animationDelay: "0.6s"}}>
              <Button asChild size="lg" className="btn-gradient text-lg px-10 py-4">
                <Link to="/movies">
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

          {/* Tabs Preview */}
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 slide-up">Explore Our Sections</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                <Card key={tab.name} className="dkloud-card dkloud-card-interactive cursor-pointer fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link to={tab.href}>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3 float">{tab.emoji}</div>
                      <h4 className="font-semibold text-base mb-2">{tab.name}</h4>
                      <p className="text-sm text-muted-foreground">{tab.desc}</p>
                    </CardContent>
                  </Link>
                </Card>
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
              <h4 className="text-2xl font-semibold mb-6">Tech Enthusiast & Knowledge Curator</h4>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Passionate about Windows Server, VMware, AWS, and creating educational content. 
                Building dKloud to scale knowledge sharing and connect with fellow tech enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="btn-gradient text-lg px-8 py-3">
                  <Link to="/portfolio">View Full Portfolio</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="btn-glass text-lg px-8 py-3">
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
