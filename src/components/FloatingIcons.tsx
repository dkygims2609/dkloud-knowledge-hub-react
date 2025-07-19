
import React, { useEffect, useState } from 'react';
import { 
  Cloud, Code, Smartphone, Lightbulb, Cpu, Globe, 
  Database, Zap, Wifi, Monitor, Server, Bluetooth,
  Music, Film, BookOpen, Brain, Gamepad2, Camera,
  Headphones, Mic, Video, Radio, Speaker, Disc
} from 'lucide-react';

interface FloatingIcon {
  id: number;
  Icon: React.ComponentType<any>;
  x: number;
  y: number;
  animationType: 'float-up' | 'pop-in';
  delay: number;
  size: number;
  opacity: number;
}

const dkloudIcons = [
  Cloud, Code, Smartphone, Lightbulb, Cpu, Globe, 
  Database, Zap, Wifi, Monitor, Server, Bluetooth,
  Music, Film, BookOpen, Brain, Gamepad2, Camera,
  Headphones, Mic, Video, Radio, Speaker, Disc
];

export const FloatingIcons: React.FC = () => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const createIcon = () => {
      const newIcon: FloatingIcon = {
        id: Date.now() + Math.random(),
        Icon: dkloudIcons[Math.floor(Math.random() * dkloudIcons.length)],
        x: Math.random() * (window.innerWidth - 60),
        y: Math.random() < 0.7 ? window.innerHeight + 50 : Math.random() * window.innerHeight,
        animationType: Math.random() < 0.7 ? 'float-up' : 'pop-in',
        delay: Math.random() * 2,
        size: Math.random() * 12 + 16, // 16-28px
        opacity: Math.random() * 0.3 + 0.2, // 0.2-0.5
      };

      setIcons(prev => [...prev, newIcon]);

      // Remove icon after animation completes
      setTimeout(() => {
        setIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, newIcon.animationType === 'float-up' ? 22000 : 12000);
    };

    // Create icons less frequently (every 4-6 seconds)
    const interval = setInterval(createIcon, Math.random() * 2000 + 4000);

    // Initial icons
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(createIcon, i * 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon) => {
        const { Icon, id, x, y, animationType, delay, size, opacity } = icon;
        
        return (
          <Icon
            key={id}
            className={`absolute text-primary/40 transition-all duration-1000 ${
              animationType === 'float-up' ? 'animate-float-up' : 'animate-pop-in'
            }`}
            style={{
              left: `${x}px`,
              top: animationType === 'pop-in' ? `${y}px` : 'auto',
              bottom: animationType === 'float-up' ? '-50px' : 'auto',
              animationDelay: `${delay}s`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              filter: 'drop-shadow(0 0 8px hsla(var(--primary) / 0.3))',
            }}
          />
        );
      })}
    </div>
  );
};
