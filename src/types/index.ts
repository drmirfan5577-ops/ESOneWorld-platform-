export type ThemeName =
  | "crystal"
  | "emerald-glass"
  | "crimson-glass"
  | "sapphire-glass"
  | "aurora"
  | "galaxy"
  | "fiery"
  | "ultra-deep";

export type LanguageCode =
  | "en" | "ur" | "ar" | "tr" | "ps" | "sd" | "bal"
  | "zh" | "hi" | "bn" | "ru";

export type ViewMode = "horizontal" | "vertical" | "both";

export interface Domain {
  id: string;
  name: string;
  provider: string;
  registrar: string;
  status: "active" | "pending" | "expired" | "redirecting";
  sslStatus: "active" | "pending" | "none";
  expiry: string;
  isPrimary: boolean;
  isSecondary: boolean;
  subdomains: Subdomain[];
  dnsRecords: DnsRecord[];
  redirectTo?: string;
  dimension: number;
}

export interface Subdomain {
  id: string;
  prefix: string;
  fullDomain: string;
  platform: string;
  aRecord: string;
  status: "active" | "pending" | "inactive";
  category: string;
}

export interface DnsRecord {
  id: string;
  type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS";
  name: string;
  value: string;
  ttl: number;
  proxied: boolean;
}

export interface EmailAccount {
  id: string;
  address: string;
  displayName: string;
  forwarding?: string;
  isWildcard: boolean;
  domain: string;
  category: "contact" | "press" | "support" | "admin" | "wildcard" | "personal";
  unread: number;
  lastActivity: string;
}

export interface EmailMessage {
  id: string;
  from: string;
  fromName: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  labels: string[];
  folder: "inbox" | "sent" | "drafts" | "starred" | "trash" | "spam";
}

export interface Integration {
  id: string;
  name: string;
  type: "dns" | "email" | "hosting" | "analytics" | "security" | "cdn" | "database" | "vcs";
  provider: string;
  status: "connected" | "disconnected" | "pending" | "error";
  lastSync: string;
  icon: string;
  color: string;
  features: string[];
  apiKey?: string;
  credentials?: Record<string, string>;
}

export interface WebsiteProject {
  id: string;
  name: string;
  domain: string;
  type: "static" | "react" | "html" | "nodejs";
  hostingProvider: string;
  status: "live" | "building" | "offline" | "paused";
  lastDeploy: string;
  framework: string;
  sslActive: boolean;
  monthlyVisits: number;
  uptime: number;
  subscriptionType: string;
  subscriptionExpiry: string;
  renewalPrice: number;
}

export interface AdminSettings {
  password: string;
  theme: ThemeName;
  language: LanguageCode;
  viewMode: ViewMode;
  filterActive: string;
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  autoSave: boolean;
  autoSync: boolean;
  isDarkMode: boolean;
  fontFamily: string;
  fontSize: string;
  accentColor: string;
}

export interface PlatformStats {
  totalDomains: number;
  activeSites: number;
  emailsToday: number;
  integrations: number;
  uptime: string;
  secureScore: number;
  globalRegions: number;
  languages: number;
}
