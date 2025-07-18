
import { useEffect, useState } from "react";
import { 
  Cloud, 
  Film, 
  Cpu, 
  Brain, 
  Wifi, 
  Database, 
  Code, 
  Smartphone, 
  Monitor, 
  Zap,
  Music,
  Camera,
  Tv,
  Gamepad2,
  Headphones,
  Server,
  Globe,
  Shield,
  Clapperboard,
  Radio,
  Microchip,
  HardDrive,
  Router
} from "lucide-react";

const icons = [
  { Icon: Cloud, color: "text-blue-400" },
  { Icon: Film, color: "text-purple-400" },
  { Icon: Cpu, color: "text-green-400" },
  { Icon: Brain, color: "text-pink-400" },
  { Icon: Wifi, color: "text-cyan-400" },
  { Icon: Database, color: "text-orange-400" },
  { Icon: Code, color: "text-yellow-400" },
  { Icon: Smartphone, color: "text-indigo-400" },
  { Icon: Monitor, color: "text-red-400" },
  { Icon: Zap, color: "text-emerald-400" },
  { Icon: Music, color: "text-violet-400" },
  { Icon: Camera, color: "text-rose-400" },
  { Icon: Tv, color: "text-teal-400" },
  { Icon: Gamepad2, color: "text-lime-400" },
  { Icon: Headphones, color: "text-fuchsia-400" },
  { Icon: Server, color: "text-slate-400" },
  { Icon: Globe, color: "text-sky-400" },
  { Icon: Shield, color: "text-amber-400" },
  { Icon: Clapperboard, color: "text-purple-500" },
  { Icon: Radio, color: "text-blue-500" },
  { Icon: Microchip, color: "text-green-500" },
  { Icon: HardDrive, color: "text-orange-500" },
  { Icon: Router, color: "text-cyan-500" }
];

interface FloatingIcon {
  id: number;
  Icon: any;
  color: string;
  x: number;
  y: number;
  delay: number;
  scale: number;
  duration: number;
}

export function FloatingIcons() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const createIcon = () => {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const duration = 6000 + Math.random() * 4000; // 6-10 seconds
      const newIcon: FloatingIcon = {
        id: Date.now() + Math.random(),
        Icon: randomIcon.Icon,
        color: randomIcon.color,
        x: Math.random() * (window.innerWidth - 60),
        y: window.innerHeight + 30,
        delay: Math.random() * 1000,
        scale: 0.4 + Math.random() * 0.3, // Smaller icons: 0.4 to 0.7
        duration
      };

      setFloatingIcons(prev => [...prev, newIcon]);

      // Remove icon after animation completes
      setTimeout(() => {
        setFloatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, duration + newIcon.delay);
    };

    // Create icons more frequently for better visual effect
    const initialInterval = setInterval(createIcon, 1500);

    // Cleanup
    return () => clearInterval(initialInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute animate-float-up opacity-50"
          style={{
            left: `${icon.x}px`,
            bottom: `-30px`,
            animationDuration: `${icon.duration}ms`,
            animationDelay: `${icon.delay}ms`,
            transform: `scale(${icon.scale})`
          }}
        >
          <icon.Icon 
            className={`h-4 w-4 ${icon.color} animate-pulse`}
            style={{
              filter: 'drop-shadow(0 0 6px currentColor)',
              animationDuration: '2s',
              animationDelay: `${Math.random() * 1000}ms`
            }}
          />
        </div>
      ))}
    </div>
  );
}
