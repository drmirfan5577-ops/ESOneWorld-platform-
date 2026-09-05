import React from "react";
import { PLATFORM_STATS, MOCK_DOMAINS, MOCK_WEBSITES, MOCK_INTEGRATIONS, PLATFORMS } from "@/constants";
import { Globe, Mail, Server, ShieldCheck, BarChart2, Zap, TrendingUp, Activity, Layers, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "@/stores/AdminContext";
import heroImg from "@/assets/hero-bg.jpg";

const DIM_INFO = [
  { num: 1, label: "Core Identity", desc: "Brand domains & landing presence", color: "#00c88a", icon: "🏛️" },
  { num: 2, label: "Platform Ecosystem", desc: "20 platform sub-domains", color: "#0066ff", icon: "⚡" },
  { num: 3, label: "Technical Backbone", desc: "API, CDN, Admin, Status", color: "#9b59b6", icon: "⚙️" },
  { num: 4, label: "Communication", desc: "Email routing & wildcards", color: "#e8003d", icon: "📡" },
  { num: 5, label: "Global Spectrum", desc: "11 languages & regions", color: "#ffb300", icon: "🌍" },
];

const STAT_CARDS = [
  { icon: Globe, label: "Total Domains", value: PLATFORM_STATS.totalDomains, color: "#0066ff", bg: "glass-sapphire", suffix: "" },
  { icon: Server, label: "Active Sites", value: PLATFORM_STATS.activeSites, color: "#00c88a", bg: "glass-emerald", suffix: "" },
  { icon: Mail, label: "Emails Today", value: PLATFORM_STATS.emailsToday, color: "#e8003d", bg: "glass-crimson", suffix: "" },
  { icon: Zap, label: "Integrations", value: PLATFORM_STATS.integrations, color: "#ffb300", bg: "glass-aurora", suffix: "" },
  { icon: ShieldCheck, label: "Security Score", value: PLATFORM_STATS.secureScore, color: "#00c88a", bg: "glass-emerald", suffix: "%" },
  { icon: Activity, label: "Uptime", value: PLATFORM_STATS.uptime, color: "#0066ff", bg: "glass-sapphire", suffix: "", isString: true },
  { icon: Layers, label: "Global Regions", value: PLATFORM_STATS.globalRegions, color: "#9b59b6", bg: "glass-aurora", suffix: "" },
  { icon: Globe, label: "Languages", value: PLATFORM_STATS.languages, color: "#00bcd4", bg: "glass-crystal", suffix: "" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { settings } = useAdminContext();

  return (
    <div className="min-h-screen pt-14">
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ height: "280px" }}>
        <img src={heroImg} alt="ESOneWorld" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-white/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="glass-holographic rounded-2xl px-8 py-5 mb-4 max-w-2xl">
            <h1 className="font-display font-black text-[28px] sm:text-[36px] leading-tight text-gray-900 mb-2">
              🌐 ESOneWorld
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600"> Domain Matrix</span>
            </h1>
            <p className="text-[13px] sm:text-[15px] text-gray-600 font-medium">
              Multi-Dimensional Universal Digital Platform — Domains · Email · Hosting · Integrations
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="status-live glass-crystal rounded-full px-4 py-1.5">
              <span className="status-dot"></span>
              <span className="text-[12px] font-semibold text-emerald-800">Live & Operational</span>
            </div>
            <span className="badge-sapphire">5 Dimensions Active</span>
            <span className="badge-gold">11 Languages</span>
          </div>
        </div>
      </div>

      {/* Live Ticker */}
      <div className="glass-emerald border-y border-emerald-200/30 py-2 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-content text-[12px] font-semibold text-emerald-800 px-4">
            🟢 drirfan.online — PRIMARY DOMAIN — Active &nbsp;|&nbsp;
            🟢 uniorbi.com — SECONDARY DOMAIN — Active &nbsp;|&nbsp;
            📡 Wildcard Email Routing *@uniorbi.com → Active &nbsp;|&nbsp;
            ⚡ Cloudflare DDoS Protection — Enabled &nbsp;|&nbsp;
            🔐 SSL/TLS — All Domains Secured &nbsp;|&nbsp;
            🌍 11 Regional Servers — Online &nbsp;|&nbsp;
            📊 Uptime 99.97% — All Systems Go &nbsp;|&nbsp;
            🟢 drirfan.online — PRIMARY DOMAIN — Active &nbsp;|&nbsp;
            🟢 uniorbi.com — SECONDARY DOMAIN — Active &nbsp;|&nbsp;
            📡 Wildcard Email Routing *@uniorbi.com → Active &nbsp;|&nbsp;
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {STAT_CARDS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 card-hover`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: stat.color + "20" }}>
                    <Icon size={16} color={stat.color} />
                  </div>
                  <TrendingUp size={12} color="#00c88a" />
                </div>
                <p className="text-[22px] font-display font-black text-gray-900 leading-none">
                  {stat.isString ? stat.value : stat.value}{stat.suffix}
                </p>
                <p className="text-[11px] text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* 5 Dimensions */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-[18px] text-gray-900 mb-4">
            ⬡ 5-Dimensional Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {DIM_INFO.map(dim => (
              <div key={dim.num} className="glass-crystal rounded-2xl p-4 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: dim.color + "15" }}>
                    {dim.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: dim.color }}>DIM {dim.num}</span>
                </div>
                <p className="text-[13px] font-bold text-gray-900 font-display leading-tight">{dim.label}</p>
                <p className="text-[11px] text-gray-500 mt-1 leading-snug">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Domain Overview */}
          <div className="lg:col-span-2">
            <div className="glass-crystal rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-[16px] text-gray-900 flex items-center gap-2">
                  <Globe size={16} className="text-blue-500" /> Domain Registry
                </h2>
                <button onClick={() => navigate("/domains")} className="text-[12px] text-emerald-600 font-semibold hover:underline">View All →</button>
              </div>
              <div className="space-y-3">
                {MOCK_DOMAINS.map(domain => (
                  <div key={domain.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${domain.status === "active" ? "bg-emerald-500" : "bg-yellow-400"}`} />
                      <div>
                        <p className="text-[13px] font-bold text-gray-900">{domain.name}</p>
                        <p className="text-[11px] text-gray-500">{domain.subdomains.length} subdomains · {domain.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {domain.isPrimary && <span className="badge-emerald">Primary</span>}
                      {domain.isSecondary && <span className="badge-sapphire">Secondary</span>}
                      <span className="text-[11px] text-gray-400">Exp: {domain.expiry}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platforms Grid */}
            <div className="glass-crystal rounded-2xl p-5 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-[16px] text-gray-900 flex items-center gap-2">
                  <Layers size={16} className="text-purple-500" /> Platform Ecosystem (20 Platforms)
                </h2>
                <span className="badge-gold">Dim 2 & 3</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PLATFORMS.slice(0, 12).map(p => (
                  <div key={p.id} className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="text-base w-6 text-center">{p.icon}</span>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-800">{p.name}</p>
                      <p className="text-[10px] text-gray-400 truncate max-w-[100px]">{p.subdomain}</p>
                    </div>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="glass-emerald rounded-2xl p-5">
              <h3 className="font-display font-bold text-[14px] text-gray-900 mb-3 flex items-center gap-2">
                <Zap size={14} className="text-emerald-600" /> Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Manage Domains", icon: "🌐", path: "/domains", color: "blue" },
                  { label: "Open Email Room", icon: "📧", path: "/email", color: "red" },
                  { label: "Website Flow", icon: "🖥️", path: "/websites", color: "purple" },
                  { label: "Integrations", icon: "⚡", path: "/integrations", color: "yellow" },
                  { label: "Admin Panel", icon: "🔐", path: "/admin", color: "red" },
                ].map(action => (
                  <button
                    key={action.path}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/60 transition-all text-left"
                  >
                    <span className="text-base">{action.icon}</span>
                    <span className="text-[13px] font-semibold text-gray-800">{action.label}</span>
                    <span className="ml-auto text-gray-400 text-sm">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Integrations Status */}
            <div className="glass-crystal rounded-2xl p-5">
              <h3 className="font-display font-bold text-[14px] text-gray-900 mb-3 flex items-center gap-2">
                <RefreshCw size={14} className="text-blue-500" /> Integration Status
              </h3>
              <div className="space-y-2">
                {MOCK_INTEGRATIONS.slice(0, 6).map(intg => (
                  <div key={intg.id} className="flex items-center gap-2.5">
                    <span className="text-sm w-5 text-center">{intg.icon}</span>
                    <span className="text-[12px] font-medium text-gray-700 flex-1">{intg.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      intg.status === "connected" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      intg.status === "pending" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                      "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {intg.status === "connected" ? "● Live" : intg.status === "pending" ? "◌ Pending" : "✗ Off"}
                    </span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/integrations")} className="mt-3 text-[12px] text-blue-600 font-semibold hover:underline w-full text-center">
                View All {MOCK_INTEGRATIONS.length} Integrations →
              </button>
            </div>

            {/* Website Status */}
            <div className="glass-sapphire rounded-2xl p-5">
              <h3 className="font-display font-bold text-[14px] text-gray-900 mb-3 flex items-center gap-2">
                <Activity size={14} className="text-blue-600" /> Website Status
              </h3>
              <div className="space-y-2">
                {MOCK_WEBSITES.map(site => (
                  <div key={site.id} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      site.status === "live" ? "bg-emerald-500" :
                      site.status === "building" ? "bg-yellow-500 animate-pulse" :
                      "bg-gray-400"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-800 truncate">{site.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{site.domain}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{site.uptime > 0 ? `${site.uptime}%` : "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
