import { useState } from "react";
import type { EmailMessage } from "@/types";
import { MOCK_EMAIL_MESSAGES } from "@/constants";

export function useEmail() {
  const [messages, setMessages] = useState<EmailMessage[]>(MOCK_EMAIL_MESSAGES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<EmailMessage["folder"]>("inbox");
  const [composing, setComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selected = messages.find(m => m.id === selectedId) || null;

  const filtered = messages.filter(m => {
    const matchFolder = m.folder === activeFolder;
    const matchSearch = searchQuery
      ? m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.fromName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.preview.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchFolder && matchSearch;
  });

  const markRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const toggleStar = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isStarred: !m.isStarred } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, folder: "trash" } : m));
    if (selectedId === id) setSelectedId(null);
  };

  const sendMessage = (msg: Partial<EmailMessage>) => {
    const newMsg: EmailMessage = {
      id: `m${Date.now()}`,
      from: "hello@uniorbi.com",
      fromName: "ESOneWorld",
      to: msg.to || "",
      subject: msg.subject || "(no subject)",
      preview: (msg.body || "").slice(0, 80),
      body: msg.body || "",
      timestamp: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      labels: [],
      folder: "sent",
    };
    setMessages(prev => [newMsg, ...prev]);
    setComposing(false);
  };

  const unreadCount = (folder: EmailMessage["folder"]) =>
    messages.filter(m => m.folder === folder && !m.isRead).length;

  return {
    messages: filtered,
    allMessages: messages,
    selected,
    selectedId,
    setSelectedId: (id: string) => { setSelectedId(id); markRead(id); },
    activeFolder,
    setActiveFolder,
    composing,
    setComposing,
    searchQuery,
    setSearchQuery,
    toggleStar,
    deleteMessage,
    sendMessage,
    unreadCount,
  };
}
