import { useState, useEffect } from "react";

interface DecodingAnimationProps {
  text: string;
  className?: string;
  delay?: number;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*![]{}()<>?/\\|~`+=_-.:;,";

export function DecodingAnimation({ text, className = "", delay = 0 }: DecodingAnimationProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  useEffect(() => {
    const startDecoding = () => {
      setIsDecoding(true);
      setGlitchIntensity(1);
      const originalText = text;
      let iterations = 0;
      const totalIterations = originalText.length + 3;

      const interval = setInterval(() => {
        const progress = iterations / totalIterations;
        setGlitchIntensity(Math.max(0, 1 - progress));

        const newText = originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            // Add some chaos at the beginning
            if (iterations < 2) {
              return characters[Math.floor(Math.random() * characters.length)];
            }
            
            // Progressive decoding with occasional glitches
            if (index < iterations - 2) {
              // Rare random glitch on already decoded characters
              return Math.random() < 0.05 ? 
                characters[Math.floor(Math.random() * characters.length)] : 
                originalText[index];
            }
            
            // Current decoding position gets special treatment
            if (index === iterations - 2) {
              return Math.random() < 0.7 ? 
                originalText[index] : 
                characters[Math.floor(Math.random() * characters.length)];
            }
            
            // Future characters are random
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");

        setDisplayText(newText);
        iterations += 1;

        // Stop when we've decoded all characters
        if (iterations > totalIterations) {
          clearInterval(interval);
          setDisplayText(originalText);
          setIsDecoding(false);
          setGlitchIntensity(0);
        }
      }, 80); // Slightly faster for more dynamic feel
    };

    const timer = setTimeout(() => {
      startDecoding();
    }, delay);

    // Repeat every 6 seconds for regular shuffling
    const repeatTimer = setInterval(() => {
      startDecoding();
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(repeatTimer);
    };
  }, [text, delay]);

  return (
    <span 
      className={`${className} font-mono tracking-wider transition-all duration-200`}
      style={{
        textShadow: isDecoding ? 
          `0 0 ${5 + glitchIntensity * 8}px hsl(var(--primary)), 
           ${glitchIntensity * 1.5}px 0 0 hsl(224 71% 50%), 
           -${glitchIntensity * 1.5}px 0 0 hsl(262 83% 58%)` : 
          'none',
        filter: 'none',
        color: isDecoding ? (
          Math.random() < 0.3 ? 'hsl(var(--primary))' :
          Math.random() < 0.6 ? 'hsl(224 71% 50%)' :
          Math.random() < 0.8 ? 'hsl(262 83% 58%)' :
          'hsl(var(--foreground))'
        ) : undefined
      }}
    >
      {displayText}
    </span>
  );
}