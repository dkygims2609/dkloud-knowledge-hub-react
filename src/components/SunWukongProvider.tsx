import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SunWukong } from './SunWukong';

interface SunWukongContextType {
  showCharacter: (state: 'idle' | 'loading' | 'flying' | 'celebrating' | 'thinking', duration?: number) => void;
  hideCharacter: () => void;
  triggerCelebration: () => void;
  triggerThinking: () => void;
  triggerFlying: () => void;
  isVisible: boolean;
}

const SunWukongContext = createContext<SunWukongContextType | undefined>(undefined);

interface SunWukongProviderProps {
  children: ReactNode;
}

export function SunWukongProvider({ children }: SunWukongProviderProps) {
  const [characterState, setCharacterState] = useState<'idle' | 'loading' | 'flying' | 'celebrating' | 'thinking' | 'hidden'>('hidden');
  const [isVisible, setIsVisible] = useState(false);

  // Auto-show character on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      showCharacter('flying', 2000);
      setTimeout(() => showCharacter('idle'), 2500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Track user inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (characterState === 'hidden') {
          showCharacter('idle');
        }
      }, 10000); // Show after 10 seconds of inactivity
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true);
    });

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer, true);
      });
    };
  }, [characterState]);

  const showCharacter = (state: 'idle' | 'loading' | 'flying' | 'celebrating' | 'thinking', duration?: number) => {
    setCharacterState(state);
    setIsVisible(true);

    if (duration) {
      setTimeout(() => {
        setCharacterState('hidden');
        setIsVisible(false);
      }, duration);
    }
  };

  const hideCharacter = () => {
    setCharacterState('hidden');
    setIsVisible(false);
  };

  const triggerCelebration = () => {
    showCharacter('celebrating', 3000);
    setTimeout(() => showCharacter('idle'), 3500);
  };

  const triggerThinking = () => {
    showCharacter('thinking', 2000);
    setTimeout(() => showCharacter('idle'), 2500);
  };

  const triggerFlying = () => {
    showCharacter('flying', 2000);
    setTimeout(() => showCharacter('idle'), 2500);
  };

  const handleCharacterInteraction = () => {
    // Random interaction responses
    const interactions = ['celebrating', 'thinking', 'flying'] as const;
    const randomInteraction = interactions[Math.floor(Math.random() * interactions.length)];
    
    switch (randomInteraction) {
      case 'celebrating':
        triggerCelebration();
        break;
      case 'thinking':
        triggerThinking();
        break;
      case 'flying':
        triggerFlying();
        break;
    }
  };

  const contextValue: SunWukongContextType = {
    showCharacter,
    hideCharacter,
    triggerCelebration,
    triggerThinking,
    triggerFlying,
    isVisible
  };

  return (
    <SunWukongContext.Provider value={contextValue}>
      {children}
      <SunWukong
        state={characterState}
        size="medium"
        position="corner"
        onInteraction={handleCharacterInteraction}
        className="group"
      />
    </SunWukongContext.Provider>
  );
}

export function useSunWukong() {
  const context = useContext(SunWukongContext);
  if (context === undefined) {
    throw new Error('useSunWukong must be used within a SunWukongProvider');
  }
  return context;
}