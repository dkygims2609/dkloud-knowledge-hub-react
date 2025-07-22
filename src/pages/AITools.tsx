
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, ExternalLink, Play, Brain, ChevronLeft, ChevronRight, Globe, Zap, Target } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AITool {
  id?: string;
  "Tool Name"?: string;
  name?: string;
  Description?: string;
  description?: string;
  Category?: string;
  category?: string;
  Pricing?: string;
  pricing?: string;
  DKcloudRating?: string | number;
  rating?: number;
  Features?: string;
  features?: string[];
  Website?: string;
  website?: string;
  "Demo Link"?: string;
  demo_link?: string;
  Logo?: string;
  logo?: string;
}

const AITools = () => {
  const [data, setData] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const toolsPerPage = 6;

  const normalizeData = (tool: any): AITool => {
    // Handle features field - could be string or array
    let features: string[] = [];
    if (tool.Features) {
      if (typeof tool.Features === 'string') {
        features = tool.Features.split(',').map((f: string) => f.trim()).filter(Boolean);
      } else if (Array.isArray(tool.Features)) {
        features = tool.Features;
      }
    }

    return {
      id: tool.id || tool["Tool Name"] || tool.name || `tool-${Math.random()}`,
      name: tool["Tool Name"] || tool.name,
      description: tool.Description || tool.description,
      category: tool.Category || tool.category,
      pricing: tool.Pricing || tool.pricing,
      rating: parseFloat(String(tool.DKcloudRating || tool.rating || '0')),
      features: features,
      website: tool.Website || tool.website,
      demo_link: tool["Demo Link"] || tool.demo_link,
      logo: tool.Logo || tool.logo
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching AI Tools data...");
        const response = await fetch("https://script.google.com/macros/s/AKfycbxpIEMPY1Ji3tft5mYLNaObg9csvvzCdoWuAcOpz-KQlMWWmytkzShEgZBJNQ3r3yl7/exec", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log("AI Tools API response:", jsonData);
        
        const processedData = (Array.isArray(jsonData) ? jsonData : []).map(normalizeData);
        console.log("Processed AI Tools data:", processedData);
        setData(processedData);
      } catch (error) {
        console.error("Error fetching AI Tools data:", error);
        toast.error("Failed to load AI tools. Please try again later.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUniqueValues = (key: keyof AITool) => {
    return [...new Set(data.map(tool => tool[key]).filter(Boolean))].sort();
  };

  const filteredTools = data.filter(tool => {
    const searchMatch = (tool.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (tool.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (tool.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === "all" || tool.category === selectedCategory;
    const pricingMatch = selectedPricing === "all" || tool.pricing === selectedPricing;
    const ratingMatch = tool.rating === undefined || tool.rating >= minRating;

    return searchMatch && categoryMatch && pricingMatch && ratingMatch;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    const ratingA = a.rating === undefined ? 0 : a.rating;
    const ratingB = b.rating === undefined ? 0 : b.rating;
    return ratingB - ratingA;
  });

  const currentItems = sortedTools.slice(currentPage * toolsPerPage, (currentPage + 1) * toolsPerPage);

  const nextSlide = () => {
    if (currentPage < Math.ceil(sortedTools.length / toolsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPricing("all");
    setMinRating(0);
  };

  const renderAIToolCard = (tool: AITool) => (
    <Card key={tool.id} className="group relative overflow-hidden bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            {tool.logo ? (
              <div className="relative overflow-hidden">
                <img 
                  src={tool.logo} 
                  alt={`${tool.name} logo`}
                  className="w-12 h-12 rounded-lg object-cover border border-border/50 transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/50 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                <Brain className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {tool.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge 
                  variant={tool.pricing === 'Free' ? 'default' : 'secondary'} 
                  className={`text-xs ${tool.pricing === 'Free' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : ''}`}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {tool.pricing}
                </Badge>
                {tool.category && (
                  <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <Target className="h-3 w-3 mr-1" />
                    {tool.category}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {tool.rating && tool.rating > 0 && (
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full shrink-0">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                {tool.rating}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative z-10">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
          {tool.description}
        </CardDescription>

        {tool.features && tool.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
              <Star className="h-3 w-3 mr-1 text-primary" />
              Key Features:
            </h4>
            <div className="flex flex-wrap gap-1">
              {tool.features.slice(0, 4).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-muted/50 hover:bg-muted transition-colors">
                  {feature}
                </Badge>
              ))}
              {tool.features.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-muted/50">
                  +{tool.features.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          {tool.website && (
            <Button 
              asChild 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-white font-medium"
            >
              <a href={tool.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Visit Site
              </a>
            </Button>
          )}
          {tool.demo_link && (
            <Button asChild variant="outline" size="sm" className="flex-1 hover:bg-primary/10 transition-colors duration-300">
              <a href={tool.demo_link} target="_blank" rel="noopener noreferrer">
                <Play className="h-4 w-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            AI Tools
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore a curated selection of AI tools to enhance your productivity and creativity.
        </p>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search AI tools..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {getUniqueValues('category').map(category => (
                <SelectItem key={String(category)} value={String(category)}>
                  {String(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPricing} onValueChange={setSelectedPricing}>
            <SelectTrigger>
              <SelectValue placeholder="Pricing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pricing</SelectItem>
              {getUniqueValues('pricing').map(pricing => (
                <SelectItem key={String(pricing)} value={String(pricing)}>
                  {String(pricing)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <Label htmlFor="minRating" className="text-sm text-muted-foreground">
                Min. Rating: {minRating}+
              </Label>
              <Slider
                id="minRating"
                value={[minRating]}
                max={5}
                step={0.5}
                onValueChange={(value) => setMinRating(value[0])}
                className="mt-1"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {currentItems.length} of {sortedTools.length} AI tools
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading AI tools...</p>
        </div>
      ) : sortedTools.length > 0 ? (
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentItems.map(renderAIToolCard)}
          </div>
          
          {sortedTools.length > toolsPerPage && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentPage === 0}
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage + 1} of {Math.ceil(sortedTools.length / toolsPerPage)}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentPage >= Math.ceil(sortedTools.length / toolsPerPage) - 1}
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-2">No AI tools found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AITools;
