
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Calendar, Award, Play, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ModernTabSystem } from "@/components/ModernTabSystem";
import { toast } from "sonner";

interface Movie {
  "Movie Name"?: string;
  "Genre"?: string;
  "Year"?: string;
  "Platform"?: string;
  "IMDB"?: string;
  "Language"?: string;
  "Director"?: string;
  "Writer"?: string;
  "Stars"?: string;
  "Why to Watch"?: string;
  "DKcloudRating"?: string;
  "Achievements"?: string;
  "Awards"?: string;
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
  "DKcloudRating"?: string;
}

const MoviesTV = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvSeries, setTvSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [ratingRange, setRatingRange] = useState([7.5]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Movies/TV data...");
        
        // Fetch movies
        const moviesResponse = await fetch("https://script.google.com/macros/s/AKfycbwiNhiUq6yWcGQ5dUwMwclRYt_pTsz_8nNXSsYsZClcmdLJGFp3kZYZdSkfqW0LtGWd7A/exec");
        const moviesData = await moviesResponse.json();
        console.log("Movies API response:", moviesData);
        
        // Fetch TV series
        const tvResponse = await fetch("https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec");
        const tvData = await tvResponse.json();
        console.log("TV Series API response:", tvData);
        
        setMovies(Array.isArray(moviesData) ? moviesData : []);
        setTvSeries(Array.isArray(tvData) ? tvData : []);
      } catch (error) {
        console.error("Error fetching Movies/TV data:", error);
        toast.error("Failed to load movies and TV series. Please try again later.");
        setMovies([]);
        setTvSeries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUniqueValues = (data: any[], key: string) => {
    return [...new Set(data.map(item => item[key]).filter(Boolean))].sort();
  };

  const filteredMovies = movies.filter(movie => {
    const searchMatch = (movie["Movie Name"]?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (movie["Director"]?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (movie["Stars"]?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const genreMatch = selectedGenre === "all" || movie["Genre"] === selectedGenre;
    const platformMatch = selectedPlatform === "all" || movie["Platform"] === selectedPlatform;
    const languageMatch = selectedLanguage === "all" || movie["Language"] === selectedLanguage;
    
    // Rating filter using DKcloudRating column
    const dkRating = parseFloat(movie["DKcloudRating"] || "0");
    const ratingMatch = dkRating >= ratingRange[0];

    return searchMatch && genreMatch && platformMatch && languageMatch && ratingMatch;
  });

  const filteredTvSeries = tvSeries.filter(series => {
    const searchMatch = (series.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (series.creator?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const genreMatch = selectedGenre === "all" || series.genre === selectedGenre;
    const platformMatch = selectedPlatform === "all" || series.platform === selectedPlatform;
    const languageMatch = selectedLanguage === "all" || series.language === selectedLanguage;
    
    // Rating filter using DKcloudRating column for TV series too
    const dkRating = parseFloat(series["DKcloudRating"] || series.rating?.toString() || "0");
    const ratingMatch = dkRating >= ratingRange[0];

    return searchMatch && genreMatch && platformMatch && languageMatch && ratingMatch;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("all");
    setSelectedPlatform("all");
    setSelectedLanguage("all");
    setRatingRange([7.5]);
  };

  const currentData = activeTab === "movies" ? movies : tvSeries;
  const currentFiltered = activeTab === "movies" ? filteredMovies : filteredTvSeries;

  const tabs = [
    {
      id: "movies",
      label: "Movies",
      icon: Play,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie, index) => (
            <Card key={index} className="dkloud-card h-full hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold">{movie["Movie Name"]}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{movie["IMDB"] || movie["DKcloudRating"]}</span>
                  </div>
                </div>
                <CardDescription className="font-medium text-primary">
                  {movie["Director"]} ({movie["Year"]})
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{movie["Genre"]}</Badge>
                  <Badge variant="outline">{movie["Platform"]}</Badge>
                  <Badge variant="outline">{movie["Language"]}</Badge>
                </div>
                
                {movie["Stars"] && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Cast:</h4>
                    <p className="text-sm text-muted-foreground">{movie["Stars"]}</p>
                  </div>
                )}
                
                {movie["Why to Watch"] && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-1" />
                      <span className="text-green-500 font-bold">Why to Watch:</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {movie["Why to Watch"]}
                    </p>
                  </div>
                )}
                
                {movie["Achievements"] && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      <span className="text-green-500 font-bold">Achievements:</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {movie["Achievements"]}
                    </p>
                  </div>
                )}
                
                {movie["Awards"] && (
                  <div className="pt-2 border-t border-border">
                    <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                      {movie["Awards"]}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: "tv",
      label: "TV Series",
      icon: Calendar,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTvSeries.map((series, index) => (
            <Card key={index} className="dkloud-card h-full hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold">{series.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{series["DKcloudRating"] || series.rating}</span>
                  </div>
                </div>
                <CardDescription className="font-medium text-primary">
                  {series.creator}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{series.genre}</Badge>
                  <Badge variant="outline">{series.platform}</Badge>
                  <Badge variant="outline">{series.language}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{series.seasons} Season{series.seasons > 1 ? 's' : ''}</span>
                  </div>
                  <Badge 
                    variant={series.status === "Completed" ? "default" : "secondary"}
                    className={series.status === "Ongoing" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
                  >
                    {series.status}
                  </Badge>
                </div>
                
                {series["why-to-watch"] && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-1" />
                      <span className="text-green-500 font-bold">Why to Watch:</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {series["why-to-watch"]}
                    </p>
                  </div>
                )}
                
                {series.achievements && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      <span className="text-green-500 font-bold">Achievements:</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {series.achievements}
                    </p>
                  </div>
                )}
                
                {series.awards && (
                  <div className="pt-2 border-t border-border">
                    <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                      {series.awards}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🎬 Movies & TV Series
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover amazing movies and binge-worthy TV series across all genres and platforms
        </p>
      </div>

      {/* Enhanced Filters with DKcloudRating Slider */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search movies or TV series..."
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
              {getUniqueValues(currentData, activeTab === "movies" ? "Genre" : "genre").map(genre => (
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
              {getUniqueValues(currentData, activeTab === "movies" ? "Platform" : "platform").map(platform => (
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
              {getUniqueValues(currentData, activeTab === "movies" ? "Language" : "language").map(language => (
                <SelectItem key={String(language)} value={String(language)}>
                  {String(language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* DKcloudRating Slider */}
        <div className="mb-4">
          <Label className="text-sm font-medium mb-2 block">
            DKcloud Rating: {ratingRange[0].toFixed(1)}+ ⭐
          </Label>
          <div className="px-2">
            <Slider
              value={ratingRange}
              onValueChange={setRatingRange}
              max={10}
              min={7.5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>7.5</span>
              <span>10.0</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {currentFiltered.length} of {currentData.length} {activeTab === "movies" ? "movies" : "TV series"}
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>

      <ModernTabSystem 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      {currentFiltered.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-2">No {activeTab === "movies" ? "movies" : "TV series"} found</h3>
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
