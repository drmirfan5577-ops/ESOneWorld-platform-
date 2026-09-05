import React, { useState } from "react";
import { MOCK_DOMAINS, DOMAIN_PROVIDERS } from "@/constants";
import type { Domain, Subdomain, DnsRecord } from "@/types";
import {
  Globe, Plus, RefreshCw, ShieldCheck, ChevronDown, ChevronRight,
  Edit2, Trash2, Copy, ExternalLink, Search, Filter, ToggleLeft,
  Server, Link2, AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

function DnsRecordRow({ record }: { record: DnsRecord }) {
  return (
    <tr className="table-glass">
      <td className="px-3 py-2.5">
        <span className={`badge-${record.type === "A" ? "emerald" : record.type === "MX" ? "crimson" : record.type === "TXT" ? "gold" : "sapphire"}`}>
          {record.type}
        </span>
      </td>
      <td className="px-3 py-2.5 text-[12px] font-mono text-gray-700">{record.name}</td>
      <td className="px-3 py-2.5 text-[11px] font-mono text-gray-600 max-w-[180px] truncate">{record.value}</td>
      <td className="px-3 py-2.5 text-[11px] text-gray-500">{record.ttl}s</td>
      <td className="px-3 py-2.5">
        {record.proxied ? (
          <span className="text-[10px] bg-orange-50 text-orange-700 border border-orange-200 rounded px-1.5">☁ Proxied</span>
        ) : (
          <span className="text-[10px] bg-gray-50 text-gray-500 border border-gray-200 rounded px-1.5">DNS Only</span>
        )}
      </td>
      <td className="px-3 py-2.5">
        <button
          onClick={() => { navigator.clipboard.writeText(record.value); toast.success("Copied!"); }}
          className="p-1 rounded hover:bg-gray-100"
          title="Copy value"
        >
          <Copy size={11} className="text-gray-400" />
        </button>
      </td>
    </tr>
  );
}

function SubdomainCard({ sub }: { sub: Subdomain }) {
  const catColors: Record<string, string> = {
    Platform: "badge-sapphire", Technical: "badge-gold", Internal: "badge-crimson", Regional: "badge-emerald", Core: "badge-emerald"
  };
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${sub.status === "active" ? "bg-emerald-500" : sub.status === "pending" ? "bg-yellow-500" : "bg-gray-300"}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-semibold text-gray-900 truncate">{sub.fullDomain}</p>
          <span className={catColors[sub.category] || "badge-sapphire"}>{sub.category}</span>
        </div>
        <p className="text-[11px] text-gray-500">{sub.platform} · A→{sub.aRecord}</p>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 rounded-lg hover:bg-blue-50" title="Open"><ExternalLink size={12} className="text-blue-500" /></button>
        <button className="p-1.5 rounded-lg hover:bg-gray-100" title="Edit"><Edit2 size={12} className="text-gray-400" /></button>
      </div>
    </div>
  );
}

