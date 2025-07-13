
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DecodingAnimation } from "@/components/DecodingAnimation";
import { ColorBandSection } from "@/components/ColorBandSection";
import { FloatingIcons } from "@/components/FloatingIcons";
import { IoTFloatingIcons } from "@/components/IoTFloatingIcons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Globe, Code2, Smartphone, Brain, Cloud, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Solutions",
      description: "Intelligent automation and machine learning integration"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Services",
      description: "Scalable cloud infrastructure and deployment solutions"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cybersecurity",
      description: "Comprehensive security audits and protection strategies"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance Optimization",
      description: "Speed and efficiency improvements for digital platforms"
    }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "50+", label: "Happy Clients" },
    { icon: <Globe className="h-6 w-6" />, value: "100+", label: "Projects Completed" },
    { icon: <Star className="h-6 w-6" />, value: "4.9", label: "Client Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <IoTFloatingIcons />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingIcons />
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="relative">
                <span style={{ color: "#6894f1", fontSize: "0.9em" }}>d</span>
                <span style={{ color: "#7b72f2" }}>K</span>
                <span style={{ color: "#8d61f3" }}>loud</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transforming ideas into <span style={{ color: "#10b981" }} className="font-medium">digital reality</span> with 
              innovative technology solutions and <span style={{ color: "#6894f1" }} className="font-medium">expert craftsmanship</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link to="/services" className="flex items-center">
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-bold" style={{ color: "#6894f1" }}>{stat.value}</span>
                  </div>
                  <span className="text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DecodingAnimation />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span style={{ color: "#6894f1" }}>Comprehensive</span> Tech Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end technology solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500/50">
                <CardHeader>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span style={{ color: "#10b981" }}>Transform</span> Your Digital Presence?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your project and bring your vision to life with cutting-edge technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Link to="/services">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ColorBandSection />
      <Footer />
    </div>
  );
};

export default Index;
