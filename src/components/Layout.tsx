
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { RunningBanner } from "./RunningBanner";
import { WhatsAppButton } from "./WhatsAppButton";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { ServicesSidebar } from "./ServicesSidebar";
import { BackgroundQuestions } from "./BackgroundQuestions";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundQuestions />
      <RunningBanner />
      <Navbar />
      <main className="pt-16 relative z-10">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <ServicesSidebar />
    </div>
  );
}
