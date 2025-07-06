import { useState } from "react";
import { Link } from "react-router-dom";
import { Music, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ServicesSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          variant="outline"
          className="rounded-l-lg rounded-r-none border-r-0 bg-background/90 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-8 h-16"
        >
          {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full bg-background/95 backdrop-blur-md border-l border-border shadow-2xl transition-transform duration-300 z-30 w-64",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 pt-24">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Music className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Services</h3>
            <p className="text-sm text-muted-foreground">What I Offer</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-card/50 rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold mb-2 text-primary">🎵 Music Composition</h4>
              <p className="text-sm text-muted-foreground mb-3">Original compositions for films, ads, and personal projects</p>
            </div>
            
            <div className="bg-card/50 rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold mb-2 text-primary">🤖 AI Design</h4>
              <p className="text-sm text-muted-foreground mb-3">AI-powered design solutions and automation</p>
            </div>
            
            <div className="bg-card/50 rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold mb-2 text-primary">💻 Web Development</h4>
              <p className="text-sm text-muted-foreground mb-3">Modern web applications and platforms</p>
            </div>
            
            <div className="bg-card/50 rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold mb-2 text-primary">✍️ Content Creation</h4>
              <p className="text-sm text-muted-foreground mb-3">Poetry, writing, and creative content</p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button asChild className="w-full btn-gradient">
              <Link to="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}