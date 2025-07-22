
import { useState, useEffect } from "react";
import { Search, Filter, Star, Award, Calendar, Tv, Film, TrendingUp, List, Play, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface Movie {
  "Movie Name"?: string;
  Genre?: string;
  Platform?: string;
  Rating?: number;
  Language?: string;
  Director?: string;
  Year?: number;
  Duration?: string;
  "Why to Watch"?: string;
  Cast?: string;
  Awards?: string;
  DKcloudRating?: number;
}

interface TVSeries {
  name: string;
  genre: string;
  platform: string;
  rating: number;
  language: string;
  creator: string;
  seasons: number;
  status: string;
  "why-to-watch": string;
  achievements: string;
  awards: string;
}

const MoviesTV = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvSeries, setTvSeries] = useState<TVSeries[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filteredTvSeries, setFilteredTvSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [dkRatingRange, setDkRatingRange] = useState([7.5]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterContent();
  }, [movies, tvSeries, searchTerm, genreFilter, platformFilter, languageFilter, dkRatingRange]);

  const fetchData = async () => {
    try {
      // Fetch Movies
      const moviesResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbwiNhiUq6yWcGQ5dUwMwclRYt_pTsz_8nNXSsYsZClcmdLJGFp3kZYZdSkfqW0LtGWd7A/exec"
      );
      const moviesData = await moviesResponse.json();
      
      // Fetch TV Series
      const seriesResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec"
      );
      const seriesData = await seriesResponse.json();

      setMovies(moviesData || []);
      setTvSeries(seriesData || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const filterContent = () => {
    // Filter Movies
    let filteredM = movies.filter((movie) => {
      const searchMatch = (movie["Movie Name"]?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (movie.Director?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const genreMatch = genreFilter === "all" || movie.Genre === genreFilter;
      const platformMatch = platformFilter === "all" || movie.Platform === platformFilter;
      const languageMatch = languageFilter === "all" || movie.Language === languageFilter;
      const ratingMatch = !movie.DKcloudRating || movie.DKcloudRating >= dkRatingRange[0];

      return searchMatch && genreMatch && platformMatch && languageMatch && ratingMatch;
    });

    // Filter TV Series
    let filteredS = tvSeries.filter((series) => {
      const searchMatch = series.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (series.creator && series.creator.toLowerCase().includes(searchTerm.toLowerCase()));
      const genreMatch = genreFilter === "all" || series.genre === genreFilter;
      const platformMatch = platformFilter === "all" || series.platform === platformFilter;
      const languageMatch = languageFilter === "all" || series.language === languageFilter;

      return searchMatch && genreMatch && platformMatch && languageMatch;
    });

    setFilteredMovies(filteredM);
    setFilteredTvSeries(filteredS);
  };

  const getUniqueMovieValues = (key: keyof Movie) => {
    return Array.from(new Set(movies.map((movie) => movie[key]))).filter(Boolean);
  };

  const getUniqueTvValues = (key: keyof TVSeries) => {
    return Array.from(new Set(tvSeries.map((series) => series[key]))).filter(Boolean);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGenreFilter("all");
    setPlatformFilter("all");
    setLanguageFilter("all");
    setDkRatingRange([7.5]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🎬 Movies & TV Series
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing content across all genres and platforms
          </p>
        </div>

        {/* Enhanced Filters with DKcloudRating Slider */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search movies, series, directors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {getUniqueMovieValues("Genre").map((genre) => (
                  <SelectItem key={String(genre)} value={String(genre)}>
                    {String(genre)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {getUniqueMovieValues("Platform").map((platform) => (
                  <SelectItem key={String(platform)} value={String(platform)}>
                    {String(platform)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {getUniqueMovieValues("Language").map((language) => (
                  <SelectItem key={String(language)} value={String(language)}>
                    {String(language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <Label className="text-sm font-medium">DKcloud Rating: {dkRatingRange[0]}+</Label>
              <Slider
                value={dkRatingRange}
                onValueChange={setDkRatingRange}
                max={10}
                min={7.5}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Movies: {filteredMovies.length} | TV Series: {filteredTvSeries.length}
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="movies" className="flex items-center space-x-2">
              <Film className="h-4 w-4" />
              <span>Movies ({filteredMovies.length})</span>
            </TabsTrigger>
            <TabsTrigger value="tv" className="flex items-center space-x-2">
              <Tv className="h-4 w-4" />
              <span>TV Series ({filteredTvSeries.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Movies Tab */}
          <TabsContent value="movies">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovies.map((movie, index) => (
                <Card key={index} className="dkloud-card h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{movie["Movie Name"]}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{movie.Rating}</span>
                      </div>
                    </div>
                    <CardDescription className="font-medium text-primary">
                      {movie.Director} • {movie.Year}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{movie.Genre}</Badge>
                      <Badge variant="outline">{movie.Platform}</Badge>
                      <Badge variant="outline">{movie.Language}</Badge>
                      {movie.DKcloudRating && (
                        <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                          DK: {movie.DKcloudRating}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{movie.Duration}</span>
                      </div>
                      {movie.Cast && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span className="text-xs truncate">{movie.Cast.split(',')[0]}...</span>
                        </div>
                      )}
                    </div>
                    
                    {movie["Why to Watch"] && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">Why to Watch:</h4>
                        <p className="text-sm text-muted-foreground">
                          {movie["Why to Watch"]}
                        </p>
                      </div>
                    )}
                    
                    {movie.Awards && (
                      <div className="pt-2 border-t border-border">
                        <h4 className="font-semibold text-sm mb-2 flex items-center text-green-600 dark:text-green-400">
                          <Award className="h-4 w-4 mr-1" />
                          Awards:
                        </h4>
                        <Badge variant="default" className="bg-gradient-to-r from-green-500 to-emerald-500">
                          {movie.Awards}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TV Series Tab */}
          <TabsContent value="tv">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTvSeries.map((show, index) => (
                <Card key={index} className="dkloud-card h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{show.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{show.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="font-medium text-primary">
                      {show.creator}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{show.genre}</Badge>
                      <Badge variant="outline">{show.platform}</Badge>
                      <Badge variant="outline">{show.language}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{show.seasons} Season{show.seasons > 1 ? 's' : ''}</span>
                      </div>
                      <Badge 
                        variant={show.status === "Completed" ? "default" : "secondary"}
                        className={show.status === "Ongoing" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
                      >
                        {show.status}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">Why to Watch:</h4>
                      <p className="text-sm text-muted-foreground">
                        {show["why-to-watch"]}
                      </p>
                    </div>
                    
                    {show.achievements && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center text-green-600 dark:text-green-400">
                          <Award className="h-4 w-4 mr-1" />
                          Achievements:
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {show.achievements}
                        </p>
                      </div>
                    )}
                    
                    {show.awards && (
                      <div className="pt-2 border-t border-border">
                        <Badge variant="default" className="bg-gradient-to-r from-green-500 to-emerald-500">
                          {show.awards}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No Content Found */}
        {filteredMovies.length === 0 && filteredTvSeries.length === 0 && !loading && (
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
