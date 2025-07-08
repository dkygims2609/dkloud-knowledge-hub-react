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
      {/* Curved Color Band Background */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 to-red-500 transform -skew-y-1 origin-top-left" 
             style={{ borderRadius: '20px' }} />
        
        {/* Content Grid */}
        <div className="relative grid grid-cols-4 h-full items-center px-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className="text-center text-white">
                <div className="flex flex-col items-center space-y-2">
                  <IconComponent className="h-8 w-8 mb-2" />
                  <div>
                    <h4 className="font-bold text-sm">{section.title}</h4>
                    <p className="text-xs opacity-90">{section.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}