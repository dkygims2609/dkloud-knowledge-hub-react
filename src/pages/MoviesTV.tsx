
import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar, Star, TrendingUp, Film, Tv, Trophy, ExternalLink, Play, ChevronLeft, ChevronRight, Award, User, Globe } from "lucide-react";
import { toast } from "sonner";
import { ModernTabSystem } from "@/components/ModernTabSystem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface Movie {
  Name?: string;
  Genre?: string;
  Platform?: string;
  DKcloudRating?: string | number;
  Language?: string;
  Awards?: string;
  Achievements?: string;
  "Why to Watch"?: string;
  Director?: string;
  Year?: string;
}

interface TVSeries {
  Name?: string;
  Genre?: string;
  Platform?: string;
  DKcloudRating?: string | number;
  Language?: string;
  Awards?: string;
  Achievements?: string;
  "Why to Watch"?: string;
}

interface TrendingItem {
  Title?: string;
  Platform?: string;
  Type?: string;
  Genre?: string;
  "dKloud rating"?: string | number;
  Summary?: string;
  "poster url"?: string;
}

interface UltimateItem {
  Title?: string;
  Type?: string;
  Genre?: string;
  Platform?: string;
  "Why to watch"?: string;
  "Poster URL"?: string;
}

type ContentItem = Movie | TVSeries | TrendingItem | UltimateItem;

const API_ENDPOINTS = {
  movies: "https://script.google.com/macros/s/AKfycbzO53FfgLV-2Kq5pP0fYF7yjFw1CQlZkZoc5TEIn3rDcPSxv8MB8koOasYlf6BuXXCQ/exec",
  tv: "https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec",
  ultimate: "https://script.google.com/macros/s/AKfycbwA8KIHelLQllAKNIgIYtfo3dyvBCef7kOfuYuEfM4SEF4y1ivyTHFddVUO1VrWyA4c-Q/exec",
  trending: "https://script.google.com/macros/s/AKfycbyCeRakH_SOeSQO3PGFMtphknTGIe3mzcFRZcCmjQdAEkOtiK8-3m2WSL1tJ8dOXy8/exec"
};

