import { useState, useEffect, useRef } from "react";
import { Search, Filter, Star, Award, Calendar, Users, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Movie {
  Name: string;
  Genre: string;
  Platform: string;
  DKcloudRating: number;
  Language: string;
  Awards: string;
  "Why to Watch": string;
  Year: number;
  Director?: string;
  Achievements?: string;
}

interface TVSeries {
  Name: string;
  Genre: string;
  Platform: string;
  DKcloudRating: number;
  Language: string;
  Awards: string;
  Achievements: string;
  "Why to Watch": string;
  Creator?: string;
  Seasons?: number;
  Status?: string;
}

interface UltimateListItem {
  Name: string;
  Genre: string;
  Platform: string;
  DKcloudRating: number;
  Language: string;
  Awards: string;
  "Why to Watch": string;
  Type?: string;
  Director?: string;
  Creator?: string;
  Year?: number;
  Seasons?: number;
  Status?: string;
}

interface TrendingItem {
  Name: string;
  Genre: string;
  Platform: string;
  DKcloudRating: number;
  Language: string;
  Awards: string;
  "Why to Watch": string;
  Type?: string;
  TrendingRank?: number;
  PopularityScore?: number;
  Director?: string;
  Creator?: string;
  Year?: number;
}

const MoviesTV = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvSeries, setTvSeries] = useState<TVSeries[]>([]);
  const [ultimateList, setUltimateList] = useState<UltimateListItem[]>([]);
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filteredTvSeries, setFilteredTvSeries] = useState<TVSeries[]>([]);
  const [filteredUltimateList, setFilteredUltimateList] = useState<UltimateListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [awardsFilter, setAwardsFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("movies");
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentTvIndex, setCurrentTvIndex] = useState(0);
  const [currentUltimateIndex, setCurrentUltimateIndex] = useState(0);
  const moviesScrollRef = useRef<HTMLDivElement>(null);
  const tvScrollRef = useRef<HTMLDivElement>(null);
  const ultimateScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterContent();
  }, [movies, tvSeries, ultimateList, searchTerm, genreFilter, platformFilter, ratingFilter, languageFilter, awardsFilter, activeTab]);

  const fetchData = async () => {
    try {
      const [moviesResponse, tvResponse, ultimateResponse, trendingResponse] = await Promise.all([
        fetch("https://script.google.com/macros/s/AKfycbzO53FfgLV-2Kq5pP0fYF7yjFw1CQlZkZoc5TEIn3rDcPSxv8MB8koOasYlf6BuXXCQ/exec"),
        fetch("https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec"),
        fetch("https://script.google.com/macros/s/AKfycbwA8KIHelLQllAKNIgIYtfo3dyvBCef7kOfuYuEfM4SEF4y1ivyTHFddVUO1VrWyA4c-Q/exec"),
        fetch("https://script.google.com/macros/s/AKfycbyCeRakH_SOeSQO3PGFMtphknTGIe3mzcFRZcCmjQdAEkOtiK8-3m2WSL1tJ8dOXy8/exec")
      ]);
      
      const moviesData = await moviesResponse.json();
      const tvData = await tvResponse.json();
      const ultimateData = await ultimateResponse.json();
      const trendingData = await trendingResponse.json();
      
      setMovies(moviesData);
      setTvSeries(tvData);
      setUltimateList(ultimateData);
      setTrending(trendingData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const filterContent = () => {
    // Filter Movies
    let filteredMoviesData = movies.filter((movie) =>
      (String(movie.Name || "").toLowerCase()).includes(searchTerm.toLowerCase()) ||
      (String(movie.Director || "").toLowerCase()).includes(searchTerm.toLowerCase())
    );

    if (genreFilter !== "all") {
      filteredMoviesData = filteredMoviesData.filter((movie) => String(movie.Genre) === genreFilter);
    }
    if (platformFilter !== "all") {
      filteredMoviesData = filteredMoviesData.filter((movie) => String(movie.Platform) === platformFilter);
    }
    if (ratingFilter !== "all") {
      if (ratingFilter === "high") {
        filteredMoviesData = filteredMoviesData.filter((movie) => parseFloat(String(movie.DKcloudRating)) >= 8);
      } else if (ratingFilter === "medium") {
        filteredMoviesData = filteredMoviesData.filter((movie) => {
          const rating = parseFloat(String(movie.DKcloudRating));
          return rating >= 6 && rating < 8;
        });
      } else if (ratingFilter === "low") {
        filteredMoviesData = filteredMoviesData.filter((movie) => parseFloat(String(movie.DKcloudRating)) < 6);
      }
    }

    if (languageFilter !== "all") {
      filteredMoviesData = filteredMoviesData.filter((movie) => String(movie.Language) === languageFilter);
    }

    if (awardsFilter !== "all") {
      filteredMoviesData = filteredMoviesData.filter((movie) => String(movie.Awards) === awardsFilter);
    }

    // Filter TV Series
    let filteredTvData = tvSeries.filter((show) =>
      (String(show.Name || "").toLowerCase()).includes(searchTerm.toLowerCase()) ||
      (String(show.Creator || "").toLowerCase()).includes(searchTerm.toLowerCase())
    );

    if (genreFilter !== "all") {
      filteredTvData = filteredTvData.filter((show) => String(show.Genre) === genreFilter);
    }
    if (platformFilter !== "all") {
      filteredTvData = filteredTvData.filter((show) => String(show.Platform) === platformFilter);
    }
    if (ratingFilter !== "all") {
      if (ratingFilter === "high") {
        filteredTvData = filteredTvData.filter((show) => parseFloat(String(show.DKcloudRating)) >= 8);
      } else if (ratingFilter === "medium") {
        filteredTvData = filteredTvData.filter((show) => {
          const rating = parseFloat(String(show.DKcloudRating));
          return rating >= 6 && rating < 8;
        });
      } else if (ratingFilter === "low") {
        filteredTvData = filteredTvData.filter((show) => parseFloat(String(show.DKcloudRating)) < 6);
      }
    }

    if (languageFilter !== "all") {
      filteredTvData = filteredTvData.filter((show) => String(show.Language) === languageFilter);
    }

    if (awardsFilter !== "all") {
      filteredTvData = filteredTvData.filter((show) => String(show.Awards) === awardsFilter);
    }

    // Filter Ultimate List
    let filteredUltimateData = ultimateList.filter((item) =>
      (String(item.Name || "").toLowerCase()).includes(searchTerm.toLowerCase()) ||
      (String(item.Director || "").toLowerCase()).includes(searchTerm.toLowerCase()) ||
      (String(item.Creator || "").toLowerCase()).includes(searchTerm.toLowerCase())
    );

    if (genreFilter !== "all") {
      filteredUltimateData = filteredUltimateData.filter((item) => String(item.Genre) === genreFilter);
    }
    if (platformFilter !== "all") {
      filteredUltimateData = filteredUltimateData.filter((item) => String(item.Platform) === platformFilter);
    }
    if (ratingFilter !== "all") {
      if (ratingFilter === "high") {
        filteredUltimateData = filteredUltimateData.filter((item) => parseFloat(String(item.DKcloudRating)) >= 8);
      } else if (ratingFilter === "medium") {
        filteredUltimateData = filteredUltimateData.filter((item) => {
          const rating = parseFloat(String(item.DKcloudRating));
          return rating >= 6 && rating < 8;
        });
      } else if (ratingFilter === "low") {
        filteredUltimateData = filteredUltimateData.filter((item) => parseFloat(String(item.DKcloudRating)) < 6);
      }
    }

    if (languageFilter !== "all") {
      filteredUltimateData = filteredUltimateData.filter((item) => String(item.Language) === languageFilter);
    }

    if (awardsFilter !== "all") {
      filteredUltimateData = filteredUltimateData.filter((item) => String(item.Awards) === awardsFilter);
    }

    setFilteredMovies(filteredMoviesData);
    setFilteredTvSeries(filteredTvData);
    setFilteredUltimateList(filteredUltimateData);
  };

  const getUniqueValues = (key: string, type: 'movies' | 'tv' | 'ultimate') => {
    let data: any[] = [];
    if (type === 'movies') data = movies;
    else if (type === 'tv') data = tvSeries;
    else if (type === 'ultimate') data = ultimateList;
    
    return Array.from(new Set(data.map((item: any) => item[key]))).filter(Boolean);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGenreFilter("all");
    setPlatformFilter("all");
    setRatingFilter("all");
    setLanguageFilter("all");
    setAwardsFilter("all");
  };

  const scrollMovies = (direction: 'left' | 'right') => {
    const itemsPerView = 12;
    const maxIndex = Math.ceil(filteredMovies.length / itemsPerView) - 1;
    
    if (direction === 'right' && currentMovieIndex < maxIndex) {
      setCurrentMovieIndex(prev => prev + 1);
    } else if (direction === 'left' && currentMovieIndex > 0) {
      setCurrentMovieIndex(prev => prev - 1);
    }
  };

  const scrollTv = (direction: 'left' | 'right') => {
    const itemsPerView = 12;
    const maxIndex = Math.ceil(filteredTvSeries.length / itemsPerView) - 1;
    
    if (direction === 'right' && currentTvIndex < maxIndex) {
      setCurrentTvIndex(prev => prev + 1);
    } else if (direction === 'left' && currentTvIndex > 0) {
      setCurrentTvIndex(prev => prev - 1);
    }
  };

  const scrollUltimate = (direction: 'left' | 'right') => {
    const itemsPerView = 12;
    const maxIndex = Math.ceil(filteredUltimateList.length / itemsPerView) - 1;
    
    if (direction === 'right' && currentUltimateIndex < maxIndex) {
      setCurrentUltimateIndex(prev => prev + 1);
    } else if (direction === 'left' && currentUltimateIndex > 0) {
      setCurrentUltimateIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title/name..."
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
                {getUniqueValues("Genre", activeTab as 'movies' | 'tv' | 'ultimate').map((genre) => (
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
                {getUniqueValues("Platform", activeTab as 'movies' | 'tv' | 'ultimate').map((platform) => (
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
                {getUniqueValues("Language", activeTab as 'movies' | 'tv' | 'ultimate').map((language) => (
                  <SelectItem key={String(language)} value={String(language)}>
                    {String(language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <p className="text-sm text-muted-foreground">
                Movies ({filteredMovies.length})
              </p>
              <p className="text-sm text-muted-foreground">
                TV Series ({filteredTvSeries.length})
              </p>
              <p className="text-sm text-muted-foreground">
                Ultimate List ({filteredUltimateList.length})
              </p>
              <p className="text-sm text-muted-foreground">
                Trending ({trending.length})
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="movies" className="text-lg">
              🎬 Movies ({filteredMovies.length})
            </TabsTrigger>
            <TabsTrigger value="tv" className="text-lg">
              📺 TV Series ({filteredTvSeries.length})
            </TabsTrigger>
            <TabsTrigger value="ultimate" className="text-lg">
              ⭐ Ultimate List ({filteredUltimateList.length})
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-lg">
              🔥 Trending ({trending.length})
            </TabsTrigger>
          </TabsList>

          {/* Movies Tab */}
          <TabsContent value="movies">
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Movies ({filteredMovies.length})</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollMovies('left')}
                    disabled={currentMovieIndex === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollMovies('right')}
                    disabled={currentMovieIndex >= Math.ceil(filteredMovies.length / 12) - 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div ref={moviesScrollRef} className="overflow-hidden">
                <div 
                  className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4 pb-4 transition-transform duration-300" 
                  style={{ 
                    gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                    width: `${Math.ceil(filteredMovies.length / 2) * 320}px`,
                    transform: `translateX(-${currentMovieIndex * (6 * 320)}px)`
                  }}
                >
                  {filteredMovies.map((movie, index) => (
                    <Card key={index} className="dkloud-card dkloud-card-interactive h-full w-72 flex-shrink-0">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{movie.Name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{movie.DKcloudRating}</span>
                          </div>
                        </div>
                        {movie.Director && (
                          <CardDescription className="font-medium text-primary">
                            {movie.Director}
                          </CardDescription>
                        )}
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{movie.Genre}</Badge>
                          <Badge variant="outline">{movie.Platform}</Badge>
                          <Badge variant="outline">{movie.Language}</Badge>
                          {movie.Year && (
                            <Badge variant="outline">{movie.Year}</Badge>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Why to Watch:</h4>
                          <p className="text-sm text-muted-foreground">
                            {movie["Why to Watch"]}
                          </p>
                        </div>
                        
                        {movie.Awards && (
                          <div className="pt-2 border-t border-border">
                            <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                              <Award className="h-3 w-3 mr-1" />
                              {movie.Awards}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TV Series Tab */}
          <TabsContent value="tv">
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">TV Series ({filteredTvSeries.length})</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollTv('left')}
                    disabled={currentTvIndex === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollTv('right')}
                    disabled={currentTvIndex >= Math.ceil(filteredTvSeries.length / 12) - 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div ref={tvScrollRef} className="overflow-hidden">
                <div 
                  className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4 pb-4 transition-transform duration-300" 
                  style={{ 
                    gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                    width: `${Math.ceil(filteredTvSeries.length / 2) * 320}px`,
                    transform: `translateX(-${currentTvIndex * (6 * 320)}px)`
                  }}
                >
                  {filteredTvSeries.map((show, index) => (
                    <Card key={index} className="dkloud-card dkloud-card-interactive h-full w-72 flex-shrink-0">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{show.Name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{show.DKcloudRating}</span>
                          </div>
                        </div>
                        {show.Creator && (
                          <CardDescription className="font-medium text-primary">
                            {show.Creator}
                          </CardDescription>
                        )}
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{show.Genre}</Badge>
                          <Badge variant="outline">{show.Platform}</Badge>
                          <Badge variant="outline">{show.Language}</Badge>
                        </div>
                        
                        {show.Seasons && show.Status && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{show.Seasons} Season{show.Seasons > 1 ? 's' : ''}</span>
                            </div>
                            <Badge 
                              variant={show.Status === "Completed" ? "default" : "secondary"}
                              className={show.Status === "Ongoing" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
                            >
                              {show.Status}
                            </Badge>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Why to Watch:</h4>
                          <p className="text-sm text-muted-foreground">
                            {show["Why to Watch"]}
                          </p>
                        </div>
                        
                        {show.Achievements && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center">
                              <Award className="h-4 w-4 mr-1" />
                              Achievements:
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {show.Achievements}
                            </p>
                          </div>
                        )}
                        
                        {show.Awards && (
                          <div className="pt-2 border-t border-border">
                            <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                              <Award className="h-3 w-3 mr-1" />
                              {show.Awards}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Ultimate List Tab */}
          <TabsContent value="ultimate">
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Ultimate List ({filteredUltimateList.length})</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollUltimate('left')}
                    disabled={currentUltimateIndex === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollUltimate('right')}
                    disabled={currentUltimateIndex >= Math.ceil(filteredUltimateList.length / 12) - 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div ref={ultimateScrollRef} className="overflow-hidden">
                <div 
                  className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4 pb-4 transition-transform duration-300" 
                  style={{ 
                    gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                    width: `${Math.ceil(filteredUltimateList.length / 2) * 320}px`,
                    transform: `translateX(-${currentUltimateIndex * (6 * 320)}px)`
                  }}
                >
                  {filteredUltimateList.map((item, index) => (
                    <Card key={index} className="dkloud-card dkloud-card-interactive h-full w-72 flex-shrink-0">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.Name}</CardTitle>
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
                          {item.Type && (
                            <Badge variant="default">{item.Type}</Badge>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Why to Watch:</h4>
                          <p className="text-sm text-muted-foreground">
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
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  What's Trending Now
                </h3>
                <p className="text-muted-foreground">The hottest movies and shows everyone's talking about</p>
              </div>

              {/* Banner-style trending display */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trending.slice(0, 6).map((item, index) => (
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
                        <Badge variant="secondary" className="text-sm">{item.Genre}</Badge>
                        <Badge variant="outline" className="text-sm">{item.Platform}</Badge>
                        <Badge variant="outline" className="text-sm">{item.Language}</Badge>
                        {item.Type && (
                          <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 text-sm">
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
                          <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-sm">
                            <Award className="h-4 w-4 mr-1" />
                            {item.Awards}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {trending.length > 6 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg" className="animated-border-glow">
                    View All Trending ({trending.length})
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* No Results */}
        {((activeTab === "movies" && filteredMovies.length === 0) || 
          (activeTab === "tv" && filteredTvSeries.length === 0) ||
          (activeTab === "ultimate" && filteredUltimateList.length === 0) ||
          (activeTab === "trending" && trending.length === 0)) && !loading && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No content found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesTV;
