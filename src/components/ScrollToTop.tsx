import { useState, useEffect } from "react";
import { ArrowUp, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      
      // Show button when scrolled down more than 300px
      if (currentScrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Detect scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      
      setLastScrollY(currentScrollY);

      // Auto scroll to top when scrolling up near the top
      if (scrollDirection === "up" && currentScrollY < 50 && lastScrollY > currentScrollY) {
        if (isHomePage) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          // Navigate to home page and scroll to top
          navigate("/");
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 100);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollDirection]);

  const scrollToTop = () => {
    if (isHomePage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      size="icon"
      aria-label={isHomePage ? "Scroll to top" : "Return to home"}
    >
      {isHomePage ? <ArrowUp className="h-5 w-5" /> : <Home className="h-5 w-5" />}
    </Button>
  );
}