const MoviesTV = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'trending';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedAward, setSelectedAward] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(0);
    clearFilters();
    navigate(`/movies-tv?tab=${tabId}`, { replace: true });
  };

  const fetchDataForTab = async (tab: string) => {
    setLoading(true);
    try {
      const endpoint = API_ENDPOINTS[tab as keyof typeof API_ENDPOINTS];
      console.log(`Fetching data from ${tab} endpoint:`, endpoint);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log(`${tab} API response:`, result);
      
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error(`Error fetching ${tab} data:`, error);
      toast.error(`Failed to load ${tab} data. Please try again later.`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForTab(activeTab);
  }, [activeTab]);

  const getUniqueValues = (key: string) => {
    return [...new Set(data.map(item => (item as any)[key]).filter(Boolean))].sort();
  };

  const filteredData = data.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    
    let searchableText = "";
    let rating = 0;
    
    if (activeTab === 'movies') {
      const movieItem = item as Movie;
      searchableText = [
        movieItem.Name,
        movieItem.Genre,
        movieItem.Platform,
        movieItem.Language,
        movieItem.Awards,
        movieItem["Why to Watch"]
      ].filter(Boolean).join(" ").toLowerCase();
      rating = parseFloat(String(movieItem.DKcloudRating || '0'));
    } else if (activeTab === 'tv') {
      const tvItem = item as TVSeries;
      searchableText = [
        tvItem.Name,
        tvItem.Genre,
        tvItem.Platform,
        tvItem.Language,
        tvItem.Awards,
        tvItem["Why to Watch"]
      ].filter(Boolean).join(" ").toLowerCase();
      rating = parseFloat(String(tvItem.DKcloudRating || '0'));
    } else if (activeTab === 'trending') {
      const trendingItem = item as TrendingItem;
      searchableText = [
        trendingItem.Title,
        trendingItem.Genre,
        trendingItem.Platform,
        trendingItem.Type,
        trendingItem.Summary
      ].filter(Boolean).join(" ").toLowerCase();
      rating = parseFloat(String(trendingItem["dKloud rating"] || '0'));
    } else if (activeTab === 'ultimate') {
      const ultimateItem = item as UltimateItem;
      searchableText = [
        ultimateItem.Title,
        ultimateItem.Genre,
        ultimateItem.Platform,
        ultimateItem.Type,
        ultimateItem["Why to watch"]
      ].filter(Boolean).join(" ").toLowerCase();
    }

    const matchesSearch = searchableText.includes(searchTermLower);
    const matchesGenre = selectedGenre === "all" || (item as any).Genre === selectedGenre;
    const matchesPlatform = selectedPlatform === "all" || (item as any).Platform === selectedPlatform;
    
    let matchesType = true;
    let matchesLanguage = true;
    let matchesAward = true;
    let matchesRating = true;
    
    if (activeTab === 'ultimate' || activeTab === 'trending') {
      matchesType = selectedType === "all" || (item as any).Type === selectedType;
    }
    
    if (activeTab === 'movies' || activeTab === 'tv') {
      matchesLanguage = selectedLanguage === "all" || (item as any).Language === selectedLanguage;
      matchesAward = selectedAward === "all" || (item as any).Awards === selectedAward;
      matchesRating = rating >= minRating;
    }

    return matchesSearch && matchesGenre && matchesPlatform && matchesType && 
           matchesLanguage && matchesAward && matchesRating;
  });

  const currentItems = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextSlide = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("all");
    setSelectedPlatform("all");
    setSelectedType("all");
    setSelectedLanguage("all");
    setSelectedAward("all");
    setMinRating(0);
  };

  const renderMovieCard = (item: ContentItem) => {
    if (activeTab === 'movies') {
      const movie = item as Movie;
      return (
        <Card key={movie.Name} className="group relative overflow-hidden bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <CardHeader className="pb-3 relative z-10">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {movie.Name}
              </CardTitle>
              {movie.DKcloudRating && (
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full shrink-0">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">{movie.DKcloudRating}</span>
                </div>
              )}
            </div>
            <CardDescription className="text-sm font-medium text-primary/80 group-hover:text-primary transition-colors duration-300">
              {movie.Genre} • {movie.Year}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0 space-y-3 relative z-10">
            <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
              {movie["Why to Watch"]}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {movie.Platform && (
                <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Globe className="h-3 w-3 mr-1" />
                  {movie.Platform}
                </Badge>
              )}
              {movie.Language && (
                <Badge variant="secondary" className="text-xs bg-green-50 dark:bg-green-900/20">
                  {movie.Language}
                </Badge>
              )}
            </div>

            {movie.Achievements && (
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-3 w-3 text-amber-500" />
                  <span className="font-medium text-foreground">Achievements:</span>
                </div>
                <p className="text-muted-foreground text-xs group-hover:text-foreground/80 transition-colors duration-300">
                  {movie.Achievements}
                </p>
              </div>
            )}

            {movie.Awards && (
              <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
                <Award className="h-3 w-3 mr-1" />
                {movie.Awards}
              </Badge>
            )}
          </CardContent>
        </Card>
      );
    }

    if (activeTab === 'tv') {
      const tvShow = item as TVSeries;
      return (
        <Card key={tvShow.Name} className="group relative overflow-hidden bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <CardHeader className="pb-3 relative z-10">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {tvShow.Name}
              </CardTitle>
              {tvShow.DKcloudRating && (
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full shrink-0">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">{tvShow.DKcloudRating}</span>
                </div>
              )}
            </div>
            <CardDescription className="text-sm font-medium text-primary/80 group-hover:text-primary transition-colors duration-300">
              {tvShow.Genre}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0 space-y-3 relative z-10">
            <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
              {tvShow["Why to Watch"]}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {tvShow.Platform && (
                <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Globe className="h-3 w-3 mr-1" />
                  {tvShow.Platform}
                </Badge>
              )}
              {tvShow.Language && (
                <Badge variant="secondary" className="text-xs bg-green-50 dark:bg-green-900/20">
                  {tvShow.Language}
                </Badge>
              )}
            </div>

            {tvShow.Achievements && (
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-3 w-3 text-amber-500" />
                  <span className="font-medium text-foreground">Achievements:</span>
                </div>
                <p className="text-muted-foreground text-xs group-hover:text-foreground/80 transition-colors duration-300">
                  {tvShow.Achievements}
                </p>
              </div>
            )}

            {tvShow.Awards && (
              <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
                <Award className="h-3 w-3 mr-1" />
                {tvShow.Awards}
              </Badge>
            )}
          </CardContent>
        </Card>
      );
    }

    if (activeTab === 'trending') {
      const trending = item as TrendingItem;
      return (
        <Card key={trending.Title} className="group relative overflow-hidden bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {trending["poster url"] && (
            <div className="relative overflow-hidden h-48">
              <img
                src={trending["poster url"]}
                alt={trending.Title || "Poster"}
                className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <CardHeader className="pb-3 relative z-10">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {trending.Title}
              </CardTitle>
              {trending["dKloud rating"] && (
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full shrink-0">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">{trending["dKloud rating"]}</span>
                </div>
              )}
            </div>
            <CardDescription className="text-sm font-medium text-primary/80 group-hover:text-primary transition-colors duration-300">
              {trending.Genre} • {trending.Type}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0 space-y-3 relative z-10">
            <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
              {trending.Summary}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {trending.Platform && (
                <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Globe className="h-3 w-3 mr-1" />
                  {trending.Platform}
                </Badge>
              )}
              {trending.Type && (
                <Badge variant="secondary" className="text-xs bg-purple-50 dark:bg-purple-900/20">
                  {trending.Type}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    if (activeTab === 'ultimate') {
      const ultimate = item as UltimateItem;
      return (
        <Card key={ultimate.Title} className="group relative overflow-hidden bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {ultimate["Poster URL"] && (
            <div className="relative overflow-hidden h-48">
              <img
                src={ultimate["Poster URL"]}
                alt={ultimate.Title || "Poster"}
                className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {ultimate.Title}
            </CardTitle>
            <CardDescription className="text-sm font-medium text-primary/80 group-hover:text-primary transition-colors duration-300">
              {ultimate.Genre} • {ultimate.Type}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0 space-y-3 relative z-10">
            <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
              {ultimate["Why to watch"]}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {ultimate.Platform && (
                <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Globe className="h-3 w-3 mr-1" />
                  {ultimate.Platform}
                </Badge>
              )}
              {ultimate.Type && (
                <Badge variant="secondary" className="text-xs bg-purple-50 dark:bg-purple-900/20">
                  {ultimate.Type}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  const tabs = [
    {
      id: "trending",
      label: "🔥 Trending",
      icon: TrendingUp,
      gradient: "from-red-500 to-orange-600",
      description: "Popular and trending content"
    },
    {
      id: "movies",
      label: "🎬 Movies",
      icon: Film,
      gradient: "from-blue-500 to-purple-600",
      description: "Movie collection"
    },
    {
      id: "tv",
      label: "📺 TV Series",
      icon: Tv,
      gradient: "from-green-500 to-teal-600",
      description: "TV series collection"
    },
    {
      id: "ultimate",
      label: "⭐ Ultimate",
      icon: Trophy,
      gradient: "from-yellow-500 to-amber-600",
      description: "Ultimate collection"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Movies & TV Shows
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover our curated collection of must-watch movies and TV series, from trending hits to timeless classics
        </p>
      </div>

      <div className="mb-8">
        <ModernTabSystem 
          tabs={tabs} 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="w-full"
        />
      </div>

      {/* Top Navigation */}
      {filteredData.length > itemsPerPage && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentPage === 0}
            className="rounded-full hover:bg-primary/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {Math.ceil(filteredData.length / itemsPerPage)}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage) - 1}
            className="rounded-full hover:bg-primary/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Enhanced Filters */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search movies and TV shows..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger>
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {getUniqueValues('Genre').map((genre) => (
                <SelectItem key={String(genre)} value={String(genre)}>
                  {String(genre)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {getUniqueValues('Platform').map((platform) => (
                <SelectItem key={String(platform)} value={String(platform)}>
                  {String(platform)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(activeTab === 'ultimate' || activeTab === 'trending') && (
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {getUniqueValues('Type').map((type) => (
                  <SelectItem key={String(type)} value={String(type)}>
                    {String(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {(activeTab === 'movies' || activeTab === 'tv') && (
            <>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {getUniqueValues('Language').map((language) => (
                    <SelectItem key={String(language)} value={String(language)}>
                      {String(language)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAward} onValueChange={setSelectedAward}>
                <SelectTrigger>
                  <SelectValue placeholder="Awards" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Awards</SelectItem>
                  {getUniqueValues('Awards').map((award) => (
                    <SelectItem key={String(award)} value={String(award)}>
                      {String(award)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <Label htmlFor="minRating" className="text-sm text-muted-foreground">
                    Min. Rating: {minRating}+
                  </Label>
                  <Slider
                    id="minRating"
                    value={[minRating]}
                    max={10}
                    step={0.5}
                    onValueChange={(value) => setMinRating(value[0])}
                    className="mt-1"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {currentItems.length} of {filteredData.length} items
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading {activeTab}...</p>
        </div>
      ) : filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentItems.map(renderMovieCard)}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoviesTV;
