import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function ScrollToHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      } else {
        setScrollDirection('down');
      }
      
      setLastScrollY(currentScrollY);
      
      // If user scrolls up beyond a threshold and not on home page, navigate to home
      if (
        currentScrollY < 100 && 
        scrollDirection === 'up' && 
        location.pathname !== '/' &&
        lastScrollY > currentScrollY + 50 // Ensure significant upward scroll
      ) {
        navigate('/');
      }
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [lastScrollY, scrollDirection, location.pathname, navigate]);

  return null;
}

// Simple throttle function
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function(this: any) {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}