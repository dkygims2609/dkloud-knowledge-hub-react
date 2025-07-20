
import { useState, useEffect } from 'react';

const questions = [
  "Need a website?",
  "Looking for tech guidance?",
  "Career confusion?",
  "Smart solutions?",
  "Digital transformation?",
  "AI integration help?",
  "Tech consulting?",
  "Custom development?",
  "IoT solutions?",
  "Cloud migration?",
  "Mobile app development?",
  "E-commerce platform?",
  "Data analytics?",
  "Cybersecurity concerns?",
  "Digital marketing?",
  "Automation needs?"
];

interface FloatingQuestion {
  id: string;
  text: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export function BackgroundQuestions() {
  const [floatingQuestions, setFloatingQuestions] = useState<FloatingQuestion[]>([]);

  useEffect(() => {
    const spawnQuestion = () => {
      const question = questions[Math.floor(Math.random() * questions.length)];
      const newQuestion: FloatingQuestion = {
        id: Math.random().toString(36),
        text: question,
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 100),
        opacity: 0,
        scale: 0.5
      };

      setFloatingQuestions(prev => [...prev, newQuestion]);

      // Animate in
      setTimeout(() => {
        setFloatingQuestions(prev => 
          prev.map(q => 
            q.id === newQuestion.id 
              ? { ...q, opacity: 0.05, scale: 1 }
              : q
          )
        );
      }, 100);

      // Animate out and remove
      setTimeout(() => {
        setFloatingQuestions(prev => 
          prev.map(q => 
            q.id === newQuestion.id 
              ? { ...q, opacity: 0, scale: 0.8 }
              : q
          )
        );
      }, 4000);

      setTimeout(() => {
        setFloatingQuestions(prev => prev.filter(q => q.id !== newQuestion.id));
      }, 5000);
    };

    const interval = setInterval(spawnQuestion, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingQuestions.map(question => (
        <div
          key={question.id}
          className="absolute text-xs text-muted-foreground/50 font-light transition-all duration-1000 ease-out select-none"
          style={{
            left: question.x,
            top: question.y,
            opacity: question.opacity,
            transform: `scale(${question.scale})`,
          }}
        >
          {question.text}
        </div>
      ))}
    </div>
  );
}
