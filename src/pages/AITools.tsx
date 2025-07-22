
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar, Star, ExternalLink, Play, Brain, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface AITool {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  pricing?: string;
  rating?: number;
  features?: string[];
  website?: string;
  demo_link?: string;
  logo?: string;
}

const AITools = () => {
  const [data, setData] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const toolsPerPage = 6; // 2 rows × 3 cards

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxpIEMPY1Ji3tft5mYLNaObg9csvvzCdoWuAcOpz-KQlMWWmytkzShEgZBJNQ3r3yl7/exec");
        const jsonData: AITool[] = await response.json();
        const processedData = (jsonData || []).map((tool, index) => ({
          ...tool,
          id: tool.id || `tool-${index}`,
        }));
        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTools = data.filter(tool => {
    const searchMatch = (tool.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (tool.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === "all" || tool.category === selectedCategory;
    const ratingMatch = tool.rating === undefined || tool.rating >= minRating;

    return searchMatch && categoryMatch && ratingMatch;
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

  const renderAIToolCard = (tool: AITool) => (
    <Card key={tool.id} className="ai-tools-card-enhanced group cursor-pointer transition-all duration-300 hover:scale-[1.02] h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {tool.logo ? (
              <img 
                src={tool.logo} 
                alt={`${tool.name} logo`}
                className="w-12 h-12 rounded-lg object-cover border border-border/50"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/50">
                <Brain className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {tool.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={tool.pricing === 'Free' ? 'default' : 'secondary'} className="text-xs">
                  {tool.pricing}
                </Badge>
                {tool.category && (
                  <Badge variant="outline" className="text-xs">
                    {tool.category}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {tool.rating && (
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                {tool.rating}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 group-hover:text-foreground/80 transition-colors">
          {tool.description}
        </CardDescription>

        {tool.features && tool.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {tool.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-muted/50 hover:bg-muted transition-colors">
                  {feature}
                </Badge>
              ))}
              {tool.features.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-muted/50">
                  +{tool.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          {tool.website && (
            <Button 
              asChild 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
            >
              <a href={tool.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Site
              </a>
            </Button>
          )}
          {tool.demo_link && (
            <Button asChild variant="outline" size="sm" className="flex-1">
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

  const categoryOptions = [...new Set(data.map(tool => tool.category))].filter(Boolean);

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

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search AI tools..."
            className="bg-background/90 backdrop-blur-sm border-none focus:ring-primary text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] md:w-[150px] lg:w-[200px] text-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryOptions.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <div className="w-[150px]">
              <Label htmlFor="minRating" className="text-sm text-muted-foreground">
                Min. Rating
              </Label>
              <Slider
                id="minRating"
                defaultValue={[0]}
                max={5}
                step={0.5}
                aria-label="Minimum Rating"
                onValueChange={(value) => setMinRating(value[0])}
              />
              <p className="text-sm text-muted-foreground text-right">{minRating}+</p>
            </div>
          </div>
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
                className="rounded-full"
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
                className="rounded-full"
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
        </div>
      )}
    </div>
  );
};

export default AITools;
