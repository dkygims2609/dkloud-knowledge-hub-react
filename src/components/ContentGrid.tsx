import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Play, Zap, FileText, TrendingUp } from "lucide-react";

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
      case "aitools": return <Zap className="h-4 w-4 text-primary" />;
      case "techcorner": return <FileText className="h-4 w-4 text-primary" />;
      case "technews": return <TrendingUp className="h-4 w-4 text-primary" />;
      default: return <ExternalLink className="h-4 w-4 text-primary" />;
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalViews);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalViews) % totalViews);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const slideWidth = container.scrollWidth / totalViews;
      container.scrollTo({
        left: slideWidth * currentIndex,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, totalViews]);

  const currentItems = items.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  return (
    <div className="relative">
      {/* Slider Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">
            {type === "movies" ? "Movies & TV Series" :
             type === "youtube" ? "YouTube Channels" :
             type === "aitools" ? "AI Tools" :
             type === "techcorner" ? "Tech Corner" :
             type === "smarttech" ? "Smart Tech" :
             "Tech News"}
          </h2>
          <Badge variant="outline" className="text-xs">
            {items.length} items
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalViews}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex === totalViews - 1}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Grid - 2 Rows */}
      <div 
        ref={scrollContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6"
      >
        {currentItems.map((item, index) => (
          <Card 
            key={index} 
            className="dkloud-card cursor-pointer group hover:scale-105 transition-all duration-300" 
            onClick={() => handleItemClick(getItemLink(item))}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-1 flex-1 mr-1">
                  {renderIcon()}
                  <CardTitle className="text-sm group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {getItemTitle(item)}
                  </CardTitle>
                </div>
                {getItemCategory(item) && (
                  <Badge variant="secondary" className="text-[10px] flex-shrink-0 px-1 py-0">
                    {getItemCategory(item)}
                  </Badge>
                )}
              </div>
              {getItemRating(item) && (
                <Badge variant="outline" className="text-[10px] w-fit">
                  ⭐ {getItemRating(item)}
                </Badge>
              )}
            </CardHeader>
            
            <CardContent className="pt-0">
              {getItemDescription(item) && (
                <CardDescription className="text-xs mb-3 line-clamp-2 leading-relaxed">
                  {getItemDescription(item)}
                </CardDescription>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-1 text-[10px] text-muted-foreground">
                  {renderIcon()}
                  <span>
                    {type === "youtube" ? "Channel" : 
                     type === "aitools" ? "AI Tool" : 
                     type === "movies" ? "Content" :
                     "Resource"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(getItemLink(item));
                  }}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalViews }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}