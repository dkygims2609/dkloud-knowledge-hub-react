import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModernIconTabs } from "@/components/ui/modern-icon-tabs";
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Video, 
  Monitor, 
  Server, 
  Network, 
  Cloud, 
  Code, 
  TestTube, 
  Users, 
  MessageSquare,
  Globe,
  Bell,
  Star,
  Clock,
  Award,
  Sparkles
} from "lucide-react";
import { BackgroundQuestions } from "@/components/BackgroundQuestions";

const TechCorner = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    {
      id: 1,
      title: "Zero to Hero in Computers",
      category: "Digital Literacy",
      icon: <Monitor className="h-5 w-5" />,
      description: "Complete computer fundamentals course covering typing, MS Office, browsing, OS, troubleshooting, and internet basics.",
      duration: "4-6 weeks",
      level: "Beginner",
      badge: "Like a Mini Diploma",
      gradient: "from-blue-500 to-cyan-500",
      modules: ["Typing & Basics", "MS Office Suite", "Internet & Browsing", "Troubleshooting", "Operating Systems"]
    },
    {
      id: 2,
      title: "System & Server Engineering",
      category: "Infrastructure",
      icon: <Server className="h-5 w-5" />,
      description: "Windows Server roles, Active Directory, DNS, DHCP, GPO, plus Linux essentials including commands, shells, users, and crontabs.",
      duration: "6-8 weeks",
      level: "Intermediate",
      badge: "System Admin Ready",
      gradient: "from-green-500 to-emerald-500",
      modules: ["Windows Server", "Active Directory", "Linux Essentials", "Unix Commands", "Server Management"]
    },
    {
      id: 3,
      title: "Network Engineering",
      category: "Networking",
      icon: <Network className="h-5 w-5" />,
      description: "CCNA-level networking basics including IP, subnetting, routing, plus hands-on with Wireshark, Nmap, and Putty.",
      duration: "8-10 weeks",
      level: "Intermediate",
      badge: "Network Pro Track",
      gradient: "from-purple-500 to-pink-500",
      modules: ["IP & Subnetting", "Routing Protocols", "Network Tools", "Wireshark Analysis", "Network Security"]
    },
    {
      id: 4,
      title: "Cloud Computing",
      category: "Cloud",
      icon: <Cloud className="h-5 w-5" />,
      description: "AWS, Azure, GCP from basics to certification path. Covers IAM, EC2, S3, VPC, RDS, Resource Groups and more.",
      duration: "10-12 weeks",
      level: "Intermediate",
      badge: "Cloud Certification Path",
      gradient: "from-orange-500 to-red-500",
      modules: ["AWS Fundamentals", "Azure Basics", "GCP Essentials", "Cloud Architecture", "Certification Prep"]
    },
    {
      id: 5,
      title: "DevOps Toolkit",
      category: "DevOps",
      icon: <Code className="h-5 w-5" />,
      description: "Complete DevOps workflow with GitHub, Docker, CI/CD pipelines, Terraform, Jenkins, and Infrastructure as Code.",
      duration: "8-10 weeks",
      level: "Advanced",
      badge: "DevOps Engineer Ready",
      gradient: "from-indigo-500 to-purple-500",
      modules: ["Git & GitHub", "Docker Containers", "CI/CD Pipelines", "Terraform", "Jenkins Automation"]
    },
    {
      id: 6,
      title: "Developer Roadmap",
      category: "Programming",
      icon: <Code className="h-5 w-5" />,
      description: "Full-stack development path: JavaScript, Python, C, SQL, HTML/CSS/React, Node.js, databases, and APIs.",
      duration: "12-16 weeks",
      level: "Beginner to Advanced",
      badge: "Full-Stack Developer",
      gradient: "from-pink-500 to-rose-500",
      modules: ["Frontend Basics", "JavaScript", "React", "Backend", "Databases", "APIs"]
    },
    {
      id: 7,
      title: "Software Testing",
      category: "Quality Assurance",
      icon: <TestTube className="h-5 w-5" />,
      description: "Manual testing basics, automation with Selenium/Cypress, writing test cases, bug tracking, and testing tools.",
      duration: "6-8 weeks",
      level: "Beginner",
      badge: "QA Tester Ready",
      gradient: "from-teal-500 to-green-500",
      modules: ["Manual Testing", "Test Automation", "Test Cases", "Bug Tracking", "QA Tools"]
    },
    {
      id: 8,
      title: "Break Into IT Toolkit",
      category: "Career Prep",
      icon: <Users className="h-5 w-5" />,
      description: "Complete career preparation: resume building, LinkedIn optimization, freelancing platforms, interview prep, portfolio, and GitHub best practices.",
      duration: "4-6 weeks",
      level: "All Levels",
      badge: "Career Ready",
      gradient: "from-amber-500 to-orange-500",
      modules: ["Resume Building", "LinkedIn Strategy", "Portfolio Creation", "Interview Prep", "Freelancing"]
    },
    {
      id: 9,
      title: "Communication Training",
      category: "Soft Skills",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Professional communication skills: email etiquette, team meetings, client calls, written and verbal clarity.",
      duration: "3-4 weeks",
      level: "All Levels",
      badge: "Communication Pro",
      gradient: "from-sky-500 to-blue-500",
      modules: ["Email Etiquette", "Meeting Skills", "Client Communication", "Verbal Skills", "Written Communication"]
    },
    {
      id: 10,
      title: "Cross-Cultural Training",
      category: "Global Skills",
      icon: <Globe className="h-5 w-5" />,
      description: "Work effectively with US/UK/Europe clients. Cultural nuances, timezone etiquette, do's and don'ts in global collaboration.",
      duration: "2-3 weeks",
      level: "All Levels",
      badge: "Global Ready",
      gradient: "from-violet-500 to-purple-500",
      modules: ["Cultural Awareness", "Timezone Management", "Global Etiquette", "Remote Collaboration", "Client Relations"]
    }
  ];

  const resources = [
    {
      title: "Free Tech Resources",
      description: "Curated collection of free learning materials, tools, and documentation.",
      icon: <BookOpen className="h-5 w-5" />,
      count: "50+ Resources"
    },
    {
      title: "Industry Best Practices",
      description: "SOPs, guidelines, and best practices from industry experts.",
      icon: <FileText className="h-5 w-5" />,
      count: "25+ Guides"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video tutorials for various tech topics.",
      icon: <Video className="h-5 w-5" />,
      count: "100+ Videos"
    }
  ];

  const tabs = [
    {
      id: 'courses',
      label: 'dKloud Courses',
      icon: GraduationCap,
      count: courses.length,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'resources',
      label: 'Free Resources',
      icon: BookOpen,
      count: resources.length,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'guides',
      label: 'SOPs & Guides',
      icon: FileText,
      count: 25,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'tutorials',
      label: 'Tutorials',
      icon: Video,
      count: 100,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const handleNotifyMe = (courseTitle: string) => {
    console.log(`Notify me for ${courseTitle}`);
    // Handle notification signup
  };

  const renderCourses = () => (
    <div className="space-y-8">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 text-center">
        <div className="flex items-center justify-center mb-3">
          <Star className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-xl font-bold">🚀 Launching Soon</h3>
        </div>
        <p className="text-muted-foreground">
          dKloud MicroCourses — Future-Ready Tech Learning, Visual & Simplified
        </p>
      </div>

      {/* Course Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/50 border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
          >
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                 style={{background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`}} />
            
            {/* Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">
                🚀 Launching Soon
              </Badge>
            </div>

            {/* Level Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="outline" className="text-xs">
                {course.level}
              </Badge>
            </div>

            <CardHeader className="text-center pb-4">
              {/* Icon */}
              <div className={`mx-auto w-14 h-14 rounded-full bg-gradient-to-r ${course.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {course.icon}
              </div>

              {/* Title and Category */}
              <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                {course.title}
              </CardTitle>
              
              <Badge variant="secondary" className="mb-3">
                {course.category}
              </Badge>

              <CardDescription className="text-sm leading-relaxed">
                {course.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Course Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-primary font-medium">{course.badge}</span>
                  </div>
                </div>

                {/* Modules */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Course Modules</p>
                  <div className="space-y-1">
                    {course.modules.slice(0, 3).map((module, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span>{module}</span>
                      </div>
                    ))}
                    {course.modules.length > 3 && (
                      <p className="text-xs text-muted-foreground pl-5">
                        +{course.modules.length - 3} more modules
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white font-medium group-hover:shadow-lg transition-all duration-300`}
                onClick={() => handleNotifyMe(course.title)}
              >
                <Bell className="h-4 w-4 mr-2" />
                Get Early Access
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource, index) => (
        <Card key={index} className="group hover:shadow-xl transition-all duration-300">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white mb-4">
              {resource.icon}
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {resource.title}
            </CardTitle>
            <Badge variant="outline">{resource.count}</Badge>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {resource.description}
            </CardDescription>
            <Button className="w-full mt-4" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'courses':
        return renderCourses();
      case 'resources':
        return renderResources();
      case 'guides':
      case 'tutorials':
        return (
          <div className="text-center py-16">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white mb-4">
                {activeTab === 'guides' ? <FileText className="h-8 w-8" /> : <Video className="h-8 w-8" />}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {activeTab === 'guides' ? 'SOPs & Guides' : 'Video Tutorials'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {activeTab === 'guides' 
                ? 'Comprehensive standard operating procedures and industry guides'
                : 'Step-by-step video tutorials for hands-on learning'
              }
            </p>
            <Badge className="animate-pulse">🚀 Coming Soon</Badge>
          </div>
        );
      default:
        return renderCourses();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <BackgroundQuestions />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              📚 dKloud TechCorner
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Future-Ready Tech Learning, Visual & Simplified. Short, practical, high-impact courses designed for freshers, switchers, and freelancers.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <ModernIconTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TechCorner;