function DomainCard({ domain, isExpanded, onToggle }: { domain: Domain; isExpanded: boolean; onToggle: () => void }) {
  const [tab, setTab] = useState<"subdomains" | "dns">("subdomains");

  return (
    <div className={`${domain.isPrimary ? "glass-emerald" : domain.isSecondary ? "glass-sapphire" : "glass-crystal"} rounded-2xl overflow-hidden card-hover`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/20 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
          {domain.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-bold text-[16px] text-gray-900">{domain.name}</h3>
            {domain.isPrimary && <span className="badge-emerald">⭐ Primary</span>}
            {domain.isSecondary && <span className="badge-sapphire">Secondary</span>}
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${domain.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
              ● {domain.status}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-[11px] text-gray-500">{domain.provider}</span>
            <span className="text-[11px] text-gray-500">SSL: {domain.sslStatus === "active" ? "✓ Active" : "✗ None"}</span>
            <span className="text-[11px] text-gray-500">Exp: {domain.expiry}</span>
            <span className="text-[11px] text-gray-500">{domain.subdomains.length} subdomains</span>
            <span className="text-[11px] text-gray-500">{domain.dnsRecords.length} DNS records</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={e => { e.stopPropagation(); toast.success(`Opening ${domain.name}`); }}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            title="Open Domain"
          >
            <ExternalLink size={14} className="text-gray-500" />
          </button>
          {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 animate-fadeIn">
          <div className="divider-gradient mb-4" />
          <div className="flex items-center gap-2 mb-4">
            {(["subdomains", "dns"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${tab === t ? "dim-tab-active" : "hover:bg-white/50 text-gray-500"}`}
              >
                {t === "subdomains" ? `Subdomains (${domain.subdomains.length})` : `DNS Records (${domain.dnsRecords.length})`}
              </button>
            ))}
            <button
              onClick={() => toast.success("Add Subdomain panel opening...")}
              className="ml-auto btn-primary text-[12px] flex items-center gap-1 px-3 py-1.5"
            >
              <Plus size={12} /> Add
            </button>
          </div>

          {tab === "subdomains" && (
            <div className="space-y-0.5">
              {domain.subdomains.map(sub => (
                <SubdomainCard key={sub.id} sub={sub} />
              ))}
            </div>
          )}

          {tab === "dns" && (
            <div className="overflow-x-auto rounded-xl border border-white/50">
              <table className="w-full table-glass">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Type</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Name</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Value</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">TTL</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Proxy</th>
                    <th className="px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {domain.dnsRecords.map(r => (
                    <DnsRecordRow key={r.id} record={r} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DomainsMatrix() {
  const [domains, setDomains] = useState<Domain[]>(MOCK_DOMAINS);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["d1"]));
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDomain, setNewDomain] = useState({ name: "", provider: "namecheap" });

  const toggle = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = domains.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  const addDomain = () => {
    if (!newDomain.name.trim()) return;
    const d: Domain = {
      id: `d${Date.now()}`,
      name: newDomain.name.trim(),
      provider: newDomain.provider,
      registrar: newDomain.provider,
      status: "pending",
      sslStatus: "pending",
      expiry: "2027-01-01",
      isPrimary: false,
      isSecondary: false,
      dimension: 1,
      subdomains: [],
      dnsRecords: [],
    };
    setDomains(prev => [...prev, d]);
    setShowAddModal(false);
    setNewDomain({ name: "", provider: "namecheap" });
    toast.success(`Domain ${d.name} added successfully!`);
  };

  return (
    <div className="min-h-screen pt-14 bg-matrix-live">
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-holographic rounded-2xl w-full max-w-md p-6 animate-fadeIn">
            <h3 className="font-display font-bold text-[17px] text-gray-900 mb-5 flex items-center gap-2">
              <Globe size={18} className="text-blue-500" /> Add Domain
            </h3>
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Domain Name</label>
                <input
                  value={newDomain.name}
                  onChange={e => setNewDomain(p => ({ ...p, name: e.target.value }))}
                  placeholder="yourdomain.com"
                  className="w-full input-glass"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-gray-500 mb-1.5 block">Domain Provider</label>
                <select
                  value={newDomain.provider}
                  onChange={e => setNewDomain(p => ({ ...p, provider: e.target.value }))}
                  className="w-full input-glass"
                >
                  {DOMAIN_PROVIDERS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={addDomain} className="btn-primary flex-1">Add Domain</button>
              <button onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-black text-[24px] text-gray-900 flex items-center gap-2">
              <Globe size={22} className="text-blue-500" /> Domain Matrix
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {domains.length} domains · Primary: drirfan.online · Secondary: uniorbi.com
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass-crystal rounded-xl px-3 py-2">
              <Search size={13} className="text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search domains..."
                className="bg-transparent text-[12px] outline-none w-32 text-gray-700 placeholder-gray-400"
              />
            </div>
            <button onClick={() => toast.info("Syncing DNS...")} className="p-2 rounded-xl glass-crystal hover:shadow-md transition-all" title="Refresh">
              <RefreshCw size={15} className="text-gray-500" />
            </button>
            <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
              <Plus size={15} /> Add Domain
            </button>
          </div>
        </div>

        {/* Cloudflare Routing Banner */}
        <div className="glass-emerald rounded-2xl p-4 mb-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">☁️</div>
          <div className="flex-1">
            <p className="font-semibold text-[14px] text-gray-900">Cloudflare Email Routing — Active</p>
            <p className="text-[12px] text-gray-600 mt-0.5">
              @drirfan.online → dr.mirfan5577@gmail.com &nbsp;|&nbsp;
              *@uniorbi.com → doc.zaeem86@gmail.com (Wildcard Catch-All)
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="status-dot" />
            <span className="text-[11px] font-semibold text-emerald-700">Active</span>
          </div>
        </div>

        {/* Add up to 20 domains info */}
        <div className="glass-sapphire rounded-2xl p-4 mb-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <ToggleLeft size={16} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-gray-900">Multi-Domain Toggling &amp; Redirecting</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Redirect, toggle, or circulate traffic between up to 20 domains. Click any domain to manage its routing.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-blue-700">{domains.length}/20</span>
            <div className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(domains.length / 20) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Domain Cards */}
        <div className="space-y-4">
          {filtered.map(domain => (
            <DomainCard
              key={domain.id}
              domain={domain}
              isExpanded={expandedIds.has(domain.id)}
              onToggle={() => toggle(domain.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="glass-crystal rounded-2xl py-16 text-center">
              <Globe size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-[14px] font-medium text-gray-500">No domains found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
