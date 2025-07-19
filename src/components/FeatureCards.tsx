
import { Cloud, Music, Palette, Rocket } from "lucide-react";

export function FeatureCards() {
  const features = [
    {
      icon: Cloud,
      title: "Cloud Computing",
      subtitle: "Scalable Solutions",
      description: "Modern cloud infrastructure and development"
    },
    {
      icon: Music,
      title: "Music Composer", 
      subtitle: "Creative Melodies",
      description: "Original compositions and soundtracks"
    },
    {
      icon: Palette,
      title: "Content Creator",
      subtitle: "Digital Stories", 
      description: "Engaging multimedia content creation"
    },
    {
      icon: Rocket,
      title: "Creative Techy",
      subtitle: "Innovation Drive",
      description: "Technology meets creative solutions"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={index} 
              className="feature-card glass-card rounded-xl p-6 text-center hover:border-primary/40 cursor-pointer fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <IconComponent className="h-12 w-12 mx-auto text-primary" />
              </div>
              
              <h3 className="font-bold text-lg mb-2 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-sm text-primary font-medium mb-2">
                {feature.subtitle}
              </p>
              
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
