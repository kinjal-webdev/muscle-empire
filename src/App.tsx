import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import UnisexGymPlans from "@/pages/UnisexGymPlans";
import FemaleGymPlans from "@/pages/FemaleGymPlans";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import NutritionAssessment from "@/pages/NutritionAssessment";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminCustomer from "@/pages/AdminCustomer";
import FloatingContact from "@/components/FloatingContact";
import DemoBar from "@/components/DemoBar";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/unisex-gym-plans" component={UnisexGymPlans} />
      <Route path="/female-gym-plans" component={FemaleGymPlans} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/nutrition" component={NutritionAssessment} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/admin-dashboard/customer/:id" component={AdminCustomer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <FloatingContact />
        <DemoBar />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
