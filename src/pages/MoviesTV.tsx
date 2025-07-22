
import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar, Star, TrendingUp, Film, Tv, Trophy, ExternalLink, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ModernTabSystem } from "@/components/ModernTabSystem";

interface Movie {
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  genre?: string;
  rating?: string;
  year?: string;
  type?: string;
  category?: string;
  trending?: boolean;
  ultimate?: boolean;
  poster?: string;
  imdb_link?: string;
  trailer_link?: string;
  platform?: string;
  language?: string;
  director?: string;
  creator?: string;
  seasons?: number;
  status?: string;
  "why-to-watch"?: string;
  achievements?: string;
  awards?: string;
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
  const [sortBy, setSortBy] = useState("year");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6; // 2 rows × 3 cards
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(0);
    navigate(`/movies-tv?tab=${tabId}`, { replace: true });
  };

  const fetchDataForTab = async (tab: string) => {
    setLoading(true);
    try {
      let endpoint = "";
      
      switch (tab) {
        case 'movies':
          endpoint = API_ENDPOINTS.movies;
          break;
        case 'tv':
          endpoint = API_ENDPOINTS.tv;
          break;
        case 'ultimate':
          endpoint = API_ENDPOINTS.ultimate;
          break;
        case 'trending':
          endpoint = API_ENDPOINTS.trending;
          break;
        default:
          endpoint = API_ENDPOINTS.trending;
      }

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
      const processedData = (result || []).map((item: any, index: number) => ({
        ...item,
        id: item.id || `${tab}-${index}`,
        title: item.title || item.name,
        type: tab === 'tv' ? 'tv series' : (tab === 'movies' ? 'movie' : item.type),
      }));
      
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

  const filteredData = data.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    const title = item.title || item.name || '';
    const description = item.description || '';
    const genre = item.genre || '';
    
    const matchesSearch = title.toLowerCase().includes(searchTermLower) ||
                         description.toLowerCase().includes(searchTermLower) ||
                         genre.toLowerCase().includes(searchTermLower);

    const matchesGenre = selectedGenre === "all" || item.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "year") {
      const yearA = parseInt(a.year || '0');
      const yearB = parseInt(b.year || '0');
      return yearB - yearA;
    } else if (sortBy === "rating") {
      const ratingA = parseFloat(a.rating || '0');
      const ratingB = parseFloat(b.rating || '0');
      return ratingB - ratingA;
    }
    return 0;
  });

  const currentItems = sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextSlide = () => {
    if (currentPage < Math.ceil(sortedData.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderMovieCard = (item: Movie) => {
    const title = item.title || item.name || 'Untitled';
    const rating = item.rating || '0';
    const year = item.year || 'N/A';
    const genre = item.genre || 'Unknown';
    const description = item.description || item["why-to-watch"] || 'No description available';

    return (
      <Card key={item.id} className="bg-card/95 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full">
        {item.poster && (
          <img
            src={item.poster}
            alt={title}
            className="w-full h-32 object-cover rounded-t-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-bold line-clamp-2">{title}</CardTitle>
            {rating !== '0' && (
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{rating}</span>
              </div>
            )}
          </div>
          <CardDescription className="text-xs">
            {genre} • {year}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <p className="text-xs text-muted-foreground line-clamp-3">{description}</p>
          
          <div className="flex flex-wrap gap-1">
            {item.platform && <Badge variant="outline" className="text-xs">{item.platform}</Badge>}
            {item.language && <Badge variant="secondary" className="text-xs">{item.language}</Badge>}
            {item.status && <Badge variant="default" className="text-xs">{item.status}</Badge>}
            {item.seasons && <Badge variant="outline" className="text-xs">{item.seasons} Season{item.seasons > 1 ? 's' : ''}</Badge>}
          </div>

          {item.director && (
            <div className="text-xs">
              <span className="font-medium">Director:</span> {item.director}
            </div>
          )}

          {item.creator && (
            <div className="text-xs">
              <span className="font-medium">Creator:</span> {item.creator}
            </div>
          )}

          {item.achievements && (
            <div className="text-xs">
              <span className="font-medium">Achievements:</span> {item.achievements}
            </div>
          )}

          {item.awards && (
            <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs">
              {item.awards}
            </Badge>
          )}

          <div className="flex gap-2 pt-2">
            {item.imdb_link && (
              <Button asChild variant="secondary" size="sm" className="text-xs h-7">
                <a href={item.imdb_link} target="_blank" rel="noopener noreferrer">
                  IMDb <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            )}
            {item.trailer_link && (
              <Button asChild variant="outline" size="sm" className="text-xs h-7">
                <a href={item.trailer_link} target="_blank" rel="noopener noreferrer">
                  Trailer <Play className="ml-1 h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
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

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search movies and TV shows..."
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <select
              className="flex h-9 w-auto rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="all">All Genres</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="horror">Horror</option>
              <option value="thriller">Thriller</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <select
              className="flex h-9 w-auto rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="year">Year</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading {activeTab}...</p>
        </div>
      ) : sortedData.length > 0 ? (
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentItems.map(renderMovieCard)}
          </div>
          
          {sortedData.length > itemsPerPage && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentPage === 0}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage + 1} of {Math.ceil(sortedData.length / itemsPerPage)}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentPage >= Math.ceil(sortedData.length / itemsPerPage) - 1}
                className="rounded-full"
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
        </div>
      )}
    </div>
  );
};

export default MoviesTV;
