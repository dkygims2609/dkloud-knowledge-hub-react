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

  const renderCompositionsContent = () => (
    <div className="space-y-8">
      {/* Original Music */}
      <Card className="dkloud-card dkloud-card-interactive p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Original Music</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Explore a collection of original musical compositions, blending traditional songwriting with AI-enhanced creativity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Wedding Song", date: "2023-08-15", link: "#", description: "A custom-made song for a special couple's wedding day.", category: "love" },
              { title: "Brand Anthem", date: "2023-06-20", link: "#", description: "An anthem created for a tech startup, capturing their innovative spirit.", category: "tech" },
              { title: "Birthday Surprise", date: "2023-05-01", link: "#", description: "A surprise song for a milestone birthday, filled with personal memories.", category: "personal" },
              { title: "AI-Generated Melody", date: "2023-03-10", link: "#", description: "An experimental piece combining human lyrics with AI-generated melodies.", category: "ai" }
            ].map((song, index) => (
              <div key={index} className="p-6 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <h4 className="text-lg font-semibold mb-2">{song.title}</h4>
                <p className="text-sm text-muted-foreground">{song.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{new Date(song.date).toLocaleDateString()}</span>
                  </div>
                  <a href={song.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                    Listen <ExternalLink className="h-4 w-4 inline-block ml-1 align-text-top" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Covers & Remixes */}
      <Card className="dkloud-card dkloud-card-interactive p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Covers & Remixes</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Unique interpretations of popular songs, showcasing musical versatility and creativity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Imagine (DK Remix)", date: "2023-09-01", link: "#", description: "A modern remix of John Lennon's classic, blending electronic elements with the original melody.", category: "remix" },
              { title: "Hallelujah (Acoustic Cover)", date: "2023-07-15", link: "#", description: "An acoustic rendition of Leonard Cohen's masterpiece, highlighting emotional depth.", category: "cover" },
              { title: "Bohemian Rhapsody (Piano Version)", date: "2023-04-10", link: "#", description: "A piano-only version of Queen's iconic song, showcasing intricate musical arrangements.", category: "piano" },
              { title: "Stairway to Heaven (AI-Enhanced)", date: "2023-02-28", link: "#", description: "A unique version enhanced with AI-generated harmonies and instrumental layers.", category: "ai" }
            ].map((song, index) => (
              <div key={index} className="p-6 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <h4 className="text-lg font-semibold mb-2">{song.title}</h4>
                <p className="text-sm text-muted-foreground">{song.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{new Date(song.date).toLocaleDateString()}</span>
                  </div>
                  <a href={song.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                    Listen <ExternalLink className="h-4 w-4 inline-block ml-1 align-text-top" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPoetryContent = () => (
    <div className="space-y-8">
      {/* Featured Poems */}
      <Card className="dkloud-card dkloud-card-interactive p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Featured Poems</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            A selection of original poems, exploring themes of love, loss, and the human experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "The Silent Echo", date: "2023-09-15", link: "#", description: "A poem about the echoes of past experiences in our present lives.", category: "reflection" },
              { title: "Whispers of the Wind", date: "2023-07-20", link: "#", description: "A lyrical piece capturing the subtle messages carried by the wind.", category: "nature" },
              { title: "The Unseen Path", date: "2023-05-01", link: "#", description: "An exploration of the choices we make and the paths we don't see.", category: "introspection" },
              { title: "Stars in the Night", date: "2023-03-10", link: "#", description: "A romantic poem inspired by the beauty and mystery of the night sky.", category: "love" }
            ].map((poem, index) => (
              <div key={index} className="p-6 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <h4 className="text-lg font-semibold mb-2">{poem.title}</h4>
                <p className="text-sm text-muted-foreground">{poem.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{new Date(poem.date).toLocaleDateString()}</span>
                  </div>
                  <a href={poem.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                    Read More <ExternalLink className="h-4 w-4 inline-block ml-1 align-text-top" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Creative Writings */}
      <Card className="dkloud-card dkloud-card-interactive p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Creative Writings</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            A collection of short stories, essays, and other creative writings, showcasing storytelling skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "The Lost City", date: "2023-10-01", link: "#", description: "A short story about a group of adventurers discovering a hidden city.", category: "adventure" },
              { title: "Reflections in a Mirror", date: "2023-08-15", link: "#", description: "An essay exploring the concept of self-reflection and identity.", category: "essay" },
              { title: "The Time Traveler's Journal", date: "2023-06-20", link: "#", description: "A series of journal entries from a time traveler's perspective.", category: "sci-fi" },
              { title: "The Painter's Muse", date: "2023-04-10", link: "#", description: "A story about a painter finding inspiration in unexpected places.", category: "art" }
            ].map((writing, index) => (
              <div key={index} className="p-6 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                <h4 className="text-lg font-semibold mb-2">{writing.title}</h4>
                <p className="text-sm text-muted-foreground">{writing.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{new Date(writing.date).toLocaleDateString()}</span>
                  </div>
                  <a href={writing.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                    Read More <ExternalLink className="h-4 w-4 inline-block ml-1 align-text-top" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
