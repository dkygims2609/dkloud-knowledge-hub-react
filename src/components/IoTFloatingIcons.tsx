
import React, { useEffect, useState } from 'react';
import { 
  Smartphone, Wifi, Bluetooth, Radio, Speaker, Monitor,
  Tv, Camera, Lightbulb, Thermometer, Lock, Shield,
  Zap, Battery, Cpu, HardDrive, Router, Satellite
} from 'lucide-react';

interface IoTIcon {
  id: number;
  Icon: React.ComponentType<any>;
  x: number;
  y: number;
  animationType: 'float-up' | 'pop-in';
  delay: number;
  size: number;
  opacity: number;
}

const iotIcons = [
  Smartphone, Wifi, Bluetooth, Radio, Speaker, Monitor,
  Tv, Camera, Lightbulb, Thermometer, Lock, Shield,
  Zap, Battery, Cpu, HardDrive, Router, Satellite
];

interface IoTFloatingIconsProps {
  showOnHomePage?: boolean;
}

export const IoTFloatingIcons: React.FC<IoTFloatingIconsProps> = ({ showOnHomePage = false }) => {
  const [icons, setIcons] = useState<IoTIcon[]>([]);

  useEffect(() => {
    if (!showOnHomePage) return;

    const createIcon = () => {
      const newIcon: IoTIcon = {
        id: Date.now() + Math.random(),
        Icon: iotIcons[Math.floor(Math.random() * iotIcons.length)],
        x: Math.random() * (window.innerWidth - 60),
        y: Math.random() < 0.6 ? window.innerHeight + 50 : Math.random() * window.innerHeight,
        animationType: Math.random() < 0.6 ? 'float-up' : 'pop-in',
        delay: Math.random() * 3,
        size: Math.random() * 10 + 18, // 18-28px
        opacity: Math.random() * 0.25 + 0.15, // 0.15-0.4
      };

      setIcons(prev => [...prev, newIcon]);

      // Remove icon after animation completes
      setTimeout(() => {
        setIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, newIcon.animationType === 'float-up' ? 25000 : 15000);
    };

    // Create icons even less frequently (every 5-8 seconds)
    const interval = setInterval(createIcon, Math.random() * 3000 + 5000);

    // Initial icons
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        setTimeout(createIcon, i * 1500);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [showOnHomePage]);

  if (!showOnHomePage) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon) => {
        const { Icon, id, x, y, animationType, delay, size, opacity } = icon;
        
        return (
          <Icon
            key={id}
            className={`absolute text-accent/30 transition-all duration-1000 ${
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
              filter: 'drop-shadow(0 0 6px hsla(var(--accent) / 0.2))',
            }}
          />
        );
      })}
    </div>
  );
};
