import React, { useState } from "react";
import { useAdminContext } from "@/stores/AdminContext";
import { THEME_LAUNCHERS, VISUAL_FILTERS, SUPPORTED_LANGUAGES, DEFAULT_ADMIN_PASSWORD } from "@/constants";
import type { ThemeName, LanguageCode } from "@/types";
import {
  ShieldCheck, Lock, Eye, EyeOff, Settings, Palette,
  Globe2, Filter, SlidersHorizontal, Key, Save,
  ToggleLeft, ToggleRight, AlertTriangle, ChevronRight, LogOut
} from "lucide-react";
import { toast } from "sonner";

function AdminLoginGate({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleLogin = () => {
    const ok = onLogin(password);
    if (!ok) {
      setError("Incorrect password. Default password is 1122.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen pt-14 bg-matrix-live flex items-center justify-center px-4">
      <div className={`glass-holographic rounded-3xl w-full max-w-md p-8 text-center animate-fadeIn ${shaking ? "animate-pulse" : ""}`}>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-5 shadow-lg glow-border-crimson">
          <Lock size={28} color="white" />
        </div>
        <h1 className="font-display font-black text-[24px] text-gray-900 mb-2">Admin Control Panel</h1>
        <p className="text-[13px] text-gray-500 mb-6">
          This panel is password-protected. Full command &amp; control access only.
        </p>

        <div className="relative mb-4">
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={e => { setPassword(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Enter admin password"
            className="w-full input-glass text-[14px] pr-12 text-center tracking-widest"
          />
          <button
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mb-4">
            <AlertTriangle size={14} className="text-red-500" />
            <p className="text-[12px] text-red-600">{error}</p>
          </div>
        )}

        <button onClick={handleLogin} className="btn-danger w-full flex items-center justify-center gap-2 py-3 text-[15px]">
          <ShieldCheck size={16} /> Unlock Admin Panel
        </button>

        <p className="text-[11px] text-gray-400 mt-4">Default password: 1122</p>
      </div>
    </div>
  );
}

type AdminTab = "overview" | "themes" | "filters" | "language" | "security" | "display" | "domains" | "customization";

const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <Settings size={14} /> },
  { id: "themes", label: "Themes", icon: <Palette size={14} /> },
  { id: "filters", label: "Visual Filters", icon: <Filter size={14} /> },
  { id: "language", label: "Language", icon: <Globe2 size={14} /> },
  { id: "display", label: "Display", icon: <SlidersHorizontal size={14} /> },
  { id: "security", label: "Security", icon: <Lock size={14} /> },
  { id: "customization", label: "Advanced", icon: <ChevronRight size={14} /> },
];

export default function AdminPanel() {
  const { settings, isAuthenticated, login, logout, updateSettings, setTheme, setFilter, setLanguage, changePassword } = useAdminContext();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  if (!isAuthenticated) {
    return <AdminLoginGate onLogin={login} />;
  }

  const handlePasswordChange = () => {
    if (newPw !== confirmPw) { toast.error("Passwords do not match!"); return; }
    if (newPw.length < 4) { toast.error("Password must be at least 4 characters."); return; }
    const ok = changePassword(currentPw, newPw);
    if (ok) {
      toast.success("Password changed successfully!");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } else {
      toast.error("Current password is incorrect.");
    }
  };

  return (
    <div className="min-h-screen pt-14 bg-matrix-live">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="glass-crimson rounded-2xl p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
              <ShieldCheck size={22} color="white" />
            </div>
            <div>
              <h1 className="font-display font-black text-[22px] text-gray-900">Admin Control Panel</h1>
              <p className="text-[13px] text-red-700 font-medium">Full Command &amp; Control — Authenticated ✓</p>
            </div>
          </div>
          <button onClick={logout} className="btn-secondary flex items-center gap-2 text-[13px] text-red-600 border-red-200">
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="glass-crystal rounded-2xl p-3 h-fit lg:sticky lg:top-20">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2">Control Sections</p>
            <div className="space-y-0.5">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                    activeTab === tab.id ? "bg-red-50 text-red-800 border border-red-200" : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {tab.icon}
                  <span className="text-[13px] font-medium">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight size={12} className="ml-auto text-red-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-5">

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="glass-crystal rounded-2xl p-5">
                  <h2 className="font-display font-bold text-[17px] text-gray-900 mb-4">System Overview</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Active Theme", value: settings.theme, color: "#9b59b6" },
                      { label: "Language", value: settings.language.toUpperCase(), color: "#0066ff" },
                      { label: "Visual Filter", value: settings.filterActive, color: "#00c88a" },
                      { label: "View Mode", value: settings.viewMode, color: "#ffb300" },
                      { label: "Auto Save", value: settings.autoSave ? "On" : "Off", color: settings.autoSave ? "#00c88a" : "#e8003d" },
                      { label: "Auto Sync", value: settings.autoSync ? "On" : "Off", color: settings.autoSync ? "#00c88a" : "#e8003d" },
                    ].map(item => (
                      <div key={item.label} className="glass-crystal rounded-xl p-3">
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                        <p className="text-[14px] font-bold mt-1" style={{ color: item.color }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-emerald rounded-2xl p-5">
                  <h3 className="font-display font-bold text-[15px] text-gray-900 mb-3 flex items-center gap-2">
                    <Settings size={15} className="text-emerald-600" /> Auto Features
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: "autoSave", label: "Auto Save", desc: "Automatically save all settings changes" },
                      { key: "autoSync", label: "Auto Sync", desc: "Sync data across all integrated services" },
                    ].map(opt => (
                      <div key={opt.key} className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                        <div>
                          <p className="text-[13px] font-semibold text-gray-800">{opt.label}</p>
                          <p className="text-[11px] text-gray-500">{opt.desc}</p>
                        </div>
                        <button
                          onClick={() => updateSettings({ [opt.key]: !settings[opt.key as keyof typeof settings] } as any)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${settings[opt.key as keyof typeof settings] ? "bg-emerald-500" : "bg-gray-200"}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[opt.key as keyof typeof settings] ? "translate-x-6" : "translate-x-0.5"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* THEMES */}
            {activeTab === "themes" && (
              <div className="glass-crystal rounded-2xl p-5">
                <h2 className="font-display font-bold text-[17px] text-gray-900 mb-2">Theme Launchers</h2>
                <p className="text-[12px] text-gray-500 mb-5">8 crystalline glass themes. Select your platform launcher.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEME_LAUNCHERS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id as ThemeName); toast.success(`Theme "${t.label}" applied!`); }}
                      className={`relative rounded-2xl p-4 text-left transition-all border-2 ${settings.theme === t.id ? "border-emerald-400 shadow-lg scale-105" : "border-transparent hover:border-gray-200 hover:shadow-md"}`}
                      style={{ background: t.preview, backgroundSize: "200% 200%" }}
                    >
                      {settings.theme === t.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                      )}
                      <p className="text-[12px] font-bold text-gray-900">{t.label}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* VISUAL FILTERS */}
            {activeTab === "filters" && (
              <div className="glass-crystal rounded-2xl p-5">
                <h2 className="font-display font-bold text-[17px] text-gray-900 mb-2">Visual Filter Modes</h2>
                <p className="text-[12px] text-gray-500 mb-5">12 live display modes including glassy, holographic, and more.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VISUAL_FILTERS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => { setFilter(f.id); toast.success(`Filter "${f.label}" applied!`); }}
                      className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all ${settings.filterActive === f.id ? "bg-emerald-50 border border-emerald-200 shadow-sm" : "hover:bg-gray-50 border border-transparent"}`}
                    >
                      <span className="text-xl w-8 text-center">{f.icon}</span>
                      <span className="font-medium text-[13px] text-gray-800 flex-1">{f.label}</span>
                      {settings.filterActive === f.id && (
                        <span className="text-[11px] bg-emerald-500 text-white rounded-full px-2 py-0.5 font-bold">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* LANGUAGE */}
            {activeTab === "language" && (
              <div className="glass-crystal rounded-2xl p-5">
                <h2 className="font-display font-bold text-[17px] text-gray-900 mb-2">Multi-Language System</h2>
                <p className="text-[12px] text-gray-500 mb-5">11 languages with RTL/LTR support, custom fonts &amp; textures.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code as LanguageCode); toast.success(`Language: ${lang.name}`); }}
                      className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${settings.language === lang.code ? "glass-sapphire border border-blue-200 shadow-sm" : "hover:bg-gray-50 border border-transparent"}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-[13px] text-gray-700 flex-shrink-0">
                        {lang.code.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] font-bold text-gray-900">{lang.nativeName}</p>
                        <p className="text-[11px] text-gray-500">{lang.name} · {lang.dir === "rtl" ? "Right-to-Left" : "Left-to-Right"}</p>
                      </div>
                      {settings.language === lang.code && (
                        <span className="text-blue-500 font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* DISPLAY */}
            {activeTab === "display" && (
              <div className="space-y-4">
                <div className="glass-crystal rounded-2xl p-5">
                  <h2 className="font-display font-bold text-[17px] text-gray-900 mb-4">Display Configuration</h2>
                  <div className="space-y-5">
                    <div>
                      <p className="text-[13px] font-semibold text-gray-700 mb-3">Scroll / Swipe Mode</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "horizontal", label: "Horizontal", icon: "↔️", desc: "Swipe left/right" },
                          { id: "vertical", label: "Vertical", icon: "↕️", desc: "Scroll up/down" },
                          { id: "both", label: "Both", icon: "✥", desc: "All directions" },
                        ].map(vm => (
                          <button
                            key={vm.id}
                            onClick={() => { updateSettings({ viewMode: vm.id as any }); toast.success(`View mode: ${vm.label}`); }}
                            className={`p-4 rounded-xl text-center transition-all border-2 ${settings.viewMode === vm.id ? "border-purple-400 bg-purple-50 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
                          >
                            <div className="text-2xl mb-2">{vm.icon}</div>
                            <p className="text-[12px] font-bold text-gray-800">{vm.label}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{vm.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-gray-700 mb-3">Font Size</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "sm", label: "Compact", sample: "Aa" },
                          { id: "base", label: "Standard", sample: "Aa" },
                          { id: "lg", label: "Large", sample: "Aa" },
                        ].map(fs => (
                          <button
                            key={fs.id}
                            onClick={() => { updateSettings({ fontSize: fs.id }); toast.success(`Font: ${fs.label}`); }}
                            className={`p-4 rounded-xl text-center border-2 transition-all ${settings.fontSize === fs.id ? "border-emerald-400 bg-emerald-50 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
                          >
                            <p className={`font-bold text-gray-900 mb-1 ${fs.id === "sm" ? "text-base" : fs.id === "lg" ? "text-2xl" : "text-xl"}`}>{fs.sample}</p>
                            <p className="text-[11px] text-gray-500">{fs.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div className="space-y-4">
                <div className="glass-crimson rounded-2xl p-5">
                  <h2 className="font-display font-bold text-[17px] text-gray-900 mb-1 flex items-center gap-2">
                    <Key size={16} className="text-red-600" /> Change Admin Password
                  </h2>
                  <p className="text-[12px] text-gray-500 mb-4">Keep your admin panel secure with a strong password.</p>
                  <div className="space-y-3 max-w-sm">
                    <div>
                      <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Current Password</label>
                      <input
                        type="password"
                        value={currentPw}
                        onChange={e => setCurrentPw(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full input-glass"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">New Password</label>
                      <input
                        type="password"
                        value={newPw}
                        onChange={e => setNewPw(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full input-glass"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPw}
                        onChange={e => setConfirmPw(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full input-glass"
                      />
                    </div>
                    <button onClick={handlePasswordChange} className="btn-danger flex items-center gap-2">
                      <Key size={14} /> Update Password
                    </button>
                  </div>
                </div>

                <div className="glass-crystal rounded-2xl p-5">
                  <h3 className="font-display font-bold text-[15px] text-gray-900 mb-3 flex items-center gap-2">
                    <ShieldCheck size={15} className="text-emerald-600" /> Security Status
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Admin Panel Password", status: "Protected", ok: true },
                      { label: "Session Timeout", status: "Active", ok: true },
                      { label: "Cloudflare DDoS Protection", status: "Enabled", ok: true },
                      { label: "SSL/TLS Encryption", status: "All Domains", ok: true },
                      { label: "Wildcard Email Security", status: "Active", ok: true },
                      { label: "Two-Factor Authentication", status: "Not configured", ok: false },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="text-[13px] font-medium text-gray-700">{item.label}</span>
                        <span className={`text-[12px] font-semibold ${item.ok ? "text-emerald-600" : "text-orange-500"}`}>
                          {item.ok ? "✓" : "⚠"} {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ADVANCED / CUSTOMIZATION */}
            {activeTab === "customization" && (
              <div className="space-y-4">
                <div className="glass-holographic rounded-2xl p-5">
                  <h2 className="font-display font-bold text-[17px] text-gray-900 mb-4">Advanced Customization</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[12px] font-semibold text-gray-600 mb-2">Accent Color System</p>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          { id: "emerald", label: "Emerald", color: "#00c88a" },
                          { id: "crimson", label: "Crimson", color: "#e8003d" },
                          { id: "sapphire", label: "Sapphire", color: "#0066ff" },
                          { id: "gold", label: "Gold", color: "#ffb300" },
                          { id: "violet", label: "Violet", color: "#9b59b6" },
                          { id: "cyan", label: "Cyan", color: "#00bcd4" },
                        ].map(ac => (
                          <button
                            key={ac.id}
                            onClick={() => { updateSettings({ accentColor: ac.id }); toast.success(`Accent: ${ac.label}`); }}
                            className={`w-10 h-10 rounded-xl transition-all ${settings.accentColor === ac.id ? "ring-2 ring-offset-2 scale-110" : "hover:scale-105"}`}
                            style={{ background: ac.color, ringColor: ac.color }}
                            title={ac.label}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="divider-gradient" />

                    <div>
                      <p className="text-[12px] font-semibold text-gray-600 mb-2">Dashboard Layout Size</p>
                      <div className="grid grid-cols-3 gap-3">
                        {["Compact", "Standard", "Expanded"].map(ls => (
                          <button
                            key={ls}
                            onClick={() => toast.success(`Layout: ${ls}`)}
                            className="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-[12px] font-semibold text-gray-700 transition-all"
                          >
                            {ls}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="divider-gradient" />

                    <div>
                      <p className="text-[12px] font-semibold text-gray-600 mb-2">Platform Operations</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { label: "Export All Settings", icon: "📤" },
                          { label: "Import Settings", icon: "📥" },
                          { label: "Reset to Defaults", icon: "🔄" },
                          { label: "System Diagnostics", icon: "🔍" },
                        ].map(op => (
                          <button
                            key={op.label}
                            onClick={() => toast.info(`${op.label}...`)}
                            className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-white/60 transition-all border border-white/50 text-left"
                          >
                            <span className="text-lg">{op.icon}</span>
                            <span className="text-[13px] font-semibold text-gray-700">{op.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
