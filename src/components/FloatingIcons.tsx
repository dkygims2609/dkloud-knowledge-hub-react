import { useEffect, useState } from "react";
import { Cloud, Film, Cpu, Brain, Wifi, Database, Code, Smartphone, Monitor, Zap } from "lucide-react";

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
  { Icon: Zap, color: "text-emerald-400" }
];

interface FloatingIcon {
  id: number;
  Icon: any;
  color: string;
  x: number;
  y: number;
  delay: number;
}

export function FloatingIcons() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const createIcon = () => {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const newIcon: FloatingIcon = {
        id: Date.now() + Math.random(),
        Icon: randomIcon.Icon,
        color: randomIcon.color,
        x: Math.random() * (window.innerWidth - 100),
        y: window.innerHeight + 50,
        delay: 0
      };

      setFloatingIcons(prev => [...prev, newIcon]);

      // Remove icon after animation completes
      setTimeout(() => {
        setFloatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, 6000);
    };

    // Create initial icons
    const initialInterval = setInterval(createIcon, 2000);

    // Cleanup
    return () => clearInterval(initialInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute animate-float-up opacity-70"
          style={{
            left: `${icon.x}px`,
            bottom: `-50px`,
            animationDuration: '6s',
            animationDelay: `${icon.delay}ms`
          }}
        >
          <icon.Icon 
            className={`h-6 w-6 ${icon.color} animate-pulse`}
            style={{
              filter: 'drop-shadow(0 0 8px currentColor)',
              animationDuration: '2s'
            }}
          />
        </div>
      ))}
    </div>
  );
}