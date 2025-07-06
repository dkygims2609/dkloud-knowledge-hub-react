import { useState, useEffect } from "react";

interface DecodingAnimationProps {
  text: string;
  className?: string;
  delay?: number;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

export function DecodingAnimation({ text, className = "", delay = 0 }: DecodingAnimationProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    const startDecoding = () => {
      setIsDecoding(true);
      const originalText = text;
      let iterations = 0;
      const maxIterations = 15;

      const interval = setInterval(() => {
        setDisplayText((prev) =>
          originalText
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) return originalText[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iterations >= originalText.length) {
          clearInterval(interval);
          setDisplayText(originalText);
          setIsDecoding(false);
        }

        iterations += 1 / 3;
      }, 50);
    };

    const timer = setTimeout(() => {
      startDecoding();
    }, delay);

    // Repeat every 10 seconds
    const repeatTimer = setInterval(() => {
      startDecoding();
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(repeatTimer);
    };
  }, [text, delay]);

  return (
    <span className={`${className} ${isDecoding ? 'animate-pulse' : ''} font-mono tracking-wider`}>
      {displayText}
    </span>
  );
}