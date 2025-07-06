import { ArrowRight, Database, Zap, Users, BookOpen, Sparkles, Music, Code, Brain } from "lucide-react";
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

      {/* Sections Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 slide-up">Explore Our Sections</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
              {[
                { name: "Movies & TV", href: "/movies-tv", emoji: "🎬📺", desc: "Films & shows" },
                { name: "YouTube", href: "/ytchannels", emoji: "📹", desc: "Top channels" },
                { name: "AI Tools", href: "/aitools", emoji: "🤖", desc: "Latest AI" },
                { name: "Tech Corner", href: "/techcorner", emoji: "📚", desc: "SOPs & Tips" },
                { name: "SmartTech", href: "/smarttech", emoji: "💡", desc: "Smart gadgets" },
                { name: "Tech News", href: "/technews", emoji: "📰", desc: "Latest updates" },
                { name: "Portfolio", href: "/portfolio", emoji: "💼", desc: "My work" },
                { name: "Services", href: "/services", emoji: "🎵", desc: "What I Offer" },
              ].map((tab, index) => (
                <Card key={tab.name} className="dkloud-card dkloud-card-interactive cursor-pointer fade-in min-w-[140px] max-w-[160px]" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link to={tab.href}>
                    <CardContent className="p-4 text-center">
                      <div className="text-lg mb-2 float">{tab.emoji}</div>
                      <h4 className="font-semibold text-sm mb-1">{tab.name}</h4>
                      <p className="text-xs text-muted-foreground">{tab.desc}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
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