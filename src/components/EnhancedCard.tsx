import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  category?: 'movies' | 'aitools' | 'tech' | 'youtube' | 'default';
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  onClick?: () => void;
}

const categoryStyles = {
  movies: "card-movies",
  aitools: "card-aitools", 
  tech: "card-tech",
  youtube: "card-youtube",
  default: "dkloud-card"
};

export function EnhancedCard({
  title,
  description,
  children,
  category = 'default',
  badge,
  badgeVariant = 'default',
  className,
  onClick
}: EnhancedCardProps) {
  return (
    <Card 
      className={cn(
        "dkloud-card dkloud-card-interactive transition-all duration-500 cursor-pointer relative group",
        categoryStyles[category],
        className
      )}
      onClick={onClick}
    >
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant={badgeVariant} className="shadow-lg">
            {badge}
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        {children}
      </CardContent>
      
      {/* Animated hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
    </Card>
  );
}