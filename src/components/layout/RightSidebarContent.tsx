import React, { useState } from "react";
import { THEME_LAUNCHERS, VISUAL_FILTERS, SUPPORTED_LANGUAGES } from "@/constants";
import { useAdminContext } from "@/stores/AdminContext";
import type { ThemeName, LanguageCode } from "@/types";
import { Palette, Filter, Globe2, SlidersHorizontal, Moon, Sun } from "lucide-react";

interface RightSidebarContentProps {
  onClose: () => void;
}

type Panel = "themes" | "filters" | "language" | "display";

export default function RightSidebarContent({ onClose }: RightSidebarContentProps) {
  const { settings, setTheme, setFilter, setLanguage, updateSettings } = useAdminContext();
  const [activePanel, setActivePanel] = useState<Panel>("themes");

  const tabs: { id: Panel; icon: React.ReactNode; label: string }[] = [
    { id: "themes", icon: <Palette size={14} />, label: "Themes" },
    { id: "filters", icon: <Filter size={14} />, label: "Filters" },
    { id: "language", icon: <Globe2 size={14} />, label: "Language" },
    { id: "display", icon: <SlidersHorizontal size={14} />, label: "Display" },
  ];

  return (
    <div className="sidebar-glass rounded-2xl w-72 max-h-[88vh] overflow-y-auto panel-scroll">
      <div className="sticky top-0 bg-white/90 backdrop-blur-lg px-4 pt-4 pb-3 border-b border-white/50 z-10">
        <p className="font-display font-semibold text-[14px] text-gray-900 mb-3">⚙️ Customization</p>
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivePanel(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                activePanel === tab.id
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* THEMES */}
        {activePanel === "themes" && (
          <div className="grid grid-cols-2 gap-2.5">
            {THEME_LAUNCHERS.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as ThemeName)}
                className={`relative rounded-xl p-3 text-left transition-all border-2 ${
                  settings.theme === t.id ? "border-emerald-400 shadow-md" : "border-transparent hover:border-gray-200"
                }`}
                style={{ background: t.preview, backgroundSize: "200% 200%" }}
              >
                {settings.theme === t.id && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold">✓</span>
                )}
                <span className="block text-[11px] font-semibold text-gray-900">{t.label}</span>
                <span className="block text-[10px] text-gray-500 mt-0.5">{t.desc}</span>
              </button>
            ))}
          </div>
        )}

        {/* FILTERS */}
        {activePanel === "filters" && (
          <div className="space-y-1">
            {VISUAL_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all ${
                  settings.filterActive === f.id
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className="text-base w-6 text-center">{f.icon}</span>
                <span>{f.label}</span>
                {settings.filterActive === f.id && <span className="ml-auto text-emerald-500">●</span>}
              </button>
            ))}
          </div>
        )}

        {/* LANGUAGE */}
        {activePanel === "language" && (
          <div className="space-y-1">
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as LanguageCode)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  settings.language === lang.code
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="text-[13px] font-semibold text-gray-900 w-20">{lang.code.toUpperCase()}</span>
                <div>
                  <p className="text-[12px] font-medium text-gray-700">{lang.nativeName}</p>
                  <p className="text-[10px] text-gray-400">{lang.name} — {lang.dir === "rtl" ? "RTL" : "LTR"}</p>
                </div>
                {settings.language === lang.code && <span className="ml-auto text-blue-500 text-sm">●</span>}
              </button>
            ))}
          </div>
        )}

        {/* DISPLAY */}
        {activePanel === "display" && (
          <div className="space-y-4">
            <div>
              <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">View Mode</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "horizontal", label: "Horizontal", icon: "↔️" },
                  { id: "vertical", label: "Vertical", icon: "↕️" },
                  { id: "both", label: "Both", icon: "✥" },
                ].map(vm => (
                  <button
                    key={vm.id}
                    onClick={() => updateSettings({ viewMode: vm.id as any })}
                    className={`px-2 py-3 rounded-xl text-center text-[11px] font-medium transition-all ${
                      settings.viewMode === vm.id ? "bg-purple-50 border border-purple-200 text-purple-700" : "hover:bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    <div className="text-lg mb-1">{vm.icon}</div>
                    {vm.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Auto Features</p>
              <div className="space-y-2">
                {[
                  { key: "autoSave", label: "Auto Save", icon: "💾" },
                  { key: "autoSync", label: "Auto Sync", icon: "🔄" },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => updateSettings({ [opt.key]: !settings[opt.key as keyof typeof settings] } as any)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                      <span>{opt.icon}</span>{opt.label}
                    </span>
                    <div className={`w-10 h-5 rounded-full transition-colors relative ${
                      settings[opt.key as keyof typeof settings] ? "bg-emerald-500" : "bg-gray-200"
                    }`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        settings[opt.key as keyof typeof settings] ? "translate-x-5" : "translate-x-0.5"
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Font Size</p>
              <div className="grid grid-cols-3 gap-2">
                {["sm", "base", "lg"].map(size => (
                  <button
                    key={size}
                    onClick={() => updateSettings({ fontSize: size })}
                    className={`py-2 rounded-xl text-[12px] font-medium transition-all ${
                      settings.fontSize === size ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "hover:bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {size === "sm" ? "Small" : size === "base" ? "Medium" : "Large"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
