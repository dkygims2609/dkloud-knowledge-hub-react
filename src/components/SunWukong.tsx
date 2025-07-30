import React, { useState, useEffect, useRef } from 'react';

interface SunWukongProps {
  state?: 'idle' | 'loading' | 'flying' | 'celebrating' | 'thinking' | 'hidden';
  size?: 'small' | 'medium' | 'large';
  position?: 'corner' | 'center' | 'floating' | 'fixed';
  onInteraction?: () => void;
  className?: string;
}

export function SunWukong({ 
  state = 'idle', 
  size = 'medium', 
  position = 'corner',
  onInteraction,
  className = ''
}: SunWukongProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentExpression, setCurrentExpression] = useState('happy');
  const [showParticles, setShowParticles] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  // Auto-hide after inactivity for idle state
  useEffect(() => {
    if (state === 'idle') {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 30000); // Hide after 30 seconds of inactivity
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [state]);

  // Random expression changes for personality
  useEffect(() => {
    if (state === 'idle') {
      const expressionTimer = setInterval(() => {
        const expressions = ['happy', 'winking', 'focused', 'playful'];
        setCurrentExpression(expressions[Math.floor(Math.random() * expressions.length)]);
      }, 5000);
      
      return () => clearInterval(expressionTimer);
    }
  }, [state]);

  const handleClick = () => {
    setShowParticles(true);
    onInteraction?.();
    
    // Reset particles after animation
    setTimeout(() => setShowParticles(false), 1000);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-16 h-16';
      case 'large': return 'w-32 h-32';
      default: return 'w-24 h-24';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'center': return 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      case 'floating': return 'fixed top-20 right-8 animate-floating';
      case 'fixed': return 'relative';
      default: return 'fixed bottom-8 right-8 animate-floating';
    }
  };

  const getAnimationClasses = () => {
    switch (state) {
      case 'loading': return 'animate-spin-staff';
      case 'flying': return 'animate-fly-across';
      case 'celebrating': return 'animate-celebrate';
      case 'thinking': return 'animate-think';
      case 'hidden': return 'opacity-0 pointer-events-none';
      default: return 'animate-idle-bounce';
    }
  };

  if (!isVisible && state === 'idle') return null;

  return (
    <div 
      ref={characterRef}
      className={`
        ${getSizeClasses()} 
        ${getPositionClasses()} 
        ${getAnimationClasses()}
        cursor-pointer transition-all duration-300 z-50
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Particle Effects */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-particle-burst opacity-80"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + i * 10}%`,
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      )}

      {/* Sun Wukong Character SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Character Body */}
        <circle cx="50" cy="60" r="18" fill="url(#bodyGradient)" />
        
        {/* Character Head */}
        <circle cx="50" cy="35" r="15" fill="url(#headGradient)" />
        
        {/* Character Eyes */}
        <circle cx="45" cy="32" r="2" fill="#000" className={currentExpression === 'winking' ? 'animate-wink' : ''} />
        <circle cx="55" cy="32" r="2" fill="#000" className={currentExpression === 'winking' ? 'animate-wink-delay' : ''} />
        
        {/* Character Mouth */}
        <path 
          d={currentExpression === 'happy' ? "M 45 38 Q 50 42 55 38" : "M 47 39 L 53 39"} 
          stroke="#000" 
          strokeWidth="1.5" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Character Tail */}
        <path 
          d="M 30 65 Q 20 70 25 80 Q 30 85 35 75" 
          fill="url(#tailGradient)" 
          className="animate-tail-sway"
        />
        
        {/* Magical Staff */}
        {(state === 'loading' || state === 'celebrating') && (
          <g className={state === 'loading' ? 'animate-staff-spin' : 'animate-staff-wave'}>
            <line x1="70" y1="25" x2="70" y2="75" stroke="url(#staffGradient)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="70" cy="20" r="4" fill="url(#orbGradient)" className="animate-pulse" />
            <circle cx="70" cy="80" r="3" fill="url(#orbGradient)" className="animate-pulse" />
          </g>
        )}
        
        {/* Cloud Platform for Flying State */}
        {state === 'flying' && (
          <ellipse cx="50" cy="85" rx="25" ry="8" fill="url(#cloudGradient)" opacity="0.8" className="animate-cloud-float" />
        )}

        {/* Gradients */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--warning))" />
            <stop offset="100%" stopColor="hsl(var(--warning) / 0.8)" />
          </linearGradient>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--warning))" />
            <stop offset="100%" stopColor="hsl(var(--warning) / 0.9)" />
          </linearGradient>
          <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--warning) / 0.8)" />
            <stop offset="100%" stopColor="hsl(var(--warning) / 0.6)" />
          </linearGradient>
          <linearGradient id="staffGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
          </linearGradient>
          <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.5)" />
          </radialGradient>
          <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.5)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Tooltip on Hover */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {state === 'loading' && 'Sun Wukong is working his magic...'}
        {state === 'idle' && 'Click me for a surprise!'}
        {state === 'flying' && 'Flying across the digital realm!'}
        {state === 'celebrating' && 'Mission accomplished!'}
        {state === 'thinking' && 'Contemplating the mysteries...'}
      </div>
    </div>
  );
}