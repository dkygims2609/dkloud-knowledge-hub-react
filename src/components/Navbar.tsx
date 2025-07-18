
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Clapperboard, Youtube, Brain, BookOpen, Zap, Briefcase, Settings, ChevronDown, FileText, GraduationCap, Wrench, Star, TrendingUp, Play, Smartphone, Code2, User, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { 
    name: "Movies & TV", 
    href: "/movies-tv", 
    icon: Clapperboard, 
    color: "from-purple-500 to-pink-500",
    dropdown: [
      { name: "Latest Movies", href: "/movies-tv?filter=movies", icon: Star, desc: "New movie releases" },
      { name: "TV Series", href: "/movies-tv?filter=series", icon: Play, desc: "Popular TV shows" },
      { name: "Reviews", href: "/movies-tv?filter=reviews", icon: TrendingUp, desc: "Movie & TV reviews" }
    ]
  },
  { 
    name: "YouTube Picks", 
    href: "/ytchannels", 
    icon: Youtube, 
    color: "from-red-500 to-orange-500",
    dropdown: [
      { name: "Tech Channels", href: "/ytchannels?category=tech", icon: Code2, desc: "Technology focused channels" },
      { name: "Entertainment", href: "/ytchannels?category=entertainment", icon: Play, desc: "Fun and entertaining content" },
      { name: "Educational", href: "/ytchannels?category=education", icon: GraduationCap, desc: "Learning and tutorials" }
    ]
  },
  { 
    name: "AI Tools", 
    href: "/aitools", 
    icon: Brain, 
    color: "from-blue-500 to-cyan-500",
    dropdown: [
      { name: "Latest Tools", href: "/aitools?filter=latest", icon: Star, desc: "Newest AI tools" },
      { name: "Reviews", href: "/aitools?filter=reviews", icon: TrendingUp, desc: "AI tool reviews" },
      { name: "Comparisons", href: "/aitools?filter=comparisons", icon: Award, desc: "Tool comparisons" }
    ]
  },
  { 
    name: "Tech Corner", 
    href: "/techcorner", 
    icon: BookOpen, 
    color: "from-green-500 to-emerald-500",
    dropdown: [
      { name: "Free Resources", href: "/techcorner?tab=free", icon: FileText, desc: "SOPs, Cheat Sheets, Guides" },
      { name: "dKloud Courses", href: "/techcorner?tab=courses", icon: GraduationCap, desc: "Micro Digital Courses" }
    ]
  },
  { 
    name: "SmartTech", 
    href: "/smarttech", 
    icon: Zap, 
    color: "from-yellow-500 to-amber-500",
    dropdown: [
      { name: "Latest Gadgets", href: "/smarttech?filter=latest", icon: Smartphone, desc: "Newest smart devices" },
      { name: "Reviews", href: "/smarttech?filter=reviews", icon: TrendingUp, desc: "Gadget reviews" },
      { name: "Buying Guides", href: "/smarttech?filter=guides", icon: Award, desc: "Purchase recommendations" }
    ]
  },
  { 
    name: "Digi Products", 
    href: "/digital-products", 
    icon: Wrench, 
    color: "from-orange-500 to-red-500",
    dropdown: [
      { name: "Smart Tools", href: "/digital-products?category=tools", icon: Wrench, desc: "Productivity tools" },
      { name: "Software", href: "/digital-products?category=software", icon: Code2, desc: "Software solutions" },
      { name: "Utilities", href: "/digital-products?category=utilities", icon: Settings, desc: "Home & business utilities" }
    ]
  },
  { name: "Services", href: "/services", icon: Settings, color: "from-pink-500 to-rose-500" },
  { 
    name: "Portfolio", 
    href: "/portfolio", 
    icon: Briefcase, 
    color: "from-teal-500 to-green-500",
    dropdown: [
      { name: "Projects", href: "/portfolio?section=projects", icon: Code2, desc: "My development projects" },
      { name: "Skills", href: "/portfolio?section=skills", icon: Award, desc: "Technical skills" },
      { name: "Experience", href: "/portfolio?section=experience", icon: User, desc: "Professional experience" }
    ]
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 bg-background/40 backdrop-blur-md border border-border/30 rounded-2xl p-1 shadow-lg">
            {navigation.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "relative flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 overflow-hidden",
                        location.pathname.startsWith(item.href)
                          ? "bg-primary/90 text-primary-foreground shadow-md scale-105"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/60 hover:scale-105"
                      )}
                    >
                      <item.icon className="h-3 w-3" />
                      <span className="hidden xl:inline text-xs">{item.name}</span>
                      <span className="xl:hidden text-[10px] font-semibold">
                        {item.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-md border border-border/50 shadow-xl z-50" align="start">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          to={subItem.href}
                          className="flex items-center space-x-3 px-3 py-2 hover:bg-primary/10 transition-colors cursor-pointer"
                        >
                          <subItem.icon className="h-4 w-4 text-primary" />
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{subItem.name}</span>
                            <span className="text-xs text-muted-foreground">{subItem.desc}</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
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
              )
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
                item.dropdown ? (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground">
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            location.pathname === subItem.href
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
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
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
