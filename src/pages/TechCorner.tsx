
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText, GraduationCap, Search, Filter, BookOpen, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const fetchTechCornerData = async () => {
  const response = await fetch("https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec");
  if (!response.ok) {
    throw new Error("Failed to fetch tech corner data");
  }
  return response.json();
};

const TechCorner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Get tab from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get('tab') || 'free';
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  const { data: techData, isLoading, error } = useQuery({
    queryKey: ['techCornerData'],
    queryFn: fetchTechCornerData,
  });

  // Update URL when tab changes
  useEffect(() => {
    const newUrl = `/techcorner?tab=${activeTab}`;
    navigate(newUrl, { replace: true });
  }, [activeTab, navigate]);

  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  const filteredData = techData?.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
                           item.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    // Filter by tab type
    const isFreeResource = item.type?.toLowerCase() === 'free' || 
                          item.category?.toLowerCase().includes('sop') ||
                          item.category?.toLowerCase().includes('cheat') ||
                          item.category?.toLowerCase().includes('guide');
    
    const isCourse = item.type?.toLowerCase() === 'course' || 
                    item.category?.toLowerCase().includes('course') ||
                    item.title?.toLowerCase().includes('course');
    
    if (activeTab === 'free') {
      return matchesSearch && matchesCategory && isFreeResource;
    } else if (activeTab === 'courses') {
      return matchesSearch && matchesCategory && isCourse;
    }
    
    return matchesSearch && matchesCategory;
  }) || [];

  const categories = [...new Set(techData?.map(item => item.category).filter(Boolean) || [])];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading tech resources...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-red-500">Error loading tech corner data</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
            Tech Corner
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover free resources, SOPs, cheat sheets, and premium micro-courses to enhance your technical skills
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="free" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Free Resources</h2>
              <p className="text-muted-foreground">
                Access our collection of SOPs, cheat sheets, and technology guides - completely free!
              </p>
            </div>
            
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No free resources found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item, index) => (
                  <Card key={index} className="dkloud-card card-tech hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <FileText className="h-8 w-8 text-emerald-500 mb-2" />
                        <Badge variant="secondary">Free</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {item.description || "Comprehensive resource for technical guidance"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.category && (
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        )}
                        {item.tags?.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            if (item.url) {
                              window.open(item.url, '_blank');
                            } else {
                              toast.info("Resource link coming soon!");
                            }
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.info("Download feature coming soon!")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">dKloud Courses</h2>
              <p className="text-muted-foreground">
                Premium micro-courses designed to accelerate your learning journey
              </p>
            </div>
            
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No courses found matching your criteria</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Premium courses are coming soon! Stay tuned for exciting learning opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item, index) => (
                  <Card key={index} className="dkloud-card card-tech hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <GraduationCap className="h-8 w-8 text-emerald-500 mb-2" />
                        <Badge variant="default">Premium</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {item.description || "Comprehensive course for skill development"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.category && (
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        )}
                        {item.duration && (
                          <Badge variant="outline" className="text-xs">
                            {item.duration}
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        {item.price && (
                          <span className="text-lg font-bold text-primary">
                            ₹{item.price}
                          </span>
                        )}
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        )}
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => {
                          if (item.url) {
                            window.open(item.url, '_blank');
                          } else {
                            toast.info("Course enrollment coming soon!");
                          }
                        }}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TechCorner;
