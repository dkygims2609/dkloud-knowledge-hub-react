import { Github, Mail, Heart, Shield, FileText, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* Dark theme logo */}
              <img 
                src="/lovable-uploads/4381e2bd-8639-4d6d-a9ed-f7edd39f22d9.png" 
                alt="dKloud Logo" 
                className="h-8 w-8 dark:block hidden"
              />
              {/* Light theme logo */}
              <img 
                src="/lovable-uploads/108e6b6e-0af2-40ea-830a-23c86caa44d5.png" 
                alt="dKloud Logo" 
                className="h-8 w-8 dark:hidden block"
              />
              <span className="font-bold text-lg text-foreground">dKloud Tech</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Decoding Knowledge through technology, creativity, and innovation. Building bridges between ideas and reality.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <div className="space-y-2">
              {[
                { name: "Movies & TV", href: "/movies-tv" },
                { name: "AI Tools", href: "/aitools" },
                { name: "Tech Corner", href: "/techcorner" },
                { name: "Portfolio", href: "/portfolio" }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <div className="space-y-2">
              <Link to="/privacy" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Shield className="h-3 w-3" />
                <span>Privacy Policy</span>
              </Link>
              <Link to="/terms" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <FileText className="h-3 w-3" />
                <span>Terms of Service</span>
              </Link>
              <Link to="/disclaimer" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Scale className="h-3 w-3" />
                <span>Disclaimer</span>
              </Link>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-2">
              <a 
                href="mailto:dileepkryadav09@gmail.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span>Email</span>
              </a>
              <a 
                href="https://wa.me/918175996960" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-green-500">📱</span>
                <span>WhatsApp</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/dkloud-in-87109b374/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-blue-500">💼</span>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Credits */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Built with</span>
                <a 
                  href="https://lovable.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors font-medium"
                >
                  Lovable AI
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>🚀 Developed by</span>
                <a 
                  href="https://dkloud.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors font-medium"
                >
                  dKloud Tech
                </a>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} dKloud Tech. All rights reserved.
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground/80 text-center leading-relaxed">
            This website aggregates content from various public sources for educational and informational purposes. 
            We respect intellectual property rights and encourage supporting original creators. 
            All trademarks and copyrights belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}