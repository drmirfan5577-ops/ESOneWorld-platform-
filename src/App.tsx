import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AdminProvider } from "@/stores/AdminContext";
import { useAdminContext } from "@/stores/AdminContext";
import { THEME_LAUNCHERS } from "@/constants";
import Header from "@/components/layout/Header";
import StarToggle from "@/components/layout/StarToggle";
import Dashboard from "@/pages/Dashboard";
import EmailRoom from "@/pages/EmailRoom";
import DomainsMatrix from "@/pages/DomainsMatrix";
import WebsiteFlowRoom from "@/pages/WebsiteFlowRoom";
import IntegrationsHub from "@/pages/IntegrationsHub";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/NotFound";

function AppContent() {
  const { settings } = useAdminContext();

  const themeClass =
    THEME_LAUNCHERS.find(t => t.id === settings.theme)?.class || "theme-aurora";

  return (
    <div className={themeClass} style={{ minHeight: "100vh" }}>
      {/* Ambient decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb-emerald absolute w-96 h-96 -top-24 -left-24 opacity-60" />
        <div className="orb-crimson absolute w-80 h-80 top-1/4 right-0 opacity-50" />
        <div className="orb-sapphire absolute w-72 h-72 bottom-0 left-1/3 opacity-40" />
      </div>

      <div className="relative z-10">
        <Header />
        <StarToggle />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/domains" element={<DomainsMatrix />} />
          <Route path="/email" element={<EmailRoom />} />
          <Route path="/websites" element={<WebsiteFlowRoom />} />
          <Route path="/integrations" element={<IntegrationsHub />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.7)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              fontSize: "13px",
              fontWeight: 500,
              color: "#1a1a2e",
            },
          }}
        />
      </BrowserRouter>
    </AdminProvider>
  );
}
