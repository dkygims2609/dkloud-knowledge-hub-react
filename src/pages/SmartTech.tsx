import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ShoppingCart, Heart, Filter, Loader2, MapPin, Smartphone, Laptop, Tablet, Watch } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLatestGadgets } from "@/hooks/useLatestGadgets";
import { useState, useEffect } from "react";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { ErrorState, EmptyState } from "@/components/ui/error-boundary";
import { RefreshButton } from "@/components/ui/refresh-button";
import { useToast } from "@/hooks/useToast";

interface SmartTechTool {
  id: string;
  toolname: string;
  category: string;
  purpose: string;
  pricingmodel: string;
  estimatedcost: string;
  toolslink: string;
}

interface TechSpecsProduct {
  id: string;
  brand: string;
  name: string;
  image?: string;
  specifications?: any;
  launch_date?: string;
  price?: number;
  category?: string;
}

const SmartTech = () => {
  const { gadgets, loading, error, categories, brands, fetchGadgets, refresh, lastUpdated } = useLatestGadgets();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [indianOnly, setIndianOnly] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('real-smarttech');
  const [smartTechTools, setSmartTechTools] = useState<SmartTechTool[]>([]);
  const [techSpecsProducts, setTechSpecsProducts] = useState<TechSpecsProduct[]>([]);
  const [toolsLoading, setToolsLoading] = useState(false);
  const [techSpecsLoading, setTechSpecsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const { success: showSuccess, error: showError } = useToast();

  // Fetch Smart Tech Tools from corrected Google Sheets API
  const fetchSmartTechTools = async () => {
    setToolsLoading(true);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwZfjKJimT8xk8QOXuAoWs5zBN6XloA2KdwmftPGJaDE0MlKwhCF0rGWbKNLl6_xCVE/exec');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Smart Tech Tools API Response:', data);
      
      const formattedData = (Array.isArray(data) ? data : data.data || []).map((item: any, index: number) => ({
        id: `tool-${index}`,
        toolname: item.Toolname || item.toolname || 'Unknown Tool',
        category: item.Category || item.category || 'General',
        purpose: item.Purpose || item.purpose || 'No description available',
        pricingmodel: item.Pricingmodel || item.pricingmodel || 'Contact for pricing',
        estimatedcost: item['EstimatedCost (per month)'] || item.estimatedcost || 'N/A',
        toolslink: item['Tools Link'] || item.toolslink || '#'
      })) as SmartTechTool[];
      
      setSmartTechTools(formattedData);
      showSuccess("Smart Tech Tools loaded", "Successfully fetched latest tools");
    } catch (error) {
      console.error('Error fetching Smart Tech Tools:', error);
      showError("Failed to load Smart Tech Tools", "Using fallback data");
      
      // Fallback with sample data
      const fallbackData: SmartTechTool[] = [
        {
          id: 'tool-1',
          toolname: 'ChatGPT Plus',
          category: 'AI Assistant',
          purpose: 'Advanced AI-powered conversational assistant for productivity',
          pricingmodel: 'Subscription',
          estimatedcost: '$20/month',
          toolslink: 'https://openai.com/chatgpt'
        },
        {
          id: 'tool-2',
          toolname: 'Notion AI',
          category: 'Productivity',
          purpose: 'AI-enhanced note-taking and project management platform',
          pricingmodel: 'Freemium',
          estimatedcost: '$10/month',
          toolslink: 'https://notion.so'
        }
      ];
      setSmartTechTools(fallbackData);
    } finally {
      setToolsLoading(false);
    }
  };

  // Fetch TechSpecs API data with proper authentication
  const fetchTechSpecsData = async () => {
    setTechSpecsLoading(true);
    try {
      const response = await fetch('https://api.techspecs.io/v4/product/latest', {
        headers: {
          'X-API-Key': 'bcb845df-57b9-4954-9df5-156756de9d8f',
          'Authorization': 'Bearer bcb845df-57b9-4954-9df5-156756de9d8f',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`TechSpecs API error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('TechSpecs API Response:', data);
      
      const formattedData = (data.products || data || []).slice(0, 20).map((item: any, index: number) => ({
        id: `techspecs-${index}`,
        brand: item.brand || 'Unknown Brand',
        name: item.name || item.title || 'Unknown Product',
        image: item.image || item.image_url || '/placeholder.svg',
        specifications: item.specifications || item.specs || {},
        launch_date: item.launch_date || item.releaseDate || new Date().toISOString(),
        price: item.price || item.launch_price || 0,
        category: item.category || 'General'
      })) as TechSpecsProduct[];
      
      setTechSpecsProducts(formattedData);
      showSuccess("Latest products loaded", "Successfully fetched trending gadgets");
    } catch (error) {
      console.error('Error fetching TechSpecs data:', error);
      showError("TechSpecs API unavailable", "Using enhanced mock data");
      
      // Enhanced mock data with current products
      const mockData: TechSpecsProduct[] = [
        {
          id: 'mock-1',
          brand: 'Apple',
          name: 'iPhone 16 Pro Max',
          image: 'https://images.unsplash.com/photo-1592286130895-6e4b19efb85c?w=400&h=300&fit=crop',
          specifications: { display: '6.7" Super Retina', storage: '256GB', chip: 'A18 Pro' },
          launch_date: new Date().toISOString(),
          price: 1199,
          category: 'Phones'
        },
        {
          id: 'mock-2',
          brand: 'Samsung',
          name: 'Galaxy S25 Ultra',
          image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop',
          specifications: { display: '6.8" Dynamic AMOLED', storage: '512GB', ram: '12GB' },
          launch_date: new Date().toISOString(),
          price: 1299,
          category: 'Phones'
        },
        {
          id: 'mock-3',
          brand: 'MacBook',
          name: 'MacBook Air M4',
          image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
          specifications: { chip: 'M4', ram: '16GB', storage: '512GB SSD' },
          launch_date: new Date().toISOString(),
          price: 1499,
          category: 'Laptops'
        },
        {
          id: 'mock-4',
          brand: 'Apple',
          name: 'Apple Watch Series 10',
          image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
          specifications: { display: '45mm', battery: '36 hours', health: 'Advanced sensors' },
          launch_date: new Date().toISOString(),
          price: 429,
          category: 'Smartwatches'
        }
      ];
      setTechSpecsProducts(mockData);
    } finally {
      setTechSpecsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'real-smarttech') {
      fetchSmartTechTools();
    } else if (activeTab === 'trending') {
      fetchTechSpecsData();
    }
  }, [activeTab]);

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
    if (activeTab === 'real-smarttech') {
      await fetchSmartTechTools();
    } else if (activeTab === 'trending') {
      await fetchTechSpecsData();
    }
    showSuccess("Data refreshed", "Latest content loaded successfully");
  };

  const getFilteredTechSpecsProducts = () => {
    if (selectedFilter === 'All') return techSpecsProducts;
    return techSpecsProducts.filter(product => 
      product.category?.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  };

  const filterCategories = ['All', 'Phones', 'Laptops', 'Tablets', 'Smartwatches'];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "#f59e0b" }}>⚡</span> 
            <span style={{ color: "#6894f1" }}>Smart</span>
            <span style={{ color: "#7b72f2" }}>Tech</span> 
            <span style={{ color: "#8d61f3" }}>Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Latest smart tools with <span style={{ color: "#10b981" }} className="font-medium">real-time data</span> and <span style={{ color: "#6894f1" }} className="font-medium">trending launches</span>
          </p>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 bg-background/20 backdrop-blur-md border border-border/30 rounded-2xl p-2 mb-8">
            <TabsTrigger 
              value="real-smarttech" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              🛍️ Real SmartTech
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              🚀 Trending & New Launches
            </TabsTrigger>
          </TabsList>

          {/* Real SmartTech Tab */}
          <TabsContent value="real-smarttech" className="space-y-6">
            <div className="bg-card rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Smart Tech Tools Collection</span>
                </div>
                <RefreshButton onRefresh={fetchSmartTechTools} disabled={toolsLoading} />
              </div>
            </div>

            {toolsLoading ? (
              <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonLoader key={i} variant="card" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
                {smartTechTools.length === 0 ? (
                  <EmptyState 
                    title="No tools found"
                    description="No smart tech tools available from the data source."
                    className="col-span-full"
                  />
                ) : (
                  smartTechTools.map((tool) => (
                    <Card key={tool.id} className="dkloud-card h-full group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20 border-2 hover:border-amber-500/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant="secondary" className="shrink-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                            {tool.category}
                          </Badge>
                        </div>
                        
                        <CardTitle className="text-lg leading-tight group-hover:text-amber-600 transition-colors">
                          {tool.toolname}
                        </CardTitle>
                        
                        <CardDescription className="text-sm line-clamp-3">
                          {tool.purpose}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Pricing:</span>
                              <span className="text-sm font-medium">{tool.pricingmodel}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Est. Cost:</span>
                              <span className="text-lg font-bold text-amber-600">{tool.estimatedcost}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                              onClick={() => tool.toolslink && tool.toolslink !== '#' && window.open(tool.toolslink, '_blank', 'noopener,noreferrer')}
                              disabled={!tool.toolslink || tool.toolslink === '#'}
                            >
                              <ExternalLink className="h-3 w-3 mr-2" />
                              Try Tool
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          {/* Trending & New Launches Tab */}
          <TabsContent value="trending" className="space-y-6">
            <div className="bg-card rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter by Category:</span>
                </div>
                <RefreshButton onRefresh={fetchTechSpecsData} disabled={techSpecsLoading} />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filterCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedFilter === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedFilter === category 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedFilter(category)}
                  >
                    {category === 'Phones' && <Smartphone className="h-3 w-3 mr-1" />}
                    {category === 'Laptops' && <Laptop className="h-3 w-3 mr-1" />}
                    {category === 'Tablets' && <Tablet className="h-3 w-3 mr-1" />}
                    {category === 'Smartwatches' && <Watch className="h-3 w-3 mr-1" />}
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {techSpecsLoading ? (
              <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonLoader key={i} variant="card" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
                {getFilteredTechSpecsProducts().length === 0 ? (
                  <EmptyState 
                    title="No products found"
                    description="No trending products available for the selected category."
                    className="col-span-full"
                  />
                ) : (
                  getFilteredTechSpecsProducts().map((product) => (
                    <Card key={product.id} className="dkloud-card h-full group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-blue-50/20 dark:to-blue-950/20 border-2 hover:border-blue-500/50">
                      <div className="relative">
                        <img 
                          src={product.image || '/placeholder.svg'} 
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                          🚀 New Launch
                        </Badge>
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant="secondary" className="shrink-0">
                            {product.category}
                          </Badge>
                        </div>
                        
                        <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </CardTitle>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium">{product.brand}</span>
                        </div>
                        
                        <CardDescription className="text-sm">
                          Launch Date: {new Date(product.launch_date || '').toLocaleDateString() || 'TBA'}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-blue-600">
                                {product.price ? `$${product.price.toLocaleString()}` : 'Price TBA'}
                              </span>
                            </div>
                          </div>
                          
                          {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground">Key Specs:</p>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                                  <Badge key={key} variant="outline" className="text-xs">
                                    {key}: {String(value).slice(0, 10)}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            >
                              <ExternalLink className="h-3 w-3 mr-2" />
                              Compare
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Database Gadgets Section - Keep as fallback */}
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
                              {gadget.price_inr ? `₹${gadget.price_inr.toLocaleString()}` : gadget.price_usd ? `$${gadget.price_usd.toLocaleString()}` : 'Price not available'}
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
