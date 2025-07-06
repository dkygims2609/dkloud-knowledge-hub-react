import { useState, useEffect } from "react";
import { Search, Filter, FileText, Download, ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TechDocument {
  title: string;
  category: string;
  description: string;
  type: string;
  link: string;
  tags: string;
  "last-updated": string;
  difficulty: string;
}

const TechCorner = () => {
  const [documents, setDocuments] = useState<TechDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<TechDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, categoryFilter, typeFilter, difficultyFilter]);

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
    let filtered = documents.filter((doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== "all") {
      filtered = filtered.filter((doc) => doc.category === categoryFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((doc) => doc.type === typeFilter);
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter((doc) => doc.difficulty === difficultyFilter);
    }

    setFilteredDocuments(filtered);
  };

  const getUniqueValues = (key: keyof TechDocument) => {
    return Array.from(new Set(documents.map((doc) => doc[key]))).filter(Boolean);
  };

  const handleDocumentClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "";
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
            📚 Tech Corner
          </h1>
          <p className="text-xl text-muted-foreground">
            Technical documentation, SOPs, and learning resources
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
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
                {getUniqueValues("category").map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {getUniqueValues("type").map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {getUniqueValues("difficulty").map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredDocuments.length} of {documents.length} documents
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setTypeFilter("all");
                  setDifficultyFilter("all");
                }}
              >
                Clear Filters
              </Button>
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="h-8"
                >
                  Table
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc, index) => (
              <Card key={index} className="dkloud-card h-full cursor-pointer group" onClick={() => handleDocumentClick(doc.link)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {doc.title}
                      </CardTitle>
                    </div>
                    <Badge variant="outline">{doc.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">{doc.category}</Badge>
                    <Badge className={getDifficultyColor(doc.difficulty)}>
                      {doc.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription>
                    {doc.description}
                  </CardDescription>
                  
                  {doc.tags && (
                    <div className="flex flex-wrap gap-1">
                      <Tag className="h-3 w-3 mr-1 mt-0.5" />
                      {doc.tags.split(",").map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Updated: {doc["last-updated"]}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDocumentClick(doc.link);
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc, index) => (
                  <TableRow key={index} className="cursor-pointer hover:bg-muted/50" onClick={() => handleDocumentClick(doc.link)}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-sm text-muted-foreground">{doc.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{doc.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(doc.difficulty)}>
                        {doc.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {doc["last-updated"]}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDocumentClick(doc.link);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {filteredDocuments.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechCorner;