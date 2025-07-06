import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

// Pages
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import YouTubeChannels from "./pages/YouTubeChannels";
import AITools from "./pages/AITools";
import TechCorner from "./pages/TechCorner";
import TechNews from "./pages/TechNews";
import SmartTech from "./pages/SmartTech";
import Poetry from "./pages/Poetry";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvseries" element={<TVSeries />} />
            <Route path="/ytchannels" element={<YouTubeChannels />} />
            <Route path="/aitools" element={<AITools />} />
            <Route path="/techcorner" element={<TechCorner />} />
            <Route path="/technews" element={<TechNews />} />
            <Route path="/smarttech" element={<SmartTech />} />
            <Route path="/poetry" element={<Poetry />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
