import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ShoppingCart, Heart, Filter, Loader2, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGadgetData } from "@/hooks/useGadgetData";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SmartTech = () => {
  const { gadgets, loading, error, categories, brands, fetchGadgets } = useGadgetData();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [indianOnly, setIndianOnly] = useState<boolean>(false);

  const handleFilterChange = async () => {
    await fetchGadgets({
      category: selectedCategory || undefined,
      brand: selectedBrand || undefined,
      availableInIndia: indianOnly || undefined,
      limit: 20
    });
  };

  const formatPrice = (priceUSD?: number, priceINR?: number) => {
    if (priceINR) return `₹${priceINR.toLocaleString()}`;
    if (priceUSD) return `$${priceUSD.toLocaleString()}`;
    return 'Price not available';
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            💡 SmartTech Gadgets
          </h1>
          <p className="text-xl text-muted-foreground">
            Latest gadgets with Indian market availability and pricing
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="indian-only"
                checked={indianOnly}
                onChange={(e) => setIndianOnly(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="indian-only" className="text-sm cursor-pointer flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Available in India
              </label>
            </div>

            <Button 
              onClick={handleFilterChange}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Gadgets Grid */}
        {error && (
          <div className="text-center py-8">
            <p className="text-destructive mb-4">Error loading gadgets: {error}</p>
            <Button onClick={() => fetchGadgets()} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-full">
                <Skeleton className="h-48 w-full mb-4" />
                <CardHeader>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gadgets.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No gadgets found. Try adjusting your filters.</p>
              </div>
            ) : (
              gadgets.map((gadget) => (
                <Card key={gadget.id} className="dkloud-card h-full group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  {gadget.tags?.includes('India') && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-orange-500 to-green-500 text-white border-0">
                        🇮🇳 India Special
                      </Badge>
                    </div>
                  )}
                  
                  <div className="relative">
                    {gadget.image_url ? (
                      <img 
                        src={gadget.image_url} 
                        alt={gadget.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute top-4 right-4 h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary" className="shrink-0">
                        {gadget.category}
                      </Badge>
                      {gadget.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{gadget.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {gadget.name}
                    </CardTitle>
                    
                    {gadget.brand && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">{gadget.brand}</span>
                      </div>
                    )}
                    
                    <CardDescription className="text-sm line-clamp-2">
                      {gadget.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(gadget.price_usd, gadget.price_inr)}
                          </span>
                          {gadget.price_inr && gadget.price_usd && (
                            <span className="text-xs text-muted-foreground">
                              (${gadget.price_usd})
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {gadget.tags && gadget.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {gadget.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className={`text-xs font-medium ${gadget.availability_india ? 'text-green-600' : 'text-orange-600'}`}>
                        {gadget.availability_india ? '✓ Available in India' : '⚠ Limited Availability'}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => gadget.product_url && window.open(gadget.product_url, '_blank', 'noopener,noreferrer')}
                          disabled={!gadget.product_url}
                        >
                          <ShoppingCart className="h-3 w-3 mr-2" />
                          {gadget.availability_india ? 'Buy Now' : 'View Details'}
                        </Button>
                        {gadget.affiliate_url && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(gadget.affiliate_url, '_blank', 'noopener,noreferrer')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartTech;