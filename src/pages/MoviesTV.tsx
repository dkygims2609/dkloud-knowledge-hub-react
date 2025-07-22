import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar, Star, TrendingUp, Film, Tv, Trophy, ExternalLink, Play } from "lucide-react";
import { toast } from "sonner";
import { ModernTabSystem } from "@/components/ModernTabSystem";

interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  rating: string;
  year: string;
  type: string;
  category: string;
  trending?: boolean;
  ultimate?: boolean;
  poster?: string;
  imdb_link?: string;
  trailer_link?: string;
}

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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/movies-tv?tab=${tabId}`, { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwiNhiUq6yWcGQ5dUwMwclRYt_pTsz_8nNXSsYsZClcmdLJGFp3kZYZdSkfqW0LtGWd7A/exec", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("API temporarily unavailable. Using sample data.");
        
        // Fallback sample data when API is down
        const sampleData = [
          {
            id: "1",
            title: "The Matrix",
            description: "A computer programmer discovers reality is actually a simulation and joins a rebellion to free humanity.",
            genre: "sci-fi",
            rating: "8.7",
            year: "1999",
            type: "movie",
            category: "movie",
            trending: true,
            ultimate: true,
            poster: "",
            imdb_link: "https://www.imdb.com/title/tt0133093/",
            trailer_link: "https://www.youtube.com/watch?v=vKQi3bBA1y8"
          },
          {
            id: "2",
            title: "Breaking Bad",
            description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.",
            genre: "drama",
            rating: "9.5",
            year: "2008",
            type: "tv series",
            category: "tv",
            trending: true,
            ultimate: true,
            poster: "",
            imdb_link: "https://www.imdb.com/title/tt0903747/",
            trailer_link: "https://www.youtube.com/watch?v=HhesaQXLuRY"
          },
          {
            id: "3",
            title: "Inception",
            description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task.",
            genre: "sci-fi",
            rating: "8.8",
            year: "2010",
            type: "movie",
            category: "movie",
            trending: false,
            ultimate: true,
            poster: "",
            imdb_link: "https://www.imdb.com/title/tt1375666/",
            trailer_link: "https://www.youtube.com/watch?v=YoHD9XEInc0"
          },
          {
            id: "4",
            title: "Stranger Things",
            description: "When a young boy disappears, his mother and friends must confront terrifying supernatural forces.",
            genre: "sci-fi",
            rating: "8.7",
            year: "2016",
            type: "tv series",
            category: "tv",
            trending: true,
            ultimate: false,
            poster: "",
            imdb_link: "https://www.imdb.com/title/tt4574334/",
            trailer_link: "https://www.youtube.com/watch?v=b9EkMc79ZSU"
          }
        ];
        setData(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    const matchesSearch =
      item.title.toLowerCase().includes(searchTermLower) ||
      item.description.toLowerCase().includes(searchTermLower) ||
      item.genre.toLowerCase().includes(searchTermLower);

    const matchesGenre = selectedGenre === "all" || item.genre === selectedGenre;

    let matchesTab = true;

    if (activeTab === 'movies') {
      matchesTab = item.type === 'movie';
    } else if (activeTab === 'tv') {
      matchesTab = item.type === 'tv series';
    } else if (activeTab === 'ultimate') {
      matchesTab = item.ultimate === true;
    } else if (activeTab === 'trending') {
      matchesTab = item.trending === true;
    }

    return matchesSearch && matchesGenre && matchesTab;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "year") {
      return parseInt(b.year) - parseInt(a.year);
    } else if (sortBy === "rating") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="text-center mb-12">
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

      <ModernTabSystem 
        tabs={tabs} 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="mb-8"
      />

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2">
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
            <label htmlFor="genre" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Genre:
            </label>
            <select
              id="genre"
              className="flex h-9 w-auto rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
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
              <option value="animation">Animation</option>
              <option value="documentary">Documentary</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <label htmlFor="sort" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              Sort by:
            </label>
            <select
              id="sort"
              className="flex h-9 w-auto rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
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
        <div className="text-center">Loading...</div>
      ) : sortedData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedData.map((movie) => (
            <Card key={movie.id} className="bg-card/95 backdrop-blur-md border border-border/50 shadow-sm">
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-t-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{movie.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {movie.genre} | {movie.year}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{movie.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {movie.imdb_link && (
                    <Button asChild variant="secondary" size="sm">
                      <a href={movie.imdb_link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        IMDb <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {movie.trailer_link && (
                    <Button asChild variant="outline" size="sm">
                      <a href={movie.trailer_link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Trailer <Play className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center">No results found.</div>
      )}
    </div>
  );
};

export default MoviesTV;
