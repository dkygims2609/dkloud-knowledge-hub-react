import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Tag, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEnhancedNewsData } from "@/hooks/useEnhancedNewsData";
import { useState } from "react";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { ErrorState, EmptyState } from "@/components/ui/error-boundary";
import { RefreshButton } from "@/components/ui/refresh-button";

const TechNews = () => {
  const { news, loading, error, categories, sources, fetchNews } = useEnhancedNewsData();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');

  const handleFilterChange = async () => {
    await fetchNews({
      category: selectedCategory || undefined,
      source: selectedSource || undefined,
      limit: 20
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            📰 Tech News Feed
          </h1>
          <p className="text-xl text-muted-foreground">
            Latest technology news with focus on Indian market
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <RefreshButton onRefresh={() => fetchNews()} disabled={loading} />
          </div>
          <div className="flex flex-wrap gap-4 items-center">
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.length > 0 && categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSource} onValueChange={setSelectedSource}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sources</SelectItem>
              {sources.length > 0 && sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

        {/* News Grid */}
        {error && (
          <ErrorState 
            error={error}
            onRetry={() => fetchNews()}
            title="Failed to load news"
            description="We couldn't fetch the latest tech news. Please try again."
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
            {news.length === 0 ? (
              <EmptyState 
                title="No news articles found"
                description="Try adjusting your filters or check back later for fresh content."
                action={
                  <Button onClick={() => fetchNews()} variant="outline">
                    Reset Filters
                  </Button>
                }
                className="col-span-full"
              />
            ) : (
              news.map((item) => (
                <Card key={item.id} className="dkloud-card h-full group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary" className="shrink-0">
                        {item.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(item.published_date)}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {item.image_url && (
                        <div className="relative h-32 mb-3">
                          <img 
                            src={item.image_url} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{item.source}</span>
                        <span>• India Focus</span>
                      </div>
                      
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag, tagIndex) => (
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
                        onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Read Article
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => fetchNews({ limit: 40 })}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Load More Articles
          </Button>
        </div>

        {/* Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            News articles are automatically updated from Indian and global tech sources
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechNews;