import { useState } from "react";
import { Music, Palette, Code, PenTool, Users, Zap, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Custom AI-Generated Logos & Designs",
      description: "Creative AI-powered logo design service tailored to your brand's identity. Personalized to fit your vision with cutting-edge AI technology.",
      features: ["Brand Identity Design", "Logo Variations", "Color Schemes", "Vector Files"]
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Custom AI-Generated Songs for Occasions",
      description: "Unique songs for birthdays, weddings, anniversaries, and more. Provide your preferences and receive a personalized composition.",
      features: ["Birthday Songs", "Wedding Anthems", "Anniversary Tracks", "Custom Lyrics"]
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Music Composition & Songwriting",
      description: "Original music and lyrics for special events or projects. Multiple genres available with professional quality.",
      features: ["Original Compositions", "Lyric Writing", "Multiple Genres", "Professional Recording"]
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Poetry & Shayari Writing",
      description: "Personalized poetry, shayari, and diary writing for gifts, events, or personal use. Deeply personalized based on emotions or occasions.",
      features: ["Custom Poetry", "Shayari Creation", "Personal Diaries", "Gift Writing"]
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Guitar Music Classes",
      description: "One-on-one guitar lessons from beginner to advanced levels. Learn from an experienced musician and composer.",
      features: ["Beginner to Advanced", "One-on-One Sessions", "Music Theory", "Practical Skills"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Website Development Services",
      description: "Small projects like personal blogs, portfolios, or business websites. Sleek design with user-friendly functionality.",
      features: ["Personal Blogs", "Portfolio Sites", "Business Websites", "Responsive Design"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "One-on-One Classes & Workshops",
      description: "Personalized instruction in music composition, AI design, songwriting, and creative areas. Gain valuable skills with expert guidance.",
      features: ["Music Composition", "AI Design", "Songwriting", "Creative Workshops"]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Custom Digital Solutions",
      description: "Branding, graphic design, video editing, and more. Versatile digital solutions for all your creative needs.",
      features: ["Brand Design", "Graphic Design", "Video Editing", "Digital Marketing"]
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🎵 What I Offer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive creative and technical services blending artistry with cutting-edge technology.
            Let's create something extraordinary together.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="dkloud-card dkloud-card-interactive h-full fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-primary">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch to discuss your requirements and let's bring your vision to life with personalized, impactful solutions.
          </p>
          
          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Button asChild className="btn-gradient h-16">
              <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <MessageCircle className="h-6 w-6 mb-1" />
                <span>WhatsApp</span>
              </a>
            </Button>
            
            <Button asChild variant="outline" className="h-16">
              <a href="mailto:dileepkryadav09@gmail.com" className="flex flex-col items-center">
                <Mail className="h-6 w-6 mb-1" />
                <span>Email</span>
              </a>
            </Button>
            
            <Button asChild variant="outline" className="h-16">
              <a href="https://instagram.com/batbotdk09" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-1" />
                <span>Instagram</span>
              </a>
            </Button>
            
            <Button asChild variant="outline" className="h-16">
              <a href="https://www.linkedin.com/in/dileep-yadav-63500158" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-1" />
                <span>LinkedIn</span>
              </a>
            </Button>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Project Inquiry Form</h3>
            <p className="text-muted-foreground mb-4">
              For detailed project discussions, please reach out via WhatsApp or email with your requirements.
              Include your project type, timeline, and specific needs for a personalized quote.
            </p>
            <Button asChild size="lg" className="btn-gradient">
              <a href="https://wa.me/918175996960?text=Hi! I'm interested in your services. Let's discuss my project requirements." target="_blank" rel="noopener noreferrer">
                Start Project Discussion
              </a>
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Let's Create Something Extraordinary Together</h2>
          <p className="text-lg text-muted-foreground mb-6">
            With my experience, knowledge, and commitment, I can turn your ideas into something truly special.
          </p>
          <Button asChild size="lg" className="btn-gradient text-lg px-10 py-4">
            <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer">
              Get Started Today
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;