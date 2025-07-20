import { useState, useEffect } from "react";
import { Search, Filter, FileText, Download, ExternalLink, Tag, BookOpen, GraduationCap, Lightbulb, Code, Users, Zap, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackgroundQuestions } from "@/components/BackgroundQuestions";

interface TechDocument {
  Title: string;
  Category: string;
  Type: string;
  Tags?: string;
  Description?: string;
  Link: string;
}

const tabData = [
  {
    id: 'resources',
    label: 'Free Resources',
    icon: BookOpen,
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Free learning materials'
  },
  {
    id: 'courses',
    label: 'dKloud Courses',
    icon: GraduationCap,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Premium courses & micro-courses'
  },
  {
    id: 'guides',
    label: 'SOPs & Guides',
    icon: Lightbulb,
    gradient: 'from-green-500 to-emerald-500',
    description: 'Step-by-step procedures'
  },
  {
    id: 'tutorials',
    label: 'Tutorials',
    icon: Code,
    gradient: 'from-orange-500 to-red-500',
    description: 'Hands-on learning'
  }
];

const microCourses = [
  {
    id: 1,
    title: "AI Fundamentals for Beginners",
    description: "Learn the basics of Artificial Intelligence, Machine Learning, and how to implement AI solutions in real-world scenarios.",
    category: "AI & ML",
    duration: "4 weeks",
    level: "Beginner",
    price: "₹2,999",
    status: "launching_soon",
    features: ["Interactive Labs", "Real Projects", "Certificate", "Lifetime Access"],
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Digital Marketing Mastery",
    description: "Complete guide to digital marketing including SEO, Social Media, PPC, and Analytics for business growth.",
    category: "Marketing",
    duration: "6 weeks",
    level: "Intermediate",
    price: "₹4,999",
    status: "launching_soon",
    features: ["Live Sessions", "Case Studies", "Tools Access", "Community Support"],
    image: "/placeholder.svg"
  }
];

const TechCorner = () => {
  const [documents, setDocuments] = useState<TechDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<TechDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('resources');

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, categoryFilter, typeFilter, selectedTags]);

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
    return Array.from(new Set(documents.map((doc) => doc[key]))).filter(Boolean);
  };

  const getAllTags = () => {
    const allTags = documents
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="space-y-8">
            {/* Announcement Banner */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">
                    🚀 Digital Micro Courses - Launching Soon!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive learning experiences designed for modern professionals
                  </p>
                </div>
              </div>
            </div>

            {/* Micro Courses Grid */}
            <div className="grid gap-6 mobile-single-column tablet-two-columns">
              {microCourses.map((course) => (
                <Card key={course.id} className="dkloud-card h-full group hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-purple-50/10 dark:to-purple-950/20 border-2 hover:border-purple-500/50">
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                    />
                    <Badge 
                      className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse"
                    >
                      Coming Soon
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary" className="shrink-0 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                        {course.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm line-clamp-3">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-purple-600">
                            {course.price}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">What's Included:</p>
                        <div className="flex flex-wrap gap-1">
                          {course.features.slice(0, 2).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              ✓ {feature}
                            </Badge>
                          ))}
                          {course.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{course.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                        disabled
                      >
                        <Calendar className="h-3 w-3 mr-2" />
                        Notify Me When Available
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            {/* Enhanced Filters */}
            <div className="bg-card rounded-xl p-6 space-y-6">
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
                    {getUniqueValues("Category").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
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
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <span>Showing {filteredDocuments.length} of {documents.length} documents</span>
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

            {/* Documents Grid */}
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

                      <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
                        {doc.Title}
                      </CardTitle>

                      {doc.Description && (
                        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {doc.Description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-4">
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
        );
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <BackgroundQuestions />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            📚 Tech Corner
          </h1>
          <p className="text-xl text-muted-foreground">
            Technical documentation, SOPs, and learning resources
          </p>
        </div>

        {/* Modern Tab System */}
        <div className="mb-8">
          <div className="hidden md:flex bg-background/20 backdrop-blur-md border border-border/30 rounded-2xl p-2">
            {tabData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 flex-1 overflow-hidden ${
                    isActive
                      ? `bg-gradient-to-r ${tab.gradient} backdrop-blur-sm shadow-2xl border border-white/30 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)]`
                      : "hover:bg-background/40 hover:scale-105 hover:shadow-lg hover:border-primary/30 border border-transparent"
                  }`}
                >
                  <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm" 
                      : "bg-muted/50 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary group-hover:scale-110"
                  }`}>
                    <Icon className="h-5 w-5 transition-transform duration-300" />
                  </div>
                  
                  <div className="flex flex-col items-start">
                    <span className={`font-semibold text-sm transition-colors ${
                      isActive ? "text-white drop-shadow-sm" : "text-muted-foreground group-hover:text-primary"
                    }`}>
                      {tab.label}
                    </span>
                    <span className="text-xs text-muted-foreground opacity-70">
                      {tab.description}
                    </span>
                  </div>
                  
                  {isActive && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r rounded-full shadow-lg ${tab.gradient}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Tab Selector */}
          <div className="md:hidden">
            <div className="bg-background/20 backdrop-blur-md border border-border/30 rounded-xl p-3">
              <div className="grid grid-cols-2 gap-2">
                {tabData.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? `bg-gradient-to-r ${tab.gradient} shadow-lg border border-white/30 text-white`
                          : "hover:bg-background/40"
                      }`}
                    >
                      <div className={`p-1.5 rounded-md transition-all duration-200 ${
                        isActive 
                          ? "bg-white/20 text-white backdrop-blur-sm" 
                          : "bg-muted/50 text-muted-foreground"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className={`font-medium text-xs ${
                        isActive ? "text-white font-semibold" : "text-muted-foreground"
                      }`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TechCorner;
