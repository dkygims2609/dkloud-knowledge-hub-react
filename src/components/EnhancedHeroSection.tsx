import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DecodingAnimation } from "./DecodingAnimation";
import { AudioPlayer } from "./AudioPlayer";
import { ColorBandSection } from "./ColorBandSection";
import { MagneticButton, ScrollReveal, GlitchText, FloatingElement } from "./ModernAnimations";
import { cn } from "@/lib/utils";

export function EnhancedHeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Floating orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingElement
            key={i}
            delay={i * 0.5}
            className={cn(
              "absolute rounded-full blur-xl",
              i % 2 === 0 
                ? "bg-gradient-to-r from-primary/20 to-secondary/20" 
                : "bg-gradient-to-r from-accent/20 to-primary/20"
            )}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Interactive cursor glow */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-radial from-primary/10 via-secondary/5 to-transparent pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Sparkle decorations */}
        <div className="absolute -top-10 left-1/4 text-primary/60 animate-pulse-glow">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="absolute -top-5 right-1/3 text-secondary/60 animate-bounce-subtle">
          <Zap className="h-6 w-6" />
        </div>

        {/* Main Title */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mb-8">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight">
              <DecodingAnimation 
                text="Decoding Knowledge" 
                className="text-gradient-animated transform-gpu"
                delay={1000}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Subtitle with glitch effect */}
        <ScrollReveal direction="up" delay={400}>
          <div className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 text-muted-foreground">
            <GlitchText text="Library Of Unique Discoveries" className="text-2xl font-bold text-foreground" />
          </div>
        </ScrollReveal>

        {/* Audio Player with modern styling */}
        <ScrollReveal direction="scale" delay={600}>
          <div className="mb-12 max-w-lg mx-auto">
            <div className="glass-card p-6 rounded-2xl border border-primary/20 hover-glow transition-all duration-500">
              <AudioPlayer 
                audioSrc="/dKloudaudio.wav"
                title="Listen: What is dKloud?"
                description="Hear directly from the founder about dKloud's vision"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal direction="up" delay={800}>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              At dKloud, we're crafting a{" "}
              <span className="text-shimmer font-semibold text-primary">universe</span>{" "}
              where{" "}
              <span className="text-gradient-animated font-semibold">creativity meets the cloud</span>,{" "}
              <span className="text-shimmer font-semibold text-accent">AI fuels curiosity</span>, and{" "}
              <span className="text-gradient-animated font-semibold">learning becomes a shared adventure</span>.
            </p>
          </div>
        </ScrollReveal>

        {/* Color Band */}
        <ScrollReveal direction="scale" delay={1000}>
          <div className="mb-12 hover-lift">
            <ColorBandSection />
          </div>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal direction="up" delay={1200}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticButton className="group">
              <Button 
                asChild 
                size="lg" 
                className="text-lg px-10 py-6 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transform transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-primary/25"
              >
                <Link to="/aitools" className="flex items-center gap-3">
                  <span className="text-shimmer">Dive into dKloud Tech Universe</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton className="group">
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-6 rounded-full glass-strong hover-glow transition-all duration-500 hover:bg-primary/10 border-2 border-primary/30 hover:border-primary/60"
              >
                <Link to="/portfolio" className="flex items-center gap-2">
                  <span>View Portfolio</span>
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal direction="up" delay={1400}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce-subtle">
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-primary/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
    </section>
  );
}