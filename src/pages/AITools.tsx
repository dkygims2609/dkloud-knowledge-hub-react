import { useState, useEffect } from "react";
import { Search, Filter, ExternalLink, Zap, Star } from "lucide-react";
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
      tool.Toolname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.Purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.Category.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🤖 AI Tools Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover the latest AI tools to boost your productivity and creativity
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
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
              Showing {filteredTools.length} of {tools.length} AI tools
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <Card key={index} className="dkloud-card h-full cursor-pointer group" onClick={() => handleToolClick(tool["Tools Link"])}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.Toolname}
                    </CardTitle>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{tool.Category}</Badge>
                  <Badge 
                    variant="outline"
                    className={tool.Pricingmodel === "Free" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
                  >
                    {tool.Pricingmodel}
                  </Badge>
                  {tool["EstimatedCost (per month)"] && (
                    <Badge variant="outline">
                      {tool["EstimatedCost (per month)"]}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Purpose:</h4>
                  <p className="text-sm text-muted-foreground">
                    {tool.Purpose}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    <span>AI Tool</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
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