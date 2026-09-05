import React from "react";
import { THEME_LAUNCHERS } from "@/constants";
import { useAdminContext } from "@/stores/AdminContext";
import type { ThemeName } from "@/types";

interface ThemeLauncherProps {
  onClose: () => void;
}

export default function ThemeLauncher({ onClose }: ThemeLauncherProps) {
  const { settings, setTheme } = useAdminContext();

  return (
    <div className="glass-crystal rounded-2xl p-6 w-72">
      <h3 className="font-display font-700 text-[15px] text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-lg">🎨</span> Theme Launchers
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {THEME_LAUNCHERS.map(t => (
          <button
            key={t.id}
            onClick={() => { setTheme(t.id as ThemeName); onClose(); }}
            className={`relative rounded-xl p-3 text-left transition-all duration-200 border-2 ${
              settings.theme === t.id
                ? "border-emerald-500 shadow-lg"
                : "border-transparent hover:border-gray-200"
            }`}
            style={{ background: t.preview }}
          >
            {settings.theme === t.id && (
              <span className="absolute top-1 right-1 text-[10px] bg-emerald-500 text-white rounded-full px-1.5 py-0.5 font-bold">✓</span>
            )}
            <span className="block text-[11px] font-semibold text-gray-800 leading-tight">{t.label}</span>
            <span className="block text-[10px] text-gray-500 mt-0.5 leading-tight">{t.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
