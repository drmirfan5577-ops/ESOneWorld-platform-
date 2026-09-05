import React, { useState } from "react";
import { MOCK_WEBSITES, HOSTING_PROVIDERS } from "@/constants";
import type { WebsiteProject } from "@/types";
import {
  Layout, Plus, ExternalLink, RefreshCw, TrendingUp,
  Activity, ShieldCheck, Globe, Clock, DollarSign,
  AlertTriangle, CheckCircle, Zap, Code2, Server
} from "lucide-react";
import { toast } from "sonner";

const STATUS_COLORS: Record<WebsiteProject["status"], string> = {
  live: "bg-emerald-500",
  building: "bg-yellow-400",
  offline: "bg-gray-400",
  paused: "bg-orange-400",
};
const STATUS_LABELS: Record<WebsiteProject["status"], string> = {
  live: "● Live",
  building: "◌ Building",
  offline: "✗ Offline",
  paused: "⏸ Paused",
};

function SiteCard({ site, onSelect }: { site: WebsiteProject; onSelect: () => void }) {
  return (
    <div className="glass-crystal rounded-2xl p-5 card-hover cursor-pointer" onClick={onSelect}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
            {site.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-display font-bold text-[15px] text-gray-900">{site.name}</h3>
            <a
              href={`https://${site.domain}`}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-[12px] text-blue-600 hover:underline flex items-center gap-1"
            >
              {site.domain} <ExternalLink size={10} />
            </a>
          </div>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full text-white ${STATUS_COLORS[site.status]} ${site.status === "building" ? "animate-pulse" : ""}`}>
          {STATUS_LABELS[site.status]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-50/80 rounded-xl p-2.5">
          <p className="text-[10px] text-gray-400 font-medium">Monthly Visits</p>
          <p className="text-[15px] font-bold text-gray-900">{site.monthlyVisits.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50/80 rounded-xl p-2.5">
          <p className="text-[10px] text-gray-400 font-medium">Uptime</p>
          <p className="text-[15px] font-bold text-gray-900">{site.uptime > 0 ? `${site.uptime}%` : "—"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="badge-sapphire">{site.framework}</span>
        <span className="badge-gold">{site.hostingProvider}</span>
        {site.sslActive && <span className="badge-emerald">🔒 SSL</span>}
        <span className="badge-crimson">{site.subscriptionType}</span>
      </div>

      <div className="divider-gradient my-3" />

      <div className="flex items-center gap-2 text-[11px] text-gray-500">
        <Clock size={11} />
        <span>Last deploy: {site.lastDeploy}</span>
        <span className="mx-1">·</span>
        <DollarSign size={11} />
        <span>{site.renewalPrice > 0 ? `$${site.renewalPrice}/mo` : "Free"}</span>
        <span className="mx-1">·</span>
        <span>Exp: {site.subscriptionExpiry}</span>
      </div>
    </div>
  );
}

function SiteDetailModal({ site, onClose }: { site: WebsiteProject; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "deploy" | "strategy" | "renewal">("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "deploy", label: "Deploy" },
    { id: "strategy", label: "Strategy" },
    { id: "renewal", label: "Renewal" },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-holographic rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto panel-scroll animate-fadeIn">
        <div className="flex items-center justify-between p-5 border-b border-white/50 sticky top-0 bg-white/80 backdrop-blur-lg z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold">
              {site.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-display font-bold text-[17px] text-gray-900">{site.name}</h2>
              <p className="text-[12px] text-gray-500">{site.domain}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 font-bold text-lg leading-none">✕</button>
        </div>

        <div className="flex gap-1 px-5 pt-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${activeTab === t.id ? "dim-tab-active" : "text-gray-500 hover:bg-gray-50"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Visits/mo", value: site.monthlyVisits.toLocaleString(), icon: TrendingUp, color: "#00c88a" },
                  { label: "Uptime", value: `${site.uptime}%`, icon: Activity, color: "#0066ff" },
                  { label: "SSL", value: site.sslActive ? "Active" : "None", icon: ShieldCheck, color: "#9b59b6" },
                  { label: "Framework", value: site.framework, icon: Code2, color: "#ffb300" },
                ].map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="glass-crystal rounded-xl p-3 text-center">
                      <Icon size={16} color={stat.color} className="mx-auto mb-1" />
                      <p className="text-[14px] font-bold text-gray-900">{stat.value}</p>
                      <p className="text-[10px] text-gray-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="glass-emerald rounded-xl p-4">
                <p className="font-semibold text-[13px] text-gray-900 mb-2">Hosting Details</p>
                <div className="space-y-1.5 text-[12px] text-gray-600">
                  <div className="flex justify-between"><span>Provider</span><span className="font-semibold">{site.hostingProvider}</span></div>
                  <div className="flex justify-between"><span>Type</span><span className="font-semibold">{site.type.toUpperCase()}</span></div>
                  <div className="flex justify-between"><span>Last Deploy</span><span className="font-semibold">{site.lastDeploy}</span></div>
                  <div className="flex justify-between"><span>Status</span>
                    <span className={`font-bold ${site.status === "live" ? "text-emerald-600" : "text-yellow-600"}`}>{STATUS_LABELS[site.status]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "deploy" && (
            <div className="space-y-4">
              <div className="glass-sapphire rounded-xl p-4">
                <p className="font-semibold text-[14px] text-gray-900 mb-3 flex items-center gap-2"><Zap size={15} className="text-blue-600" /> Deploy Pipeline</p>
                <div className="space-y-2">
                  {["Push to GitHub → Auto Build → Deploy to " + site.hostingProvider, "Build Status: " + (site.status === "building" ? "⏳ In Progress" : "✅ Success"), "SSL Certificate: Auto-renewed via Cloudflare"].map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { toast.success("Triggering deploy..."); onClose(); }} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Zap size={14} /> Trigger Deploy
                </button>
                <button onClick={() => toast.info("Rollback initiated")} className="btn-secondary flex items-center gap-2">
                  <RefreshCw size={14} /> Rollback
                </button>
              </div>
            </div>
          )}

          {activeTab === "strategy" && (
            <div className="space-y-3">
              <p className="text-[13px] font-semibold text-gray-700">Digital Strategy Notes</p>
              <textarea
                defaultValue={`Platform: ${site.name}\nDomain: ${site.domain}\nType: ${site.type}\n\nStrategy:\n- SEO optimization for target keywords\n- Mobile-first responsive design\n- Performance target: <2s load time\n- Regular content updates\n- Analytics integration: Google Analytics 4`}
                rows={8}
                className="w-full input-glass text-[12px] resize-none"
              />
              <button onClick={() => toast.success("Strategy saved!")} className="btn-primary">Save Strategy</button>
            </div>
          )}

          {activeTab === "renewal" && (
            <div className="space-y-4">
              <div className={`rounded-xl p-4 ${site.renewalPrice > 0 ? "glass-crimson" : "glass-emerald"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign size={16} className="text-gray-700" />
                  <p className="font-semibold text-[14px] text-gray-900">Subscription Details</p>
                </div>
                <div className="space-y-2 text-[13px] text-gray-700">
                  <div className="flex justify-between"><span>Plan</span><span className="font-bold">{site.subscriptionType}</span></div>
                  <div className="flex justify-between"><span>Monthly Cost</span><span className="font-bold">{site.renewalPrice > 0 ? `$${site.renewalPrice}/month` : "Free"}</span></div>
                  <div className="flex justify-between"><span>Renewal Date</span><span className="font-bold">{site.subscriptionExpiry}</span></div>
                  <div className="flex justify-between"><span>Annual Cost</span><span className="font-bold">{site.renewalPrice > 0 ? `$${site.renewalPrice * 12}/year` : "Free"}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => toast.success("Renewal initiated")} className="btn-primary flex items-center gap-2">
                  <RefreshCw size={14} /> Renew Now
                </button>
                <button onClick={() => toast.info("Looking for special offers...")} className="btn-secondary">View Offers 🏷️</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WebsiteFlowRoom() {
  const [sites, setSites] = useState<WebsiteProject[]>(MOCK_WEBSITES);
  const [selected, setSelected] = useState<WebsiteProject | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const liveCount = sites.filter(s => s.status === "live").length;
  const totalVisits = sites.reduce((s, w) => s + w.monthlyVisits, 0);

  return (
    <div className="min-h-screen pt-14 bg-matrix-live">
      {selected && <SiteDetailModal site={selected} onClose={() => setSelected(null)} />}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-black text-[24px] text-gray-900 flex items-center gap-2">
              <Layout size={22} className="text-purple-500" /> Website Flow Room
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {liveCount} live sites · {totalVisits.toLocaleString()} total monthly visits · hosting management
            </p>
          </div>
          <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> Add Website
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Live Sites", value: liveCount, icon: CheckCircle, color: "#00c88a", bg: "glass-emerald" },
            { label: "Total Visits/mo", value: totalVisits.toLocaleString(), icon: TrendingUp, color: "#0066ff", bg: "glass-sapphire" },
            { label: "Avg Uptime", value: `${(sites.filter(s => s.uptime > 0).reduce((a, s) => a + s.uptime, 0) / sites.filter(s => s.uptime > 0).length).toFixed(2)}%`, icon: Activity, color: "#9b59b6", bg: "glass-aurora" },
            { label: "Monthly Spend", value: `$${sites.reduce((a, s) => a + s.renewalPrice, 0)}`, icon: DollarSign, color: "#e8003d", bg: "glass-crimson" },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-4`}>
                <Icon size={16} color={stat.color} className="mb-2" />
                <p className="text-[20px] font-black text-gray-900 font-display">{stat.value}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sites.map(site => (
            <SiteCard key={site.id} site={site} onSelect={() => setSelected(site)} />
          ))}
          {/* Add New Card */}
          <button
            onClick={() => setShowAdd(true)}
            className="glass-crystal rounded-2xl p-5 border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col items-center justify-center gap-3 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Plus size={20} className="text-gray-400" />
            </div>
            <p className="text-[13px] font-semibold text-gray-500">Add New Website</p>
          </button>
        </div>
      </div>
    </div>
  );
}
