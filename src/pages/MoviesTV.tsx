
import { useState, useEffect } from "react";
import { Search, Filter, Star, Award, Calendar, ChevronLeft, ChevronRight, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface ContentItem {
  Name?: string;
  Title?: string;
  Genre: string;
  Platform: string;
  DKcloudRating: number | string;
  Language: string;
  Awards?: string;
  "Why to Watch": string;
  Year?: number;
  Director?: string;
  Creator?: string;
  Seasons?: number;
  Status?: string;
  Achievements?: string;
  Type?: string;
  TrendingRank?: number;
  PopularityScore?: number;
}

const MoviesTV = () => {
  const [movies, setMovies] = useState<ContentItem[]>([]);
  const [tvSeries, setTvSeries] = useState<ContentItem[]>([]);
  const [ultimateList, setUltimateList] = useState<ContentItem[]>([]);
  const [trending, setTrending] = useState<ContentItem[]>([]);
  
  const [filteredMovies, setFilteredMovies] = useState<ContentItem[]>([]);
  const [filteredTvSeries, setFilteredTvSeries] = useState<ContentItem[]>([]);
  const [filteredUltimateList, setFilteredUltimateList] = useState<ContentItem[]>([]);
  
  const [loading, setLoading] = useState({
    movies: true,
    tv: true,
    ultimate: true,
    trending: true
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("movies");

  const [currentPage, setCurrentPage] = useState({
    movies: 0,
    tv: 0,
    ultimate: 0
  });

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    filterContent();
  }, [movies, tvSeries, ultimateList, searchTerm, genreFilter, platformFilter, ratingFilter, languageFilter, activeTab]);

  useEffect(() => {
    // Reset filters when switching tabs
    clearFilters();
    setCurrentPage(prev => ({ ...prev, [activeTab]: 0 }));
  }, [activeTab]);

  const fetchAllData = async () => {
    const endpoints = {
      movies: "https://script.google.com/macros/s/AKfycbzO53FfgLV-2Kq5pP0fYF7yjFw1CQlZkZoc5TEIn3rDcPSxv8MB8koOasYlf6BuXXCQ/exec",
      tv: "https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec",
      ultimate: "https://script.google.com/macros/s/AKfycbwA8KIHelLQllAKNIgIYtfo3dyvBCef7kOfuYuEfM4SEF4y1ivyTHFddVUO1VrWyA4c-Q/exec",
      trending: "https://script.google.com/macros/s/AKfycbyCeRakH_SOeSQO3PGFMtphknTGIe3mzcFRZcCmjQdAEkOtiK8-3m2WSL1tJ8dOXy8/exec"
    };

    const fetchWithRetry = async (url: string, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        } catch (error) {
          console.error(`Attempt ${i + 1} failed for ${url}:`, error);
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    };

    // Fetch Movies
    try {
      const moviesData = await fetchWithRetry(endpoints.movies);
      setMovies(Array.isArray(moviesData) ? moviesData : []);
      setLoading(prev => ({ ...prev, movies: false }));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
      setLoading(prev => ({ ...prev, movies: false }));
      toast.error("Failed to load movies data");
    }

    // Fetch TV Series
    try {
      const tvData = await fetchWithRetry(endpoints.tv);
      setTvSeries(Array.isArray(tvData) ? tvData : []);
      setLoading(prev => ({ ...prev, tv: false }));
    } catch (error) {
      console.error("Failed to fetch TV series:", error);
      setTvSeries([]);
      setLoading(prev => ({ ...prev, tv: false }));
      toast.error("Failed to load TV series data");
    }

    // Fetch Ultimate List
    try {
      const ultimateData = await fetchWithRetry(endpoints.ultimate);
      setUltimateList(Array.isArray(ultimateData) ? ultimateData : []);
      setLoading(prev => ({ ...prev, ultimate: false }));
    } catch (error) {
      console.error("Failed to fetch ultimate list:", error);
      setUltimateList([]);
      setLoading(prev => ({ ...prev, ultimate: false }));
      toast.error("Failed to load ultimate list data");
    }

    // Fetch Trending
    try {
      const trendingData = await fetchWithRetry(endpoints.trending);
      setTrending(Array.isArray(trendingData) ? trendingData : []);
      setLoading(prev => ({ ...prev, trending: false }));
    } catch (error) {
      console.error("Failed to fetch trending:", error);
      setTrending([]);
      setLoading(prev => ({ ...prev, trending: false }));
      toast.error("Failed to load trending data");
    }
  };

  const filterContent = () => {
    const applyFilters = (data: ContentItem[]) => {
      return data.filter((item) => {
        // Get the name/title safely - handle both Name and Title properties and ensure they're strings
        const itemName = String(item.Name || item.Title || "");
        const itemGenre = String(item.Genre || "");
        const itemPlatform = String(item.Platform || "");
        const itemLanguage = String(item.Language || "");
        const itemDirector = String(item.Director || "");
        const itemCreator = String(item.Creator || "");
        
        const matchesSearch = 
          itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itemDirector.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itemCreator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itemGenre.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGenre = genreFilter === "all" || itemGenre === genreFilter;
        const matchesPlatform = platformFilter === "all" || itemPlatform === platformFilter;
        const matchesLanguage = languageFilter === "all" || itemLanguage === languageFilter;
        
        let matchesRating = true;
        const rating = parseFloat(String(item.DKcloudRating)) || 0;
        if (ratingFilter === "high") matchesRating = rating >= 8;
        else if (ratingFilter === "medium") matchesRating = rating >= 6 && rating < 8;
        else if (ratingFilter === "low") matchesRating = rating < 6;

        return matchesSearch && matchesGenre && matchesPlatform && matchesLanguage && matchesRating;
      });
    };

    setFilteredMovies(applyFilters(movies));
    setFilteredTvSeries(applyFilters(tvSeries));
    setFilteredUltimateList(applyFilters(ultimateList));
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "movies": return movies;
      case "tv": return tvSeries;
      case "ultimate": return ultimateList;
      default: return [];
    }
  };

  const getUniqueValues = (key: string) => {
    const activeData = getActiveData();
    return Array.from(new Set(activeData.map((item: any) => item[key]))).filter(Boolean);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGenreFilter("all");
    setPlatformFilter("all");
    setRatingFilter("all");
    setLanguageFilter("all");
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    const currentData = activeTab === "movies" ? filteredMovies : 
                       activeTab === "tv" ? filteredTvSeries : filteredUltimateList;
    const maxPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
    const currentPageNum = currentPage[activeTab as keyof typeof currentPage];

    if (direction === 'next' && currentPageNum < maxPages - 1) {
      setCurrentPage(prev => ({ ...prev, [activeTab]: currentPageNum + 1 }));
    } else if (direction === 'prev' && currentPageNum > 0) {
      setCurrentPage(prev => ({ ...prev, [activeTab]: currentPageNum - 1 }));
    }
  };

  const getCurrentPageData = (data: ContentItem[]) => {
    const currentPageNum = currentPage[activeTab as keyof typeof currentPage];
    const start = currentPageNum * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  const renderContentCard = (item: ContentItem, index: number) => (
    <Card key={index} className="dkloud-card dkloud-card-interactive h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.Name || item.Title}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.DKcloudRating}</span>
          </div>
        </div>
        {(item.Director || item.Creator) && (
          <CardDescription className="font-medium text-primary">
            {item.Director || item.Creator}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{item.Genre}</Badge>
          <Badge variant="outline">{item.Platform}</Badge>
          <Badge variant="outline">{item.Language}</Badge>
          {item.Year && <Badge variant="outline">{item.Year}</Badge>}
          {item.Type && <Badge variant="default">{item.Type}</Badge>}
        </div>
        
        {item.Seasons && item.Status && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{item.Seasons} Season{item.Seasons > 1 ? 's' : ''}</span>
            </div>
            <Badge variant={item.Status === "Completed" ? "default" : "secondary"}>
              {item.Status}
            </Badge>
          </div>
        )}
        
        <div>
          <h4 className="font-semibold text-sm mb-2">Why to Watch:</h4>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {item["Why to Watch"]}
          </p>
        </div>
        
        {item.Awards && (
          <div className="pt-2 border-t border-border">
            <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
              <Award className="h-3 w-3 mr-1" />
              {item.Awards}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const LoadingState = () => (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-muted-foreground">Loading content...</span>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🎬📺 Movies & TV Series
          </h1>
          <p className="text-xl text-muted-foreground">
            Curated collection of must-watch movies and binge-worthy TV series
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto p-1">
            <TabsTrigger value="movies" className="text-sm lg:text-base p-3">
              🎬 Movies ({filteredMovies.length})
            </TabsTrigger>
            <TabsTrigger value="tv" className="text-sm lg:text-base p-3">
              📺 TV Series ({filteredTvSeries.length})
            </TabsTrigger>
            <TabsTrigger value="ultimate" className="text-sm lg:text-base p-3">
              ⭐ Ultimate ({filteredUltimateList.length})
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-sm lg:text-base p-3">
              🔥 Trending ({trending.length})
            </TabsTrigger>
          </TabsList>

          {/* Filters - Only show for Movies, TV, Ultimate tabs */}
          {activeTab !== "trending" && (
            <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {getUniqueValues("Genre").map((genre) => (
                      <SelectItem key={String(genre)} value={String(genre)}>
                        {String(genre)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    {getUniqueValues("Platform").map((platform) => (
                      <SelectItem key={String(platform)} value={String(platform)}>
                        {String(platform)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="high">High (8+)</SelectItem>
                    <SelectItem value="medium">Medium (6-8)</SelectItem>
                    <SelectItem value="low">Low (&lt;6)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {getUniqueValues("Language").map((language) => (
                      <SelectItem key={String(language)} value={String(language)}>
                        {String(language)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {activeTab === "movies" ? filteredMovies.length : 
                           activeTab === "tv" ? filteredTvSeries.length : 
                           filteredUltimateList.length} results
                </p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          {/* Content Tabs */}
          <TabsContent value="movies">
            {loading.movies ? (
              <LoadingState />
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Movies ({filteredMovies.length})</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange('prev')}
                      disabled={currentPage.movies === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground flex items-center">
                      {currentPage.movies + 1} / {Math.ceil(filteredMovies.length / ITEMS_PER_PAGE) || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange('next')}
                      disabled={currentPage.movies >= Math.ceil(filteredMovies.length / ITEMS_PER_PAGE) - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getCurrentPageData(filteredMovies).map((movie, index) => renderContentCard(movie, index))}
                </div>
                
                {filteredMovies.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold mb-2">No movies found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tv">
            {loading.tv ? (
              <LoadingState />
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">TV Series ({filteredTvSeries.length})</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange('prev')}
                      disabled={currentPage.tv === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground flex items-center">
                      {currentPage.tv + 1} / {Math.ceil(filteredTvSeries.length / ITEMS_PER_PAGE) || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange('next')}
                      disabled={currentPage.tv >= Math.ceil(filteredTvSeries.length / ITEMS_PER_PAGE) - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getCurrentPageData(filteredTvSeries).map((show, index) => renderContentCard(show, index))}
                </div>
                
                {filteredTvSeries.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold mb-2">No TV series found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ultimate">
            {loading.ultimate ? (
              <LoadingState />
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Ultimate List ({filteredUltimateList.length})</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange('prev')}
                      disabled={currentPage.ultimate === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground flex items-center">
                      {currentPage.ultimate + 1} / {Math.ceil(filteredUltimateList.length / ITEMS_PER_PAGE) || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange('next')}
                      disabled={currentPage.ultimate >= Math.ceil(filteredUltimateList.length / ITEMS_PER_PAGE) - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getCurrentPageData(filteredUltimateList).map((item, index) => renderContentCard(item, index))}
                </div>
                
                {filteredUltimateList.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold mb-2">No content found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending">
            {loading.trending ? (
              <LoadingState />
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    What's Trending Now
                  </h3>
                  <p className="text-muted-foreground">The hottest movies and shows everyone's talking about</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trending.slice(0, 9).map((item, index) => (
                    <Card key={index} className="dkloud-card dkloud-card-interactive relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="default" className="bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
                          #{index + 1} Trending
                        </Badge>
                      </div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl font-bold">{item.Name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-lg font-bold">{item.DKcloudRating}</span>
                          </div>
                        </div>
                        {(item.Director || item.Creator) && (
                          <CardDescription className="font-medium text-primary text-lg">
                            {item.Director || item.Creator}
                          </CardDescription>
                        )}
                      </CardHeader>
                      
                      <CardContent className="space-y-4 relative z-10">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{item.Genre}</Badge>
                          <Badge variant="outline">{item.Platform}</Badge>
                          <Badge variant="outline">{item.Language}</Badge>
                          {item.Type && (
                            <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                              {item.Type}
                            </Badge>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">🔥 Why It's Trending:</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {item["Why to Watch"]}
                          </p>
                        </div>
                        
                        {item.Awards && (
                          <div className="pt-4 border-t border-border">
                            <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                              <Award className="h-4 w-4 mr-1" />
                              {item.Awards}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {trending.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold mb-2">No trending content available</h3>
                    <p className="text-muted-foreground">Check back later for the latest trending content.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MoviesTV;
