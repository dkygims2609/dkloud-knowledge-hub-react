import React from 'react';
import { SunWukong } from './SunWukong';

interface SunWukongLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export function SunWukongLoader({ 
  message = "Sun Wukong is working his magic...", 
  size = 'large' 
}: SunWukongLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <SunWukong 
        state="loading" 
        size={size} 
        position="fixed"
        className="relative"
      />
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-foreground animate-pulse">
          {message}
        </p>
        <div className="flex space-x-1 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}