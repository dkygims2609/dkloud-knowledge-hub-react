import { useState, useEffect } from "react";
import { Search, Filter, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Movie {
  name: string;
  genre: string;
  platform: string;
  rating: number;
  language: string;
  director: string;
  "why-to-watch": string;
  achievements: string;
  awards: string;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [movies, searchTerm, genreFilter, platformFilter, languageFilter]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec"
      );
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = movies.filter((movie) =>
      (movie.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (movie.director?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    if (genreFilter !== "all") {
      filtered = filtered.filter((movie) => String(movie.genre) === genreFilter);
    }

    if (platformFilter !== "all") {
      filtered = filtered.filter((movie) => String(movie.platform) === platformFilter);
    }

    if (languageFilter !== "all") {
      filtered = filtered.filter((movie) => String(movie.language) === languageFilter);
    }

    setFilteredMovies(filtered);
  };

  const getUniqueValues = (key: keyof Movie) => {
    return Array.from(new Set(movies.map((movie) => movie[key]))).filter(Boolean);
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
            🎬 Movies Collection
          </h1>
          <p className="text-xl text-muted-foreground">
            Curated collection of must-watch movies across genres and platforms
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search movies or directors..."
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
                {getUniqueValues("genre").map((genre) => (
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
                {getUniqueValues("platform").map((platform) => (
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
                {getUniqueValues("language").map((language) => (
                  <SelectItem key={String(language)} value={String(language)}>
                    {String(language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredMovies.length} of {movies.length} movies
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setGenreFilter("all");
                setPlatformFilter("all");
                setLanguageFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie, index) => (
            <Card key={index} className="dkloud-card dkloud-card-interactive h-full fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{movie.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{movie.rating}</span>
                  </div>
                </div>
                <CardDescription className="font-medium text-primary">
                  {movie.director}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{movie.genre}</Badge>
                  <Badge variant="outline">{movie.platform}</Badge>
                  <Badge variant="outline">{movie.language}</Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">Why to Watch:</h4>
                  <p className="text-sm text-muted-foreground">
                    {movie["why-to-watch"]}
                  </p>
                </div>
                
                {movie.achievements && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      Achievements:
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {movie.achievements}
                    </p>
                  </div>
                )}
                
                {movie.awards && (
                  <div className="pt-2 border-t border-border">
                    <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                      {movie.awards}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMovies.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No movies found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;