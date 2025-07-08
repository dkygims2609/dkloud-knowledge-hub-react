import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

export function ErrorState({ 
  error, 
  onRetry, 
  title = "Something went wrong",
  description = "We encountered an error while loading the data.",
  className 
}: ErrorStateProps) {
  return (
    <Card className={`dkloud-card text-center ${className}`}>
      <CardHeader>
        <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-destructive">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        <p className="text-sm text-destructive/80 bg-destructive/5 p-3 rounded-lg">
          {error}
        </p>
        {onRetry && (
          <Button 
            onClick={onRetry} 
            variant="outline" 
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  title = "No data found",
  description = "Try adjusting your filters or check back later.",
  action,
  className 
}: EmptyStateProps) {
  return (
    <Card className={`dkloud-card text-center ${className}`}>
      <CardContent className="pt-6 space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">📭</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {action && action}
      </CardContent>
    </Card>
  );
}