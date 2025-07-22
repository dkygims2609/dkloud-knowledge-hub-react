
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, ExternalLink, Brain, ChevronLeft, ChevronRight, Globe, Zap, Target, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AITool {
  "Toolname"?: string;
  "Category"?: string;
  "Purpose"?: string;
  "Pricingmodel"?: string;
  "EstimatedCost (per month)"?: string;
  "Tools Link"?: string;
}

const AITools = () => {
  const [data, setData] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  
  const toolsPerPage = 6;

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
        
        setData(Array.isArray(jsonData) ? jsonData : []);
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
    const searchMatch = (tool["Toolname"]?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (tool["Category"]?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (tool["Purpose"]?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (tool["Pricingmodel"]?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const categoryMatch = selectedCategory === "all" || tool["Category"] === selectedCategory;
    const pricingMatch = selectedPricing === "all" || tool["Pricingmodel"] === selectedPricing;

    return searchMatch && categoryMatch && pricingMatch;
  });

  const currentItems = filteredTools.slice(currentPage * toolsPerPage, (currentPage + 1) * toolsPerPage);

  const nextSlide = () => {
    if (currentPage < Math.ceil(filteredTools.length / toolsPerPage) - 1) {
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
  };

  const renderAIToolCard = (tool: AITool) => {
    return (
      <Card 
        key={tool["Toolname"]} 
        className="group relative overflow-hidden bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] aspect-square flex flex-col"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <CardHeader className="pb-3 relative z-10 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/50 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                <Brain className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {tool["Toolname"]}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {tool["Category"] && (
                    <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <Target className="h-3 w-3 mr-1" />
                      {tool["Category"]}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 relative z-10 flex-1 flex flex-col">
          <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300 flex-1">
            {tool["Purpose"]}
          </CardDescription>

          <div className="space-y-3 mt-auto">
            <div className="flex flex-wrap gap-2">
              {tool["Pricingmodel"] && (
                <Badge 
                  variant={tool["Pricingmodel"].toLowerCase().includes('free') ? 'default' : 'secondary'} 
                  className={`text-xs ${tool["Pricingmodel"].toLowerCase().includes('free') ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : ''}`}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {tool["Pricingmodel"]}
                </Badge>
              )}
              {tool["EstimatedCost (per month)"] && (
                <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {tool["EstimatedCost (per month)"]}
                </Badge>
              )}
            </div>

            {tool["Tools Link"] && (
              <Button 
                asChild 
                size="sm" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-white font-medium"
              >
                <a href={tool["Tools Link"]} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Tool
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

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

      {/* Top Navigation */}
      {filteredTools.length > toolsPerPage && (
        <div className="flex items-center justify-center gap-4 mb-8">
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
              Page {currentPage + 1} of {Math.ceil(filteredTools.length / toolsPerPage)}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentPage >= Math.ceil(filteredTools.length / toolsPerPage) - 1}
            className="rounded-full hover:bg-primary/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Enhanced Filters */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
              {getUniqueValues('Category').map(category => (
                <SelectItem key={String(category)} value={String(category)}>
                  {String(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPricing} onValueChange={setSelectedPricing}>
            <SelectTrigger>
              <SelectValue placeholder="Pricing Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pricing</SelectItem>
              {getUniqueValues('Pricingmodel').map(pricing => (
                <SelectItem key={String(pricing)} value={String(pricing)}>
                  {String(pricing)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {currentItems.length} of {filteredTools.length} AI tools
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
      ) : filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentItems.map(renderAIToolCard)}
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
