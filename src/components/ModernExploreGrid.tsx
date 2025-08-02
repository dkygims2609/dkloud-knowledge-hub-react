import { Link } from "react-router-dom";
import { Clapperboard, Youtube, Brain, BookOpen, Zap, Package, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { ModernCard } from "./ModernCard";
import { ScrollReveal, MagneticButton } from "./ModernAnimations";
import { cn } from "@/lib/utils";

const exploreItems = [
  { 
    name: "Movies & TV", 
    href: "/movies-tv", 
    Icon: Clapperboard, 
    desc: "Curated films & series collection", 
    color: "from-violet-500 to-purple-600",
    category: "movies" as const,
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20"
  },
  { 
    name: "AI Tools", 
    href: "/aitools", 
    Icon: Brain, 
    desc: "Latest AI innovations & tools", 
    color: "from-cyan-500 to-blue-600",
    category: "aitools" as const,
    gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20"
  },
  { 
    name: "YouTube Picks", 
    href: "/ytchannels", 
    Icon: Youtube, 
    desc: "Top channels worth following", 
    color: "from-red-500 to-rose-600",
    category: "youtube" as const,
    gradient: "from-red-500/20 via-rose-500/20 to-pink-500/20"
  },
  { 
    name: "Tech Corner", 
    href: "/techcorner", 
    Icon: BookOpen, 
    desc: "SOPs, tips & best practices", 
    color: "from-emerald-500 to-green-600",
    category: "tech" as const,
    gradient: "from-emerald-500/20 via-green-500/20 to-teal-500/20"
  },
  { 
    name: "SmartTech", 
    href: "/smarttech", 
    Icon: Zap, 
    desc: "Smart gadgets & IoT devices", 
    color: "from-amber-500 to-orange-600",
    category: "tech" as const,
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20"
  },
  { 
    name: "Digi Products", 
    href: "/digi-products", 
    Icon: Package, 
    desc: "My digital products & services", 
    color: "from-indigo-500 to-purple-600",
    category: "default" as const,
    gradient: "from-indigo-500/20 via-purple-500/20 to-violet-500/20"
  },
  { 
    name: "Portfolio", 
    href: "/portfolio", 
    Icon: Briefcase, 
    desc: "My work & achievements", 
    color: "from-slate-500 to-gray-600",
    category: "default" as const,
    gradient: "from-slate-500/20 via-gray-500/20 to-zinc-500/20"
  },
];

export function ModernExploreGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gradient-animated">
              Explore Our Universe
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover a curated collection of entertainment, education, and cutting-edge technology.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Scrollable Layout */}
        <div className="relative mb-12">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2">
            {exploreItems.map((item, index) => (
              <ScrollReveal 
                key={item.name} 
                direction="up"
                delay={index * 50}
              >
                <div className="flex-shrink-0 w-64 sm:w-72">
                  <ModernCard
                    title={item.name}
                    description={item.desc}
                    category={item.category}
                    href={item.href}
                    gradient={item.gradient}
                    icon={<item.Icon className="h-5 w-5 text-primary" />}
                    className="h-36 hover-lift compact-card"
                    onClick={() => {
                      toast.success(`${item.name} activated`, { 
                        description: `Loading ${item.desc.toLowerCase()}...`,
                        duration: 2000 
                      });
                    }}
                    flipContent={
                      <div className="text-center space-y-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                          <item.Icon className="h-8 w-8 text-primary mx-auto animate-pulse-glow" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Double-click to flip back
                        </p>
                        <MagneticButton
                          className="w-full py-1.5 px-3 bg-primary/10 hover:bg-primary/20 rounded-md transition-colors text-sm"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            window.open(item.href, '_blank');
                          }}
                        >
                          Quick Access
                        </MagneticButton>
                      </div>
                    }
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Scroll indicators */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-background via-background/90 to-transparent w-8 h-full pointer-events-none" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-background via-background/90 to-transparent w-8 h-full pointer-events-none" />
        </div>

        {/* Featured Stats */}
        <ScrollReveal direction="up" delay={800}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: "Curated Content", value: "1000+", icon: "📚" },
              { label: "AI Tools", value: "200+", icon: "🤖" },
              { label: "Tech Resources", value: "500+", icon: "⚡" },
              { label: "Active Updates", value: "Daily", icon: "🔄" }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={cn(
                  "text-center p-6 rounded-2xl glass-card hover-glow transition-all duration-500",
                  "transform hover:scale-105"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-2 animate-bounce-subtle" style={{ animationDelay: `${index * 200}ms` }}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal direction="up" delay={1000}>
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-8">
              Ready to dive deeper into the dKloud universe?
            </p>
            <MagneticButton>
              <Link
                to="/aitools"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              >
                Start Exploring
                <Zap className="ml-2 h-5 w-5" />
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}