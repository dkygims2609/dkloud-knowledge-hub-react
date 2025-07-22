
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, Brain, Film, Youtube, BookOpen, Zap, Package, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Movies & TV", href: "/movies-tv", icon: Film },
    { name: "YouTube", href: "/ytchannels", icon: Youtube },
    { name: "AI Tools", href: "/aitools", icon: Brain },
    { name: "Tech Corner", href: "/techcorner", icon: BookOpen },
    { name: "SmartTech", href: "/smarttech", icon: Zap },
    { name: "Products", href: "/digi-products", icon: Package },
    { name: "Portfolio", href: "/portfolio", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-primary group-hover:text-green-400 transition-colors duration-300 group-hover:rotate-12 transform transition-transform" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-green-400/30 transition-all duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:from-green-400 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-300">
              dKloud
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-3 rounded-xl font-medium text-lg transition-all duration-300 group flex items-center space-x-2",
                    isActive(link.href)
                      ? "bg-gradient-to-r from-green-400/20 to-blue-400/20 text-green-400 shadow-lg backdrop-blur-sm border border-green-400/30"
                      : "text-muted-foreground hover:text-green-400 hover:bg-gradient-to-r hover:from-green-400/10 hover:to-blue-400/10 hover:backdrop-blur-sm hover:shadow-md hover:border hover:border-green-400/20"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-all duration-300 group-hover:scale-110",
                    isActive(link.href) ? "text-green-400" : "group-hover:text-green-400"
                  )} />
                  <span className="group-hover:drop-shadow-lg">{link.name}</span>
                  <div className={cn(
                    "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-green-400/10 hover:text-green-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group",
                      isActive(link.href)
                        ? "bg-gradient-to-r from-green-400/20 to-blue-400/20 text-green-400 shadow-lg"
                        : "text-muted-foreground hover:text-green-400 hover:bg-gradient-to-r hover:from-green-400/10 hover:to-blue-400/10"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive(link.href) ? "text-green-400" : "group-hover:text-green-400"
                    )} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
