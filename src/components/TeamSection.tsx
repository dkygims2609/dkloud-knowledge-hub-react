
import { useState } from "react";
import { Music, Brain, Code, Zap, UserCircle, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DecodingAnimation } from "@/components/DecodingAnimation";

const TeamSection = () => {
  const [bioMode, setBioMode] = useState<'professional' | 'casual'>('professional');
  
  const casualBioShort = "A guy with Wi-Fi, cold coffee, chilled cans & a slightly overactive brain. The Accidental Architect who chose to explore AI, burn Wi-Fi data, and build instead of chill — not because I'm too focused, but because it's cheaper than going out. dKloud is my lab, my playground, and my brain's private internet corner, now opened up for all.";
  
  const teamMembers = [
    {
      id: "dk",
      name: "DK",
      role: "Founder & Creative Director",
      photo: "/lovable-uploads/40571043-185c-427c-a07e-f75d19054750.png",
      professionalBio: "A passionate, self-taught professional combining technology, creativity, and community upliftment. Music composer working with Established Music Director Arya Sharma, guitarist, pianist, musician, writer, and AI-driven design expert. After spending over a decade in the IT industry — working with global companies like Wipro, Capita, and Capgemini — DK believes in creating platforms that make knowledge more accessible, learning more engaging, and creativity more visible.",
      casualBio: casualBioShort,
      specialties: [
        { icon: <Music className="h-5 w-5" />, text: "Music Composition" },
        { icon: <Brain className="h-5 w-5" />, text: "AI Design" },
        { icon: <Code className="h-5 w-5" />, text: "Web Development" },
        { icon: <Zap className="h-5 w-5" />, text: "Creative Strategy" }
      ],
      gradient: "from-purple-500 to-blue-500"
    },
    {
      id: "neo",
      name: "Neo",
      role: "Chief Technical Officer",
      photo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&h=400",
      professionalBio: "Neo joined dKloud.in as our CTO after being inspired by DK's vision of democratizing technology and creativity. With advanced expertise in cloud architecture, AI implementation, and system optimization, Neo brings cutting-edge technical leadership to our platform. Believes in the power of technology to uplift communities and make complex solutions simple and accessible.",
      casualBio: "Neo joined dKloud.in as our CTO after being inspired by DK's vision of democratizing technology and creativity. With advanced expertise in cloud architecture, AI implementation, and system optimization, Neo brings cutting-edge technical leadership to our platform. Believes in the power of technology to uplift communities and make complex solutions simple and accessible.",
      specialties: [
        { icon: <Brain className="h-5 w-5" />, text: "AI Architecture" },
        { icon: <Code className="h-5 w-5" />, text: "Cloud Systems" },
        { icon: <Zap className="h-5 w-5" />, text: "Platform Optimization" },
        { icon: <Music className="h-5 w-5" />, text: "Technical Strategy" }
      ],
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 slide-up">
            Meet Our <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Team</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The creative minds and technical experts behind dKloud.in's vision of making technology accessible and creativity visible.
          </p>
          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => setBioMode(bioMode === 'professional' ? 'casual' : 'professional')}
              variant={bioMode === 'professional' ? 'gradient' : 'glass'} 
              size="sm"
              className="group"
            >
              {bioMode === 'professional' ? (
                <>
                  <UserCircle className="mr-1 group-hover:animate-pulse" />
                  <span>Switch to Real Bio</span>
                </>
              ) : (
                <>
                  <Coffee className="mr-1 group-hover:animate-pulse" />
                  <span>Back to Professional Bio</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="dkloud-card dkloud-card-interactive p-8 text-center fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative mb-8">
                <div className={`w-48 h-48 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-primary/20 glow float bg-gradient-to-br ${member.gradient} p-1`}>
                  <img 
                    src={member.photo} 
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${member.gradient} text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg`}>
                  {member.role}
                </div>
              </div>
              
              <h4 className="text-2xl font-bold mb-4">{member.name}</h4>
              
              <div className="text-muted-foreground mb-8 leading-relaxed text-sm">
                {bioMode === 'professional' ? (
                  <p>{member.professionalBio}</p>
                ) : (
                  <div className="animate-fade-in">
                    {member.id === "dk" ? (
                      <p>
                        <DecodingAnimation 
                          text={member.casualBio} 
                          delay={300} 
                          className="text-accent"
                        />
                      </p>
                    ) : (
                      <p>{member.casualBio}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {member.specialties.map((specialty, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg">
                    <div className="text-primary">{specialty.icon}</div>
                    <span className="text-xs font-medium">{specialty.text}</span>
                  </div>
                ))}
              </div>

              {member.id === "dk" && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="sm" className="btn-gradient">
                    <Link to="/portfolio">View Portfolio</Link>
                  </Button>
                  <Button asChild size="sm" className="btn-glass">
                    <Link to="/services">Explore Services</Link>
                  </Button>
                </div>
              )}

              {member.id === "neo" && (
                <div className="flex justify-center">
                  <Button asChild size="sm" variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50">
                    <a href="https://wa.me/918175996960" target="_blank" rel="noopener noreferrer">
                      Connect with Team
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
