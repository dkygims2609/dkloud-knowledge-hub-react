import { useState } from "react";
import { MessageCircle, X, Mail, Github, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "./ModernAnimations";
import { cn } from "@/lib/utils";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top when scrolled down
  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:hello@dkloud.in",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Github,
      label: "GitHub", 
      href: "https://github.com/yourusername",
      color: "bg-gray-800 hover:bg-gray-900"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      color: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  return (
    <>
      {/* Scroll to top button */}
      {showScrollTop && (
        <MagneticButton
          className="fixed bottom-6 left-6 z-40 group"
          onClick={scrollToTop}
        >
          <Button
            size="sm"
            className="w-12 h-12 rounded-full bg-secondary/90 hover:bg-secondary shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </MagneticButton>
      )}

      {/* Main FAB and contact menu */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Contact options */}
        <div className={cn(
          "absolute bottom-16 right-0 space-y-3 transition-all duration-300 ease-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          {contactItems.map((item, index) => (
            <MagneticButton
              key={item.label}
              className="block"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Button
                asChild
                size="sm"
                className={cn(
                  "w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                  "glass-card border border-border/50",
                  item.color
                )}
              >
                <a 
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              </Button>
            </MagneticButton>
          ))}
        </div>

        {/* Main FAB */}
        <MagneticButton
          onClick={() => setIsOpen(!isOpen)}
          className="group"
        >
          <Button
            size="lg"
            className={cn(
              "w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform-gpu",
              "bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80",
              "hover:scale-110 border border-border/20",
              isOpen && "rotate-45"
            )}
          >
            {isOpen ? (
              <X className="h-6 w-6 transition-transform duration-300" />
            ) : (
              <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            )}
          </Button>
        </MagneticButton>

        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 w-14 h-14 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl transition-opacity duration-300",
          isOpen ? "opacity-100 animate-pulse-glow" : "opacity-0"
        )} />
      </div>
    </>
  );
}