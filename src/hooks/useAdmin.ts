import { useState, useCallback } from "react";
import { INITIAL_SETTINGS, DEFAULT_ADMIN_PASSWORD } from "@/constants";
import type { AdminSettings, ThemeName, LanguageCode, ViewMode } from "@/types";

const STORAGE_KEY = "esoneworld_admin_settings";
const SESSION_KEY = "esoneworld_admin_session";

function loadSettings(): AdminSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...INITIAL_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return INITIAL_SETTINGS;
}

function saveSettings(s: AdminSettings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

export function useAdmin() {
  const [settings, setSettings] = useState<AdminSettings>(loadSettings);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });
  const [loginError, setLoginError] = useState("");

  const login = useCallback((password: string): boolean => {
    if (password === settings.password) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
      return true;
    }
    setLoginError("Incorrect password. Please try again.");
    return false;
  }, [settings.password]);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  const updateSettings = useCallback((updates: Partial<AdminSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      saveSettings(next);
      return next;
    });
  }, []);

  const changePassword = useCallback((current: string, next: string): boolean => {
    if (current !== settings.password) return false;
    updateSettings({ password: next });
    return true;
  }, [settings.password, updateSettings]);

  return {
    settings,
    isAuthenticated,
    loginError,
    login,
    logout,
    updateSettings,
    changePassword,
    setTheme: (t: ThemeName) => updateSettings({ theme: t }),
    setLanguage: (l: LanguageCode) => updateSettings({ language: l }),
    setViewMode: (v: ViewMode) => updateSettings({ viewMode: v }),
    setFilter: (f: string) => updateSettings({ filterActive: f }),
    toggleLeftSidebar: () => updateSettings({ leftSidebarOpen: !settings.leftSidebarOpen }),
    toggleRightSidebar: () => updateSettings({ rightSidebarOpen: !settings.rightSidebarOpen }),
  };
}
