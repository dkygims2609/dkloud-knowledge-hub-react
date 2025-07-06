import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { WhatsAppButton } from "./WhatsAppButton";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}