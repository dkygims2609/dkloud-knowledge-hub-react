
import { useState } from "react";
import { Package, Zap, Brain, Rocket, Star, ExternalLink, Download, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const DigiProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const products = [
    {
      id: "smart-seo-tool",
      title: "Smart SEO Analyzer",
      description: "AI-powered SEO analysis tool that provides comprehensive website optimization insights and recommendations.",
      category: "tools",
      status: "available",
      price: "₹999",
      features: ["Real-time analysis", "Competitor insights", "Keyword suggestions", "Performance tracking"],
      icon: Zap,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "ai-content-agent",
      title: "dKloud Content AI",
      description: "Advanced AI agent for generating high-quality, SEO-optimized content for blogs, social media, and websites.",
      category: "ai",
      status: "available",
      price: "₹1,499",
      features: ["Multi-format content", "SEO optimization", "Brand voice adaptation", "Batch generation"],
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "website-builder-pro",
      title: "dKloud Builder Pro",
      description: "Professional website building solution with AI assistance, custom templates, and integrated analytics.",
      category: "solutions",
      status: "coming-soon",
      price: "₹2,999",
      features: ["AI-assisted design", "Custom templates", "Analytics dashboard", "E-commerce ready"],
      icon: Package,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "automation-suite",
      title: "Smart Automation Suite",
      description: "Complete business automation toolkit for social media management, email marketing, and workflow optimization.",
      category: "tools",
      status: "coming-soon",
      price: "₹3,999",
      features: ["Social media automation", "Email campaigns", "Workflow builder", "Analytics reporting"],
      icon: Rocket,
      color: "from-orange-500 to-red-500"
    }
  ];

  const categories = [
    { id: "all", name: "All Products", icon: Package },
    { id: "tools", name: "Smart Tools", icon: Zap },
    { id: "ai", name: "AI Agents", icon: Brain },
    { id: "solutions", name: "Digital Solutions", icon: Rocket },
    { id: "coming-soon", name: "Coming Soon", icon: Star }
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => 
        activeCategory === "coming-soon" 
          ? product.status === "coming-soon"
          : product.category === activeCategory
      );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Digi Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our collection of innovative digital products, smart tools, and AI-powered solutions designed to enhance your productivity and business growth.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="dkloud-card dkloud-card-interactive h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${product.color} text-white`}>
                    <product.icon className="h-6 w-6" />
                  </div>
                  <Badge variant={product.status === "available" ? "default" : "secondary"}>
                    {product.status === "available" ? "Available" : "Coming Soon"}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-sharp-bright">{product.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sharp-bright">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">{product.price}</div>
                  <div className="flex space-x-2">
                    {product.status === "available" ? (
                      <>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Demo
                        </Button>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Buy Now
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        <Star className="h-4 w-4 mr-1" />
                        Notify Me
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4 text-sharp-bright">Have a Custom Requirement?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Need a custom digital solution tailored to your specific business needs? 
            Let's discuss how we can build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-gradient">
              <Link to="/services">
                <Rocket className="h-5 w-5 mr-2" />
                Request Custom Solution
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/portfolio">
                View Our Work
              </Link>
            </Button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-sharp-bright">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to know about new product launches and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="btn-gradient">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiProducts;
