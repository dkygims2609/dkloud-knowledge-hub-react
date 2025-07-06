import { useState, useEffect } from "react";
import { Search, Heart, BookOpen, Feather } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PoetryEntry {
  title: string;
  content: string;
  date?: string;
}

const Poetry = () => {
  const [poetry, setPoetry] = useState<PoetryEntry[]>([]);
  const [filteredPoetry, setFilteredPoetry] = useState<PoetryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPoetry();
  }, []);

  useEffect(() => {
    filterPoetry();
  }, [poetry, searchTerm]);

  const fetchPoetry = async () => {
    try {
      const response = await fetch(
        "https://docs.google.com/document/d/1nkulCEfbAVfFOKvjcvGt7ctNJ9o7MY0Ea2si3O3ekmE/export?format=txt"
      );
      const text = await response.text();
      
      // Parse the text content into poetry entries
      const entries = parsePoetryText(text);
      setPoetry(entries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching poetry:", error);
      // Fallback to sample poetry
      const samplePoetry: PoetryEntry[] = [
        {
          title: "Shayari 1",
          content: "दिल की गहराइयों में छुपे रहस्य,\nशब्दों में ढल जाते हैं जब,\nतो कविता बन जाती है\nजीवन की सच्चाई।",
          date: "2024-01-15"
        },
        {
          title: "Shayari 2", 
          content: "रात के सन्नाटे में,\nसितारों से बातें करते हैं,\nसपने अपने मन के\nकागज़ पर लिखते हैं।",
          date: "2024-01-10"
        },
        {
          title: "Shayari 3",
          content: "समय की धारा में बहते हुए,\nयादों के किनारे बैठकर,\nजिंदगी के सफर की\nकहानी सुनाते हैं।",
          date: "2024-01-05"
        }
      ];
      setPoetry(samplePoetry);
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search poetry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPoetry.length} of {poetry.length} entries
            </p>
          </div>
        </div>

        {/* Poetry Collection */}
        <div className="space-y-8">
          {filteredPoetry.map((entry, index) => (
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
          ))}
        </div>

        {filteredPoetry.length === 0 && !loading && (
          <div className="text-center py-12">
            <Feather className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No poetry found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms.</p>
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