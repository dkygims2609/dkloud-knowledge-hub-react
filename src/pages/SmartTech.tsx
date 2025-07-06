import { useState, useEffect } from "react";
import { Search, Filter, ExternalLink, Star, DollarSign, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Gadget {
  name: string;
  category: string;
  description: string;
  price: string;
  features: string;
  rating: number;
  availability: string;
  link: string;
  "why-recommended": string;
  brand: string;
}

const SmartTech = () => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [filteredGadgets, setFilteredGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    fetchGadgets();
  }, []);

  useEffect(() => {
    filterGadgets();
  }, [gadgets, searchTerm, categoryFilter, priceFilter]);

  const fetchGadgets = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwr6H1XNOUxlTTJJ6qE21hasJtAfTsl_ZJRYeurCGYNEpmwRVn-ZD4PECMAv4kzzw1T/exec"
      );
      const data = await response.json();
      setGadgets(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gadgets:", error);
      setLoading(false);
    }
  };

  const filterGadgets = () => {
    let filtered = gadgets.filter((gadget) =>
      gadget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gadget.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gadget.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== "all") {
      filtered = filtered.filter((gadget) => gadget.category === categoryFilter);
    }

    if (priceFilter !== "all") {
      if (priceFilter === "budget") {
        filtered = filtered.filter((gadget) => parseFloat(gadget.price.replace(/[^0-9.]/g, "")) < 100);
      } else if (priceFilter === "mid-range") {
        filtered = filtered.filter((gadget) => {
          const price = parseFloat(String(gadget.price).replace(/[^0-9.]/g, ""));
          return price >= 100 && price <= 500;
        });
      } else if (priceFilter === "premium") {
        filtered = filtered.filter((gadget) => parseFloat(gadget.price.replace(/[^0-9.]/g, "")) > 500);
      }
    }

    setFilteredGadgets(filtered);
  };

  const getUniqueValues = (key: keyof Gadget) => {
    return Array.from(new Set(gadgets.map((gadget) => String(gadget[key])))).filter(Boolean);
  };

  const handleGadgetClick = (link: string) => {
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
            💡 SmartTech Gadgets
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover innovative gadgets and smart devices to enhance your lifestyle
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gadgets, brands..."
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
                {getUniqueValues("category").map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (Under $100)</SelectItem>
                <SelectItem value="mid-range">Mid-range ($100-$500)</SelectItem>
                <SelectItem value="premium">Premium ($500+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredGadgets.length} of {gadgets.length} gadgets
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setPriceFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Gadgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGadgets.map((gadget, index) => (
            <Card key={index} className="dkloud-card h-full cursor-pointer group" onClick={() => handleGadgetClick(gadget.link)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {gadget.name}
                    </CardTitle>
                  </div>
                  {gadget.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{gadget.rating}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{gadget.category}</Badge>
                  <Badge variant="outline">{gadget.brand}</Badge>
                  <Badge 
                    variant="default"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    {gadget.availability}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {gadget.description}
                </CardDescription>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-lg font-semibold text-primary">{gadget.price}</span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                  <p className="text-sm text-muted-foreground">
                    {gadget.features}
                  </p>
                </div>
                
                {gadget["why-recommended"] && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Why Recommended:</h4>
                    <p className="text-sm text-muted-foreground">
                      {gadget["why-recommended"]}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    <span>Smart Gadget</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGadgetClick(gadget.link);
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGadgets.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No gadgets found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartTech;