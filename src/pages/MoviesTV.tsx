
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

interface Movie {
  id?: string;
  Title?: string;
  Name?: string;
  title?: string;
  name?: string;
  Description?: string;
  description?: string;
  Genre?: string;
  genre?: string;
  Platform?: string;
  platform?: string;
  DKcloudRating?: string | number;
  rating?: string | number;
  Year?: string;
  year?: string;
  Language?: string;
  language?: string;
  Director?: string;
  director?: string;
  Creator?: string;
  creator?: string;
  Awards?: string;
  awards?: string;
  Seasons?: number;
  seasons?: number;
  Status?: string;
  status?: string;
  "Why-to-Watch"?: string;
  "why-to-watch"?: string;
  Achievements?: string;
  achievements?: string;
  Poster?: string;
  poster?: string;
  IMDb_Link?: string;
  imdb_link?: string;
  Trailer_Link?: string;
  trailer_link?: string;
  type?: string;
  category?: string;
  trending?: boolean;
  ultimate?: boolean;
}

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
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedAward, setSelectedAward] = useState("all");
  const [selectedDirector, setSelectedDirector] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(0);
    // Reset filters when switching tabs
    setSearchTerm("");
    setSelectedGenre("all");
    setSelectedPlatform("all");
    setSelectedLanguage("all");
    setSelectedAward("all");
    setSelectedDirector("all");
    setMinRating(0);
    navigate(`/movies-tv?tab=${tabId}`, { replace: true });
  };

  const normalizeData = (item: any): Movie => {
    return {
      id: item.id || item.Title || item.Name || `item-${Math.random()}`,
      title: item.Title || item.Name || item.title || item.name,
      description: item.Description || item.description || item["Why-to-Watch"] || item["why-to-watch"],
      genre: item.Genre || item.genre,
      platform: item.Platform || item.platform,
      rating: item.DKcloudRating || item.rating,
      year: item.Year || item.year,
      language: item.Language || item.language,
      director: item.Director || item.director,
      creator: item.Creator || item.creator,
      awards: item.Awards || item.awards,
      seasons: item.Seasons || item.seasons,
      status: item.Status || item.status,
      achievements: item.Achievements || item.achievements,
      poster: item.Poster || item.poster,
      imdb_link: item.IMDb_Link || item.imdb_link,
      trailer_link: item.Trailer_Link || item.trailer_link,
      type: activeTab === 'tv' ? 'TV Series' : (activeTab === 'movies' ? 'Movie' : item.type)
    };
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
      
      const processedData = (Array.isArray(result) ? result : []).map(normalizeData);
      setData(processedData);
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

  const getUniqueValues = (key: keyof Movie) => {
    return [...new Set(data.map(item => item[key]).filter(Boolean))].sort();
  };

  const filteredData = data.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    const title = item.title || '';
    const description = item.description || '';
    const director = item.director || '';
    const creator = item.creator || '';
    
    const matchesSearch = title.toLowerCase().includes(searchTermLower) ||
                         description.toLowerCase().includes(searchTermLower) ||
                         director.toLowerCase().includes(searchTermLower) ||
                         creator.toLowerCase().includes(searchTermLower);

    const matchesGenre = selectedGenre === "all" || item.genre === selectedGenre;
    const matchesPlatform = selectedPlatform === "all" || item.platform === selectedPlatform;
    const matchesLanguage = selectedLanguage === "all" || item.language === selectedLanguage;
    const matchesAward = selectedAward === "all" || item.awards === selectedAward;
    const matchesDirector = selectedDirector === "all" || item.director === selectedDirector;
    const rating = parseFloat(String(item.rating || '0'));
    const matchesRating = rating >= minRating;

    return matchesSearch && matchesGenre && matchesPlatform && matchesLanguage && 
           matchesAward && matchesDirector && matchesRating;
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

  const renderMovieCard = (item: Movie) => {
    const title = item.title || 'Untitled';
    const rating = item.rating || '0';
    const year = item.year || 'N/A';
    const genre = item.genre || 'Unknown';
    const description = item.description || 'No description available';

    return (
      <Card key={item.id} className="group relative overflow-hidden bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {item.poster && (
          <div className="relative overflow-hidden">
            <img
              src={item.poster}
              alt={title}
              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
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
              {title}
            </CardTitle>
            {rating !== '0' && (
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full shrink-0">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">{rating}</span>
              </div>
            )}
          </div>
          <CardDescription className="text-sm font-medium text-primary/80 group-hover:text-primary transition-colors duration-300">
            {genre} • {year}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 space-y-3 relative z-10">
          <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {item.platform && (
              <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <Globe className="h-3 w-3 mr-1" />
                {item.platform}
              </Badge>
            )}
            {item.language && (
              <Badge variant="secondary" className="text-xs bg-green-50 dark:bg-green-900/20">
                {item.language}
            </Badge>
            )}
            {item.status && (
              <Badge variant="default" className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                {item.status}
              </Badge>
            )}
            {item.seasons && (
              <Badge variant="outline" className="text-xs">
                {item.seasons} Season{item.seasons > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          {(item.director || item.creator) && (
            <div className="text-sm space-y-1">
              {item.director && (
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium text-foreground">Director:</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.director}
                  </span>
                </div>
              )}
              {item.creator && (
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium text-foreground">Creator:</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.creator}
                  </span>
                </div>
              )}
            </div>
          )}

          {item.achievements && (
            <div className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-3 w-3 text-amber-500" />
                <span className="font-medium text-foreground">Achievements:</span>
              </div>
              <p className="text-muted-foreground text-xs group-hover:text-foreground/80 transition-colors duration-300">
                {item.achievements}
              </p>
            </div>
          )}

          {item.awards && (
            <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
              <Award className="h-3 w-3 mr-1" />
              {item.awards}
            </Badge>
          )}

          <div className="flex gap-2 pt-2">
            {item.imdb_link && (
              <Button asChild variant="secondary" size="sm" className="text-xs h-8 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30">
                <a href={item.imdb_link} target="_blank" rel="noopener noreferrer">
                  IMDb <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            )}
            {item.trailer_link && (
              <Button asChild variant="outline" size="sm" className="text-xs h-8">
                <a href={item.trailer_link} target="_blank" rel="noopener noreferrer">
                  <Play className="mr-1 h-3 w-3" />
                  Trailer
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
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

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("all");
    setSelectedPlatform("all");
    setSelectedLanguage("all");
    setSelectedAward("all");
    setSelectedDirector("all");
    setMinRating(0);
  };

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
              {getUniqueValues('genre').map((genre) => (
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
              {getUniqueValues('platform').map((platform) => (
                <SelectItem key={String(platform)} value={String(platform)}>
                  {String(platform)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {getUniqueValues('language').map((language) => (
                <SelectItem key={String(language)} value={String(language)}>
                  {String(language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeTab === 'movies' && (
            <>
              <Select value={selectedAward} onValueChange={setSelectedAward}>
                <SelectTrigger>
                  <SelectValue placeholder="Awards" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Awards</SelectItem>
                  {getUniqueValues('awards').map((award) => (
                    <SelectItem key={String(award)} value={String(award)}>
                      {String(award)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDirector} onValueChange={setSelectedDirector}>
                <SelectTrigger>
                  <SelectValue placeholder="Director" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Directors</SelectItem>
                  {getUniqueValues('director').map((director) => (
                    <SelectItem key={String(director)} value={String(director)}>
                      {String(director)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentItems.map(renderMovieCard)}
          </div>
          
          {filteredData.length > itemsPerPage && (
            <div className="flex items-center justify-between">
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
