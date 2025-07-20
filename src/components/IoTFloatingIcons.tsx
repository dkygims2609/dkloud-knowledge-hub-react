
// IoT Floating Icons Component
import { useEffect, useState } from "react";
import { 
  Wifi, 
  Smartphone, 
  Watch, 
  Car, 
  Home, 
  Lightbulb, 
  Thermometer, 
  Camera, 
  Speaker, 
  Router,
  Tv,
  Gamepad2,
  Headphones,
  Tablet,
  Laptop,
  Brain,
  Server,
  Cpu,
  Cloud,
  Shield,
  Bluetooth,
  Radio,
  Zap,
  Battery,
  WifiOff,
  Settings,
  Globe,
  Lock,
  Unlock
} from "lucide-react";

const iotIcons = [
  { Icon: Wifi, color: "text-primary" },
  { Icon: Smartphone, color: "text-secondary" },
  { Icon: Watch, color: "text-accent" },
  { Icon: Car, color: "text-primary" },
  { Icon: Home, color: "text-secondary" },
  { Icon: Lightbulb, color: "text-accent" },
  { Icon: Thermometer, color: "text-primary" },
  { Icon: Camera, color: "text-secondary" },
  { Icon: Speaker, color: "text-accent" },
  { Icon: Router, color: "text-primary" },
  { Icon: Tv, color: "text-secondary" },
  { Icon: Gamepad2, color: "text-accent" },
  { Icon: Headphones, color: "text-primary" },
  { Icon: Tablet, color: "text-secondary" },
  { Icon: Laptop, color: "text-accent" },
  { Icon: Brain, color: "text-primary" },
  { Icon: Server, color: "text-secondary" },
  { Icon: Cpu, color: "text-accent" },
  { Icon: Cloud, color: "text-primary" },
  { Icon: Shield, color: "text-secondary" },
  { Icon: Bluetooth, color: "text-accent" },
  { Icon: Radio, color: "text-primary" },
  { Icon: Zap, color: "text-secondary" },
  { Icon: Battery, color: "text-accent" },
  { Icon: Wifi, color: "text-primary" },
  { Icon: WifiOff, color: "text-secondary" },
  { Icon: Settings, color: "text-accent" },
  { Icon: Globe, color: "text-primary" },
  { Icon: Lock, color: "text-secondary" },
  { Icon: Unlock, color: "text-accent" }
];

interface FloatingIcon {
  id: number;
  Icon: any;
  color: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  scale: number;
  animationType: 'float-up' | 'fade-in-out' | 'spiral' | 'random-direction' | 'power-pulse';
  direction?: number;
}

export function IoTFloatingIcons({ showOnHomePage = false }: { showOnHomePage?: boolean }) {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    if (!showOnHomePage) return;

    const animationTypes: FloatingIcon['animationType'][] = [
      'float-up', 'fade-in-out', 'spiral', 'random-direction', 'power-pulse'
    ];

    const createIcon = () => {
      const randomIcon = iotIcons[Math.floor(Math.random() * iotIcons.length)];
      const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      
      const newIcon: FloatingIcon = {
        id: Date.now() + Math.random(),
        Icon: randomIcon.Icon,
        color: randomIcon.color,
        x: Math.random() * (window.innerWidth - 60),
        y: animationType === 'fade-in-out' ? Math.random() * (window.innerHeight - 100) : window.innerHeight + 50,
        duration: 8000 + Math.random() * 7000, // Increased from 3-7s to 8-15s
        delay: Math.random() * 2000, // Increased delay variation
        scale: 0.4 + Math.random() * 0.3, // Reduced from 0.6-1.0 to 0.4-0.7 (smaller icons)
        animationType,
        direction: Math.random() * 360 // for random direction animation
      };

      setFloatingIcons(prev => [...prev, newIcon]);

      // Remove icon after animation completes
      setTimeout(() => {
        setFloatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, newIcon.duration + newIcon.delay + 2000);
    };

    // Reduced frequency from 1-2 seconds to 4-6 seconds
    const initialInterval = setInterval(createIcon, 4000 + Math.random() * 2000);

    // Cleanup
    return () => clearInterval(initialInterval);
  }, [showOnHomePage]);

  const getAnimationStyle = (icon: FloatingIcon) => {
    const baseStyle = {
      left: `${icon.x}px`,
      animationDelay: `${icon.delay}ms`,
      transform: `scale(${icon.scale})`,
    };

    switch (icon.animationType) {
      case 'float-up':
        return {
          ...baseStyle,
          bottom: `-60px`,
          animationDuration: `${icon.duration}ms`,
        };
      case 'fade-in-out':
        return {
          ...baseStyle,
          top: `${icon.y}px`,
          animationDuration: `${icon.duration}ms`,
        };
      case 'spiral':
        return {
          ...baseStyle,
          bottom: `-60px`,
          animationDuration: `${icon.duration}ms`,
        };
      case 'random-direction':
        return {
          ...baseStyle,
          bottom: `${Math.random() * window.innerHeight}px`,
          animationDuration: `${icon.duration}ms`,
          '--direction': `${icon.direction}deg`,
        } as React.CSSProperties;
      case 'power-pulse':
        return {
          ...baseStyle,
          top: `${icon.y}px`,
          animationDuration: `${icon.duration}ms`,
        };
      default:
        return baseStyle;
    }
  };

  const getAnimationClass = (animationType: FloatingIcon['animationType']) => {
    switch (animationType) {
      case 'float-up':
        return 'animate-float-up opacity-30'; // Reduced from opacity-70 to opacity-30
      case 'fade-in-out':
        return 'animate-fade-in-out opacity-25'; // Reduced from opacity-60 to opacity-25
      case 'spiral':
        return 'animate-spiral opacity-35'; // Reduced from opacity-65 to opacity-35
      case 'random-direction':
        return 'animate-random-direction opacity-40'; // Reduced from opacity-75 to opacity-40
      case 'power-pulse':
        return 'animate-power-pulse opacity-45'; // Reduced from opacity-80 to opacity-45
      default:
        return 'animate-float-up opacity-30';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className={`absolute ${getAnimationClass(icon.animationType)}`}
          style={getAnimationStyle(icon)}
        >
          <icon.Icon 
            className={`h-3 w-3 ${icon.color} animate-pulse`} // Reduced from h-4 w-4 to h-3 w-3
            style={{
              filter: `drop-shadow(0 0 ${icon.animationType === 'power-pulse' ? '12px' : '6px'}) currentColor`, // Reduced glow effect
              animationDuration: icon.animationType === 'power-pulse' ? '2s' : '4s', // Slower pulse animation
              animationDelay: `${Math.random() * 4000}ms` // Increased delay variation
            }}
          />
        </div>
      ))}
    </div>
  );
}
