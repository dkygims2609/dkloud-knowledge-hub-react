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
  Laptop
} from "lucide-react";

const iotIcons = [
  { Icon: Wifi, color: "text-blue-400" },
  { Icon: Smartphone, color: "text-purple-400" },
  { Icon: Watch, color: "text-indigo-400" },
  { Icon: Car, color: "text-cyan-400" },
  { Icon: Home, color: "text-violet-400" },
  { Icon: Lightbulb, color: "text-blue-300" },
  { Icon: Thermometer, color: "text-purple-300" },
  { Icon: Camera, color: "text-indigo-300" },
  { Icon: Speaker, color: "text-cyan-300" },
  { Icon: Router, color: "text-violet-300" },
  { Icon: Tv, color: "text-blue-500" },
  { Icon: Gamepad2, color: "text-purple-500" },
  { Icon: Headphones, color: "text-indigo-500" },
  { Icon: Tablet, color: "text-cyan-500" },
  { Icon: Laptop, color: "text-violet-500" }
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

export function IoTFloatingIcons() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const createIcon = () => {
      const randomIcon = iotIcons[Math.floor(Math.random() * iotIcons.length)];
      const newIcon: FloatingIcon = {
        id: Date.now() + Math.random(),
        Icon: randomIcon.Icon,
        color: randomIcon.color,
        x: Math.random() * (window.innerWidth - 100),
        y: window.innerHeight + 50,
        duration: 8000 + Math.random() * 4000, // 8-12 seconds
        delay: Math.random() * 2000,
        scale: 0.8 + Math.random() * 0.4 // 0.8 to 1.2
      };

      setFloatingIcons(prev => [...prev, newIcon]);

      // Remove icon after animation completes
      setTimeout(() => {
        setFloatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, newIcon.duration + newIcon.delay);
    };

    // Create initial icons with staggered timing
    const initialInterval = setInterval(createIcon, 3000); // Every 3 seconds

    // Cleanup
    return () => clearInterval(initialInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute animate-float-up opacity-60"
          style={{
            left: `${icon.x}px`,
            bottom: `-60px`,
            animationDuration: `${icon.duration}ms`,
            animationDelay: `${icon.delay}ms`,
            transform: `scale(${icon.scale})`
          }}
        >
          <icon.Icon 
            className={`h-8 w-8 ${icon.color} animate-pulse`}
            style={{
              filter: 'drop-shadow(0 0 12px currentColor)',
              animationDuration: '3s',
              animationDelay: `${Math.random() * 2000}ms`
            }}
          />
        </div>
      ))}
    </div>
  );
}