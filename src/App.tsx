import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import Preparation from "./pages/student/Preparation";
import ResumeAnalyzer from "./pages/student/ResumeAnalyzer";
import MockInterview from "./pages/student/MockInterview";
import Predictions from "./pages/student/Predictions";
import Notifications from "./pages/student/Notifications";

// Coordinator pages
import CoordinatorDashboard from "./pages/coordinator/Dashboard";

// Recruiter pages
import RecruiterDashboard from "./pages/recruiter/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/preparation" element={<Preparation />} />
          <Route path="/student/resume" element={<ResumeAnalyzer />} />
          <Route path="/student/interview" element={<MockInterview />} />
          <Route path="/student/predictions" element={<Predictions />} />
          <Route path="/student/notifications" element={<Notifications />} />
          
          {/* Coordinator Routes */}
          <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
