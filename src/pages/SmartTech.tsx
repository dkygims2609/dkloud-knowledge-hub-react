import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ShoppingCart, Heart, Filter, Loader2, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLatestGadgets } from "@/hooks/useLatestGadgets";
import { useState, useEffect } from "react";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { ErrorState, EmptyState } from "@/components/ui/error-boundary";
import { RefreshButton } from "@/components/ui/refresh-button";
import { useToast } from "@/hooks/useToast";

interface UniqueGadget {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  buy_link?: string;
  category?: string;
  brand?: string;
  price?: string;
  rating?: string;
  specifications?: string;
  availability?: string;
  [key: string]: any; // Allow for dynamic columns from the API
}

const SmartTech = () => {
  const { gadgets, loading, error, categories, brands, fetchGadgets, refresh, lastUpdated } = useLatestGadgets();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [indianOnly, setIndianOnly] = useState<boolean>(false);
  const [uniqueGadgets, setUniqueGadgets] = useState<UniqueGadget[]>([]);
  const [uniqueLoading, setUniqueLoading] = useState(false);
  const [uniqueError, setUniqueError] = useState<string | null>(null);
  const { success: showSuccess } = useToast();

  // Fetch Unique Gadgets from Google Sheets API
  const fetchUniqueGadgets = async () => {
    setUniqueLoading(true);
    setUniqueError(null);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwZfjKJimT8xk8QOXuAoWs5zBN6XloA2KdwmftPGJaDE0MlKwhCF0rGWbKNLl6_xCVE/exec');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle dynamic columns from the API
      const formattedData = data.map((item: any, index: number) => {
        // Create a base object with common fields, handling various possible column names
        const gadget: UniqueGadget = {
          id: `unique-${index}`,
          name: item['Product Name'] || item['Name'] || item.name || item.title || 'Unknown Product',
          description: item['Description'] || item.description || item.summary || item.details || 'No description available',
          image_url: item['Image URL'] || item['Image'] || item['Photo'] || item.image_url || item.image || item.photo || '/placeholder.svg',
          buy_link: item['Buy Link'] || item['Purchase Link'] || item['Product Link'] || item.buy_link || item.link || item.url || '#',
          category: item['Category'] || item.category || item.type || 'General',
          brand: item['Brand'] || item.brand || item.manufacturer || 'Unknown',
          price: item['Price'] || item.price || item.cost || 'N/A',
          rating: item['Rating'] || item.rating || item.score || '',
          specifications: item['Specifications'] || item['Specs'] || item.specifications || item.features || '',
          availability: item['Availability'] || item.availability || item.stock || item.status || ''
        };
        
        // Add any additional dynamic columns that weren't mapped above
        Object.keys(item).forEach(key => {
          const lowerKey = key.toLowerCase();
          if (!gadget.hasOwnProperty(lowerKey) && !['product name', 'name', 'description', 'image url', 'image', 'buy link', 'purchase link', 'category', 'brand', 'price', 'rating', 'specifications', 'specs', 'availability'].includes(lowerKey)) {
            gadget[key] = item[key];
          }
        });
        
        return gadget;
      }) as UniqueGadget[];
      
      setUniqueGadgets(formattedData);
      showSuccess("Data loaded", "Unique gadgets loaded successfully");
    } catch (error) {
      console.error('Error fetching unique gadgets:', error);
      setUniqueError(error instanceof Error ? error.message : 'Failed to fetch unique gadgets');
      setUniqueGadgets([]);
    } finally {
      setUniqueLoading(false);
    }
  };

  useEffect(() => {
    fetchUniqueGadgets();
  }, []);

  const handleFilterChange = async () => {
    await fetchGadgets({
      category: selectedCategory === 'all' ? undefined : selectedCategory || undefined,
      brand: selectedBrand === 'all' ? undefined : selectedBrand || undefined,
      availableInIndia: indianOnly || undefined,
      limit: 20
    });
    showSuccess("Filters applied", "SmartTech data updated successfully");
  };

  const handleRefresh = async () => {
    await refresh();
    showSuccess("Data refreshed", "Latest gadgets loaded successfully");
  };

  const formatPrice = (priceUSD?: number, priceINR?: number) => {
    if (priceINR) return `₹${priceINR.toLocaleString()}`;
    if (priceUSD) return `$${priceUSD.toLocaleString()}`;
    return 'Price not available';
  };

  const handleBuyClick = (buyLink: string) => {
    if (buyLink && buyLink !== '#') {
      window.open(buyLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "#f59e0b" }}>⚡</span> 
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Smart</span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Tech</span> 
            <span style={{ color: "#8d61f3" }}>Gadgets</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Latest gadgets with <span style={{ color: "#10b981" }} className="font-medium">Indian market</span> availability and <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-medium">real-time pricing</span>
          </p>
        </div>

        {/* Unique Gadgets Section */}
        <div className="mb-16">
          <div className="bg-card rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">💎 Unique Gadgets Collection:</span>
              </div>
              <RefreshButton onRefresh={fetchUniqueGadgets} disabled={uniqueLoading} />
            </div>
          </div>

          {uniqueError && (
            <ErrorState 
              error={uniqueError}
              onRetry={fetchUniqueGadgets}
              title="Failed to load unique gadgets"
              description="We couldn't fetch the unique gadgets data. Please try again."
            />
          )}

          {uniqueLoading ? (
            <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonLoader key={i} variant="card" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
              {uniqueGadgets.length === 0 ? (
                <EmptyState 
                  title="No unique gadgets found"
                  description="No unique gadgets available from the collection."
                  className="col-span-full"
                />
              ) : (
                uniqueGadgets.map((gadget) => (
                  <Card key={gadget.id} className="dkloud-card h-full group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-purple-50/10 dark:to-purple-950/20 border-2 hover:border-purple-500/50">
                    <div className="relative">
                      <img 
                        src={gadget.image_url || '/placeholder.svg'} 
                        alt={gadget.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
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
                        <Badge variant="secondary" className="shrink-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                          {gadget.category}
                        </Badge>
                        {gadget.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{gadget.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">
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
                            <span className="text-lg font-bold text-purple-600">
                              {gadget.price}
                            </span>
                          </div>
                        </div>
                        
                        {gadget.specifications && (
                          <div className="text-xs text-muted-foreground">
                            <p className="font-medium mb-1">Specifications:</p>
                            <p className="line-clamp-2">{gadget.specifications}</p>
                          </div>
                        )}
                        
                        {gadget.availability && (
                          <div className="text-xs font-medium text-green-600">
                            ✓ {gadget.availability}
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                            onClick={() => handleBuyClick(gadget.buy_link || '')}
                            disabled={!gadget.buy_link || gadget.buy_link === '#'}
                          >
                            <ShoppingCart className="h-3 w-3 mr-2" />
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>

        {/* Existing Database Gadgets Section - Keep as fallback */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            <span style={{ color: "#6894f1" }}>Database</span> Collection
          </h2>
          
          {/* Filters */}
          <div className="bg-card rounded-xl p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <div className="flex items-center gap-4">
                {lastUpdated && (
                  <span className="text-xs text-muted-foreground">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
                <RefreshButton onRefresh={handleRefresh} disabled={loading} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.length > 0 && categories.map((category) => (
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
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.length > 0 && brands.map((brand) => (
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
            <ErrorState 
              error={error}
              onRetry={() => fetchGadgets()}
              title="Failed to load gadgets"
              description="We couldn't fetch the latest gadget data. Please try again."
            />
          )}

          {loading ? (
            <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonLoader key={i} variant="card" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
              {gadgets.length === 0 ? (
                <EmptyState 
                  title="No gadgets found"
                  description="Try adjusting your filters or check back later for new products."
                  action={
                    <Button onClick={() => fetchGadgets()} variant="outline">
                      Reset Filters
                    </Button>
                  }
                  className="col-span-full"
                />
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
                          alt={`${gadget.name} - ${gadget.category} by ${gadget.brand || 'Unknown brand'}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
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
    </div>
  );
};

export default SmartTech;
