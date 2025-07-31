import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Play, Zap, FileText, TrendingUp, Bot, Laptop2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModernCard } from "./ModernCard";
import { ScrollReveal, MagneticButton } from "./ModernAnimations";

interface ContentItem {
  id?: string;
  title?: string;
  name?: string;
  Toolname?: string;
  Name?: string;
  Title?: string;
  category?: string;
  Category?: string;
  description?: string;
  Description?: string;
  Purpose?: string;
  link?: string;
  Link?: string;
  YouTubeLink?: string;
  "Tools Link"?: string;
  url?: string;
  rating?: string | number;
  Rating?: string | number;
  DKcloudRating?: string | number;
  published?: string;
  source?: string;
  image?: string;
  Pricingmodel?: string;
  "EstimatedCost (per month)"?: string;
  Type?: string;
}

interface ContentGridProps {
  items: ContentItem[];
  type: "movies" | "youtube" | "aitools" | "techcorner" | "smarttech" | "technews";
}

export function ContentGrid({ items, type }: ContentGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Show 2 rows of 6 items each (12 items total per view)
  const itemsPerView = 12;
  const totalViews = Math.ceil(items.length / itemsPerView);

  const getItemTitle = (item: ContentItem) => {
    return item.title || item.name || item.Toolname || item.Name || item.Title || "Untitled";
  };

  const getItemDescription = (item: ContentItem) => {
    return item.description || item.Description || item.Purpose || "";
  };

  const getItemCategory = (item: ContentItem) => {
    return item.category || item.Category || item.Type || "";
  };

  const getItemLink = (item: ContentItem) => {
    return item.link || item.Link || item.YouTubeLink || item["Tools Link"] || item.url || "#";
  };

  const getItemRating = (item: ContentItem) => {
    return item.rating || item.Rating || item.DKcloudRating || "";
  };

  const handleItemClick = (link: string) => {
    if (link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const renderIcon = () => {
    switch (type) {
      case "youtube": return <Play className="h-4 w-4 text-red-500" />;
      case "aitools": return <Bot className="h-4 w-4 text-cyan-500" />;
      case "techcorner": return <FileText className="h-4 w-4 text-emerald-500" />;
      case "technews": return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case "smarttech": return <Laptop2 className="h-4 w-4 text-amber-500" />;
      case "movies": return <Play className="h-4 w-4 text-violet-500" />;
      default: return <ExternalLink className="h-4 w-4 text-primary" />;
    }
  };

  const getCardCategory = () => {
    switch (type) {
      case "movies": return "movies";
      case "aitools": return "aitools";
      case "techcorner": return "tech";
      case "smarttech": return "tech";
      case "technews": return "tech";
      case "youtube": return "youtube";
      default: return "default";
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalViews);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalViews) % totalViews);
  };

  useEffect(() => {
    // No need for scrollTo anymore since we're using transform
  }, [currentIndex, totalViews]);

  const currentItems = items.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  return (
    <ScrollReveal direction="up" delay={100}>
      <div className="relative">
        {/* Slider Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-gradient-animated">
              {type === "movies" ? "Movies & TV Series" :
               type === "youtube" ? "YouTube Channels" :
               type === "aitools" ? "AI Tools" :
               type === "techcorner" ? "Tech Corner" :
               type === "smarttech" ? "Smart Tech" :
               "Tech News"}
            </h2>
            <Badge variant="outline" className="text-xs glass-card">
              {items.length} items
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {totalViews}
            </span>
            <MagneticButton>
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="h-8 w-8 p-0 hover-glow"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentIndex === totalViews - 1}
                className="h-8 w-8 p-0 hover-glow"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </MagneticButton>
          </div>
        </div>

      {/* Content Grid - 2 Rows with Horizontal Scroll */}
      <div 
        ref={scrollContainerRef}
        className="overflow-hidden mb-6"
      >
        <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-6 pb-4" style={{ 
          gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
          width: `${Math.ceil(currentItems.length / 2) * 320}px`,
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${currentIndex * (Math.ceil(itemsPerView / 2) * 320)}px)`
        }}>
          {currentItems.map((item, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 50}>
              <ModernCard
                title={getItemTitle(item)}
                description={getItemDescription(item)}
                category={getCardCategory()}
                badge={getItemCategory(item) || undefined}
                href={getItemLink(item)}
                icon={renderIcon()}
                className="w-72 flex-shrink-0 h-full"
                onClick={() => handleItemClick(getItemLink(item))}
              >
                <div className="space-y-3">
                  {getItemRating(item) && (
                    <Badge variant="outline" className="text-xs animate-shimmer">
                      ⭐ {getItemRating(item)}
                    </Badge>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      {renderIcon()}
                      <span>
                        {type === "youtube" ? "Channel" : 
                         type === "aitools" ? "AI Tool" : 
                         type === "movies" ? "Content" :
                         "Resource"}
                      </span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalViews }).map((_, index) => (
            <MagneticButton key={index}>
              <button
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300 hover:scale-125",
                  index === currentIndex 
                    ? 'bg-primary shadow-lg shadow-primary/50 animate-pulse-glow' 
                    : 'bg-muted hover:bg-muted-foreground/50'
                )}
              />
            </MagneticButton>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}