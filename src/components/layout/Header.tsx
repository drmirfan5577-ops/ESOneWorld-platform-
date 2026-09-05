import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Globe, Wifi, ShieldCheck } from "lucide-react";
import { PLATFORM_STATS } from "@/constants";
import { useAdminContext } from "@/stores/AdminContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAdminContext();

  const pageTitle: Record<string, string> = {
    "/": "Dashboard — Core Identity",
    "/domains": "Domain Matrix",
    "/email": "Email Room",
    "/websites": "Website Flow Room",
    "/integrations": "Integration Hub",
    "/security": "Security Center",
    "/analytics": "Analytics",
    "/infrastructure": "Infrastructure",
    "/records": "Records Hub",
    "/tools": "Creative Tools",
    "/team": "Team",
    "/admin": "Admin Control Panel",
  };

  return (
    <header className="nav-glass fixed top-0 left-0 right-0 z-40 h-14">
      <div className="h-full px-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500 flex items-center justify-center shadow-sm">
            <Globe size={14} color="white" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-[14px] text-gray-900 tracking-tight">
              ES<span className="text-emerald-600">One</span>World
            </span>
            <span className="hidden md:inline text-[11px] text-gray-400 ml-1.5">Domain Matrix</span>
          </div>
        </button>

        {/* Center — Page Title */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <p className="text-[13px] font-semibold text-gray-700 font-display">
            {pageTitle[location.pathname] || "ESOneWorld"}
          </p>
        </div>

        {/* Right status */}
        <div className="flex items-center gap-3">
          {/* Live ticker mini */}
          <div className="hidden lg:flex items-center gap-1.5 glass-emerald rounded-full px-3 py-1">
            <span className="status-dot w-1.5 h-1.5"></span>
            <span className="text-[11px] font-medium text-emerald-800">All systems live</span>
          </div>

          {/* Stats row */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Globe size={11} className="text-blue-500" />
              <span className="text-[11px] font-semibold text-gray-600">{PLATFORM_STATS.totalDomains} domains</span>
            </div>
            <div className="flex items-center gap-1">
              <Wifi size={11} className="text-emerald-500" />
              <span className="text-[11px] font-semibold text-gray-600">{PLATFORM_STATS.uptime}</span>
            </div>
          </div>

          {/* Admin badge */}
          {isAuthenticated && (
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-1.5 glass-crimson rounded-full px-3 py-1 hover:shadow-md transition-all"
            >
              <ShieldCheck size={11} color="#6b0020" />
              <span className="text-[11px] font-semibold text-red-900">Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Live marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
    </header>
  );
}
