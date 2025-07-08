import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "card" | "text" | "circular" | "rectangular";
  lines?: number;
  height?: string;
}

export function SkeletonLoader({ 
  className, 
  variant = "rectangular", 
  lines = 1,
  height = "auto"
}: SkeletonLoaderProps) {
  if (variant === "card") {
    return (
      <div className={cn("dkloud-card animate-pulse", className)}>
        <div className="space-y-4">
          <div className="h-48 bg-muted rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded w-16" />
            <div className="h-6 bg-muted rounded w-20" />
          </div>
          <div className="h-10 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("space-y-2 animate-pulse", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className="h-4 bg-muted rounded" 
            style={{ 
              width: i === lines - 1 ? '75%' : '100%',
              height: height !== "auto" ? height : undefined
            }} 
          />
        ))}
      </div>
    );
  }

  if (variant === "circular") {
    return (
      <div className={cn("rounded-full bg-muted animate-pulse", className)} />
    );
  }

  return (
    <div 
      className={cn("bg-muted rounded animate-pulse", className)}
      style={{ height: height !== "auto" ? height : undefined }}
    />
  );
}