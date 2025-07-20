
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Bot, 
  Globe, 
  Smartphone, 
  Code, 
  Users, 
  Star, 
  ExternalLink,
  ShoppingCart,
  Calendar,
  ArrowRight
} from "lucide-react";
import { sampleDigiProducts } from "@/data/digiProductsSample";
import { BackgroundQuestions } from "@/components/BackgroundQuestions";

const DigiProducts = () => {
  const [products] = useState(sampleDigiProducts);

  const handleProductClick = (productId: number) => {
    console.log(`Product ${productId} clicked`);
    // Handle product navigation or action
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai agents':
        return <Bot className="h-5 w-5" />;
      case 'smart tools':
        return <Zap className="h-5 w-5" />;
      case 'digital solutions':
        return <Globe className="h-5 w-5" />;
      case 'mobile apps':
        return <Smartphone className="h-5 w-5" />;
      case 'web tools':
        return <Code className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai agents':
        return 'from-blue-500 to-cyan-500';
      case 'smart tools':
        return 'from-purple-500 to-pink-500';
      case 'digital solutions':
        return 'from-green-500 to-emerald-500';
      case 'mobile apps':
        return 'from-orange-500 to-red-500';
      case 'web tools':
        return 'from-indigo-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <BackgroundQuestions />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              📦 Digital Products
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovative digital solutions designed to streamline your workflow and boost productivity
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 mobile-single-column tablet-two-columns desktop-three-columns">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="dkloud-card h-full group hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-purple-50/10 dark:to-purple-950/20 border-2 hover:border-purple-500/50 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-8">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryGradient(product.category)} text-white mb-4`}>
                    {getCategoryIcon(product.category)}
                  </div>
                </div>
                
                {/* Status Badge */}
                <Badge 
                  className={`absolute top-4 right-4 ${
                    product.status === 'available' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : product.status === 'coming-soon'
                      ? 'bg-orange-500 hover:bg-orange-600 animate-pulse'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white border-none`}
                >
                  {product.status === 'available' ? '✅ Available' : 
                   product.status === 'coming-soon' ? '🚀 Coming Soon' : '🔧 In Development'}
                </Badge>
              </div>

              <CardHeader className="pb-4">
                {/* Category and Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryGradient(product.category)} text-white text-sm font-medium`}>
                    {getCategoryIcon(product.category)}
                    <span>{product.category}</span>
                  </div>
                  
                  {product.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                {/* Title and Description */}
                <CardTitle className="text-xl leading-tight group-hover:text-purple-600 transition-colors mb-2">
                  {product.name}
                </CardTitle>
                
                <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Key Features</p>
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs px-2 py-1 rounded-full">
                          ✨ {feature}
                        </Badge>
                      ))}
                      {product.features.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1 rounded-full">
                          +{product.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Pricing and CTA */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-purple-600">
                        {product.price}
                      </span>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${getCategoryGradient(product.category)} hover:opacity-90 text-white font-medium group-hover:scale-105 transition-all duration-200`}
                      disabled={product.status !== 'available'}
                    >
                      {product.status === 'available' ? (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Get Started
                        </>
                      ) : product.status === 'coming_soon' ? (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          Notify Me
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Learn More
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
            <h2 className="text-2xl font-bold mb-4">
              Don't see what you need?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We specialize in creating custom digital solutions tailored to your specific requirements. 
              Let's discuss how we can help transform your ideas into reality.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium px-8 py-3">
              <ExternalLink className="h-4 w-4 mr-2" />
              Request Custom Solution
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiProducts;
