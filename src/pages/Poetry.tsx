import { useState, useEffect } from "react";
import { Search, Heart, BookOpen, Feather } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PoetryEntry {
  title: string;
  content: string;
  date?: string;
}

const Poetry = () => {
  const [poetry, setPoetry] = useState<PoetryEntry[]>([]);
  const [filteredPoetry, setFilteredPoetry] = useState<PoetryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPoetry();
  }, []);

  useEffect(() => {
    filterPoetry();
  }, [poetry, searchTerm]);

  const fetchPoetry = async () => {
    try {
      // Load the poetry collection directly
      const poetryCollection: PoetryEntry[] = [
        {
          title: "1. मेरी Peace",
          content: "मुझे लोग दस बीस नही चाहिए..\nतुझसे दूरी हरगिज नहीं चाहिए..\nतेरी बाहों में आके मिलती है जो मुझे..\nहां हां मुझे पीस वही चाहिए....",
          date: "2024-01-15"
        },
        {
          title: "2. प्यार के बारे में",
          content: "मेरे पास वक्त कितना है, नहीं जानता हूं।।\nतुम्हारे साथ जीना है मुझे, बस यही जानता हूं।।\nऔर तुमने प्यार में सिखाया है जो भी आजतक।\nप्यार के बारे में मैं बस वही जानता हूं।।",
          date: "2024-01-14"
        },
        {
          title: "3. उसके आने के बाद",
          content: "मुझे कुछ नहीं पाना है उसे पाने के बाद।\nतुम्हे भी कुछ सुनाऊंगा उसके लिए गाने के बाद।।\n\nये पहाड़, बर्फ नदियां खूबसूरत तो लगते हैं मुझे\nशर्त बस इतनी है उसके आने के बाद..",
          date: "2024-01-13"
        },
        {
          title: "4. वजहें ग़म",
          content: "कुछ पल ठहरने को ठिकाने ढूंढ रहा हूं\nगुजर गए जो वो जमाने ढूंढ रहा हूं।।\nमारने को मुझे आमदा हैं वजहे गम मेरे।\nये तो मैं हूं जो जीने के बहाने ढूंढ रहा हूं।।",
          date: "2024-01-12"
        },
        {
          title: "5. जो तू है",
          content: "हर महफिल कमाल सी लगती है, जो तू है।\nये दुनिया खयाल सी लगती है, जो तू है।।\nजो तू नहीं, तो लगता है मुझे सब खाक सा।\nऔर खाक भी गुलाल सी लगती है, जो तू है।।",
          date: "2024-01-11"
        },
        {
          title: "6. मरना होगा",
          content: "जुल्फो में अपने वो पुरवाई लेकर चलती है।\nहोंठो पर लफ्जो की शहनाई लेकर चलती है।।\nमरना होगा तो देखूंगा जी भर उसकी आंखो में।।\nआंखो में वो सागर सी गहराई लेकर चलती है।",
          date: "2024-01-10"
        },
        {
          title: "7. मुझसे प्यार मत करना",
          content: "मेरी मासूम बातो पर, एतबार मत करना।\nगर कभी कर भी लो, तो बार बार मत करना।।\nगुरुर चढ़ जाता है मुझे, जरा से इश्क का भी।\nमैं पसंद आ भी जाऊं कही, तो इजहार मत करना।।\nअगर कर दू इजहारे दिल मैं ही कभी तुमसे।\nतो आसानी से मुझसे प्यार मत करना।\nफिर कूदना हो अगर इश्क दरिया में मेरे साथ।\nहाथ छुड़ा कर अकेले पार मत करना।।\nऔर मर ना सको मेरे इश्क में अगर तुम।\nमुझसे भूल कर भी प्यार मत करना।।\nमेरी मासूम बातो पर, एतबार मत करना।",
          date: "2024-01-09"
        },
        {
          title: "8. लूट",
          content: "उसको देखा तो बैट वैट सब हाथ से मेरे छूट गया।।\nदिल छलका और प्यार व्यार से बांध सब्र का टूट गया।।\nमैंने छुपा के रखा था ना दा दिल को हां गुल्लक में।।\nउसका हुनर था ऐसा की बस आंखो से लूट गया।।",
          date: "2024-01-08"
        },
        {
          title: "9. मां का कहा",
          content: "जो जो नहीं करना था वही किया हूं।\nगलत करके लगता था सही किया हूं।\nएक ही मलाल है मेरी जिंदगी का फकत।\nमा का कहा नहीं किया हूं।।",
          date: "2024-01-07"
        },
        {
          title: "10. मजाक के बाद",
          content: "करते हो जताते हो सब खाक करते हो।\nमजाक के बाद फिर मजाक करते हो।",
          date: "2024-01-06"
        },
        {
          title: "11. खुद ही",
          content: "खुद ही अपने हार पर लिखने लगा हूं।\nभूल के खुद को संसार पर लिखने लगा हूं।।\nउसने पढ़ाया है कुछ तो अपनी आंखों से।\nदुबारा मैं प्यार पर लिखने लगा हूं।।",
          date: "2024-01-05"
        },
        {
          title: "12. कुंभ",
          content: "40 तक हम घूम घूम के रोज कीहिंन सब पाप।\nकुंभ में मारिन ती ने डुबकी कई दीहीन सब साफ।",
          date: "2024-01-04"
        },
        {
          title: "13. हक नहीं चाहिए",
          content: "हक नहीं चाहिए, सड़क नही चाहिए।\nप्यार नही चाहिए, संसार नही चाहिए।।\nचाहिए नही किताब मुझे, कुछ बनने के ख्वाब मुझे।\nईमान पर मेरे शक नही चाहिए, हक नही चाहिए।।\nइंसाफ नहीं चाहिए, नाला साफ नही चाहिए।।\nचाहिए नही रोजगार मुझे, टोकने वाले लोग वो चार मुझे।।\nकान में नेताओ की बक बक नही चाहिए।।\nहक नही चाहिए।।",
          date: "2024-01-03"
        }
      ];
      
      setPoetry(poetryCollection);
      setLoading(false);
    } catch (error) {
      console.error("Error loading poetry:", error);
      setLoading(false);
    }
  };

  const parsePoetryText = (text: string): PoetryEntry[] => {
    const entries: PoetryEntry[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    let currentEntry: PoetryEntry | null = null;
    let contentLines: string[] = [];
    
    for (const line of lines) {
      if (line.includes('Shayari') || line.match(/^\d+\./)) {
        // Save previous entry if exists
        if (currentEntry) {
          currentEntry.content = contentLines.join('\n');
          entries.push(currentEntry);
        }
        
        // Start new entry
        currentEntry = {
          title: line.trim(),
          content: ""
        };
        contentLines = [];
      } else {
        // Add to content
        contentLines.push(line.trim());
      }
    }
    
    // Don't forget the last entry
    if (currentEntry) {
      currentEntry.content = contentLines.join('\n');
      entries.push(currentEntry);
    }
    
    return entries;
  };

  const filterPoetry = () => {
    const filtered = poetry.filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPoetry(filtered);
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ✍️ Penned Down
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of poetry, shayari, and creative writings from the heart
          </p>
        </div>

        {/* Search */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search poetry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPoetry.length} of {poetry.length} entries
            </p>
          </div>
        </div>

        {/* Poetry Collection */}
        <div className="space-y-8">
          {filteredPoetry.map((entry, index) => (
            <Card key={index} className="dkloud-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Feather className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{entry.title}</CardTitle>
                </div>
                {entry.date && (
                  <p className="text-sm text-muted-foreground">
                    Written on {new Date(entry.date).toLocaleDateString()}
                  </p>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-lg leading-relaxed font-medium">
                    {entry.content}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm">Poetry</span>
                  </div>
                  <Heart className="h-5 w-5 text-red-500 hover:fill-current cursor-pointer transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPoetry.length === 0 && !loading && (
          <div className="text-center py-12">
            <Feather className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No poetry found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms.</p>
          </div>
        )}

        {/* Inspirational Quote */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-xl">
          <blockquote className="text-xl italic text-muted-foreground">
            "Poetry is the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility."
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-2 block">- William Wordsworth</cite>
        </div>
      </div>
    </div>
  );
};

export default Poetry;