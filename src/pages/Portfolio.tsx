import { Download, Mail, Github, Linkedin, MapPin, Calendar, Award, Code, Server, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Portfolio = () => {
  const skills = [
    { name: "Windows Server", icon: Server, level: "Expert" },
    { name: "VMware vSphere", icon: Cloud, level: "Advanced" },
    { name: "AWS Cloud", icon: Cloud, level: "Intermediate" },
    { name: "PowerShell", icon: Code, level: "Advanced" },
    { name: "System Administration", icon: Server, level: "Expert" },
    { name: "Network Management", icon: Server, level: "Advanced" }
  ];

  const experiences = [
    {
      title: "Senior System Administrator",
      company: "Tech Solutions Inc.",
      period: "2020 - Present",
      description: "Managing enterprise Windows Server infrastructure, VMware virtualization, and cloud migrations.",
      achievements: [
        "Reduced server downtime by 40% through proactive monitoring",
        "Successfully migrated 200+ VMs to AWS cloud",
        "Implemented automated backup solutions"
      ]
    },
    {
      title: "System Administrator",
      company: "Digital Corp",
      period: "2018 - 2020",
      description: "Maintained Windows Server environments and provided technical support for enterprise applications.",
      achievements: [
        "Managed Active Directory for 500+ users",
        "Implemented Group Policy management",
        "Reduced security incidents by 60%"
      ]
    },
    {
      title: "IT Support Specialist",
      company: "StartupTech",
      period: "2016 - 2018",
      description: "Provided comprehensive IT support and maintained small business infrastructure.",
      achievements: [
        "Set up complete IT infrastructure",
        "Trained staff on new technologies",
        "Maintained 99.9% uptime"
      ]
    }
  ];

  const projects = [
    {
      title: "dKloud Platform",
      description: "Educational and creative tech hub with dynamic content management",
      technologies: ["React", "TypeScript", "Google Sheets API", "TailwindCSS"],
      link: "https://dkloud.in"
    },
    {
      title: "Enterprise VM Migration",
      description: "Large-scale VMware to AWS cloud migration project",
      technologies: ["VMware vSphere", "AWS EC2", "PowerShell", "CloudFormation"],
      link: "#"
    },
    {
      title: "Automated Backup System",
      description: "Custom backup solution for Windows Server environments",
      technologies: ["PowerShell", "Windows Server", "Task Scheduler", "SQL Server"],
      link: "#"
    }
  ];

  const handleDownloadResume = () => {
    // Mock resume download - replace with actual resume URL
    const resumeUrl = "/resume-dkloud.pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "DKloud-Resume.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-4xl font-bold">
            DK
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            💼 Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tech Enthusiast | System Administrator | Cloud Specialist | Knowledge Creator
          </p>
          
          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button onClick={handleDownloadResume} size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:contact@dkloud.in">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/dkygims2609" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="text-2xl">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Passionate technology professional with extensive experience in Windows Server administration, 
                VMware virtualization, and AWS cloud services. I specialize in building robust IT infrastructure, 
                automating processes, and creating educational content to share knowledge with the tech community. 
                Through dKloud, I combine my technical expertise with my passion for knowledge sharing to create 
                valuable resources for learners and professionals alike.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="dkloud-card text-center">
                <CardContent className="p-6">
                  <skill.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                  <Badge variant={skill.level === "Expert" ? "default" : skill.level === "Advanced" ? "secondary" : "outline"}>
                    {skill.level}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Professional Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="dkloud-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-primary font-medium text-lg">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      Key Achievements:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="dkloud-card h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link !== "#" && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-muted/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Interested in collaboration or have questions about my work?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="mailto:contact@dkloud.in">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://linkedin.com/in/dkloud" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-1 text-muted-foreground mt-4">
            <MapPin className="h-4 w-4" />
            <span>Available for remote opportunities worldwide</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;