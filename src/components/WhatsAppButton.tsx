import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const whatsappNumber = "919876543210"; // Replace with actual number
  const message = "Hi! I found your dKloud website and wanted to connect!";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      size="icon"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
}