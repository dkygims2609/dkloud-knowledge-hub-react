import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Play, Zap, FileText, TrendingUp } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

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

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  type: "movies" | "youtube" | "aitools" | "techcorner" | "smarttech" | "technews";
  viewAllLink: string;
  maxItems?: number;
}

export function ContentCarousel({ title, items, type, viewAllLink, maxItems = 6 }: ContentCarouselProps) {
  const limitedItems = items.slice(0, maxItems);

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
      case "youtube": return <Play className="h-5 w-5 text-red-500" />;
      case "aitools": return <Zap className="h-5 w-5 text-primary" />;
      case "techcorner": return <FileText className="h-5 w-5 text-primary" />;
      case "technews": return <TrendingUp className="h-5 w-5 text-primary" />;
      default: return <ExternalLink className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">{title}</h3>
        <Button asChild variant="outline" size="sm">
          <Link to={viewAllLink}>
            View All
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {limitedItems.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <Card className="dkloud-card h-full cursor-pointer group" onClick={() => handleItemClick(getItemLink(item))}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 flex-1 mr-2">
                      {renderIcon()}
                      <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                        {getItemTitle(item)}
                      </CardTitle>
                    </div>
                    {getItemCategory(item) && (
                      <Badge variant="secondary" className="text-xs flex-shrink-0">
                        {getItemCategory(item)}
                      </Badge>
                    )}
                  </div>
                  {getItemRating(item) && (
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">Rating:</span>
                      <Badge variant="outline" className="text-xs">
                        {getItemRating(item)}
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  {getItemDescription(item) && (
                    <CardDescription className="text-sm mb-4 line-clamp-3">
                      {getItemDescription(item)}
                    </CardDescription>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      {renderIcon()}
                      <span>{type === "youtube" ? "Channel" : type === "aitools" ? "AI Tool" : "Content"}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 group-hover:bg-primary group-hover:text-primary-foreground"
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-8" />
        <CarouselNext className="hidden sm:flex -right-8" />
      </Carousel>
    </div>
  );
}