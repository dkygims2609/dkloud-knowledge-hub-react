
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ShoppingCart, Heart, Filter, Loader2 } from "lucide-react";
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
      console.log('Raw API data:', data); // Debug logging
      
      // Handle dynamic columns from the API
      const formattedData = data.map((item: any, index: number) => {
        console.log('Processing item:', item); // Debug logging for each item
        
        // Create a base object with common fields, handling various possible column names
        const gadget: UniqueGadget = {
          id: `unique-${index}`,
          name: item['Product Name'] || item['Name'] || item.name || item.title || 'Unknown Product',
          description: item['Description'] || item.description || item.summary || item.details || 'No description available',
          image_url: item['Image URL'] || item['Image'] || item['Photo'] || item.image_url || item.image || item.photo || '/placeholder.svg',
          buy_link: item.buyLink || item['Buy Link'] || item['Purchase Link'] || item['Product Link'] || item.buy_link || item.link || item.url || '#',
          category: item['Category'] || item.category || item.type || 'General',
          brand: item['Brand'] || item.brand || item.manufacturer || 'Unknown',
          price: item['Price'] || item.price || item.cost || 'N/A',
          rating: item['Rating'] || item.rating || item.score || '',
          specifications: item['Specifications'] || item['Specs'] || item.specifications || item.features || '',
          availability: item['Availability'] || item.availability || item.stock || item.status || ''
        };
        
        console.log('Processed gadget buy_link:', gadget.buy_link); // Debug buy_link specifically
        
        // Add any additional dynamic columns that weren't mapped above
        Object.keys(item).forEach(key => {
          const lowerKey = key.toLowerCase();
          if (!gadget.hasOwnProperty(lowerKey) && !['product name', 'name', 'description', 'image url', 'image', 'buy link', 'purchase link', 'category', 'brand', 'price', 'rating', 'specifications', 'specs', 'availability'].includes(lowerKey)) {
            gadget[key] = item[key];
          }
        });
        
        return gadget;
      }) as UniqueGadget[];
      
      console.log('Final formatted data:', formattedData); // Debug final data
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

  const handleBuyClick = (buyLink: string, gadgetName: string) => {
    console.log('Buy button clicked for:', gadgetName, 'Link:', buyLink); // Debug logging
    if (buyLink && buyLink !== '#') {
      window.open(buyLink, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Invalid buy link for:', gadgetName);
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
                            onClick={() => handleBuyClick(gadget.buy_link || '', gadget.name)}
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
      </div>
    </div>
  );
};

export default SmartTech;
