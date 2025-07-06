import { useState, useEffect } from "react";
import { Search, Filter, Star, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const TVSeries = () => {
  const [series, setSeries] = useState<TVSeries[]>([]);
  const [filteredSeries, setFilteredSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchSeries();
  }, []);

  useEffect(() => {
    filterSeries();
  }, [series, searchTerm, genreFilter, platformFilter, statusFilter]);

  const fetchSeries = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxr64a2W4VL2ymbigPXUB3EQmMULCmUhMuDDwvhGNaG4lSwgqAQitXO_hTY2lhh3n1f/exec"
      );
      const data = await response.json();
      setSeries(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching TV series:", error);
      setLoading(false);
    }
  };

  const filterSeries = () => {
    let filtered = series.filter((show) =>
      show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (show.creator && show.creator.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (genreFilter !== "all") {
      filtered = filtered.filter((show) => String(show.genre) === genreFilter);
    }

    if (platformFilter !== "all") {
      filtered = filtered.filter((show) => String(show.platform) === platformFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((show) => String(show.status) === statusFilter);
    }

    setFilteredSeries(filtered);
  };

  const getUniqueValues = (key: keyof TVSeries) => {
    return Array.from(new Set(series.map((show) => show[key]))).filter(Boolean);
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
            📺 TV Series Collection
          </h1>
          <p className="text-xl text-muted-foreground">
            Binge-worthy TV series across all genres and streaming platforms
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search series or creators..."
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {getUniqueValues("status").map((status) => (
                  <SelectItem key={String(status)} value={String(status)}>
                    {String(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSeries.length} of {series.length} TV series
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setGenreFilter("all");
                setPlatformFilter("all");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeries.map((show, index) => (
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
                  <h4 className="font-semibold text-sm mb-2">Why to Watch:</h4>
                  <p className="text-sm text-muted-foreground">
                    {show["why-to-watch"]}
                  </p>
                </div>
                
                {show.achievements && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center">
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
                    <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                      {show.awards}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSeries.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No TV series found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVSeries;