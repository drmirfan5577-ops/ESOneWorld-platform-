import React, { createContext, useContext, ReactNode } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import type { AdminSettings, ThemeName, LanguageCode, ViewMode } from "@/types";

interface AdminContextValue {
  settings: AdminSettings;
  isAuthenticated: boolean;
  loginError: string;
  login: (password: string) => boolean;
  logout: () => void;
  updateSettings: (updates: Partial<AdminSettings>) => void;
  changePassword: (current: string, next: string) => boolean;
  setTheme: (t: ThemeName) => void;
  setLanguage: (l: LanguageCode) => void;
  setViewMode: (v: ViewMode) => void;
  setFilter: (f: string) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const admin = useAdmin();
  return <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>;
}

export function useAdminContext() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminContext must be used within AdminProvider");
  return ctx;
}
