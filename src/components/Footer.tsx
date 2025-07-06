import { Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          {/* Main Credits */}
          <div className="space-y-2">
            <p className="text-muted-foreground">
              🧠 Built with ❤️ using{" "}
              <a 
                href="https://lovable.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                Lovable AI
              </a>
            </p>
            <p className="text-muted-foreground">
              🚀 Developed & Managed by{" "}
              <a 
                href="https://dkloud.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                dKloud Tech
              </a>
            </p>
          </div>
          
          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://wa.me/918175996960" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              WhatsApp
            </a>
            <a 
              href="mailto:dileepkryadav09@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Email
            </a>
            <a 
              href="https://instagram.com/batbotdk09" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Instagram
            </a>
            <a 
              href="https://www.linkedin.com/in/dileep-yadav-63500158" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              LinkedIn
            </a>
          </div>
          
          {/* Copyright */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 dKloud Tech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}