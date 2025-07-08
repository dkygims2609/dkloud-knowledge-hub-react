import { useState } from "react";
import { Search, Heart, BookOpen, Feather } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PoetryEntry {
  id: number;
  title: string;
  content: string;
}

// Static poetry data
const poetryData: PoetryEntry[] = [
  {
    id: 1,
    title: "Meri Peace",
    content: `मुझे लोग दस बीस नही चाहिए ..
तुझसे दूरी हरगिज नहीं चाहिए ..
तेरी बाहों में आके मिलती है जो मुझे ..
हां हां मुझे पीस वही चाहिए ....`
  },
  {
    id: 2,
    title: "प्यार के बारे में",
    content: `मेरे पास वक्त कितना है , नहीं जानता हूं  ।।
तुम्हारे साथ जीना है मुझे, बस यही जानता हूं ।।
और तुमने प्यार में सिखाया है जो भी आजतक ।
प्यार के बारे में मैं बस वही जानता हूं ।।`
  },
  {
    id: 3,
    title: "उसके आने के बाद",
    content: `मुझे कुछ नहीं पाना है उसे पाने के बाद    ।
तुम्हे भी कुछ सुनाऊंगा उसके लिए गाने के बाद ।।

ये पहाड़ , बर्फ नदियां खूबसूरत तो लगते हैं मुझे
शर्त बस इतनी है उसके आने के बाद ..`
  },
  {
    id: 4,
    title: "वजहें ग़म",
    content: `कुछ पल ठहरने को ठिकाने ढूंढ रहा हूं 
गुजर गए जो वो जमाने ढूंढ रहा हूं ।।
मारने को मुझे आमदा हैं वजहे गम मेरे ।
ये तो मैं हूं जो जीने के बहाने ढूंढ रहा हूं ।।`
  },
  {
    id: 5,
    title: "जो तू है",
    content: `हर महफिल कमाल सी लगती है ,जो तू है |
ये दुनिया खयाल सी लगती है ,जो तू है ।।
जो तू नहीं ,तो लगता है मुझे सब खाक सा ।
और खाक भी गुलाल सी लगती है , जो तू है ।।`
  },
  {
    id: 6,
    title: "मरना होगा",
    content: `जुल्फो में अपने वो पुरवाई लेकर चलती है ।
होंठो पर लफ्जो की शहनाई लेकर चलती है ।।
मरना होगा तो देखूंगा जी भर उसकी आंखो में ।।
आंखो में वो सागर सी गहराई लेकर चलती है`
  },
  {
    id: 7,
    title: "मुझसे प्यार मत करना",
    content: `मेरी मासूम बातो पर , एतबार मत करना ।
गर कभी कर भी लो ,तो बार बार मत करना ।।
गुरुर चढ़ जाता है मुझे, जरा से इश्क का भी ।
मैं पसंद आ भी जाऊं कही, तो इजहार मत करना ।।
अगर कर दू इजहारे दिल मैं ही कभी तुमसे ।
तो आसानी से मुझसे प्यार मत करना ।
फिर कूदना हो अगर इश्क दरिया में मेरे साथ ।
हाथ छुड़ा कर अकेले पार मत करना ।।
और मर ना सको मेरे इश्क में अगर तुम ।
मुझसे भूल कर भी प्यार मत करना ।।
मेरी मासूम बातो पर , एतबार मत करना`
  },
  {
    id: 8,
    title: "लूट",
    content: `उसको देखा तो बैट वैट सब हाथ से मेरे छूट गया ।।
दिल छलका और प्यार व्यार से बांध सब्र का टूट गया ।।
मैंने छुपा के रखा था ना दा दिल को हां गुल्लक में ।।
उसका हुनर था ऐसा की बस आंखो से लूट गया ।।`
  },
  {
    id: 9,
    title: "मां का कहा",
    content: `जो जो नहीं करना था वही किया हूं।
गलत करके लगता था सही किया हूं ।
एक ही मलाल है मेरी जिंदगी का फकत ।
मा का कहा नहीं किया हूं ।।`
  },
  {
    id: 10,
    title: "मजाक के बाद",
    content: `करते हो जताते हो सब खाक करते हो ।
मजाक के बाद फिर मजाक करते हो ।`
  },
  {
    id: 11,
    title: "खुद ही",
    content: `खुद ही अपने हार पर लिखने लगा हूं ।
भूल के खुद को संसार पर लिखने लगा हूं ।।
उसने पढ़ाया है कुछ तो अपनी आंखों से ।
दुबारा मैं प्यार पर लिखने लगा हूं ।।`
  },
  {
    id: 12,
    title: "कुंभ",
    content: `40 तक हम घूम घूम के रोज कीहिंन सब पाप ।
कुंभ में मारिन ती ने डुबकी कई दीहीन सब साफ`
  },
  {
    id: 13,
    title: "हक नहीं चाहिए",
    content: `हक नहीं चाहिए , सड़क नही चाहिए ।
प्यार नही चाहिए , संसार नही चाहिए ।।
चाहिए नही किताब मुझे , कुछ बनने के ख्वाब मुझे ।
ईमान पर मेरे शक नही चाहिए , हक नही चाहिए ।।
इंसाफ नहीं चाहिए , नाला साफ नही चाहिए ।।
चाहिए नही रोजगार मुझे , टोकने वाले लोग वो चार मुझे ।।
कान में नेताओ की बक बक नही चाहिए ।।
हक नही चाहिए ।।`
  }
];

const Poetry = () => {
  const [filteredPoetry, setFilteredPoetry] = useState<PoetryEntry[]>(poetryData);
  const [searchTerm, setSearchTerm] = useState("");

  const filterPoetry = (searchValue: string) => {
    const filtered = poetryData.filter((entry) =>
      entry.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPoetry(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterPoetry(value);
  };

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
          <div className="relative max-w-md mx-auto mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search poetry..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPoetry.length} of {poetryData.length} entries
            </p>
          </div>
        </div>

        {/* Poetry Grid */}
        <div className="space-y-8">
          {filteredPoetry.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-2">No poetry found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms.</p>
            </div>
          ) : (
            filteredPoetry.map((entry) => (
              <Card key={entry.id} className="dkloud-card">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Feather className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{entry.title}</CardTitle>
                  </div>
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
                      <span className="text-sm">Shayari</span>
                    </div>
                    <Heart className="h-5 w-5 text-red-500 hover:fill-current cursor-pointer transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

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