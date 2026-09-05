import React, { useState } from "react";
import { MOCK_INTEGRATIONS, DOMAIN_PROVIDERS, HOSTING_PROVIDERS, EMAIL_PROVIDERS } from "@/constants";
import type { Integration } from "@/types";
import { Zap, Plus, RefreshCw, CheckCircle, XCircle, Clock, Settings, Trash2, ChevronRight, Link2 } from "lucide-react";
import { toast } from "sonner";

const STATUS_CONFIG = {
  connected: { label: "Connected", color: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  disconnected: { label: "Disconnected", color: "bg-gray-100 text-gray-500 border-gray-200", dot: "bg-gray-400" },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  error: { label: "Error", color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
};

const TYPE_LABELS: Record<Integration["type"], string> = {
  dns: "DNS & Domains",
  email: "Email Services",
  hosting: "Web Hosting",
  analytics: "Analytics",
  security: "Security",
  cdn: "CDN",
  database: "Database",
  vcs: "Version Control",
};

const ONE_CLICK_SETUPS = [
  {
    id: "cf-resend-nc-gmail",
    label: "Cloudflare + Resend + Namecheap + Gmail",
    desc: "Complete email routing setup in one click",
    icon: "☁️",
    color: "#f38020",
    providers: ["Cloudflare", "Resend", "Namecheap", "Gmail"],
  },
  {
    id: "nc-zoho-netlify-supabase-gh",
    label: "Namecheap + Zoho + Netlify + Supabase + GitHub",
    desc: "Full-stack deployment stack in one click",
    icon: "⚡",
    color: "#00c88a",
    providers: ["Namecheap", "Zoho", "Netlify", "Supabase", "GitHub"],
  },
];

function IntegrationCard({ intg, onConnect, onDisconnect }: {
  intg: Integration;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}) {
  const [showConfig, setShowConfig] = useState(false);
  const sc = STATUS_CONFIG[intg.status];

  return (
    <div className="glass-crystal rounded-2xl p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: intg.color + "18" }}
          >
            {intg.icon}
          </div>
          <div>
            <h3 className="font-display font-bold text-[15px] text-gray-900">{intg.name}</h3>
            <p className="text-[11px] text-gray-500">{TYPE_LABELS[intg.type]}</p>
          </div>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${sc.color}`}>
          {sc.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {intg.features.map(f => (
          <span key={f} className="text-[10px] bg-gray-50 text-gray-600 border border-gray-200 rounded px-2 py-0.5 font-medium">{f}</span>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          Last sync: {intg.lastSync}
        </span>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
        >
          <Settings size={11} /> Configure
        </button>
      </div>

      {showConfig && (
        <div className="glass-sapphire rounded-xl p-3 mb-3 animate-fadeIn space-y-2">
          <p className="text-[11px] font-semibold text-gray-600 mb-2">Configuration</p>
          {intg.status !== "connected" ? (
            <>
              <input placeholder={`${intg.name} API Key`} className="w-full input-glass text-[12px]" />
              <input placeholder="API Secret (if required)" className="w-full input-glass text-[12px]" />
            </>
          ) : (
            <p className="text-[11px] text-emerald-700 font-medium">✓ Integration active. Keys stored securely.</p>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {intg.status === "connected" ? (
          <>
            <button
              onClick={() => { toast.info(`Syncing ${intg.name}...`); }}
              className="flex-1 btn-secondary text-[12px] flex items-center justify-center gap-1.5 py-2"
            >
              <RefreshCw size={12} /> Sync
            </button>
            <button
              onClick={() => onDisconnect(intg.id)}
              className="p-2 rounded-xl hover:bg-red-50 transition-colors border border-gray-200"
              title="Disconnect"
            >
              <Trash2 size={13} className="text-red-400" />
            </button>
          </>
        ) : (
          <button
            onClick={() => onConnect(intg.id)}
            className="w-full btn-primary text-[12px] flex items-center justify-center gap-1.5 py-2"
          >
            <Link2 size={12} /> Connect
          </button>
        )}
      </div>
    </div>
  );
}

export default function IntegrationsHub() {
  const [integrations, setIntegrations] = useState<Integration[]>(MOCK_INTEGRATIONS);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const connect = (id: string) => {
    setIntegrations(prev =>
      prev.map(i => i.id === id ? { ...i, status: "connected", lastSync: "Just now" } : i)
    );
    toast.success("Integration connected successfully!");
  };

  const disconnect = (id: string) => {
    setIntegrations(prev =>
      prev.map(i => i.id === id ? { ...i, status: "disconnected", lastSync: "Never" } : i)
    );
    toast.info("Integration disconnected.");
  };

  const filtered = integrations.filter(i => {
    const matchType = typeFilter === "all" || i.type === typeFilter;
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    return matchType && matchStatus;
  });

  const connectedCount = integrations.filter(i => i.status === "connected").length;
  const types = ["all", ...Array.from(new Set(integrations.map(i => i.type)))];

  return (
    <div className="min-h-screen pt-14 bg-matrix-live">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-black text-[24px] text-gray-900 flex items-center gap-2">
              <Zap size={22} className="text-yellow-500" /> Integration Hub
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {connectedCount}/{integrations.length} services connected · One-click setup circuits
            </p>
          </div>
          <button onClick={() => toast.info("Add custom integration...")} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> Add Service
          </button>
        </div>

        {/* One-Click Setups */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-[16px] text-gray-900 mb-3 flex items-center gap-2">
            ⚡ One-Click Integration Circuits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ONE_CLICK_SETUPS.map(setup => (
              <div key={setup.id} className="glass-holographic rounded-2xl p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: setup.color + "20" }}>
                    {setup.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[14px] text-gray-900">{setup.label}</h3>
                    <p className="text-[12px] text-gray-500 mt-0.5">{setup.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {setup.providers.map((p, i) => (
                    <React.Fragment key={p}>
                      <span className="text-[12px] font-semibold text-gray-700 bg-white/70 rounded-lg px-2.5 py-1 border border-white/50">{p}</span>
                      {i < setup.providers.length - 1 && <ChevronRight size={12} className="text-gray-400" />}
                    </React.Fragment>
                  ))}
                </div>
                <button
                  onClick={() => toast.success(`Setting up ${setup.label}...`)}
                  className="w-full btn-primary text-[13px] flex items-center justify-center gap-2"
                >
                  <Zap size={14} /> Setup in One Click
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Setup */}
        <div className="glass-crystal rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-[16px] text-gray-900 mb-4 flex items-center gap-2">
            ⚙️ Manual Setup — Select Your Providers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Domain Providers", items: DOMAIN_PROVIDERS, color: "#0066ff" },
              { title: "Web Hosting", items: HOSTING_PROVIDERS, color: "#00c88a" },
              { title: "Email Services", items: EMAIL_PROVIDERS, color: "#e8003d" },
              {
                title: "DNS & Security",
                items: [
                  { id: "cf-dns", name: "Cloudflare DNS", icon: "☁️", color: "#f38020" },
                  { id: "cf-ssl", name: "Cloudflare SSL/TLS", icon: "🔒", color: "#f38020" },
                  { id: "cf-cdn", name: "Cloudflare CDN", icon: "🌐", color: "#f38020" },
                ],
                color: "#ffb300"
              },
            ].map(group => (
              <div key={group.title}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">{group.title}</p>
                <div className="space-y-1.5">
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toast.info(`Configure ${item.name}...`)}
                      className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-all text-left"
                    >
                      <span className="text-base w-6 text-center">{item.icon}</span>
                      <span className="text-[12px] font-medium text-gray-700 flex-1">{item.name}</span>
                      <ChevronRight size={11} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            {["all", "connected", "pending", "disconnected"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all ${statusFilter === s ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-500"}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-gray-200 mx-1" />
          <div className="flex items-center gap-1 flex-wrap">
            {types.slice(0, 6).map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all ${typeFilter === t ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "hover:bg-gray-50 text-gray-500"}`}
              >
                {t === "all" ? "All Types" : TYPE_LABELS[t as Integration["type"]] || t}
              </button>
            ))}
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(intg => (
            <IntegrationCard
              key={intg.id}
              intg={intg}
              onConnect={connect}
              onDisconnect={disconnect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
