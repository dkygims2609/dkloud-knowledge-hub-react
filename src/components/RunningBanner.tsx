
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const trendingNews = [
  "🎬 New Movie Releases: Top AI-generated films now streaming on major platforms",
  "📺 Latest TV Series: Tech thriller series 'Cloud Nine' premieres this week",
  "🚀 dKloud Updates: New AI Tools section with 50+ curated productivity apps",
  "🎵 Music Tech: AI composition tools revolutionizing music production industry",
  "☁️ Cloud Computing: Latest serverless architecture trends and tutorials added",
  "🤖 AI Breakthrough: ChatGPT-5 rumors and next-gen language model predictions",
  "📱 Smart Tech: IoT devices integration guide for home automation systems",
  "🎯 Upcoming Projects: dKloud mobile app development starting next quarter"
];

export function RunningBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Cycle through news items every 10 seconds
  useEffect(() => {
    const newsInterval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % trendingNews.length);
    }, 10000);

    return () => clearInterval(newsInterval);
  }, []);

  // Auto-hide banner after 45 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="running-banner relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
            WEEKLY TRENDING
          </span>
        </div>
        
        <div className="banner-text flex-1 text-center">
          {trendingNews[currentNewsIndex]}
        </div>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className={cn(
            "bg-white/20 hover:bg-white/30 rounded-full p-1",
            "transition-colors duration-200 z-10 ml-2"
          )}
          aria-label="Close banner"
        >
          <X className="h-3 w-3 text-white" />
        </button>
      </div>
    </div>
  );
}
