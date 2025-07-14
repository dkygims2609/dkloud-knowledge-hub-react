
import { useState, useEffect, useRef } from "react";
import { Search, Filter, ExternalLink, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AITool {
  "Tool Name"?: string;
  "Toolname"?: string;
  "toolname"?: string;
  "tool_name"?: string;
  "name"?: string;
  "Name"?: string;
  Category?: string;
  category?: string;
  Purpose?: string;
  purpose?: string;
  description?: string;
  Description?: string;
  "Pricing Model"?: string;
  "Pricingmodel"?: string;
  "pricing_model"?: string;
  "pricing"?: string;
  "Estimated Cost (per month)"?: string;
  "EstimatedCost (per month)"?: string;
  "estimated_cost"?: string;
  "cost"?: string;
  "Tool Link"?: string;
  "Tools Link"?: string;
  "tool_link"?: string;
  "link"?: string;
  "url"?: string;
  "website"?: string;
}

const AITools = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    filterTools();
  }, [tools, searchTerm, categoryFilter, pricingFilter]);

  const fetchTools = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyQZiNTLogFsjujIKxhFs2pXoK_iaoLkFb4D3HJ_wQjQpD17RxsqHX0G1nuKbQN2x9u/exec"
      );
      const data = await response.json();
      console.log("AI Tools API Response:", data);
      console.log("First tool sample:", data[0]);
      console.log("Column names in first tool:", Object.keys(data[0] || {}));
      setTools(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AI tools:", error);
      setLoading(false);
    }
  };

  const getToolName = (tool: AITool) => {
    return tool["Tool Name"] || 
           tool["Toolname"] || 
           tool["toolname"] || 
           tool["tool_name"] || 
           tool["name"] || 
           tool["Name"] || 
           "AI Tool";
  };

  const getCategory = (tool: AITool) => {
    return tool.Category || tool.category || "AI & Automation";
  };

  const getPurpose = (tool: AITool) => {
    return tool.Purpose || 
           tool.purpose || 
           tool.description || 
           tool.Description || 
           "Advanced AI tool for productivity and automation";
  };

  const getPricingModel = (tool: AITool) => {
    return tool["Pricing Model"] || 
           tool["Pricingmodel"] || 
           tool["pricing_model"] || 
           tool["pricing"] || 
           "Freemium";
  };

  const getEstimatedCost = (tool: AITool) => {
    return tool["Estimated Cost (per month)"] || 
           tool["EstimatedCost (per month)"] || 
           tool["estimated_cost"] || 
           tool["cost"] || 
           "";
  };

  const getToolLink = (tool: AITool) => {
    return tool["Tool Link"] || 
           tool["Tools Link"] || 
           tool["tool_link"] || 
           tool["link"] || 
           tool["url"] || 
           tool["website"] || 
           "#";
  };

  const filterTools = () => {
    let filtered = tools.filter((tool) =>
      getToolName(tool).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPurpose(tool).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCategory(tool).toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== "all") {
      filtered = filtered.filter((tool) => getCategory(tool) === categoryFilter);
    }

    if (pricingFilter !== "all") {
      filtered = filtered.filter((tool) => getPricingModel(tool) === pricingFilter);
    }

    setFilteredTools(filtered);
  };

  const getUniqueValues = (accessor: (tool: AITool) => string) => {
    return Array.from(new Set(tools.map(accessor))).filter(Boolean);
  };

  const handleToolClick = (link: string) => {
    if (link && link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const scrollTools = (direction: 'left' | 'right') => {
    const itemsPerView = 12;
    const maxIndex = Math.ceil(filteredTools.length / itemsPerView) - 1;
    
    if (direction === 'right' && currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🤖 AI Tools Hub
          </h1>
          <p className="text-xl text-foreground/80">
            Discover the <span className="text-primary font-medium">latest AI tools</span> to boost your <span className="text-emerald-500 font-medium">productivity</span> and <span className="text-purple-500 font-medium">creativity</span>
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 mb-8 space-y-4 border border-primary/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-primary/60" />
              <Input
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/30 focus:border-primary"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getUniqueValues(getCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={pricingFilter} onValueChange={setPricingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Pricing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pricing</SelectItem>
                {getUniqueValues(getPricingModel).map((pricing) => (
                  <SelectItem key={pricing} value={pricing}>
                    {pricing}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/70">
              Showing <span className="text-primary font-semibold">{filteredTools.length}</span> of <span className="text-accent font-semibold">{tools.length}</span> AI tools
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setPricingFilter("all");
              }}
              className="border-primary/30 hover:bg-primary/10"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="relative">
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-foreground">AI Tools (<span className="text-primary">{filteredTools.length}</span>)</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollTools('left')}
                disabled={currentIndex === 0}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"  
                size="sm"
                onClick={() => scrollTools('right')}
                disabled={currentIndex >= Math.ceil(filteredTools.length / 12) - 1}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div ref={scrollRef} className="overflow-hidden">
            <div 
              className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4 pb-4 transition-transform duration-300" 
              style={{ 
                gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                width: `${Math.ceil(filteredTools.length / 2) * 320}px`,
                transform: `translateX(-${currentIndex * (6 * 320)}px)`
              }}
            >
              {filteredTools.map((tool, index) => (
                <Card 
                  key={index} 
                  className="w-72 h-full cursor-pointer group flex-shrink-0 transition-all duration-300 backdrop-blur-sm border border-purple-500/30 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-blue-900/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:border-purple-400/60 hover:scale-[1.02]" 
                  onClick={() => handleToolClick(getToolLink(tool))}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-colors">
                          <Zap className="h-5 w-5 text-purple-300" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold group-hover:text-purple-300 transition-colors leading-tight text-white">
                            {getToolName(tool)}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge 
                        variant="secondary" 
                        className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-purple-200 border-purple-400/50 font-medium"
                      >
                        {getCategory(tool)}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={getPricingModel(tool).toLowerCase() === "free" || getPricingModel(tool).toLowerCase() === "freemium"
                          ? "bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-300 border-green-500/50 font-medium" 
                          : "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/50 font-medium"
                        }
                      >
                        {getPricingModel(tool)}
                      </Badge>
                      {getEstimatedCost(tool) && (
                        <Badge variant="outline" className="bg-blue-500/30 border-blue-400/50 text-blue-200 font-medium">
                          {getEstimatedCost(tool)}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 pt-2">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-purple-300">Purpose:</h4>
                      <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
                        {getPurpose(tool)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-purple-500/30">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="p-1 rounded bg-purple-500/30">
                          <Zap className="h-3 w-3 text-purple-300" />
                        </div>
                        <span className="font-medium">AI Tool</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300 hover:scale-105 border border-purple-500/40 text-purple-200 hover:border-purple-400/60"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToolClick(getToolLink(tool));
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Try Tool
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {filteredTools.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2 text-foreground">No AI tools found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITools;
