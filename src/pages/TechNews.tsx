
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Tag, Filter, Loader2, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRealTechNews } from "@/hooks/useRealTechNews";
import { useState, useEffect } from "react";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { ErrorState, EmptyState } from "@/components/ui/error-boundary";
import { RefreshButton } from "@/components/ui/refresh-button";
import { toast } from "@/components/ui/use-toast";

const TechNews = () => {
  const { news, loading, error, categories, sources, fetchNews } = useRealTechNews();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Auto-refresh every 30 minutes for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
      setLastRefresh(new Date());
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [fetchNews]);

  const handleFilterChange = async () => {
    await fetchNews({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      source: selectedSource === 'all' ? undefined : selectedSource,
      limit: 20
    });
    
    toast({
      title: "Filters Applied",
      description: "News feed updated with your selected filters",
    });
  };

  const handleRefresh = async () => {
    setLastRefresh(new Date());
    await fetchNews();
    toast({
      title: "News Refreshed",
      description: "Latest tech news has been loaded",
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const isRecentNews = (dateString: string) => {
    const date = new Date(dateString);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return date >= sevenDaysAgo;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI Innovation': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Space Science': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Cloud Computing': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Enterprise Software': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Consumer Tech': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Electric Vehicles': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      'Indian Market': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🚀 Tech News 2025
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Latest technology news with AI innovation, space science & Indian market focus
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 border shadow-sm">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Smart Filters:</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <RefreshButton onRefresh={handleRefresh} disabled={loading} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.length > 0 && sources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleFilterChange}
              className="w-full md:w-auto"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <ErrorState 
            error={error}
            onRetry={handleRefresh}
            title="Failed to load tech news"
            description="We couldn't fetch the latest tech news. Please try again."
          />
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonLoader key={i} variant="card" />
            ))}
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {news.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState 
                    title="No news articles found"
                    description="Try adjusting your filters or check back later for fresh content."
                    action={
                      <Button onClick={handleRefresh} variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh News
                      </Button>
                    }
                  />
                </div>
              ) : (
                news.map((item) => (
                  <Card key={item.id} className="dkloud-card h-full group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                        <div className="flex items-center gap-2">
                          {isRecentNews(item.published_date) && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Fresh
                            </Badge>
                          )}
                          <div className="flex items-center text-xs text-muted-foreground gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimeAgo(item.published_date)}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {item.image_url && (
                          <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-medium">{item.source}</span>
                          <div className="flex items-center gap-1">
                            <span>🇮🇳</span>
                            <span>India Focus</span>
                          </div>
                        </div>
                        
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 4).map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs px-2 py-0.5">
                                <Tag className="h-2 w-2 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          onClick={() => {
                            if (item.url && item.url !== "#") {
                              window.open(item.url, '_blank', 'noopener,noreferrer');
                            }
                          }}
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Read Full Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Load More Button */}
            {news.length > 0 && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => fetchNews({ limit: 40 })}
                  disabled={loading}
                  className="min-w-48"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Load More Articles
                </Button>
              </div>
            )}
          </>
        )}

        {/* Enhanced Footer */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-sm text-muted-foreground">
            🔄 Auto-refreshed every 30 minutes • 📅 Fresh news from last 7 days • 🗃️ Archive up to 3 months
          </p>
          <p className="text-xs text-muted-foreground">
            Sources: TechCrunch, The Verge, Economic Times, LiveMint, ISRO, OpenAI, Google, Microsoft & more
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechNews;
