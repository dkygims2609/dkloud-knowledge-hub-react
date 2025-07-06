import { Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary to-accent text-white font-bold text-xl px-3 py-1 rounded-lg">
                dK
              </div>
              <span className="font-bold text-xl">dKloud</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Decoding Knowledge - Library Of Unique Discoveries
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="/movies" className="block text-muted-foreground hover:text-foreground transition-colors">
                Movies
              </a>
              <a href="/aitools" className="block text-muted-foreground hover:text-foreground transition-colors">
                AI Tools
              </a>
              <a href="/techcorner" className="block text-muted-foreground hover:text-foreground transition-colors">
                Tech Corner
              </a>
              <a href="/portfolio" className="block text-muted-foreground hover:text-foreground transition-colors">
                Portfolio
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <div className="space-y-2 text-sm">
              <a href="/technews" className="block text-muted-foreground hover:text-foreground transition-colors">
                Tech News
              </a>
              <a href="/gadgets" className="block text-muted-foreground hover:text-foreground transition-colors">
                Smart Gadgets
              </a>
              <a href="/poetry" className="block text-muted-foreground hover:text-foreground transition-colors">
                Poetry
              </a>
              <a href="/ytchannels" className="block text-muted-foreground hover:text-foreground transition-colors">
                YouTube Picks
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="h-9 w-9"
              >
                <a 
                  href="https://github.com/dkygims2609" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="h-9 w-9"
              >
                <a 
                  href="mailto:contact@dkloud.in"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 dKloud. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>using</span>
            <a 
              href="https://lovable.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Lovable
            </a>
            <span>+ OpenAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}