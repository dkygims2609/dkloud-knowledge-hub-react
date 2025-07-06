import { useState, useEffect } from "react";
import { ArrowRight, User, Monitor, Zap, Database, Github, Cloud, Smartphone } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "User Interaction",
    description: "You click on content",
    icon: User,
    color: "from-blue-500 to-cyan-500",
    position: { x: 10, y: 50 }
  },
  {
    id: 2,
    title: "Frontend (React)",
    description: "Beautiful interface responds",
    icon: Monitor,
    color: "from-purple-500 to-pink-500",
    position: { x: 25, y: 20 }
  },
  {
    id: 3,
    title: "API Gateway",
    description: "Smart routing & processing",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    position: { x: 50, y: 10 }
  },
  {
    id: 4,
    title: "Google Sheets",
    description: "Live data source",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    position: { x: 75, y: 20 }
  },
  {
    id: 5,
    title: "GitHub Integration",
    description: "Version control & deployment",
    icon: Github,
    color: "from-gray-500 to-slate-600",
    position: { x: 90, y: 50 }
  },
  {
    id: 6,
    title: "Supabase Backend",
    description: "Authentication & database",
    icon: Cloud,
    color: "from-indigo-500 to-purple-500",
    position: { x: 75, y: 80 }
  },
  {
    id: 7,
    title: "Your Device",
    description: "Real-time updates delivered",
    icon: Smartphone,
    color: "from-teal-500 to-cyan-500",
    position: { x: 25, y: 80 }
  }
];

export function InfographicAnimation() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        if (next === 0) {
          setTimeout(() => setIsAnimating(false), 500);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-background/50 to-muted/30 rounded-2xl border border-border/50 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {steps.map((step, index) => {
          const nextStep = steps[(index + 1) % steps.length];
          const isActive = index <= activeStep || (activeStep === 0 && index === steps.length - 1);
          
          return (
            <line
              key={`line-${index}`}
              x1={`${step.position.x}%`}
              y1={`${step.position.y}%`}
              x2={`${nextStep.position.x}%`}
              y2={`${nextStep.position.y}%`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity={isActive ? 0.8 : 0.2}
              className="transition-all duration-500"
              strokeDasharray={isActive ? "0" : "5,5"}
            />
          );
        })}
      </svg>

      {/* Steps */}
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isPassed = index < activeStep || (activeStep === 0 && index === steps.length - 1);
        const IconComponent = step.icon;

        return (
          <div
            key={step.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{
              left: `${step.position.x}%`,
              top: `${step.position.y}%`,
              transform: `translate(-50%, -50%) scale(${isActive ? 1.2 : 1})`,
            }}
          >
            {/* Step circle */}
            <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.color} p-1 ${isActive ? 'animate-pulse shadow-lg' : ''}`}>
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <IconComponent 
                  className={`h-6 w-6 transition-colors duration-300 ${
                    isActive ? 'text-primary' : isPassed ? 'text-success' : 'text-muted-foreground'
                  }`} 
                />
              </div>
            </div>

            {/* Step info */}
            {isActive && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border/50 min-w-48 text-center animate-fade-in">
                <h4 className="font-semibold text-sm text-foreground mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            )}

            {/* Flow indicator */}
            {isActive && index < steps.length - 1 && (
              <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2">
                <ArrowRight className="h-4 w-4 text-primary animate-bounce" />
              </div>
            )}
          </div>
        );
      })}

      {/* Central title */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/30">
          <h3 className="text-lg font-bold text-primary mb-2">dKloud Ecosystem</h3>
          <p className="text-xs text-muted-foreground">Real-time data flow</p>
        </div>
      </div>
    </div>
  );
}