
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TechCornerTabs } from "@/components/TechCornerTabs";

interface TechDocument {
  Title: string;
  Category: string;
  Type: string;
  Tags?: string;
  Description?: string;
  Link: string;
}

const TechCorner = () => {
  const [documents, setDocuments] = useState<TechDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<TechDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, categoryFilter]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec"
      );
      const data = await response.json();
      setDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tech documents:", error);
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents.filter((doc) => {
      const searchMatch = 
        doc.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.Description && doc.Description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (doc.Tags && doc.Tags.toLowerCase().includes(searchTerm.toLowerCase()));

      return searchMatch;
    });

    if (categoryFilter !== "all") {
      filtered = filtered.filter((doc) => doc.Category === categoryFilter);
    }

    setFilteredDocuments(filtered);
  };

  const getUniqueValues = (key: keyof TechDocument) => {
    return Array.from(new Set(documents.map((doc) => doc[key]))).filter(Boolean);
  };

  const handleDocumentClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
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
            📚 Tech Corner
          </h1>
          <p className="text-xl text-muted-foreground">
            Technical documentation, SOPs, learning resources, and upcoming micro-courses
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search title, description, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getUniqueValues("Category").map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <span>Showing {filteredDocuments.length} of {documents.length} documents</span>
          </div>
        </div>

        {/* Tabbed Content */}
        <TechCornerTabs 
          documents={filteredDocuments} 
          onDocumentClick={handleDocumentClick}
        />
      </div>
    </div>
  );
};

export default TechCorner;
