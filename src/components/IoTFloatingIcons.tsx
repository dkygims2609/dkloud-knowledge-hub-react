
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
  Music,
  Film,
  Code,
  Database,
  Globe
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
  { Icon: Music, color: "text-accent" },
  { Icon: Film, color: "text-primary" },
  { Icon: Code, color: "text-secondary" },
  { Icon: Database, color: "text-accent" },
  { Icon: Globe, color: "text-primary" }
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
}

export function IoTFloatingIcons({ showOnHomePage = false }: { showOnHomePage?: boolean }) {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    // Only show on home page when showOnHomePage is true
    if (!showOnHomePage) return;

    const createIcon = () => {
      const randomIcon = iotIcons[Math.floor(Math.random() * iotIcons.length)];
      const newIcon: FloatingIcon = {
        id: Date.now() + Math.random(),
        Icon: randomIcon.Icon,
        color: randomIcon.color,
        x: Math.random() * (window.innerWidth - 50),
        y: window.innerHeight + 40,
        duration: 8000 + Math.random() * 4000, // 8-12 seconds
        delay: Math.random() * 2000,
        scale: 0.3 + Math.random() * 0.2 // Even smaller: 0.3 to 0.5
      };

      setFloatingIcons(prev => [...prev, newIcon]);

      // Remove icon after animation completes
      setTimeout(() => {
        setFloatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, newIcon.duration + newIcon.delay);
    };

    // Create initial icons with staggered timing
    const initialInterval = setInterval(createIcon, 2500); // Every 2.5 seconds

    // Cleanup
    return () => clearInterval(initialInterval);
  }, [showOnHomePage]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute animate-float-up opacity-40"
          style={{
            left: `${icon.x}px`,
            bottom: `-40px`,
            animationDuration: `${icon.duration}ms`,
            animationDelay: `${icon.delay}ms`,
            transform: `scale(${icon.scale})`
          }}
        >
          <icon.Icon 
            className={`h-3 w-3 ${icon.color} animate-pulse`}
            style={{
              filter: 'drop-shadow(0 0 8px currentColor)',
              animationDuration: '3s',
              animationDelay: `${Math.random() * 2000}ms`
            }}
          />
        </div>
      ))}
    </div>
  );
}
