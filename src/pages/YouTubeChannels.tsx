import { useState, useEffect } from "react";
import { Search, ExternalLink, Users, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface YouTubeChannel {
  "Channel Name": string;
  "Channel Logo": string;
  "Description": string;
  "Category": string;
  "Subscribers": string;
  "Link": string;
  "Why Recommended": string;
}

const YouTubeChannels = () => {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<YouTubeChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    filterChannels();
  }, [channels, searchTerm]);

  const fetchChannels = async () => {
    try {
      const response = await fetch(
        "https://api.sheetbest.com/sheets/c66a0da1-d347-44f8-adc7-dc02c8627799"
      );
      const data = await response.json();
      setChannels(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching YouTube channels:", error);
      setLoading(false);
    }
  };

  const filterChannels = () => {
    const filtered = channels.filter((channel) =>
      channel["Channel Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.Category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChannels(filtered);
  };

  const handleChannelClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            📹 YouTube Picks
          </h1>
          <p className="text-xl text-muted-foreground">
            Handpicked YouTube channels for learning, entertainment, and inspiration
          </p>
        </div>

        {/* Search */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search channels, categories, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredChannels.length} of {channels.length} channels
            </p>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel, index) => (
            <Card key={index} className="dkloud-card h-full cursor-pointer group" onClick={() => handleChannelClick(channel.Link)}>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {channel["Channel Logo"] ? (
                      <img
                        src={channel["Channel Logo"]}
                        alt={`${channel["Channel Name"]} logo`}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {channel["Channel Name"]}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">{channel.Category}</Badge>
                      {channel.Subscribers && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{channel.Subscribers}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {channel.Description}
                </CardDescription>
                
                {channel["Why Recommended"] && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Why Recommended:</h4>
                    <p className="text-sm text-muted-foreground">
                      {channel["Why Recommended"]}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Play className="h-4 w-4" />
                    <span>YouTube Channel</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChannelClick(channel.Link);
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChannels.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No channels found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeChannels;