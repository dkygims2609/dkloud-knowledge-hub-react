import { ReactNode, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ModernCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  category?: 'movies' | 'aitools' | 'tech' | 'youtube' | 'default';
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  onClick?: () => void;
  isFlippable?: boolean;
  backContent?: ReactNode;
  glowColor?: 'primary' | 'secondary' | 'accent';
  animationType?: 'tilt' | 'magnetic' | 'float' | 'scale';
}

const categoryStyles = {
  movies: "from-red-500/20 to-rose-600/20",
  aitools: "from-blue-500/20 to-purple-600/20", 
  tech: "from-green-500/20 to-emerald-600/20",
  youtube: "from-red-600/20 to-orange-500/20",
  default: "from-primary/10 to-secondary/10"
};

const glowStyles = {
  primary: "neon-glow",
  secondary: "neon-glow-secondary", 
  accent: "neon-glow-accent"
};

const animationStyles = {
  tilt: "tilt-3d",
  magnetic: "magnetic-hover",
  float: "float-gentle",
  scale: "hover:scale-105"
};

export function ModernCard({
  title,
  description,
  children,
  category = 'default',
  badge,
  badgeVariant = 'default',
  className,
  onClick,
  isFlippable = false,
  backContent,
  glowColor = 'primary',
  animationType = 'tilt'
}: ModernCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation();

  const handleClick = () => {
    if (isFlippable) {
      setIsFlipped(!isFlipped);
    }
    onClick?.();
  };

  const handleMouseEnter = () => {
    if (isFlippable && !isFlipped) {
      // Slight preview of flip on hover
    }
  };

  return (
    <div 
      ref={elementRef}
      className={cn(
        "relative perspective-1000 group",
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <Card 
        className={cn(
          "card-modern glass-card transition-all duration-500 cursor-pointer relative overflow-hidden",
          glowStyles[glowColor],
          animationStyles[animationType],
          isFlippable && "transform-style-preserve-3d",
          isFlipped && isFlippable && "rotate-y-180",
          isVisible ? "scroll-reveal visible" : "scroll-reveal"
        )}
      >
        {/* Background Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          categoryStyles[category]
        )} />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
        </div>

        {badge && (
          <div className="absolute top-4 right-4 z-10">
            <Badge 
              variant={badgeVariant} 
              className={cn(
                "shadow-lg backdrop-blur-sm transition-all duration-300",
                "group-hover:scale-110 group-hover:shadow-xl"
              )}
            >
              {badge}
            </Badge>
          </div>
        )}
        
        {/* Front Side */}
        <div className={cn(
          "relative transition-all duration-300",
          isFlippable && isFlipped && "opacity-0 rotate-y-180"
        )}>
          <CardHeader className="pb-4">
            <CardTitle className={cn(
              "text-lg font-semibold transition-all duration-300",
              "group-hover:text-primary group-hover:scale-105 text-gradient-primary"
            )}>
              {title}
            </CardTitle>
            {description && (
              <CardDescription className={cn(
                "text-sm transition-colors duration-300",
                "group-hover:text-foreground/80"
              )}>
                {description}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </div>

        {/* Back Side (for flippable cards) */}
        {isFlippable && backContent && (
          <div className={cn(
            "absolute inset-0 p-6 flex items-center justify-center",
            "transition-all duration-300 backface-hidden rotate-y-180",
            !isFlipped && "opacity-0"
          )}>
            {backContent}
          </div>
        )}
        
        {/* Animated border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-border animate-border-glow" />
        </div>
      </Card>
    </div>
  );
}