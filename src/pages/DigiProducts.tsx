
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Bot, 
  Shield, 
  Cpu, 
  Bell, 
  Sparkles, 
  Star, 
  ExternalLink,
  Rocket,
  FileText,
  Brain
} from "lucide-react";
import { BackgroundQuestions } from "@/components/BackgroundQuestions";

const DigiProducts = () => {
  const products = [
    {
      id: 1,
      name: "System Booster (Beta)",
      tagline: "Rocket your slow system with intelligent cleanup & optimization.",
      description: "Speeds up your PC, clears junk, optimizes startup and background processes with AI-powered automation.",
      icon: <Cpu className="h-6 w-6" />,
      category: "System Optimization",
      status: "beta",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Intelligent Cleanup", "Startup Optimization", "Background Process Management", "AI-Powered Performance Boost"]
    },
    {
      id: 2,
      name: "Digi Smart Locker",
      tagline: "Store your physical documents digitally — with smart expiry alerts & update reminders.",
      description: "Upload documents like PAN, Aadhaar, License, Insurance, etc. Get notified before they expire. Link family profiles too.",
      icon: <Shield className="h-6 w-6" />,
      category: "Document Management",
      status: "coming-soon",
      gradient: "from-green-500 to-emerald-500",
      features: ["Document Storage", "Expiry Alerts", "Family Profiles", "Smart Reminders", "Secure Encryption"]
    },
    {
      id: 3,
      name: "Custom AI Agent",
      tagline: "Your specialized AI assistant for smart, complex, business tasks.",
      description: "Custom-trained for your workflow (inventory, sales, leads, reports). Can chat, auto-reply, generate reports, and log tasks. Learns over time — task-based & multilingual ready.",
      icon: <Brain className="h-6 w-6" />,
      category: "Business Assistant",
      status: "coming-soon",
      gradient: "from-purple-500 to-pink-500",
      features: ["Custom Training", "Multilingual Support", "Auto-Reply", "Report Generation", "Task Logging", "Learning AI"]
    }
  ];

  const handleNotifyMe = (productName: string) => {
    console.log(`Notify me for ${productName}`);
    // Handle notification signup
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <BackgroundQuestions />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              🚀 Launching Soon – dKloud DigiProducts
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A suite of upcoming tools designed to enhance daily digital life and business operations — powered by automation and AI.
          </p>
        </div>

        {/* Beta Features Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-6 py-3 border border-blue-500/30">
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                👨‍💻 Beta Features for Early Adopters
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/50 border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
                   style={{background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`}} />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge 
                  className={`${
                    product.status === 'beta' 
                      ? 'bg-blue-500 hover:bg-blue-600 animate-pulse' 
                      : 'bg-orange-500 hover:bg-orange-600 animate-pulse'
                  } text-white border-none shadow-lg`}
                >
                  {product.status === 'beta' ? '🧪 Beta Access' : '🚀 Coming Soon'}
                </Badge>
              </div>

              <CardHeader className="text-center pb-4">
                {/* Icon */}
                <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${product.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {product.icon}
                </div>

                {/* Title and Tagline */}
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                
                <p className="text-sm font-medium text-primary/80 mb-2">
                  {product.tagline}
                </p>

                <CardDescription className="text-sm leading-relaxed">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Key Features</p>
                  <div className="grid grid-cols-2 gap-1">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {product.features.length > 4 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{product.features.length - 4} more features
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full bg-gradient-to-r ${product.gradient} hover:opacity-90 text-white font-medium group-hover:shadow-lg transition-all duration-300`}
                  onClick={() => handleNotifyMe(product.name)}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  {product.status === 'beta' ? 'Get Beta Access' : 'Notify Me'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center justify-center mb-4">
              <Rocket className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Ready to Transform Your Digital Life?</h2>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our early adopter community and be the first to experience these revolutionary tools. 
              Shape the future of digital productivity with dKloud.
            </p>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium px-8 py-3">
              <ExternalLink className="h-4 w-4 mr-2" />
              Join Early Access Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiProducts;
