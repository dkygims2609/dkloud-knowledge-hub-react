
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, ExternalLink, Brain, ChevronLeft, ChevronRight, Globe, Zap, Target, DollarSign, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ModernLoader, SkeletonCard } from "@/components/ui/modern-loader";

interface AITool {
  "Toolname"?: string;
  "Tool name"?: string;
  "toolname"?: string;
  "name"?: string;
  "Name"?: string;
  "Category"?: string;
  "Purpose"?: string;
  "Pricingmodel"?: string;
  "EstimatedCost (per month)"?: string;
  "Tools Link"?: string;
  [key: string]: any;
}

const AITools = () => {
  const [data, setData] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  
  const toolsPerPage = 6;

  const fetchData = async (retryCount = 0) => {
    try {
      console.log("Fetching AI Tools data...", { retryCount });
      setLoading(true);
      setError(null);
      
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
      console.log("First item structure:", jsonData[0]);
      console.log("All available keys in first item:", jsonData[0] ? Object.keys(jsonData[0]) : "No data");
      
      // Debug column names
      if (jsonData && jsonData.length > 0) {
        console.log("Sample item keys:", Object.keys(jsonData[0]));
        console.log("Sample item values:", Object.values(jsonData[0]));
      }
      
      if (!Array.isArray(jsonData)) {
        throw new Error("Invalid data format received");
      }
      
      setData(jsonData);
      setError(null);
    } catch (error) {
      console.error("Error fetching AI Tools data:", error);
      setError(error instanceof Error ? error.message : "Failed to load AI tools");
      
      if (retryCount < 2) {
        console.log(`Retrying... attempt ${retryCount + 1}`);
        setTimeout(() => fetchData(retryCount + 1), 2000);
        return;
      }
      
      toast.error("Failed to load AI tools. Please try again later.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to get tool name from various possible column names
  const getToolName = (tool: AITool): string => {
    // Check all possible column name variations including the exact one from your sheet
    const possibleKeys = [
      "Toolname", 
      "Tool name", 
      "toolname", 
      "name", 
      "Name",
      "Tool Name",
      "TOOLNAME"
    ];
    
    let toolName = "";
    for (const key of possibleKeys) {
      if (tool[key] && typeof tool[key] === 'string' && tool[key].trim()) {
        toolName = tool[key].trim();
        break;
      }
    }
    
    console.log("Tool object keys:", Object.keys(tool));
    console.log("Tool name search result:", toolName);
    console.log("Full tool object:", tool);
    
    return toolName || "Unknown Tool";
  };

  const getUniqueValues = (key: keyof AITool) => {
    return [...new Set(data.map(tool => tool[key]).filter(Boolean))].sort();
  };

  const filteredTools = data.filter(tool => {
    const toolName = getToolName(tool);
    const searchMatch = toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    const toolName = getToolName(tool);
    
    return (
      <Card 
        key={toolName} 
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
        <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300 line-clamp-2">
          {toolName}
        </CardTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {tool["Category"] && (
                    <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">
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
          <CardDescription className="text-base text-muted-foreground leading-relaxed mb-4 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300 flex-1">
            <span className="text-primary font-medium">Purpose:</span> {tool["Purpose"]}
          </CardDescription>

          <div className="space-y-3 mt-auto">
            <div className="flex flex-wrap gap-2">
              {tool["Pricingmodel"] && (
                <Badge 
                  variant={tool["Pricingmodel"].toLowerCase().includes('free') ? 'default' : 'secondary'} 
                  className={`text-xs ${tool["Pricingmodel"].toLowerCase().includes('free') ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700' : 'bg-secondary/50 text-secondary-foreground'}`}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {tool["Pricingmodel"]}
                </Badge>
              )}
              {tool["EstimatedCost (per month)"] && (
                <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {tool["EstimatedCost (per month)"]}
                </Badge>
              )}
            </div>

            {tool["Tools Link"] && (
              <Button 
                asChild 
                size="sm" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 text-primary-foreground font-medium"
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
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
            {error && (
              <Button variant="outline" size="sm" onClick={() => fetchData()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
          <ModernLoader 
            text="Loading AI Tools..." 
            variant="gradient" 
            size="lg"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-2 text-destructive">Failed to Load AI Tools</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => fetchData()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
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
