import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Movies & TV", href: "/movies-tv", emoji: "🎬", color: "from-purple-500 to-pink-500" },
  { name: "YouTube Picks", href: "/ytchannels", emoji: "📹", color: "from-red-500 to-orange-500" },
  { name: "AI Tools", href: "/aitools", emoji: "🤖", color: "from-blue-500 to-cyan-500" },
  { name: "Tech Corner", href: "/techcorner", emoji: "📚", color: "from-green-500 to-emerald-500" },
  { name: "SmartTech", href: "/smarttech", emoji: "💡", color: "from-yellow-500 to-amber-500" },
  { name: "Tech News", href: "/technews", emoji: "📰", color: "from-indigo-500 to-purple-500" },
  { name: "Portfolio", href: "/portfolio", emoji: "💼", color: "from-teal-500 to-green-500" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 navbar-backdrop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-accent text-white font-bold text-xl px-3 py-1 rounded-lg">
              dK
            </div>
            <span className="font-bold text-xl text-foreground">
              dKloud
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 bg-muted/30 rounded-full p-1 backdrop-blur-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden",
                  location.pathname === item.href
                    ? "bg-gradient-to-r text-white shadow-lg scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80 hover:scale-105"
                )}
                style={location.pathname === item.href && item.color ? {
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  '--tw-gradient-from': `hsl(var(--primary))`,
                  '--tw-gradient-to': `hsl(var(--accent))`,
                } as any : {}}
              >
                {item.icon ? (
                  <item.icon className="h-4 w-4" />
                ) : (
                  <span className="text-base">{item.emoji}</span>
                )}
                <span className="hidden xl:inline">{item.name}</span>
                <span className="xl:hidden text-xs font-semibold">
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
                  {item.icon ? (
                    <item.icon className="h-4 w-4" />
                  ) : (
                    <span className="text-base">{item.emoji}</span>
                  )}
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