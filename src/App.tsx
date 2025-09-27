import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PurchaseOrderGenerator from "./pages/PurchaseOrderGenerator";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import PurchaseOrderPDF from "./pages/PurchaseOrderPDF";
import PONumberGenerator from "./pages/PONumberGenerator";
import PurchaseOrderVsInvoice from "./pages/PurchaseOrderVsInvoice";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TemplateIndustry from "./pages/TemplateIndustry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/purchase-order-generator" element={<PurchaseOrderGenerator />} />
          <Route path="/purchase-order-pdf" element={<PurchaseOrderPDF />} />
          <Route path="/po-number-generator" element={<PONumberGenerator />} />
          <Route path="/purchase-order-vs-invoice" element={<PurchaseOrderVsInvoice />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:industry" element={<TemplateIndustry />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
