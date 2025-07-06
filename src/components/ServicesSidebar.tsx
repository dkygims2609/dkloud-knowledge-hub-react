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
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          variant="outline"
          className="rounded-l-xl rounded-r-none border-r-0 bg-background/80 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-500 w-12 h-20 border-primary/20 hover:border-primary/40"
          title={isOpen ? "Close Services" : "View Services"}
        >
          <div className="flex flex-col items-center gap-1">
            {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <Music className="h-3 w-3 opacity-60" />
          </div>
        </Button>
        
        {/* Subtle indicator */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary/40 to-accent/40 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full bg-background/95 backdrop-blur-md border-l border-border shadow-2xl transition-transform duration-300 z-30 w-80 overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 pt-24 space-y-6">
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
            
            <div className="bg-card/50 rounded-lg p-4 border border-border/50">
              <h4 className="font-semibold mb-2 text-primary">📞 Portfolio & Web Services</h4>
              <p className="text-sm text-muted-foreground mb-3">Custom websites, portfolios, and digital solutions</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Button asChild className="w-full btn-gradient mb-4">
              <Link to="/services">
                View All Services
              </Link>
            </Button>
          </div>

          {/* Contact Section */}
          <div className="bg-card/30 rounded-lg p-4 border border-border/30">
            <h4 className="font-semibold mb-3 text-primary">📬 Get In Touch</h4>
            <p className="text-sm text-muted-foreground mb-4">Ready to work together? Let's discuss your project!</p>
            <Button 
              asChild 
              className="w-full btn-glass"
            >
              <a href="https://docs.google.com/forms/d/1h8LA5GRuRAXq7ylecOKmH5myRHGFG90aT4FIuvV6uGM/viewform?edit_requested=true" target="_blank" rel="noopener noreferrer">
                Contact Form
              </a>
            </Button>
          </div>

          {/* Quick Contact Info */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
            <h4 className="font-semibold mb-2 text-primary">✨ Quick Connect</h4>
            <p className="text-xs text-muted-foreground">Available for freelance projects, collaborations, and consultations.</p>
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