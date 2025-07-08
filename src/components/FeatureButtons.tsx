import { Star, Users, Github, Brain } from "lucide-react";

export function FeatureButtons() {
  const features = [
    {
      icon: Star,
      label: "Curated Content"
    },
    {
      icon: Users,
      label: "Community Driven"
    },
    {
      icon: Github,
      label: "Open Source"
    },
    {
      icon: Brain,
      label: "AI Powered"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <div 
            key={index}
            className="group flex items-center gap-3 px-6 py-3 bg-card/60 backdrop-blur-md border border-border/30 rounded-full hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            <IconComponent className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-300" />
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              {feature.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}