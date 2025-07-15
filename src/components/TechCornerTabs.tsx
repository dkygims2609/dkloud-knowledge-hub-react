
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechDocument {
  Title: string;
  Category: string;
  Type: string;
  Tags?: string;
  Description?: string;
  Link: string;
}

interface TechCornerTabsProps {
  documents: TechDocument[];
  onDocumentClick: (link: string) => void;
}

export function TechCornerTabs({ documents, onDocumentClick }: TechCornerTabsProps) {
  // Filter documents for SOPs and Cheat Sheets
  const sopAndCheatSheets = documents.filter(doc => 
    doc.Category.toLowerCase().includes('sop') || 
    doc.Category.toLowerCase().includes('cheatsheet') ||
    doc.Type.toLowerCase().includes('sop') ||
    doc.Type.toLowerCase().includes('cheat')
  );

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
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-950/20',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-700 dark:text-gray-300',
          icon: '📄'
        };
    }
  };

  return (
    <Tabs defaultValue="sops-cheatsheets" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="sops-cheatsheets" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          SOPs & Cheat Sheets
        </TabsTrigger>
        <TabsTrigger value="micro-courses" className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Digital Micro Courses
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sops-cheatsheets" className="space-y-6">
        <div className="grid gap-6 mobile-single-column tablet-two-columns desktop-three-columns">
          {sopAndCheatSheets.map((doc, index) => {
            const categoryColors = getCategoryColor(doc.Category);
            const tags = doc.Tags ? doc.Tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];
            
            return (
              <Card 
                key={index} 
                className={`dkloud-card h-full cursor-pointer group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${categoryColors.border}`}
                onClick={() => onDocumentClick(doc.Link)}
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </TabsContent>

      <TabsContent value="micro-courses" className="space-y-6">
        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <GraduationCap className="h-24 w-24 mx-auto text-primary mb-6 animate-pulse" />
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Digital Micro Courses
              </h3>
              <p className="text-xl text-muted-foreground mb-8">
                Coming Soon! Comprehensive micro-learning experiences designed for busy professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="dkloud-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-500" />
                    Technology Courses
                  </CardTitle>
                  <CardDescription>
                    Learn cutting-edge technologies through bite-sized, practical lessons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• React & TypeScript Mastery</div>
                    <div>• AI/ML Fundamentals</div>
                    <div>• Cloud Architecture Patterns</div>
                    <div>• DevOps Best Practices</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dkloud-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    Cross-Cultural Communication
                  </CardTitle>
                  <CardDescription>
                    Master global communication skills for diverse teams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• Remote Team Collaboration</div>
                    <div>• Cultural Intelligence</div>
                    <div>• International Business Etiquette</div>
                    <div>• Effective Global Leadership</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Badge variant="outline" className="px-6 py-2 text-lg">
              🚀 Launching Soon - Stay Tuned!
            </Badge>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
