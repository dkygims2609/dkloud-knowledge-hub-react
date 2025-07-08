import { useState, useEffect } from "react";
import { Search, Heart, BookOpen, Feather } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { ErrorState, EmptyState } from "@/components/ui/error-boundary";
import { RefreshButton } from "@/components/ui/refresh-button";
import { usePoetryAPI, PoetryEntry } from "@/hooks/usePoetryAPI";
import { useToast } from "@/hooks/useToast";

const Poetry = () => {
  const { poetry, loading, error, refreshPoetry } = usePoetryAPI();
  const [filteredPoetry, setFilteredPoetry] = useState(poetry);
  const [searchTerm, setSearchTerm] = useState("");
  const { success: showSuccess } = useToast();

  useEffect(() => {
    filterPoetry();
  }, [poetry, searchTerm]);

  const handleRefresh = async () => {
    await refreshPoetry();
    showSuccess("Poetry refreshed", "Latest poetry loaded from Google Docs");
  };

  const parsePoetryText = (text: string): PoetryEntry[] => {
    const entries: PoetryEntry[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    let currentEntry: PoetryEntry | null = null;
    let contentLines: string[] = [];
    
    for (const line of lines) {
      if (line.includes('Shayari') || line.match(/^\d+\./)) {
        // Save previous entry if exists
        if (currentEntry) {
          currentEntry.content = contentLines.join('\n');
          entries.push(currentEntry);
        }
        
        // Start new entry
        currentEntry = {
          title: line.trim(),
          content: ""
        };
        contentLines = [];
      } else {
        // Add to content
        contentLines.push(line.trim());
      }
    }
    
    // Don't forget the last entry
    if (currentEntry) {
      currentEntry.content = contentLines.join('\n');
      entries.push(currentEntry);
    }
    
    return entries;
  };

  const filterPoetry = () => {
    const filtered = poetry.filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPoetry(filtered);
  };


  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ✍️ Penned Down
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of poetry, shayari, and creative writings from the heart
          </p>
        </div>

        {/* Search */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search poetry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <RefreshButton onRefresh={handleRefresh} disabled={loading} />
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPoetry.length} of {poetry.length} entries • Powered by Google Docs API
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <ErrorState 
            error={error}
            onRetry={handleRefresh}
            title="Failed to load poetry"
            description="We couldn't fetch poetry from Google Docs. Showing cached content."
          />
        )}

        {/* Loading State */}
        {loading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLoader key={i} variant="card" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPoetry.length === 0 ? (
              <EmptyState 
                title="No poetry found"
                description="Try adjusting your search terms or check back later."
                action={
                  <RefreshButton onRefresh={handleRefresh} />
                }
              />
            ) : (
              filteredPoetry.map((entry, index) => (
            <Card key={index} className="dkloud-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Feather className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{entry.title}</CardTitle>
                </div>
                {entry.date && (
                  <p className="text-sm text-muted-foreground">
                    Written on {new Date(entry.date).toLocaleDateString()}
                  </p>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-lg leading-relaxed font-medium">
                    {entry.content}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm">Poetry</span>
                  </div>
                  <Heart className="h-5 w-5 text-red-500 hover:fill-current cursor-pointer transition-colors" />
                </div>
              </CardContent>
            </Card>
              ))
            )}
          </div>
        )}

        {/* Inspirational Quote */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-xl">
          <blockquote className="text-xl italic text-muted-foreground">
            "Poetry is the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility."
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-2 block">- William Wordsworth</cite>
        </div>
      </div>
    </div>
  );
};

export default Poetry;