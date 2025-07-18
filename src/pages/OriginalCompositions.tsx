
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const OriginalCompositions = () => {
  const compositions = [
    {
      title: "Pahla Pyar",
      description: "A melodious composition about first love",
      embedId: "XLgJ4EYof3M"
    },
    {
      title: "Raghuwar Ram Aa Gaye",
      description: "A devotional composition",
      embedId: "153sNf2Z3Qc"
    },
    {
      title: "Pyar Nahi Hai Khel Dear",
      description: "A heartfelt song about love",
      embedId: "rgFtlUeXRqI"
    },
    {
      title: "Koi Pukare Shankar",
      description: "A spiritual composition",
      embedId: "5jXH_7V3IUU"
    },
    {
      title: "Jaatikaar",
      description: "An original composition",
      embedId: "NEjGJ8A2wMI"
    },
    {
      title: "New Composition",
      description: "Latest original musical creation",
      embedId: "dc0ZLFkgF-Q"
    },
    {
      title: "Recent Musical Work",
      description: "A fresh composition showcasing musical evolution",
      embedId: "GVycjyNpzd4"
    }
  ];

  const handleWatchOnYouTube = (embedId: string) => {
    window.open(`https://www.youtube.com/watch?v=${embedId}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🎵 YouTube Compositions
          </h1>
          <p className="text-xl text-muted-foreground">
            Original musical compositions and covers
          </p>
        </div>

        {/* Compositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {compositions.map((composition, index) => (
            <Card key={index} className="dkloud-card h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{composition.title}</CardTitle>
                    <CardDescription className="text-sm">{composition.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* YouTube Embed */}
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${composition.embedId}`}
                    title={composition.title}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => handleWatchOnYouTube(composition.embedId)}
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Watch on YouTube</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OriginalCompositions;
