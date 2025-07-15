
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { RunningBanner } from "./RunningBanner";
import { WhatsAppButton } from "./WhatsAppButton";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { ServicesSidebar } from "./ServicesSidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <RunningBanner />
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <ScrollToTop />
      <ServicesSidebar />
    </div>
  );
}
