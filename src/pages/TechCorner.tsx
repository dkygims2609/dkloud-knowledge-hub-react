
import { useState, useEffect } from "react";
import { Search, Filter, FileText, Download, ExternalLink, Tag, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

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
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'free';

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, categoryFilter, typeFilter, selectedTags, activeTab]);

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
      // Filter by tab - Free Resources vs dKloud Courses
      if (activeTab === 'free') {
        // Free resources: SOPs, CheatSheets, and other free content
        const isFreeContent = doc.Category.toLowerCase().includes('sop') || 
                             doc.Category.toLowerCase().includes('cheatsheet') ||
                             doc.Type.toLowerCase().includes('free') ||
                             !doc.Category.toLowerCase().includes('microcourse');
        if (!isFreeContent) return false;
      } else if (activeTab === 'courses') {
        // dKloud Courses: Micro courses and premium content
        const isCourseContent = doc.Category.toLowerCase().includes('microcourse') ||
                               doc.Type.toLowerCase().includes('course') ||
                               doc.Type.toLowerCase().includes('premium');
        if (!isCourseContent) return false;
      }

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

    if (typeFilter !== "all") {
      filtered = filtered.filter((doc) => doc.Type === typeFilter);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((doc) =>
        selectedTags.some(tag =>
          doc.Tags && doc.Tags.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }

    setFilteredDocuments(filtered);
  };

  const getUniqueValues = (key: keyof TechDocument) => {
    const tabFilteredDocs = documents.filter(doc => {
      if (activeTab === 'free') {
        return doc.Category.toLowerCase().includes('sop') || 
               doc.Category.toLowerCase().includes('cheatsheet') ||
               doc.Type.toLowerCase().includes('free') ||
               !doc.Category.toLowerCase().includes('microcourse');
      } else if (activeTab === 'courses') {
        return doc.Category.toLowerCase().includes('microcourse') ||
               doc.Type.toLowerCase().includes('course') ||
               doc.Type.toLowerCase().includes('premium');
      }
      return true;
    });
    return Array.from(new Set(tabFilteredDocs.map((doc) => doc[key]))).filter(Boolean);
  };

  const getAllTags = () => {
    const tabFilteredDocs = documents.filter(doc => {
      if (activeTab === 'free') {
        return doc.Category.toLowerCase().includes('sop') || 
               doc.Category.toLowerCase().includes('cheatsheet') ||
               doc.Type.toLowerCase().includes('free') ||
               !doc.Category.toLowerCase().includes('microcourse');
      } else if (activeTab === 'courses') {
        return doc.Category.toLowerCase().includes('microcourse') ||
               doc.Type.toLowerCase().includes('course') ||
               doc.Type.toLowerCase().includes('premium');
      }
      return true;
    });
    
    const allTags = tabFilteredDocs
      .filter(doc => doc.Tags)
      .flatMap(doc => doc.Tags!.split(',').map(tag => tag.trim()))
      .filter(tag => tag.length > 0);
    return Array.from(new Set(allTags));
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cheatsheet':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-700 dark:text-blue-300',
          icon: '📄'
        };
      case 'sop':
        return {
          bg: 'bg-green-50 dark:bg-green-950/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-700 dark:text-green-300',
          icon: '📋'
        };
      case 'microcourse':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950/20',
          border: 'border-purple-200 dark:border-purple-800',
          text: 'text-purple-700 dark:text-purple-300',
          icon: '🎓'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-950/20',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-700 dark:text-gray-300',
          icon: '📄'
        };
    }
  };

  const handleDocumentClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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

        {/* Tabs for Free Resources vs dKloud Courses */}
        <Tabs value={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="free" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Free Resources
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              dKloud Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="free" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Free Resources</h2>
              <p className="text-muted-foreground">SOPs, Cheat Sheets, and Technology Guides - Completely Free</p>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">dKloud Micro Courses</h2>
              <p className="text-muted-foreground">Premium Digital Courses and Advanced Learning Materials</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 space-y-6">
          {/* Search and Main Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {getUniqueValues("Category").map((category) => {
                  const colors = getCategoryColor(category);
                  return (
                    <SelectItem key={category} value={category}>
                      <span className="flex items-center gap-2">
                        <span>{colors.icon}</span>
                        {category}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <Tag className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {getUniqueValues("Type").map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tag Filter */}
          {getAllTags().length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Filter by Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {getAllTags().map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Filter Summary and Clear */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              <span>Showing {filteredDocuments.length} of {documents.filter(doc => {
                if (activeTab === 'free') {
                  return doc.Category.toLowerCase().includes('sop') || 
                         doc.Category.toLowerCase().includes('cheatsheet') ||
                         doc.Type.toLowerCase().includes('free') ||
                         !doc.Category.toLowerCase().includes('microcourse');
                } else if (activeTab === 'courses') {
                  return doc.Category.toLowerCase().includes('microcourse') ||
                         doc.Type.toLowerCase().includes('course') ||
                         doc.Type.toLowerCase().includes('premium');
                }
                return true;
              }).length} documents</span>
              {(categoryFilter !== "all" || typeFilter !== "all" || selectedTags.length > 0 || searchTerm) && (
                <span className="ml-2 text-primary">• Filters active</span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setTypeFilter("all");
                setSelectedTags([]);
              }}
              disabled={categoryFilter === "all" && typeFilter === "all" && selectedTags.length === 0 && !searchTerm}
            >
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Enhanced Documents Grid */}
        <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
          {filteredDocuments.map((doc, index) => {
            const categoryColors = getCategoryColor(doc.Category);
            const tags = doc.Tags ? doc.Tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];
            
            return (
              <Card 
                key={index} 
                className={`dkloud-card h-full cursor-pointer group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${categoryColors.border}`}
                onClick={() => handleDocumentClick(doc.Link)}
              >
                <CardHeader className="pb-4">
                  {/* Category Header with Color Coding */}
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${categoryColors.bg} ${categoryColors.border} border mb-3`}>
                    <span className="text-lg">{categoryColors.icon}</span>
                    <Badge 
                      variant="secondary"
                      className={`${categoryColors.text} bg-transparent border-none font-medium`}
                    >
                      {doc.Category}
                    </Badge>
                    <div className="ml-auto">
                      <Badge variant="outline" className="text-xs">
                        {doc.Type}
                      </Badge>
                    </div>
                  </div>

                  {/* Title */}
                  <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
                    {doc.Title}
                  </CardTitle>

                  {/* Description */}
                  {doc.Description && (
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {doc.Description}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0 space-y-4">
                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className="text-xs px-2 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {tags.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1 rounded-full">
                          +{tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>View Resource</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDocumentClick(doc.Link);
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

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
