
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Clapperboard, Youtube, Brain, BookOpen, Zap, Package, Briefcase, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { 
    name: "Home", 
    href: "/", 
    icon: Home 
  },
  { 
    name: "Movies & TV", 
    href: "/movies-tv", 
    icon: Clapperboard, 
    color: "from-purple-500 to-pink-500",
    dropdownItems: [
      { name: "Movies", href: "/movies-tv?filter=movies" },
      { name: "TV Series", href: "/movies-tv?filter=tv" },
      { name: "Reviews", href: "/movies-tv?filter=reviews" },
      { name: "Trending", href: "/movies-tv?filter=trending" }
    ]
  },
  { 
    name: "YouTube", 
    href: "/ytchannels", 
    icon: Youtube, 
    color: "from-red-500 to-orange-500",
    dropdownItems: [
      { name: "Tech Channels", href: "/ytchannels?category=tech" },
      { name: "Entertainment", href: "/ytchannels?category=entertainment" },
      { name: "Educational", href: "/ytchannels?category=educational" },
      { name: "Gaming", href: "/ytchannels?category=gaming" }
    ]
  },
  { 
    name: "AI Tools", 
    href: "/aitools", 
    icon: Brain, 
    color: "from-blue-500 to-cyan-500",
    dropdownItems: [
      { name: "Latest Tools", href: "/aitools?filter=latest" },
      { name: "Reviews", href: "/aitools?filter=reviews" },
      { name: "Comparisons", href: "/aitools?filter=comparisons" },
      { name: "Free Tools", href: "/aitools?filter=free" }
    ]
  },
  { 
    name: "Tech Corner", 
    href: "/techcorner", 
    icon: BookOpen, 
    color: "from-green-500 to-emerald-500",
    dropdownItems: [
      { name: "Free Resources", href: "/techcorner?category=resources" },
      { name: "dKloud Courses", href: "/techcorner?category=courses" },
      { name: "SOPs & Guides", href: "/techcorner?category=guides" },
      { name: "Tutorials", href: "/techcorner?category=tutorials" }
    ]
  },
  { 
    name: "SmartTech", 
    href: "/smarttech", 
    icon: Zap, 
    color: "from-yellow-500 to-amber-500",
    dropdownItems: [
      { name: "Gadgets", href: "/smarttech?category=gadgets" },
      { name: "Reviews", href: "/smarttech?category=reviews" },
      { name: "Buying Guides", href: "/smarttech?category=guides" },
      { name: "Smart Home", href: "/smarttech?category=smarthome" }
    ]
  },
  { 
    name: "Products", 
    href: "/digi-products", 
    icon: Package, 
    color: "from-orange-500 to-red-500",
    dropdownItems: [
      { name: "Smart Tools", href: "/digi-products?category=tools" },
      { name: "AI Agents", href: "/digi-products?category=ai" },
      { name: "Digital Solutions", href: "/digi-products?category=solutions" },
      { name: "Coming Soon", href: "/digi-products?category=coming-soon" }
    ]
  },
  { 
    name: "Services", 
    href: "/services", 
    icon: Settings, 
    color: "from-pink-500 to-rose-500",
    dropdownItems: [
      { name: "Website Building", href: "/services?service=websites" },
      { name: "Courses", href: "/services?service=courses" },
      { name: "Consulting", href: "/services?service=consulting" },
      { name: "Support", href: "/services?service=support" }
    ]
  },
  { 
    name: "Portfolio", 
    href: "/portfolio", 
    icon: Briefcase, 
    color: "from-teal-500 to-green-500"
  },
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
              {/* Dark theme logo */}
              <img 
                src="/lovable-uploads/4381e2bd-8639-4d6d-a9ed-f7edd39f22d9.png" 
                alt="dKloud Logo" 
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 dark:block hidden"
              />
              {/* Light theme logo */}
              <img 
                src="/lovable-uploads/108e6b6e-0af2-40ea-830a-23c86caa44d5.png" 
                alt="dKloud Logo" 
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 dark:hidden block"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-xl opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-700 animate-pulse" style={{animationDuration: "4s"}}></div>
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

          {/* Desktop Navigation - Fixed to stay in one line */}
          <div className="hidden lg:flex items-center space-x-1 bg-background/40 backdrop-blur-md border border-border/30 rounded-2xl p-1 shadow-lg overflow-x-auto scrollbar-hide">
            <div className="flex items-center space-x-1 min-w-max">
              {navigation.map((item) => (
                <div key={item.name} className="relative flex-shrink-0">
                  {item.dropdownItems ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            "flex items-center space-x-1 px-2 py-2 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap",
                            location.pathname === item.href
                              ? "bg-primary/90 text-primary-foreground shadow-md scale-105"
                              : "text-muted-foreground hover:text-foreground hover:bg-background/60 hover:scale-105"
                          )}
                        >
                          <item.icon className="h-3 w-3 flex-shrink-0" />
                          <span className="text-xs truncate max-w-16">{item.name}</span>
                          <ChevronDown className="h-3 w-3 flex-shrink-0" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="dropdown-card min-w-[200px] z-50">
                        <DropdownMenuLabel className="text-sm font-semibold text-sharp-bright">
                          {item.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {item.dropdownItems.map((dropItem) => (
                          <DropdownMenuItem key={dropItem.name} asChild>
                            <Link 
                              to={dropItem.href}
                              className="flex items-center px-3 py-2 text-sm hover:bg-muted/50 transition-colors duration-200"
                            >
                              {dropItem.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "relative flex items-center space-x-1 px-2 py-2 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap",
                        location.pathname === item.href
                          ? "bg-primary/90 text-primary-foreground shadow-md scale-105"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/60 hover:scale-105"
                      )}
                    >
                      <item.icon className="h-3 w-3 flex-shrink-0" />
                      <span className="text-xs truncate max-w-16">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
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
