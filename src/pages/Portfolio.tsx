import { useState } from "react";
import { Music, PenTool, User2, Heart, Calendar, ExternalLink, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModernTabSystem, createTabData } from "@/components/ModernTabSystem";
import founderPhoto from "/lovable-uploads/40571043-185c-427c-a07e-f75d19054750.png";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('about');
  const tabs = createTabData('portfolio');

  const renderAboutContent = () => (
    <div className="space-y-8">
      {/* Founder Note */}
      <Card className="dkloud-card dkloud-card-interactive p-8">
        <CardHeader className="text-center pb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-primary/20 glow">
            <img 
              src={founderPhoto} 
              alt="DK - Founder & Creative Director" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-2xl mb-2">DK</CardTitle>
          <CardDescription className="text-lg text-accent font-medium">Founder & Creative Director</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-semibold mb-4 text-primary">Founder Note</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hi, I'm DK — the mind and spirit behind dKloud.in.
              </p>
              <p>
                After spending over a decade in the IT industry — working with global companies like <span className="text-primary font-medium">Wipro, Capita, and Capgemini</span> — I've lived through the evolution of tech firsthand. From on-prem Windows servers to complex VMware infrastructures and now the era of cloud and AI, I've worked on real-world projects that shaped how businesses run behind the scenes.
              </p>
              <p>
                But tech is only one side of the story.
              </p>
              <p>
                🎼 I'm also a <span className="text-accent font-medium">music composer, lyricist</span>, and someone who believes that <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-medium">creativity is not separate from logic — it enhances it</span>. I've collaborated with music director <span className="text-accent font-medium">Arya Sharma</span>, created original compositions, and blended AI tools with human expression to craft everything from custom wedding songs to logos and story-driven visuals.
              </p>
              <p>
                This duality — of <span className="text-primary font-medium">engineering systems by day and composing melodies by night</span> — inspired the creation of dKloud.in.
              </p>
              <p className="text-lg font-medium text-foreground">
                A platform that isn't just built with code... <br />
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">It's built with soul.</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The dKloud Vision */}
      <Card className="dkloud-card dkloud-card-interactive p-8">
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-xl p-6 border border-accent/20">
            <h3 className="text-xl font-semibold mb-4 text-accent">🧠 My Mission with dKloud.in</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I didn't grow up with access to high-end tech labs or online bootcamps. I used to travel <span className="text-primary font-medium">60 km every day</span> just to touch a computer. That hunger — to learn, to create, to build something meaningful — shaped everything I do today.
              </p>
              <p>
                <span className="text-foreground font-medium">dKloud.in is the product of that journey.</span>
              </p>
              <p className="text-lg font-medium text-foreground">It's a space for:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-primary font-medium">Dreamers with no roadmap</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-accent font-medium">Learners who want more than theory</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-success font-medium">Creators who want to be seen</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-primary font-medium">And tech professionals ready to grow smart, not just fast</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-success/10 via-primary/10 to-success/10 rounded-xl p-6 border border-success/20">
            <h4 className="text-lg font-semibold mb-3 text-success">👥 Backed by a Team of Collaborators</h4>
            <p className="text-muted-foreground leading-relaxed">
              From musicians and writers to cloud engineers and designers, I've built a team that shares this vision. Together, we collaborate to deliver real value — through tools, content, art, and education — on a platform that grows every day.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Beyond the Code */}
      <Card className="dkloud-card dkloud-card-interactive p-8">
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">🎼 Beyond the Code</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Music isn't just a hobby for me — it's the other half of my creative soul. As a <span className="text-purple-500 font-medium">composer and lyricist</span>, I've learned that the same patterns that make code elegant also make melodies memorable.
              </p>
              <p>
                Working with <span className="text-accent font-medium">music director Arya Sharma</span>, I've created original compositions that blend traditional songwriting with <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-medium">AI-enhanced creativity</span>. From custom wedding songs that tell personal love stories to brand anthems that capture a company's essence.
              </p>
              <p>
                This duality — of <span className="text-primary font-medium">engineering systems by day and composing melodies by night</span> — isn't just about having two skills. It's about understanding that <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">creativity enhances logic rather than competing with it</span>.
              </p>
              <p>
                Whether I'm debugging a complex cloud architecture or crafting lyrics that capture raw emotion, the process is the same: <span className="text-foreground font-medium">Listen. Understand. Create something that resonates.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Music className="h-6 w-6" />, text: "Original Compositions", color: "text-purple-500" },
              { icon: <PenTool className="h-6 w-6" />, text: "AI-Enhanced Creativity", color: "text-blue-500" },
              { icon: <Heart className="h-6 w-6" />, text: "Emotional Storytelling", color: "text-pink-500" },
              { icon: <Volume2 className="h-6 w-6" />, text: "Brand Anthems", color: "text-indigo-500" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <div className={`mb-2 ${item.color}`}>{item.icon}</div>
                <span className="text-xs font-medium text-center">{item.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCompositionsContent = () => {
    const compositions = [
      {
        title: "Pahla Pyar with Sneh Upadhyay",
        embedId: "XLgJ4EYof3M",
        description: "A beautiful romantic composition about first love"
      },
      {
        title: "Raghuwar Ram Aa Gaye",
        embedId: "153sNf2Z3Qc",
        description: "A devotional composition celebrating Lord Ram"
      },
      {
        title: "Pyar Nahi Hai Khel Dear",
        embedId: "rgFtlUeXRqI",
        description: "A heartfelt song about the seriousness of love"
      },
      {
        title: "Koi Pukare Shankar",
        embedId: "5jXH_7V3IUU",
        description: "A spiritual composition invoking Lord Shiva"
      },
      {
        title: "Jaatikaar",
        embedId: "NEjGJ8A2wMI",
        description: "An original composition with deep emotional resonance"
      }
    ];

    const handleWatchOnYouTube = (embedId: string) => {
      window.open(`https://www.youtube.com/watch?v=${embedId}`, "_blank", "noopener,noreferrer");
    };

    return (
      <div className="space-y-8">
        <Card className="dkloud-card dkloud-card-interactive p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              🎼 YouTube Compositions
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Original musical compositions and covers available on YouTube
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {compositions.map((composition, index) => (
                <Card key={index} className="dkloud-card h-full">
                  <CardHeader>
                    <CardTitle className="text-lg mb-2">{composition.title}</CardTitle>
                    <CardDescription className="text-sm">{composition.description}</CardDescription>
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
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPoetryContent = () => {
    const poetryData = [
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

    return (
      <div className="space-y-8">
        <Card className="dkloud-card dkloud-card-interactive p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              ✍️ Shayari & Poetry
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              A collection of heartfelt shayari and poetry expressing emotions and life experiences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {poetryData.map((entry) => (
                <Card key={entry.id} className="dkloud-card h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <PenTool className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <div className="whitespace-pre-line text-base leading-relaxed font-medium text-foreground">
                        {entry.content}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Music className="h-4 w-4" />
                        <span className="text-sm">Original Shayari</span>
                      </div>
                      <Heart className="h-5 w-5 text-red-500 hover:fill-current cursor-pointer transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return renderAboutContent();
      case 'compositions':
        return renderCompositionsContent();
      case 'poetry':
        return renderPoetryContent();
      default:
        return renderAboutContent();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the creative journey of DK — where technology meets artistry, and innovation is driven by passion.
          </p>
        </div>

        <ModernTabSystem
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
          className="mb-8"
        />

        <div className="fade-in">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
