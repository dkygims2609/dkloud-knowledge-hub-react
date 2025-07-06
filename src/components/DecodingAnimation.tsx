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

      const interval = setInterval(() => {
        const newText = originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            // Show correct character if we've decoded up to this point
            if (index < Math.floor(iterations)) {
              return originalText[index];
            }
            
            // Show random character for positions we haven't decoded yet
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");

        setDisplayText(newText);

        // Increment iterations by whole numbers to prevent disappearing letters
        iterations += 1;

        // Stop when we've decoded all characters and always show original text
        if (iterations >= originalText.length) {
          clearInterval(interval);
          setDisplayText(originalText);
          setIsDecoding(false);
        }
      }, 80); // Slower timing for smoother animation
    };

    const timer = setTimeout(() => {
      startDecoding();
    }, delay);

    // Repeat every 8 seconds for more frequent shuffling
    const repeatTimer = setInterval(() => {
      startDecoding();
    }, 8000);

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