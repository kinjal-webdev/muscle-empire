import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import UnisexGymPlans from "@/pages/UnisexGymPlans";
import FemaleGymPlans from "@/pages/FemaleGymPlans";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import NutritionAssessment from "@/pages/NutritionAssessment";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminCustomer from "@/pages/AdminCustomer";
import AdminTrackRecord from "@/pages/AdminTrackRecord";
import FloatingContact from "@/components/FloatingContact";
import DemoBar from "@/components/DemoBar";

const queryClient = new QueryClient();

function AdminShortcut() {
  useEffect(() => {
    let typed = "";
    const SECRET = "admin";
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      typed += e.key.toLowerCase();
      if (typed.length > SECRET.length) typed = typed.slice(-SECRET.length);
      if (typed === SECRET) {
        typed = "";
        window.location.href = "/pronectar-admin-2026";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return null;
}

// Only show public widgets when NOT on admin pages
function PublicWidgets() {
  const [location] = useLocation();
  if (location.startsWith("/pronectar-admin-2026")) return null;
  return (
    <>
      <FloatingContact />
      <DemoBar />
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/unisex-gym-plans" component={UnisexGymPlans} />
      <Route path="/female-gym-plans" component={FemaleGymPlans} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/nutrition" component={NutritionAssessment} />
      <Route path="/pronectar-admin-2026" component={AdminLogin} />
      <Route path="/pronectar-admin-2026/dashboard" component={AdminDashboard} />
      <Route path="/pronectar-admin-2026/customer/:id" component={AdminCustomer} />
      <Route path="/pronectar-admin-2026/track/:phone" component={AdminTrackRecord} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AdminShortcut />
          <Router />
          <PublicWidgets />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
