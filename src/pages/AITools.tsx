import { useState, useEffect, useRef } from "react";
import { Search, Filter, ExternalLink, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AITool {
  Toolname: string;
  Category: string;
  Purpose: string;
  Pricingmodel: string;
  "EstimatedCost (per month)": string;
  "Tools Link": string;
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
        "https://script.google.com/macros/s/AKfycbxpIEMPY1Ji3tft5mYLNaObg9csvvzCdoWuAcOpz-KQlMWWmytkzShEgZBJNQ3r3yl7/exec"
      );
      const data = await response.json();
      setTools(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AI tools:", error);
      setLoading(false);
    }
  };

  const filterTools = () => {
    let filtered = tools.filter((tool) =>
      String(tool.Toolname || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(tool.Purpose || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(tool.Category || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== "all") {
      filtered = filtered.filter((tool) => String(tool.Category) === categoryFilter);
    }

    if (pricingFilter !== "all") {
      filtered = filtered.filter((tool) => String(tool.Pricingmodel) === pricingFilter);
    }

    setFilteredTools(filtered);
  };

  const getUniqueValues = (key: keyof AITool) => {
    return Array.from(new Set(tools.map((tool) => tool[key]))).filter(Boolean);
  };

  const handleToolClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const scrollTools = (direction: 'left' | 'right') => {
    const itemsPerView = 12; // 2 rows of 6 items each
    const maxIndex = Math.ceil(filteredTools.length / itemsPerView) - 1;
    
    if (direction === 'right' && currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <div className="text-center mb-8">
           <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
             🤖 AI Tools Hub
           </h1>
           <p className="text-xl text-muted-foreground">
             Discover the <span className="text-primary font-medium">latest AI tools</span> to boost your <span className="text-emerald-500 font-medium">productivity</span> and <span className="text-purple-500 font-medium">creativity</span>
           </p>
         </div>

         {/* Filters */}
         <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 mb-8 space-y-4 border border-border/50 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getUniqueValues("Category").map((category) => (
                  <SelectItem key={String(category)} value={String(category)}>
                    {String(category)}
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
                {getUniqueValues("Pricingmodel").map((pricing) => (
                  <SelectItem key={String(pricing)} value={String(pricing)}>
                    {String(pricing)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
           <div className="flex justify-between items-center">
             <p className="text-sm text-muted-foreground">
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
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="relative">
          {/* Navigation Controls */}
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-semibold">AI Tools (<span className="text-primary">{filteredTools.length}</span>)</h3>
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
                 <Card key={index} className="dkloud-card h-full cursor-pointer group w-72 flex-shrink-0 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 backdrop-blur-sm bg-card/80 border border-border/50" onClick={() => handleToolClick(tool["Tools Link"])}>
               <CardHeader className="pb-3">
                 <div className="flex justify-between items-start">
                   <div className="flex items-center space-x-2">
                     <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-colors">
                       <Zap className="h-5 w-5 text-primary" />
                     </div>
                     <CardTitle className="text-base font-bold group-hover:text-primary transition-colors leading-tight">
                       {tool.Toolname || "Unnamed Tool"}
                     </CardTitle>
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-2 mt-3">
                   <Badge 
                     variant="secondary" 
                     className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-primary border-primary/30"
                   >
                     {tool.Category || "General"}
                   </Badge>
                   <Badge 
                     variant="outline"
                     className={tool.Pricingmodel === "Free" 
                       ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 border-green-500/30" 
                       : "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                     }
                   >
                     {tool.Pricingmodel || "Unknown"}
                   </Badge>
                   {tool["EstimatedCost (per month)"] && (
                     <Badge variant="outline" className="bg-muted/50 border-accent/30 text-accent">
                       {tool["EstimatedCost (per month)"]}
                     </Badge>
                   )}
                 </div>
              </CardHeader>
              
               <CardContent className="space-y-4 pt-2">
                 <div>
                   <h4 className="font-semibold text-sm mb-2 text-primary">Purpose:</h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">
                     {tool.Purpose || "No description available"}
                   </p>
                 </div>
                 
                 <div className="flex items-center justify-between pt-4 border-t border-border/50">
                   <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                     <div className="p-1 rounded bg-primary/20">
                       <Zap className="h-3 w-3 text-primary" />
                     </div>
                     <span className="font-medium">AI Tool</span>
                   </div>
                   <Button
                     variant="ghost"
                     size="sm"
                     className="group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300 hover:scale-105"
                     onClick={(e) => {
                       e.stopPropagation();
                       handleToolClick(tool["Tools Link"]);
                     }}
                   >
                     <ExternalLink className="h-4 w-4" />
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
            <h3 className="text-2xl font-semibold mb-2">No AI tools found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITools;