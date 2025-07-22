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

// Skeleton loader for cards
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("dkloud-card animate-pulse", className)}>
      <div className="space-y-4">
        <div className="h-48 bg-muted rounded-lg animate-[shimmer_2s_ease-in-out_infinite]" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.2s]" />
          <div className="h-4 bg-muted rounded w-3/4 animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.4s]" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded w-16 animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.6s]" />
          <div className="h-6 bg-muted rounded w-20 animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.8s]" />
        </div>
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