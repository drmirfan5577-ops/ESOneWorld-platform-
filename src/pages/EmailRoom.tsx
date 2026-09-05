import React, { useState } from "react";
import { useEmail } from "@/hooks/useEmail";
import { MOCK_EMAILS } from "@/constants";
import {
  Mail, Send, Star, Trash2, Archive, Search, Inbox,
  ChevronRight, Paperclip, Reply, Forward, Edit3,
  X, Plus, RefreshCw, Tag, AlertCircle
} from "lucide-react";

const FOLDERS = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: Edit3 },
  { id: "starred", label: "Starred", icon: Star },
  { id: "spam", label: "Spam", icon: AlertCircle },
  { id: "trash", label: "Trash", icon: Trash2 },
] as const;

function ComposeModal({ onClose, onSend }: { onClose: () => void; onSend: (msg: any) => void }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [from, setFrom] = useState("hello@uniorbi.com");

  const fromOptions = [
    "hello@uniorbi.com", "press@uniorbi.com", "care@uniorbi.com",
    "admin@uniorbi.com", "dr.mirfan5577@gmail.com", "doc.zaeem86@gmail.com",
  ];

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="glass-holographic rounded-2xl w-full max-w-2xl shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/50">
          <h3 className="font-display font-bold text-[15px] text-gray-900 flex items-center gap-2">
            <Edit3 size={16} className="text-emerald-600" /> New Message
          </h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <X size={14} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-gray-500 font-medium w-12">From</span>
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="flex-1 input-glass text-[13px]"
            >
              {fromOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-gray-500 font-medium w-12">To</span>
            <input
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="flex-1 input-glass text-[13px]"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-gray-500 font-medium w-12">Subject</span>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Email subject..."
              className="flex-1 input-glass text-[13px]"
            />
          </div>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your message here..."
            rows={8}
            className="w-full input-glass text-[13px] resize-none"
          />
        </div>
        <div className="flex items-center gap-3 px-5 pb-5">
          <button
            onClick={() => onSend({ to, subject, body, from })}
            className="btn-primary flex items-center gap-2"
          >
            <Send size={14} /> Send Message
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button className="ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Attach File">
            <Paperclip size={15} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EmailRoom() {
  const email = useEmail();
  const [showCompose, setShowCompose] = useState(false);
  const [activeAccount, setActiveAccount] = useState("all");

  const totalUnread = MOCK_EMAILS.reduce((s, a) => s + a.unread, 0);

  return (
    <div className="min-h-screen pt-14 bg-matrix-live">
      {showCompose && (
        <ComposeModal
          onClose={() => setShowCompose(false)}
          onSend={(msg) => { email.sendMessage(msg); setShowCompose(false); }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-black text-[24px] text-gray-900 flex items-center gap-2">
              <Mail size={22} className="text-red-500" />
              Email Room
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {totalUnread} unread · Multi-account inbox with wildcard routing
            </p>
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={15} /> Compose
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left: Accounts + Folders */}
          <div className="space-y-4">
            {/* Email Accounts */}
            <div className="glass-crystal rounded-2xl p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Email Accounts</p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveAccount("all")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-[12px] font-medium transition-all ${activeAccount === "all" ? "bg-red-50 text-red-800 border border-red-200" : "hover:bg-gray-50 text-gray-700"}`}
                >
                  <Mail size={13} className="flex-shrink-0" />
                  <span className="truncate flex-1">All Accounts</span>
                  <span className="text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold">{totalUnread}</span>
                </button>
                {MOCK_EMAILS.map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => setActiveAccount(acc.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${activeAccount === acc.id ? "bg-red-50 text-red-800 border border-red-200" : "hover:bg-gray-50 text-gray-700"}`}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${acc.category === "wildcard" ? "bg-purple-500" : acc.domain === "gmail.com" ? "bg-yellow-500" : "bg-emerald-500"}`} />
                    <span className="text-[11px] font-medium truncate flex-1">{acc.address}</span>
                    {acc.unread > 0 && (
                      <span className="text-[9px] bg-red-100 text-red-600 border border-red-200 rounded-full px-1.5 font-bold">{acc.unread}</span>
                    )}
                    {acc.isWildcard && <span className="text-[9px] text-purple-500 font-bold">*</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Folders */}
            <div className="glass-crystal rounded-2xl p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Folders</p>
              <div className="space-y-0.5">
                {FOLDERS.map(folder => {
                  const Icon = folder.icon;
                  const active = email.activeFolder === folder.id;
                  const count = email.unreadCount(folder.id as any);
                  return (
                    <button
                      key={folder.id}
                      onClick={() => email.setActiveFolder(folder.id as any)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${active ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "hover:bg-gray-50 text-gray-700"}`}
                    >
                      <Icon size={14} />
                      <span className="text-[13px] font-medium flex-1">{folder.label}</span>
                      {count > 0 && <span className="text-[10px] bg-emerald-500 text-white rounded-full px-1.5 py-0.5 font-bold">{count}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wildcard info */}
            <div className="glass-crimson rounded-2xl p-4">
              <p className="text-[11px] font-bold text-red-800 mb-2 flex items-center gap-1">
                <span className="text-base">⚡</span> Wildcard Routing
              </p>
              <p className="text-[11px] text-red-700 leading-snug">
                <strong>*@uniorbi.com</strong> → doc.zaeem86@gmail.com
              </p>
              <p className="text-[11px] text-red-700 leading-snug mt-1">
                Any email to <em>xyz@uniorbi.com</em> safely reaches admin inbox.
              </p>
            </div>
          </div>

          {/* Center: Message List */}
          <div className="glass-crystal rounded-2xl overflow-hidden">
            <div className="p-3 border-b border-white/50">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                <Search size={13} className="text-gray-400" />
                <input
                  value={email.searchQuery}
                  onChange={e => email.setSearchQuery(e.target.value)}
                  placeholder="Search emails..."
                  className="flex-1 bg-transparent text-[12px] outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="overflow-y-auto panel-scroll" style={{ maxHeight: "calc(100vh - 250px)" }}>
              {email.messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                  <Mail size={32} className="text-gray-300 mb-3" />
                  <p className="text-[13px] font-medium text-gray-500">No messages</p>
                </div>
              ) : (
                email.messages.map(msg => (
                  <button
                    key={msg.id}
                    onClick={() => email.setSelectedId(msg.id)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 transition-all hover:bg-emerald-50/30 ${email.selectedId === msg.id ? "bg-emerald-50/50 border-l-2 border-l-emerald-500" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className={`text-[12px] font-semibold truncate ${!msg.isRead ? "text-gray-900" : "text-gray-600"}`}>
                        {msg.fromName}
                      </span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {!msg.isRead && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                      <p className={`text-[12px] truncate ${!msg.isRead ? "font-semibold text-gray-800" : "text-gray-600"}`}>
                        {msg.subject}
                      </p>
                    </div>
                    <p className="text-[11px] text-gray-400 truncate">{msg.preview}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      {msg.hasAttachment && <Paperclip size={10} className="text-gray-400" />}
                      {msg.isStarred && <Star size={10} className="text-yellow-500" fill="currentColor" />}
                      {msg.labels.slice(0, 2).map(l => (
                        <span key={l} className="text-[9px] bg-blue-50 text-blue-700 border border-blue-200 rounded px-1">{l}</span>
                      ))}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right: Message Detail */}
          <div className="lg:col-span-2">
            {email.selected ? (
              <div className="glass-crystal rounded-2xl h-full flex flex-col">
                <div className="p-5 border-b border-white/50">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="font-display font-bold text-[16px] text-gray-900 leading-snug flex-1">
                      {email.selected.subject}
                    </h2>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => email.toggleStar(email.selected!.id)}
                        className="w-8 h-8 rounded-lg hover:bg-yellow-50 flex items-center justify-center"
                        title="Star"
                      >
                        <Star size={14} fill={email.selected.isStarred ? "#f59e0b" : "none"} color={email.selected.isStarred ? "#f59e0b" : "#9ca3af"} />
                      </button>
                      <button
                        onClick={() => email.deleteMessage(email.selected!.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center"
                        title="Delete"
                      >
                        <Trash2 size={14} className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-[13px] font-bold">
                      {email.selected.fromName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">{email.selected.fromName}</p>
                      <p className="text-[11px] text-gray-500">{email.selected.from} → {email.selected.to}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-[11px] text-gray-400">
                        {new Date(email.selected.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {new Date(email.selected.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                  {email.selected.labels.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Tag size={11} className="text-gray-400" />
                      {email.selected.labels.map(l => (
                        <span key={l} className="badge-sapphire">{l}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 p-5 overflow-y-auto panel-scroll">
                  <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">{email.selected.body}</p>
                </div>
                <div className="p-4 border-t border-white/50 flex gap-2">
                  <button
                    onClick={() => setShowCompose(true)}
                    className="btn-primary flex items-center gap-2 text-[13px]"
                  >
                    <Reply size={13} /> Reply
                  </button>
                  <button
                    onClick={() => setShowCompose(true)}
                    className="btn-secondary flex items-center gap-2 text-[13px]"
                  >
                    <Forward size={13} /> Forward
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-crystal rounded-2xl h-full flex flex-col items-center justify-center py-20 text-center px-6">
                <div className="w-16 h-16 rounded-2xl glass-emerald flex items-center justify-center mb-4">
                  <Mail size={28} className="text-emerald-600" />
                </div>
                <h3 className="font-display font-bold text-[17px] text-gray-900 mb-2">Email Room</h3>
                <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed">
                  Select a message to read, or compose a new one. Full wildcard routing active on *@uniorbi.com
                </p>
                <button
                  onClick={() => setShowCompose(true)}
                  className="btn-primary mt-4 flex items-center gap-2"
                >
                  <Plus size={14} /> Compose New Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
