import { LucideIcon, Brain, Clapperboard, Cpu, Zap, Rss, User, Music, PenTool, Briefcase, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabData {
  id: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
}

interface ModernTabSystemProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: TabData[];
  className?: string;
}

// Modern tab icons and configurations
export const createTabData = (type: 'portfolio' | 'main'): TabData[] => {
  if (type === 'portfolio') {
    return [
      {
        id: 'about',
        label: 'About Founder',
        icon: User,
        gradient: 'from-indigo-500 to-blue-600',
        description: 'Personal story and mission'
      },
      {
        id: 'compositions',
        label: 'Original Compositions',
        icon: Music,
        gradient: 'from-purple-500 to-pink-500',
        description: 'Musical creations and covers'
      },
      {
        id: 'poetry',
        label: 'Penned Down',
        icon: Sparkles,
        gradient: 'from-blue-500 to-indigo-500',
        description: 'Poetry and creative writings'
      }
    ];
  }
  
  return [
    {
      id: 'movies',
      label: 'Movies & TV',
      icon: Clapperboard,
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Entertainment content'
    },
    {
      id: 'ai-tools',
      label: 'AI Tools',
      icon: Brain,
      gradient: 'from-blue-500 to-indigo-600',
      description: 'AI-powered solutions'
    },
    {
      id: 'tech-corner',
      label: 'Tech Corner',
      icon: Cpu,
      gradient: 'from-purple-500 to-blue-500',
      description: 'Tech tutorials and guides'
    },
    {
      id: 'smarttech',
      label: 'SmartTech',
      icon: Zap,
      gradient: 'from-indigo-600 to-purple-600',
      description: 'Latest gadgets and reviews'
    },
    {
      id: 'tech-news',
      label: 'Tech News',
      icon: Rss,
      gradient: 'from-blue-600 to-indigo-500',
      description: 'Latest tech updates'
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: Briefcase,
      gradient: 'from-purple-600 to-indigo-600',
      description: 'Creative showcase'
    }
  ];
};

export function ModernTabSystem({ activeTab, onTabChange, tabs, className }: ModernTabSystemProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Tab Bar */}
      <div className="hidden md:block">
        <div className="relative bg-background/20 backdrop-blur-md border border-border/30 rounded-2xl p-2 mb-8">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "group relative flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 flex-1 overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary backdrop-blur-sm shadow-lg border border-primary/50 neon-pulse text-background"
                      : "hover:bg-background/40 hover:scale-105 hover:shadow-lg hover:border-primary/30 border border-transparent"
                  )}
                >
                <div className={cn(
                    "relative p-2 rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-background/20 text-background shadow-lg" 
                      : "bg-muted/50 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary group-hover:scale-110"
                  )}>
                    <Icon className="h-5 w-5 transition-transform duration-300" />
                    {isActive && (
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-r rounded-lg opacity-20 animate-pulse",
                        tab.gradient
                      )} />
                    )}
                  </div>
                  
                  <div className="flex flex-col items-start">
                  <span className={cn(
                    "font-semibold text-sm transition-colors",
                    isActive ? "text-background" : "text-muted-foreground group-hover:text-primary"
                  )}>
                      {tab.label}
                    </span>
                    <span className="text-xs text-muted-foreground opacity-70">
                      {tab.description}
                    </span>
                  </div>
                  
                {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-accent to-success rounded-full neon-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Tab Selector */}
      <div className="md:hidden mb-6">
        <div className="bg-background/20 backdrop-blur-md border border-border/30 rounded-xl p-3">
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-background/80 shadow-lg border border-border/50"
                      : "hover:bg-background/40"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-md transition-all duration-200",
                    isActive 
                      ? `bg-gradient-to-r ${tab.gradient} text-white` 
                      : "bg-muted/50 text-muted-foreground"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={cn(
                    "font-medium text-xs",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}