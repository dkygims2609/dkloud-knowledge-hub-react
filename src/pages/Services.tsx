
import { useState } from "react";
import { Link } from "react-router-dom";
import { Monitor, BookOpen, MessageCircle, Music, Package, Zap, Mail, Phone, Users, Code, Database, Palette, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModernIconTabs } from "@/components/ui/modern-icon-tabs";

const Services = () => {
  const [activeService, setActiveService] = useState("website");

  const serviceCategories = [
    {
      id: "website",
      label: "Website Building",
      icon: Monitor,
      gradient: "from-blue-500 to-indigo-600",
      description: "Digital presence solutions"
    },
    {
      id: "courses",
      label: "Micro-Courses", 
      icon: BookOpen,
      gradient: "from-emerald-500 to-teal-600",
      description: "Curated learning paths"
    },
    {
      id: "mentorship",
      label: "Mentorship",
      icon: MessageCircle, 
      gradient: "from-purple-500 to-violet-600",
      description: "1-on-1 career guidance"
    },
    {
      id: "creative",
      label: "Creative Services",
      icon: Music,
      gradient: "from-pink-500 to-rose-600", 
      description: "AI-powered creativity"
    },
    {
      id: "knowledge",
      label: "Knowledge Store",
      icon: Package,
      gradient: "from-amber-500 to-orange-600",
      description: "Digital resources hub"
    }
  ];

  const services = {
    website: {
      icon: <Monitor className="h-8 w-8" />,
      title: "💻 Website Building & Branding",
      description: "From personal portfolios to artist websites and small business pages — we build clean, fast, and modern web experiences.",
      features: [
        "🔒 Hosted as secure, static sites — no recurring hosting fees",
        "🎨 Logo creation, theme setup, domain guidance", 
        "🚀 Ideal for freelancers, students, creators, and microbusinesses",
        "⚡ Built with speed, clean code, and smart aesthetics"
      ],
      highlight: "What if I told you... you could launch your own personal site — without ever paying for hosting? You'd think it's too good to be true. But it's not. All you need is a domain. We'll handle the rest — securely, smartly, and affordably.",
      cta: "✅ You bring the vision — we make it real."
    },
    courses: {
      icon: <BookOpen className="h-8 w-8" />,
      title: "📚 Curated Digital Micro-Courses",
      description: "Most people waste time learning what doesn't matter. We teach you what does. No fluff. No outdated tutorials. Just the exact skills companies look for.",
      features: [
        "☁️ Cloud Platforms: AWS, Azure, GCP",
        "🖥️ Windows Server & VMware Fundamentals", 
        "🔧 IT Infrastructure Basics",
        "📄 Resume Building & 🎯 Interview Prep"
      ],
      highlight: "🎯 Designed for beginners & mid-level pros | 🛠️ Built from real-world experience — not theory | 📈 Created by engineers from Wipro, Capgemini, Capita and more",
      cta: "Learn the RIGHT way with us."
    },
    mentorship: {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "🎤 1-on-1 Mentorship & Career Coaching",
      description: "Whether you're starting from a Tier-3 city or switching careers — this is for you.",
      features: [
        "💬 Personal career guidance",
        "🧠 Interview simulation & real-case Q&A",
        "🧭 Break into tech without the confusion",
        "✅ Led by working professionals"
      ],
      highlight: "✅ Practical insights from people who've done it | ✅ Especially valuable for underrepresented tech aspirants",
      cta: "Ready to grow smart, not just fast?"
    },
    creative: {
      icon: <Music className="h-8 w-8" />,
      title: "🎼 Creative Services with an AI-Powered Edge",
      description: "Where emotion meets innovation. From celebrations to storytelling — we create magic that connects.",
      features: [
        "🎵 Original Music for birthdays, weddings, or brands",
        "✍️ Lyrics & storytelling powered by your emotions + our creativity",
        "🧠 AI-assisted visuals & logo design",
        "💡 Content ideation that speaks your message"
      ],
      highlight: "🎙️ Whether it's a surprise song, a logo with meaning, or a mood you want to create — we've got you.",
      cta: "Let's create something magical together."
    },
    knowledge: {
      icon: <Package className="h-8 w-8" />,
      title: "📦 Coming Soon: Digital Knowledge Store",
      description: "A one-stop downloadable hub of practical resources.",
      features: [
        "📝 SOPs, Cheat Sheets, & PDF Guides",
        "🔍 Searchable templates for tech & tools",
        "👥 Community-contributed resources",
        "🎯 Curated for real-world application"
      ],
      highlight: "Everything you need, nothing you don't. Practical resources that actually work.",
      cta: "Stay tuned for the launch!",
      isComingSoon: true
    }
  };

  const currentService = services[activeService as keyof typeof services];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🚀 Welcome to dKloud.in
          </h1>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-2xl font-semibold text-foreground">
              Where creativity meets capability. Where ideas get built. Where you start small… but grow smart.
            </p>
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                dKloud.in is a digital-first platform with a clear purpose:
              </p>
              <p className="text-xl font-medium text-primary">
                To empower learners, creators, and innovators by simplifying the journey from vision to reality — with clarity, creativity, and confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Services Toggle Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            🛠️ Services Offered at <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">dKloud.in</span>
          </h2>
          
          <ModernIconTabs
            activeTab={activeService}
            onTabChange={setActiveService}
            tabs={serviceCategories}
            className="mb-8"
          />

          {/* Current Service Display */}
          <Card className={`dkloud-card dkloud-card-interactive h-full fade-in ${currentService.isComingSoon ? 'border-warning/40 bg-warning/5' : ''}`}>
            <CardHeader>
              <div className="flex items-start space-x-4 mb-4">
                <div className={`text-primary ${currentService.isComingSoon ? 'text-warning' : ''}`}>{currentService.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-3">{currentService.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {currentService.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                {currentService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Highlight */}
              <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
                <p className="text-sm italic text-foreground leading-relaxed">
                  {currentService.highlight}
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <p className="text-lg font-semibold text-primary mb-4">{currentService.cta}</p>
                {!currentService.isComingSoon && (
                  <Button asChild className="btn-gradient">
                    <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                )}
                {currentService.isComingSoon && (
                  <Button disabled variant="outline" className="opacity-60">
                    Coming Soon
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why dKloud.in Section */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">🌐 Why dKloud.in?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Values Column */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
                <Target className="h-6 w-6" />
                💡 Our Values
              </h3>
              <div className="space-y-4">
                {[
                  { value: "Accessibility", desc: "Built from real experience" },
                  { value: "Authenticity", desc: "Modern tools, not legacy junk" },
                  { value: "Simplicity", desc: "No-code/low-code friendly" },
                  { value: "Upliftment", desc: "Designed for dreamers & doers" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="font-medium">{item.value}</span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantage Column */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-accent flex items-center gap-2">
                <Award className="h-6 w-6" />
                🧠 Our Advantage
              </h3>
              <div className="space-y-4">
                {[
                  "We don't upsell. We don't gatekeep.",
                  "We cut through the noise, curate what works, and deliver results — faster.",
                  "From building your identity to shaping your skills —",
                  "We do it with the soul of a creator and the mindset of an engineer."
                ].map((advantage, index) => (
                  <div key={index} className="p-3 bg-background/50 rounded-lg">
                    <span className="text-sm leading-relaxed">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">✨ This is dKloud.in</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2">Where ideas ignite</h3>
                <p className="text-sm text-muted-foreground">Creative solutions meet technical excellence</p>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-success/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2">Where knowledge flows</h3>
                <p className="text-sm text-muted-foreground">Learning that actually matters and works</p>
              </div>
              <div className="bg-gradient-to-br from-success/20 to-primary/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2">Where your journey begins</h3>
                <p className="text-sm text-muted-foreground">From vision to reality, step by step</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <span>Want to launch your digital brand? <span className="text-primary font-medium">Let's talk.</span></span>
                <span>Want to learn the RIGHT way? <span className="text-accent font-medium">Start with us.</span></span>
                <span>Want to become a smarter creator, techie, or learner? <span className="text-success font-medium">You're in the right place.</span></span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="btn-gradient text-lg px-10 py-4">
                  <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer">
                    Launch Your Digital Brand
                  </a>
                </Button>
                <Button asChild size="lg" className="btn-glass text-lg px-10 py-4">
                  <Link to="/portfolio">View My Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-muted/50 to-background rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch to discuss your requirements and let's bring your vision to life with personalized, impactful solutions.
          </p>
          
          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Button asChild className="btn-gradient h-16">
              <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <MessageCircle className="h-6 w-6 mb-1" />
                <span>WhatsApp</span>
              </a>
            </Button>
            
            <Button asChild variant="outline" className="h-16">
              <a href="mailto:dileepkryadav09@gmail.com" className="flex flex-col items-center">
                <Mail className="h-6 w-6 mb-1" />
                <span>Email</span>
              </a>
            </Button>
            
            <Button asChild variant="outline" className="h-16">
              <a href="https://instagram.com/batbotdk09" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-1" />
                <span>Instagram</span>
              </a>
            </Button>
            
            <Button asChild variant="outline" className="h-16">
              <a href="https://www.linkedin.com/in/dileep-yadav-63500158" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-1" />
                <span>LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
