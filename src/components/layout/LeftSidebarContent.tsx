import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Globe, Mail, Layout, Settings, Layers, Zap, ShieldCheck,
  BarChart2, Server, Users, HelpCircle, LogOut, Home, Database, Code2
} from "lucide-react";
import { useAdminContext } from "@/stores/AdminContext";

const NAV_ITEMS = [
  { icon: Home, label: "Dashboard", path: "/", color: "#00c88a" },
  { icon: Globe, label: "Domain Matrix", path: "/domains", color: "#0066ff" },
  { icon: Mail, label: "Email Room", path: "/email", color: "#e8003d" },
  { icon: Layout, label: "Website Flow", path: "/websites", color: "#9b59b6" },
  { icon: Zap, label: "Integrations", path: "/integrations", color: "#ffb300" },
  { icon: ShieldCheck, label: "Security", path: "/security", color: "#00bcd4" },
  { icon: BarChart2, label: "Analytics", path: "/analytics", color: "#ff6b35" },
  { icon: Server, label: "Infrastructure", path: "/infrastructure", color: "#795548" },
  { icon: Database, label: "Records Hub", path: "/records", color: "#3f51b5" },
  { icon: Code2, label: "Creative Tools", path: "/tools", color: "#e91e63" },
  { icon: Users, label: "Team", path: "/team", color: "#009688" },
  { icon: Settings, label: "Admin Panel", path: "/admin", color: "#f44336" },
];

interface LeftSidebarContentProps {
  onClose: () => void;
}

export default function LeftSidebarContent({ onClose }: LeftSidebarContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAdminContext();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="sidebar-glass rounded-2xl w-64 max-h-[85vh] overflow-y-auto panel-scroll py-3">
      <div className="px-4 pb-3 border-b border-white/50 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">ES</div>
          <div>
            <p className="text-[12px] font-bold text-gray-900 font-display">ESOneWorld</p>
            <p className="text-[10px] text-gray-500">Domain Matrix v1.0</p>
          </div>
        </div>
      </div>

      <div className="px-2 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                active
                  ? "bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/50"
                  : "hover:bg-gray-50/80"
              }`}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: active ? item.color + "20" : "transparent" }}
              >
                <Icon size={15} color={active ? item.color : "#6b7280"} />
              </div>
              <span className={`text-[13px] font-medium ${active ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"}`}>
                {item.label}
              </span>
              {item.path === "/admin" && (
                <span className="ml-auto text-[9px] bg-red-100 text-red-600 border border-red-200 rounded px-1.5 py-0.5 font-bold">🔐</span>
              )}
            </button>
          );
        })}
      </div>

      {isAuthenticated && (
        <div className="px-4 pt-3 mt-2 border-t border-white/50">
          <button
            onClick={() => { logout(); onClose(); }}
            className="w-full flex items-center gap-2 text-[12px] text-red-500 hover:text-red-700 font-medium"
          >
            <LogOut size={13} />
            Sign out Admin
          </button>
        </div>
      )}

      <div className="px-4 pt-3 mt-2">
        <div className="status-live">
          <span className="status-dot"></span>
          <span className="text-[11px] text-gray-500 font-medium">All systems operational</span>
        </div>
      </div>
    </div>
  );
}
