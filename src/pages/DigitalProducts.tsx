
import { useState } from "react";
import { Search, Filter, Star, ExternalLink, Wrench, Smartphone, Monitor, ShoppingCart, Zap, Home, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for digital products - this will be replaced with real data later
const mockProducts = [
  {
    name: "Smart Home Controller Pro",
    category: "Smart Home",
    type: "Hardware",
    description: "Advanced IoT controller for managing all your smart home devices from one central hub.",
    price: "$299",
    rating: 4.8,
    features: ["Voice Control", "Mobile App", "Cloud Sync", "Multi-Device"],
    link: "#",
    image: "🏠"
  },
  {
    name: "Business Analytics Suite",
    category: "Business Software",
    type: "Software",
    description: "Comprehensive analytics platform for small to medium businesses with real-time reporting.",
    price: "$49/month",
    rating: 4.6,
    features: ["Real-time Analytics", "Custom Reports", "API Integration", "Multi-user"],
    link: "#",
    image: "📊"
  },
  {
    name: "Productivity Optimizer",
    category: "Utilities",
    type: "Software",
    description: "AI-powered productivity tool that learns your habits and optimizes your workflow.",
    price: "$19/month",
    rating: 4.7,
    features: ["AI Assistant", "Task Automation", "Time Tracking", "Goal Setting"],
    link: "#",
    image: "⚡"
  },
  {
    name: "Security Camera System",
    category: "Smart Home",
    type: "Hardware",
    description: "Professional-grade wireless security camera system with night vision and cloud storage.",
    price: "$399",
    rating: 4.9,
    features: ["4K Recording", "Night Vision", "Cloud Storage", "Mobile Alerts"],
    link: "#",
    image: "📹"
  },
  {
    name: "Invoice Management Pro",
    category: "Business Software",
    type: "Software",
    description: "Streamlined invoice management system with automated billing and payment tracking.",
    price: "$29/month",
    rating: 4.5,
    features: ["Auto Billing", "Payment Tracking", "Tax Integration", "Multi-Currency"],
    link: "#",
    image: "🧾"
  },
  {
    name: "Smart Energy Monitor",
    category: "Utilities",
    type: "Hardware",
    description: "Monitor and optimize your home's energy consumption with real-time insights.",
    price: "$149",
    rating: 4.4,
    features: ["Real-time Monitoring", "Cost Analysis", "Mobile App", "Smart Alerts"],
    link: "#",
    image: "⚡"
  }
];

const DigitalProducts = () => {
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filterProducts = () => {
    let filtered = products.filter((product) => {
      const searchMatch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));

      return searchMatch;
    });

    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((product) => product.type === typeFilter);
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setTimeout(filterProducts, 100);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setTimeout(filterProducts, 100);
  };

  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
    setTimeout(filterProducts, 100);
  };

  const getUniqueCategories = () => {
    return Array.from(new Set(products.map(product => product.category)));
  };

  const getUniqueTypes = () => {
    return Array.from(new Set(products.map(product => product.type)));
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'smart home':
        return <Home className="h-4 w-4" />;
      case 'business software':
        return <Building className="h-4 w-4" />;
      case 'utilities':
        return <Zap className="h-4 w-4" />;
      default:
        return <Wrench className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'smart home':
        return 'from-green-500 to-emerald-600';
      case 'business software':
        return 'from-blue-500 to-indigo-600';
      case 'utilities':
        return 'from-purple-500 to-violet-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            🛠️ dKloud Digital Products
          </h1>
          <p className="text-xl text-muted-foreground">
            Smart tools, software utilities, and digital solutions for home and business users
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, features..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getUniqueCategories().map((category) => (
                  <SelectItem key={category} value={category}>
                    <span className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      {category}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <Wrench className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {getUniqueTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              <span>Showing {filteredProducts.length} of {products.length} products</span>
              {(categoryFilter !== "all" || typeFilter !== "all" || searchTerm) && (
                <span className="ml-2 text-primary">• Filters active</span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setTypeFilter("all");
                setTimeout(filterProducts, 100);
              }}
              disabled={categoryFilter === "all" && typeFilter === "all" && !searchTerm}
            >
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
          {filteredProducts.map((product, index) => (
            <Card 
              key={index} 
              className="dkloud-card h-full group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-l-4"
              style={{ borderLeftColor: `hsl(var(--primary))` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant="secondary" 
                    className={`bg-gradient-to-r ${getCategoryColor(product.category)} text-white border-0 shadow-md`}
                  >
                    {getCategoryIcon(product.category)}
                    <span className="ml-1">{product.category}</span>
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.type}
                  </Badge>
                </div>

                <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
                  {product.name}
                </CardTitle>

                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 4).map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex} 
                        variant="outline" 
                        className="text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="group-hover:scale-105 transition-all duration-200"
                    onClick={() => window.open(product.link, "_blank", "noopener,noreferrer")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Coming Soon Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">More Products Coming Soon!</h2>
          <p className="text-muted-foreground mb-6">
            We're constantly adding new smart tools and digital solutions. 
            Stay tuned for innovative products that will enhance your home and business productivity.
          </p>
          <Button variant="outline" size="lg">
            Notify Me About New Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DigitalProducts;
