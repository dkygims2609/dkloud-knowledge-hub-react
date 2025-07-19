
import { Cloud, Music, Palette, Rocket } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Cloud Computing",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: Music,
    title: "Music Composer", 
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: Palette,
    title: "Content Creator",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Rocket,
    title: "Creative Techy",
    color: "from-orange-400 to-red-500"
  }
];

export const TinyFeatureCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto mb-8">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-md hover:bg-background/30 transition-all duration-300 fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`p-1.5 rounded-full bg-gradient-to-r ${feature.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
            <feature.icon className="h-3 w-3 text-white" />
          </div>
          <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
            {feature.title}
          </span>
        </div>
      ))}
    </div>
  );
};
