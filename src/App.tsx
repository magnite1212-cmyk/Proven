import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Scan from "@/pages/patient/Scan";
import Register from "@/pages/patient/Register";
import PatientDashboard from "@/pages/patient/Dashboard";
import FullDashboard from "@/pages/patient/FullDashboard";
import PatientRewards from "@/pages/patient/Rewards";
import PatientPrograms from "@/pages/patient/Programs";
import ProgramDetail from "@/pages/patient/ProgramDetail";
import PatientVisits from "@/pages/patient/Visits";
import PatientProfile from "@/pages/patient/Profile";
import PatientOffers from "@/pages/patient/Offers";

import AdminLogin from "@/pages/admin/Login";
import ClinicLogin from "@/pages/clinic/Login";

import ClinicDashboard from "@/pages/clinic/Dashboard";
import ClinicPending from "@/pages/clinic/Pending";
import ClinicPatients from "@/pages/clinic/Patients";
import ClinicPatientDetail from "@/pages/clinic/PatientDetail";
import ClinicSettings from "@/pages/clinic/Settings";
import ClinicOffers from "@/pages/clinic/Offers";

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminQrCodes from "@/pages/admin/QrCodes";
import AdminSettings from "@/pages/admin/Settings";

const queryClient = new QueryClient();

interface AuthGuardProps {
  role: "admin" | "clinic";
  children: React.ReactNode;
}

function AuthGuard({ role, children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== role) {
    const loginPath = role === "admin" ? "/admin/login" : "/clinic/login";
    // Redirect will happen through wouter's navigation
    window.location.href = loginPath;
    return null;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* Auth Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/clinic/login" component={ClinicLogin} />

      {/* Patient Routes (no auth required) */}
      <Route path="/patient/scan/:token" component={Scan} />
      <Route path="/patient/register" component={Register} />
      <Route path="/patient/:id" component={PatientDashboard} />
      <Route path="/patient/:id/dashboard" component={FullDashboard} />
      <Route path="/patient/:id/rewards" component={PatientRewards} />
      <Route path="/patient/:id/programs" component={PatientPrograms} />
      <Route path="/patient/:id/programs/:slug" component={ProgramDetail} />
      <Route path="/patient/:id/visits" component={PatientVisits} />
      <Route path="/patient/:id/profile" component={PatientProfile} />
      <Route path="/patient/:id/offers" component={PatientOffers} />

      {/* Clinic Routes (auth required) */}
      <Route path="/clinic">
        {() => <AuthGuard role="clinic"><ClinicDashboard /></AuthGuard>}
      </Route>
      <Route path="/clinic/dashboard">
        {() => <AuthGuard role="clinic"><ClinicDashboard /></AuthGuard>}
      </Route>
      <Route path="/clinic/pending">
        {() => <AuthGuard role="clinic"><ClinicPending /></AuthGuard>}
      </Route>
      <Route path="/clinic/patients">
        {() => <AuthGuard role="clinic"><ClinicPatients /></AuthGuard>}
      </Route>
      <Route path="/clinic/patients/:id">
        {() => <AuthGuard role="clinic"><ClinicPatientDetail /></AuthGuard>}
      </Route>
      <Route path="/clinic/settings">
        {() => <AuthGuard role="clinic"><ClinicSettings /></AuthGuard>}
      </Route>
      <Route path="/clinic/offers">
        {() => <AuthGuard role="clinic"><ClinicOffers /></AuthGuard>}
      </Route>

      {/* Admin Routes (auth required) */}
      <Route path="/admin">
        {() => <AuthGuard role="admin"><AdminDashboard /></AuthGuard>}
      </Route>
      <Route path="/admin/dashboard">
        {() => <AuthGuard role="admin"><AdminDashboard /></AuthGuard>}
      </Route>
      <Route path="/admin/qr-codes">
        {() => <AuthGuard role="admin"><AdminQrCodes /></AuthGuard>}
      </Route>
      <Route path="/admin/settings">
        {() => <AuthGuard role="admin"><AdminSettings /></AuthGuard>}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
