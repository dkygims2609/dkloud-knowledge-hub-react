import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  description?: string;
}

interface ModernIconTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: TabItem[];
  className?: string;
}

export function ModernIconTabs({ activeTab, onTabChange, tabs, className }: ModernIconTabsProps) {
  return (
    <div className={cn("w-full mb-8", className)}>
      {/* Desktop Tabs */}
      <div className="hidden md:flex bg-background/20 backdrop-blur-md border border-border/30 rounded-2xl p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group relative flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300",
                isActive
                  ? "bg-background/80 shadow-lg border border-border/50"
                  : "hover:bg-background/40 hover:scale-105"
              )}
            >
              <div className={cn(
                "relative p-2 rounded-lg transition-all duration-300",
                isActive 
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` 
                  : "bg-muted/50 text-muted-foreground group-hover:bg-muted"
              )}>
                <Icon className="h-4 w-4" />
                {isActive && (
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r rounded-lg opacity-30 animate-pulse",
                    tab.gradient
                  )} />
                )}
              </div>
              
              <span className={cn(
                "font-medium text-sm transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {tab.label}
              </span>
              
              {isActive && (
                <div className={cn(
                  "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r rounded-full",
                  tab.gradient
                )} />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden">
        <div className="bg-background/20 backdrop-blur-md border border-border/30 rounded-xl p-2">
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
                    <Icon className="h-3 w-3" />
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