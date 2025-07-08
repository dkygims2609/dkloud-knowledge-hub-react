import { Cloud, Music, Palette, Rocket } from "lucide-react";

export function ColorBandSection() {
  const sections = [
    {
      icon: Cloud,
      title: "Cloud Computing",
      subtitle: "Scalable Solutions", 
      gradient: "from-purple-500 via-indigo-500 to-blue-500"
    },
    {
      icon: Music,
      title: "Music Composer", 
      subtitle: "Creative Melodies",
      gradient: "from-blue-500 via-teal-500 to-green-500"
    },
    {
      icon: Palette,
      title: "Content Creator",
      subtitle: "Digital Stories", 
      gradient: "from-green-500 via-yellow-500 to-red-500"
    },
    {
      icon: Rocket,
      title: "Creative Techy",
      subtitle: "Innovation Drive",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto my-12">
      {/* Individual Icon Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div key={index} className="group relative">
              <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-2xl p-6 text-center hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                {/* Icon */}
                <div className="mb-4">
                  <IconComponent className="h-8 w-8 mx-auto text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div>
                  <h4 className="font-bold text-sm mb-1 text-foreground group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </h4>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {section.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}