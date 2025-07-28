import { cn } from "@/lib/utils";

interface ModernLoaderProps {
  className?: string;
  text?: string;
  variant?: "default" | "pulse" | "wave" | "gradient";
  size?: "sm" | "md" | "lg";
}

export function ModernLoader({ 
  className, 
  text = "Loading...",
  variant = "gradient",
  size = "md"
}: ModernLoaderProps) {
  const sizeClasses = {
    sm: "h-6 max-w-32 text-xs",
    md: "h-8 max-w-48 text-sm", 
    lg: "h-12 max-w-64 text-base"
  };

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center space-x-2", className)}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
        <span className="text-muted-foreground text-sm">{text}</span>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={cn("flex items-center justify-center space-x-2", className)}>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-pulse"
              style={{
                height: `${12 + Math.sin(i) * 4}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
        <span className="text-muted-foreground text-sm">{text}</span>
      </div>
    );
  }

  // Gradient variant (inspired by your example)
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn(
        "relative rounded-lg shadow-lg overflow-hidden",
        "bg-gradient-to-r from-primary via-accent to-primary",
        "bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]",
        sizeClasses[size]
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[slide_2s_ease-in-out_infinite]" />
        <p className="relative z-10 text-primary-foreground font-medium text-center leading-none flex items-center justify-center h-full tracking-wider mix-blend-difference">
          {text}
        </p>
      </div>
    </div>
  );
}

// Enhanced Skeleton loader for compact cards
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-card/90 backdrop-blur-sm border border-border/40 shadow-sm aspect-[4/3] flex flex-col rounded-lg", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
      
      <div className="p-4 space-y-3">
        {/* Header with icon and title */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-md bg-muted animate-pulse" />
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded w-2/3 animate-pulse [animation-delay:0.1s]" />
          </div>
        </div>
        
        {/* Badge */}
        <div className="h-4 bg-muted rounded w-16 animate-pulse [animation-delay:0.2s]" />
        
        {/* Description lines */}
        <div className="space-y-1">
          <div className="h-2 bg-muted rounded animate-pulse [animation-delay:0.3s]" />
          <div className="h-2 bg-muted rounded w-4/5 animate-pulse [animation-delay:0.4s]" />
        </div>
        
        {/* Bottom elements */}
        <div className="flex gap-1 mt-auto">
          <div className="h-4 bg-muted rounded w-12 animate-pulse [animation-delay:0.5s]" />
        </div>
        <div className="h-7 bg-muted rounded animate-pulse [animation-delay:0.6s]" />
      </div>
    </div>
  );
}

// Loading dots for inline usage
export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
    </div>
  );
}