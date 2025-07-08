import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Clapperboard, Youtube, Brain, BookOpen, Zap, Newspaper, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Movies & TV", href: "/movies-tv", icon: Clapperboard, color: "from-purple-500 to-pink-500" },
  { name: "YouTube Picks", href: "/ytchannels", icon: Youtube, color: "from-red-500 to-orange-500" },
  { name: "AI Tools", href: "/aitools", icon: Brain, color: "from-blue-500 to-cyan-500" },
  { name: "Tech Corner", href: "/techcorner", icon: BookOpen, color: "from-green-500 to-emerald-500" },
  { name: "SmartTech", href: "/smarttech", icon: Zap, color: "from-yellow-500 to-amber-500" },
  { name: "Tech News", href: "/technews", icon: Newspaper, color: "from-indigo-500 to-purple-500" },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase, color: "from-teal-500 to-green-500" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 navbar-backdrop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/ee1833ab-bad9-4cb7-9fba-b36f2c77858b.png" 
                alt="dKloud Logo" 
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-xl opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                dKloud
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                .in
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 bg-background/40 backdrop-blur-md border border-border/30 rounded-2xl p-1 shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 overflow-hidden",
                  location.pathname === item.href
                    ? "bg-primary/90 text-primary-foreground shadow-md scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60 hover:scale-105"
                )}
              >
                 <item.icon className="h-3 w-3" />
                <span className="hidden xl:inline text-xs">{item.name}</span>
                <span className="xl:hidden text-[10px] font-semibold">
                  {item.name.split(' ')[0]}
                </span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden h-9 w-9 p-0"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                   <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}