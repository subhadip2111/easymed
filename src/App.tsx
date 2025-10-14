import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
import NotFound from "./components/pages/NotFound";

import Index from "./components/pages/Index";
import { TooltipProvider } from "./components/ui/tooltip";
import BlogPage from "./components/BlogPage";
import { Feeds } from "./components/Feeds";
import AboutUs from "./components/pages/AboutUs";
import HowItWorks from "./components/HowItWorks";
import TermsOfService from "./components/TermsOfService";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<BlogPage />} />
          {/* <Route path="/feeds" element={<Feeds />} /> */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/how-its-work" element={<HowItWorks />} />
          
          <Route path="/terms-conditions" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
