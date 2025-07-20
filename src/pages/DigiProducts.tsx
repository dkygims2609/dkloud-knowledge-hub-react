
import { useState } from "react";
import { Package, Star, ArrowRight, Sparkles, Clock, CheckCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { sampleDigiProducts, courseAnnouncement } from "@/data/digiProductsSample";

const DigiProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products", count: sampleDigiProducts.length },
    { id: "tools", name: "Smart Tools", count: sampleDigiProducts.filter(p => p.category === "tools").length },
    { id: "ai", name: "AI Agents", count: sampleDigiProducts.filter(p => p.category === "ai").length },
    { id: "solutions", name: "Digital Solutions", count: sampleDigiProducts.filter(p => p.category === "solutions").length },
    { id: "courses", name: "Micro Courses", count: sampleDigiProducts.filter(p => p.category === "courses").length }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? sampleDigiProducts 
    : sampleDigiProducts.filter(product => product.category === selectedCategory);

  const getCardGradient = (index: number) => {
    const gradients = [
      "from-blue-500/20 via-purple-500/20 to-pink-500/20",
      "from-green-500/20 via-teal-500/20 to-blue-500/20",
      "from-orange-500/20 via-red-500/20 to-pink-500/20",
      "from-purple-500/20 via-indigo-500/20 to-blue-500/20",
      "from-yellow-500/20 via-orange-500/20 to-red-500/20"
    ];
    return gradients[index % gradients.length];
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "available": return "default";
      case "coming-soon": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle background text */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 text-6xl font-bold text-muted-foreground/5 rotate-12 select-none">
          Digital Innovation
        </div>
        <div className="absolute top-1/2 right-1/4 text-5xl font-bold text-muted-foreground/5 -rotate-12 select-none">
          Smart Solutions
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-4xl font-bold text-muted-foreground/5 rotate-6 select-none">
          dKloud Products
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            📦 dKloud Digital Products
          </h1>
          <p className="text-xl text-muted-foreground">
            Innovative digital solutions to accelerate your business growth
          </p>
        </div>

        {/* Course Announcement Banner */}
        <Alert className="mb-8 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border-orange-500/30">
          <Sparkles className="h-5 w-5 text-orange-500" />
          <AlertTitle className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {courseAnnouncement.title}
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <p className="text-foreground/80">{courseAnnouncement.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              {courseAnnouncement.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center text-sm text-foreground/70">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {highlight}
                </div>
              ))}
            </div>
            <Button className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Bell className="h-4 w-4 mr-2" />
              {courseAnnouncement.cta}
            </Button>
          </AlertDescription>
        </Alert>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 h-auto p-1">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm lg:text-base p-3">
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className={`dkloud-card dkloud-card-interactive h-full relative overflow-hidden bg-gradient-to-br ${getCardGradient(index)} border-0 shadow-xl hover:shadow-2xl transition-all duration-500`}>
                <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-sm" />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge variant={getBadgeVariant(product.status)} className="shadow-lg">
                      {product.badge}
                    </Badge>
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pr-16">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </CardDescription>
                    {product.announcement && (
                      <div className="mt-2 p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                          {product.announcement}
                        </p>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                        {product.price}
                      </span>
                      {product.status === "coming-soon" && (
                        <div className="flex items-center text-sm text-orange-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Coming Soon
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-3 text-primary">Key Features:</h4>
                      <div className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm">
                            <Star className="h-3 w-3 text-accent mr-2" />
                            <span className="text-foreground/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-border/30">
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                        disabled={product.status === "coming-soon"}
                      >
                        {product.status === "coming-soon" ? (
                          <>
                            <Bell className="h-4 w-4 mr-2" />
                            Get Notified
                          </>
                        ) : (
                          <>
                            Learn More
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Check back soon for new digital products!</p>
            </div>
          )}
        </Tabs>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            More Products Coming Soon
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            We're constantly developing new digital solutions to help you succeed
          </p>
          <Button variant="outline" size="lg" className="animated-border-glow">
            <Bell className="h-5 w-5 mr-2" />
            Subscribe for Updates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DigiProducts;
