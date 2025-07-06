import { useState, useEffect } from "react";
import { ExternalLink, Calendar, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  published: string;
  source: string;
  category: string;
}

const TechNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Using a mock data structure for demo - replace with actual API
      const mockArticles: NewsArticle[] = [
        {
          title: "AI Revolution: Latest Breakthroughs in Machine Learning",
          description: "Discover the latest advancements in artificial intelligence and machine learning that are shaping the future of technology.",
          url: "https://example.com/ai-news",
          image: "/placeholder.svg",
          published: "2024-01-15",
          source: "Tech Today",
          category: "Artificial Intelligence"
        },
        {
          title: "Cloud Computing Trends for 2024",
          description: "Explore the upcoming trends in cloud computing, including serverless architecture and edge computing solutions.",
          url: "https://example.com/cloud-news",
          image: "/placeholder.svg",
          published: "2024-01-14",
          source: "Cloud Weekly",
          category: "Cloud Computing"
        },
        {
          title: "Cybersecurity: New Threats and Defense Strategies",
          description: "Stay updated on the latest cybersecurity threats and learn about effective defense strategies to protect your data.",
          url: "https://example.com/security-news",
          image: "/placeholder.svg",
          published: "2024-01-13",
          source: "Security Now",
          category: "Cybersecurity"
        },
        {
          title: "Web Development: React 19 Features Preview",
          description: "Get an early look at the exciting new features coming in React 19 and how they'll improve developer experience.",
          url: "https://example.com/react-news",
          image: "/placeholder.svg",
          published: "2024-01-12",
          source: "Dev Central",
          category: "Web Development"
        },
        {
          title: "Space Tech: Satellites Powering Internet Revolution",
          description: "Learn how satellite technology is revolutionizing global internet connectivity and bridging the digital divide.",
          url: "https://example.com/space-news",
          image: "/placeholder.svg",
          published: "2024-01-11",
          source: "Space Today",
          category: "Space Technology"
        }
      ];
      
      setArticles(mockArticles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tech news:", error);
      setLoading(false);
    }
  };

  const handleArticleClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
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
            📰 Tech News Feed
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay updated with the latest technology news and trends
          </p>
        </div>

        {/* News Articles */}
        <div className="space-y-6">
          {articles.map((article, index) => (
            <Card key={index} className="dkloud-card cursor-pointer group" onClick={() => handleArticleClick(article.url)}>
              <div className="md:flex">
                <div className="md:w-1/3 lg:w-1/4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 md:h-full object-cover rounded-l-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="md:w-2/3 lg:w-3/4 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.published)}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span>{article.source}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <CardDescription className="text-base mb-4">
                      {article.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-primary">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">Tech News</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-primary group-hover:text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArticleClick(article.url);
                        }}
                      >
                        Read More
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>

        {/* Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            News articles are updated regularly from various tech publications
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechNews;