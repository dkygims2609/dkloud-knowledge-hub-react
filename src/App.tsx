import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/components/ui/toast-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollToHome } from "./components/ScrollToHome";

// Pages
import Index from "./pages/Index";
import MoviesTV from "./pages/MoviesTV";
import YouTubeChannels from "./pages/YouTubeChannels";
import AITools from "./pages/AITools";
import TechCorner from "./pages/TechCorner";
import TechNews from "./pages/TechNews";
import SmartTech from "./pages/SmartTech";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToastProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ScrollToHome />
          <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/movies-tv" element={<MoviesTV />} />
            <Route path="/youtube-channels" element={<YouTubeChannels />} />
            <Route path="/ytchannels" element={<YouTubeChannels />} />
            <Route path="/aitools" element={<AITools />} />
            <Route path="/techcorner" element={<TechCorner />} />
            <Route path="/technews" element={<TechNews />} />
            <Route path="/smarttech" element={<SmartTech />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            {/* Legacy routes for backwards compatibility */}
            <Route path="/movies" element={<MoviesTV />} />
            <Route path="/tvseries" element={<MoviesTV />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        </BrowserRouter>
      </ToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
