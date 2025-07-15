
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function RunningBanner() {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide banner after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const bannerText = "This website is built with lots of effort, time, and passion — almost no cost! 💻 Open Source • 🌟 Community Driven • 🎨 Creative Tech Space • 🤖 AI Powered • ☁️ Cloud Native • 📚 Knowledge Hub • 🎵 Music & Tech • 🔧 Developer Tools • Join our community of tech enthusiast";

  return (
    <div className="running-banner relative">
      <div className="banner-text">
        {bannerText}
      </div>
      
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className={cn(
          "absolute right-2 top-1/2 transform -translate-y-1/2",
          "bg-white/20 hover:bg-white/30 rounded-full p-1",
          "transition-colors duration-200 z-10"
        )}
        aria-label="Close banner"
      >
        <X className="h-3 w-3 text-white" />
      </button>
    </div>
  );
}
