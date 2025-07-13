import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Clapperboard, Youtube, Brain, BookOpen, Zap, Newspaper, Settings, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home, color: "from-blue-500 to-cyan-500" },
  { name: "Movies", href: "/movies", icon: Clapperboard, color: "from-red-500 to-pink-500" },
  { name: "YouTube", href: "/youtube", icon: Youtube, color: "from-red-600 to-red-500" },
  { name: "AI Tools", href: "/aitools", icon: Brain, color: "from-purple-500 to-indigo-500" },
  { name: "Tech Corner", href: "/techcorner", icon: BookOpen, color: "from-green-500 to-emerald-500" },
  { name: "SmartTech", href: "/smarttech", icon: Zap, color: "from-yellow-500 to-amber-500" },
  { name: "Tech News", href: "/technews", icon: Newspaper, color: "from-indigo-500 to-purple-500" },
  { name: "Services", href: "/services", icon: Settings, color: "from-pink-500 to-rose-500" },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase, color: "from-teal-500 to-green-500" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                dKloud
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2",
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
                          : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      {!isActive && (
                        <div className={cn(
                          "absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                          item.color
                        )} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur border-t border-border/50">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-3 w-full",
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {!isActive && (
                    <div className={cn(
                      "absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                      item.color
                    )} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
