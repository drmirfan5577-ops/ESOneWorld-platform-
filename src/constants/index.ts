import type { Domain, EmailAccount, EmailMessage, Integration, WebsiteProject, PlatformStats, AdminSettings } from "@/types";

export const DEFAULT_ADMIN_PASSWORD = "1122";

export const PLATFORMS = [
  { id: "uninews", name: "UniNews", subdomain: "uninews.uniorbi.com", description: "تحقیقی صحافت", color: "#e8003d", icon: "📰" },
  { id: "uniedge", name: "UniEdge", subdomain: "uniedge.uniorbi.com", description: "ڈیجیٹل کریئیٹیویٹی", color: "#0066ff", icon: "⚡" },
  { id: "unifeel", name: "Unifeel", subdomain: "unifeel.uniorbi.com", description: "سوشل نیٹ ورکنگ", color: "#00c88a", icon: "💫" },
  { id: "unispark", name: "UniSpark", subdomain: "unispark.uniorbi.com", description: "کونسلنگ & ویلنیس", color: "#9b59b6", icon: "✨" },
  { id: "app", name: "UniOrbi App", subdomain: "app.uniorbi.com", description: "مین ڈیش بورڈ", color: "#ffb300", icon: "🌐" },
  { id: "api", name: "API Gateway", subdomain: "api.uniorbi.com", description: "تمام ایپس کے لیے", color: "#00bcd4", icon: "⚙️" },
  { id: "cdn", name: "CDN Assets", subdomain: "cdn.uniorbi.com", description: "فائلز ڈیلیوری", color: "#795548", icon: "🗄️" },
  { id: "admin", name: "Admin Panel", subdomain: "admin.uniorbi.com", description: "ایڈمن مینیجمنٹ", color: "#f44336", icon: "🔐" },
  { id: "status", name: "Status Monitor", subdomain: "status.uniorbi.com", description: "سسٹم ہیلتھ", color: "#4caf50", icon: "📊" },
  { id: "ur", name: "Urdu Version", subdomain: "ur.uniorbi.com", description: "اردو ورژن", color: "#009688", icon: "🇵🇰" },
  { id: "en", name: "English Version", subdomain: "en.uniorbi.com", description: "English Version", color: "#3f51b5", icon: "🇬🇧" },
  { id: "pk", name: "Pakistan Regional", subdomain: "pk.uniorbi.com", description: "پاکستان ریجنل", color: "#4caf50", icon: "🏳️" },
];

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", dir: "ltr", nativeName: "English" },
  { code: "ur", name: "Urdu", dir: "rtl", nativeName: "اردو" },
  { code: "ar", name: "Arabic", dir: "rtl", nativeName: "العربية" },
  { code: "tr", name: "Turkish", dir: "ltr", nativeName: "Türkçe" },
  { code: "ps", name: "Pashto", dir: "rtl", nativeName: "پښتو" },
  { code: "sd", name: "Sindhi", dir: "rtl", nativeName: "سنڌي" },
  { code: "bal", name: "Balochi", dir: "rtl", nativeName: "بلۏچی" },
  { code: "zh", name: "Chinese", dir: "ltr", nativeName: "中文" },
  { code: "hi", name: "Hindi", dir: "ltr", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", dir: "ltr", nativeName: "বাংলা" },
  { code: "ru", name: "Russian", dir: "ltr", nativeName: "Русский" },
];

export const THEME_LAUNCHERS = [
  { id: "crystal", label: "Crystal White", class: "theme-crystal", preview: "linear-gradient(135deg, #ffffff, #f0f9ff)", desc: "Pure crystalline clarity" },
  { id: "emerald-glass", label: "Emerald Glass", class: "theme-emerald-glass", preview: "linear-gradient(135deg, #ffffff, #e8fff5, #f0fff8)", desc: "Fresh emerald vibrancy" },
  { id: "crimson-glass", label: "Crimson Glass", class: "theme-crimson-glass", preview: "linear-gradient(135deg, #ffffff, #fff0f3, #fff5f5)", desc: "Bold crimson energy" },
  { id: "sapphire-glass", label: "Sapphire Glass", class: "theme-sapphire-glass", preview: "linear-gradient(135deg, #ffffff, #f0f4ff, #f5f8ff)", desc: "Deep sapphire depth" },
  { id: "aurora", label: "Aurora Holographic", class: "theme-aurora", preview: "linear-gradient(135deg, #f8f0ff, #f0fff8, #fff8f0, #f0f8ff)", desc: "Northern lights magic" },
  { id: "galaxy", label: "Galaxy Spark", class: "theme-galaxy", preview: "linear-gradient(135deg, #fafbff, #f0f4ff, #fafaff)", desc: "Cosmic galaxy field" },
  { id: "fiery", label: "Fiery Glass", class: "theme-fiery", preview: "linear-gradient(135deg, #ffffff, #fffaf8, #fff5f0)", desc: "Fiery warm energy" },
  { id: "ultra-deep", label: "Ultra Deep", class: "theme-ultra-deep", preview: "linear-gradient(135deg, #f8faff, #ffffff, #f8faff)", desc: "Ultra dimensional depth" },
];

export const VISUAL_FILTERS = [
  { id: "glassy", label: "Glassy View", icon: "🔮" },
  { id: "fiery", label: "Fiery & Flowery", icon: "🔥" },
  { id: "semi-transparent", label: "Semi Transparent", icon: "🫧" },
  { id: "fluffy", label: "Fluffy View", icon: "☁️" },
  { id: "carved", label: "Carved 3D", icon: "💎" },
  { id: "minimalistic", label: "Modern Minimal", icon: "⬜" },
  { id: "futuristic", label: "Futuristic HUD", icon: "🌐" },
  { id: "abstract-art", label: "Abstract Art", icon: "🎨" },
  { id: "crystal-opaque", label: "Crystal Clear", icon: "✨" },
  { id: "holographic", label: "Holographic", icon: "🌈" },
  { id: "ultra-deep", label: "Ultra Deep Look", icon: "🌌" },
  { id: "galaxy-spark", label: "Galaxy Spark", icon: "⭐" },
];

export const DOMAIN_PROVIDERS = [
  { id: "namecheap", name: "Namecheap", icon: "🏷️", color: "#d04e00" },
  { id: "godaddy", name: "GoDaddy", icon: "🤠", color: "#1bdbdb" },
  { id: "hostinger", name: "Hostinger", icon: "🚀", color: "#673de6" },
  { id: "vercel", name: "Vercel", icon: "▲", color: "#000000" },
  { id: "spaceship", name: "Spaceship", icon: "🚀", color: "#0066cc" },
  { id: "cloudflare", name: "Cloudflare", icon: "☁️", color: "#f38020" },
];

export const HOSTING_PROVIDERS = [
  { id: "netlify", name: "Netlify", icon: "🌐", color: "#00c7b7" },
  { id: "vercel", name: "Vercel", icon: "▲", color: "#000000" },
  { id: "cloudflare-pages", name: "Cloudflare Pages", icon: "☁️", color: "#f38020" },
  { id: "github-pages", name: "GitHub Pages", icon: "🐱", color: "#333333" },
  { id: "supabase", name: "Supabase", icon: "⚡", color: "#3ecf8e" },
];

export const EMAIL_PROVIDERS = [
  { id: "cloudflare-routing", name: "Cloudflare Email Routing", icon: "☁️", color: "#f38020" },
  { id: "zoho", name: "Zoho Mail", icon: "📧", color: "#e42527" },
  { id: "resend", name: "Resend", icon: "📨", color: "#000000" },
  { id: "gmail", name: "Gmail / Google Workspace", icon: "✉️", color: "#ea4335" },
  { id: "sendgrid", name: "SendGrid", icon: "📩", color: "#1a82e2" },
];

export const INITIAL_SETTINGS: AdminSettings = {
  password: DEFAULT_ADMIN_PASSWORD,
  theme: "aurora",
  language: "en",
  viewMode: "both",
  filterActive: "glassy",
  leftSidebarOpen: false,
  rightSidebarOpen: false,
  autoSave: true,
  autoSync: true,
  isDarkMode: false,
  fontFamily: "Inter",
  fontSize: "base",
  accentColor: "emerald",
};

export const MOCK_DOMAINS: Domain[] = [
  {
    id: "d1",
    name: "drirfan.online",
    provider: "Namecheap",
    registrar: "Namecheap",
    status: "active",
    sslStatus: "active",
    expiry: "2026-08-15",
    isPrimary: true,
    isSecondary: false,
    dimension: 1,
    subdomains: [
      { id: "s1", prefix: "app", fullDomain: "app.drirfan.online", platform: "UniOrbi Portal", aRecord: "76.76.21.21", status: "active", category: "Platform" },
      { id: "s2", prefix: "news", fullDomain: "news.drirfan.online", platform: "UniNews", aRecord: "76.76.21.21", status: "active", category: "Platform" },
      { id: "s3", prefix: "api", fullDomain: "api.drirfan.online", platform: "API Gateway", aRecord: "76.76.21.21", status: "active", category: "Technical" },
      { id: "s4", prefix: "admin", fullDomain: "admin.drirfan.online", platform: "Admin Panel", aRecord: "76.76.21.21", status: "active", category: "Internal" },
    ],
    dnsRecords: [
      { id: "r1", type: "A", name: "@", value: "76.76.21.21", ttl: 3600, proxied: true },
      { id: "r2", type: "MX", name: "@", value: "route1.mx.cloudflare.net", ttl: 3600, proxied: false },
      { id: "r3", type: "TXT", name: "@", value: "v=spf1 include:_spf.cloudflare.net ~all", ttl: 3600, proxied: false },
    ],
  },
  {
    id: "d2",
    name: "uniorbi.com",
    provider: "Namecheap",
    registrar: "Namecheap",
    status: "active",
    sslStatus: "active",
    expiry: "2026-11-20",
    isPrimary: false,
    isSecondary: true,
    dimension: 1,
    subdomains: [
      { id: "s5", prefix: "uninews", fullDomain: "uninews.uniorbi.com", platform: "UniNews", aRecord: "76.76.21.21", status: "active", category: "Platform" },
      { id: "s6", prefix: "uniedge", fullDomain: "uniedge.uniorbi.com", platform: "UniEdge", aRecord: "76.76.21.21", status: "active", category: "Platform" },
      { id: "s7", prefix: "unifeel", fullDomain: "unifeel.uniorbi.com", platform: "Unifeel", aRecord: "76.76.21.21", status: "active", category: "Platform" },
      { id: "s8", prefix: "unispark", fullDomain: "unispark.uniorbi.com", platform: "UniSpark", aRecord: "76.76.21.21", status: "active", category: "Platform" },
      { id: "s9", prefix: "app", fullDomain: "app.uniorbi.com", platform: "UniOrbi Main", aRecord: "76.76.21.21", status: "active", category: "Core" },
      { id: "s10", prefix: "api", fullDomain: "api.uniorbi.com", platform: "API Gateway", aRecord: "76.76.21.21", status: "active", category: "Technical" },
      { id: "s11", prefix: "cdn", fullDomain: "cdn.uniorbi.com", platform: "CDN Assets", aRecord: "104.21.0.0", status: "active", category: "Technical" },
      { id: "s12", prefix: "status", fullDomain: "status.uniorbi.com", platform: "Status Monitor", aRecord: "76.76.21.21", status: "active", category: "Technical" },
      { id: "s13", prefix: "ur", fullDomain: "ur.uniorbi.com", platform: "Urdu Version", aRecord: "76.76.21.21", status: "active", category: "Regional" },
      { id: "s14", prefix: "en", fullDomain: "en.uniorbi.com", platform: "English Version", aRecord: "76.76.21.21", status: "active", category: "Regional" },
      { id: "s15", prefix: "pk", fullDomain: "pk.uniorbi.com", platform: "Pakistan Regional", aRecord: "76.76.21.21", status: "active", category: "Regional" },
    ],
    dnsRecords: [
      { id: "r4", type: "A", name: "@", value: "76.76.21.21", ttl: 3600, proxied: true },
      { id: "r5", type: "A", name: "*", value: "76.76.21.21", ttl: 3600, proxied: true },
      { id: "r6", type: "MX", name: "@", value: "route1.mx.cloudflare.net", ttl: 3600, proxied: false },
    ],
  },
];

export const MOCK_EMAILS: EmailAccount[] = [
  { id: "e1", address: "hello@uniorbi.com", displayName: "Hello UniOrbi", forwarding: "uni.smartworldorder@gmail.com", isWildcard: false, domain: "uniorbi.com", category: "contact", unread: 12, lastActivity: "2 min ago" },
  { id: "e2", address: "press@uniorbi.com", displayName: "UniNews Press", forwarding: "uni.smartworldorder@gmail.com", isWildcard: false, domain: "uniorbi.com", category: "press", unread: 3, lastActivity: "1 hr ago" },
  { id: "e3", address: "care@uniorbi.com", displayName: "UniSpark Care", forwarding: "dr.mirfan5577@gmail.com", isWildcard: false, domain: "uniorbi.com", category: "support", unread: 7, lastActivity: "30 min ago" },
  { id: "e4", address: "admin@uniorbi.com", displayName: "System Admin", forwarding: "dr.mirfan5577@gmail.com", isWildcard: false, domain: "uniorbi.com", category: "admin", unread: 1, lastActivity: "5 min ago" },
  { id: "e5", address: "*@uniorbi.com", displayName: "Wildcard Catch-All", forwarding: "doc.zaeem86@gmail.com", isWildcard: true, domain: "uniorbi.com", category: "wildcard", unread: 24, lastActivity: "Just now" },
  { id: "e6", address: "dr.mirfan5577@gmail.com", displayName: "Dr. Irfan (Personal)", isWildcard: false, domain: "gmail.com", category: "personal", unread: 45, lastActivity: "Just now" },
  { id: "e7", address: "dr.mirfanqadir@gmail.com", displayName: "Dr. Mirfan Qadir", isWildcard: false, domain: "gmail.com", category: "personal", unread: 8, lastActivity: "10 min ago" },
  { id: "e8", address: "doc.zaeem86@gmail.com", displayName: "Doc Zaeem", isWildcard: false, domain: "gmail.com", category: "personal", unread: 15, lastActivity: "25 min ago" },
  { id: "e9", address: "uni.smartworldorder@gmail.com", displayName: "Uni Smart World", isWildcard: false, domain: "gmail.com", category: "personal", unread: 6, lastActivity: "1 hr ago" },
];

export const MOCK_EMAIL_MESSAGES: EmailMessage[] = [
  { id: "m1", from: "john.doe@techcorp.com", fromName: "John Doe", to: "hello@uniorbi.com", subject: "Partnership Proposal — UniOrbi Platform", preview: "Dear Team, I wanted to reach out regarding a potential partnership opportunity...", body: "Dear Team,\n\nI wanted to reach out regarding a potential partnership opportunity with ESOneWorld. Our company has been following your work on the UniOrbi platform and we believe there is significant synergy...\n\nBest regards,\nJohn Doe", timestamp: "2026-09-04T10:23:00Z", isRead: false, isStarred: true, hasAttachment: true, labels: ["Partnership", "Priority"], folder: "inbox" },
  { id: "m2", from: "media@bbc.co.uk", fromName: "BBC Media", to: "press@uniorbi.com", subject: "Media Inquiry — UniNews Coverage", preview: "We are interested in featuring UniNews in our upcoming digital journalism...", body: "Hello,\n\nWe are interested in featuring UniNews in our upcoming digital journalism series. Could you provide more details about your editorial team and content strategy?", timestamp: "2026-09-04T09:15:00Z", isRead: false, isStarred: false, hasAttachment: false, labels: ["Media", "Press"], folder: "inbox" },
  { id: "m3", from: "support@cloudflare.com", fromName: "Cloudflare Support", to: "admin@uniorbi.com", subject: "DNS Update Confirmation — uniorbi.com", preview: "Your DNS changes have been successfully propagated. All records are active...", body: "Your DNS changes have been successfully propagated. All records are active.\n\n✓ A Record: @  →  76.76.21.21\n✓ Wildcard: *  →  76.76.21.21\n✓ MX Records: Active\n\nCloudflare Team", timestamp: "2026-09-04T08:00:00Z", isRead: true, isStarred: false, hasAttachment: false, labels: ["System", "DNS"], folder: "inbox" },
  { id: "m4", from: "billing@namecheap.com", fromName: "Namecheap Billing", to: "admin@uniorbi.com", subject: "Domain Renewal Reminder — drirfan.online", preview: "Your domain drirfan.online will expire in 30 days. Renew now to avoid...", body: "Your domain drirfan.online will expire in 30 days (September 2026).\n\nRenew now to avoid any disruption to your services.\n\nNamecheap Team", timestamp: "2026-09-03T14:30:00Z", isRead: false, isStarred: true, hasAttachment: false, labels: ["Billing", "Renewal"], folder: "inbox" },
  { id: "m5", from: "hello@uniorbi.com", fromName: "ESOneWorld Team", to: "partner@company.com", subject: "Welcome to ESOneWorld Ecosystem", preview: "Thank you for joining the ESOneWorld network. Your access has been activated...", body: "Thank you for joining the ESOneWorld network. Your access has been activated.\n\nESOneWorld Team", timestamp: "2026-09-03T11:00:00Z", isRead: true, isStarred: false, hasAttachment: false, labels: ["Sent"], folder: "sent" },
];

export const MOCK_INTEGRATIONS: Integration[] = [
  { id: "i1", name: "Cloudflare", type: "dns", provider: "Cloudflare", status: "connected", lastSync: "2 min ago", icon: "☁️", color: "#f38020", features: ["DNS Management", "DDoS Protection", "CDN", "SSL", "Email Routing", "Wildcard DNS"] },
  { id: "i2", name: "Namecheap", type: "dns", provider: "Namecheap", status: "connected", lastSync: "1 hr ago", icon: "🏷️", color: "#d04e00", features: ["Domain Registration", "Domain Transfer", "WHOIS Privacy"] },
  { id: "i3", name: "Zoho Mail", type: "email", provider: "Zoho", status: "connected", lastSync: "30 min ago", icon: "📧", color: "#e42527", features: ["Business Email", "Shared Mailboxes", "Calendar", "Contacts"] },
  { id: "i4", name: "Resend", type: "email", provider: "Resend", status: "connected", lastSync: "5 min ago", icon: "📨", color: "#000000", features: ["Transactional Emails", "Webhooks", "Analytics", "Templates"] },
  { id: "i5", name: "Netlify", type: "hosting", provider: "Netlify", status: "connected", lastSync: "20 min ago", icon: "🌐", color: "#00c7b7", features: ["Static Hosting", "CI/CD", "Edge Functions", "Forms"] },
  { id: "i6", name: "GitHub", type: "vcs", provider: "GitHub", status: "connected", lastSync: "15 min ago", icon: "🐱", color: "#333333", features: ["Version Control", "Actions CI/CD", "Pages", "Packages"] },
  { id: "i7", name: "Supabase", type: "database", provider: "Supabase", status: "connected", lastSync: "1 min ago", icon: "⚡", color: "#3ecf8e", features: ["PostgreSQL", "Auth", "Storage", "Edge Functions", "Realtime"] },
  { id: "i8", name: "Vercel", type: "hosting", provider: "Vercel", status: "pending", lastSync: "Never", icon: "▲", color: "#000000", features: ["Next.js Hosting", "Edge Network", "Analytics"] },
  { id: "i9", name: "Gmail Workspace", type: "email", provider: "Google", status: "connected", lastSync: "Just now", icon: "✉️", color: "#ea4335", features: ["Gmail Sync", "Google Drive", "Meet", "Calendar"] },
];

export const MOCK_WEBSITES: WebsiteProject[] = [
  { id: "w1", name: "UniOrbi Main Portal", domain: "app.uniorbi.com", type: "react", hostingProvider: "Netlify", status: "live", lastDeploy: "2 hrs ago", framework: "React + Vite", sslActive: true, monthlyVisits: 12450, uptime: 99.97, subscriptionType: "Pro", subscriptionExpiry: "2027-01-15", renewalPrice: 19 },
  { id: "w2", name: "UniNews Platform", domain: "uninews.uniorbi.com", type: "react", hostingProvider: "Vercel", status: "live", lastDeploy: "1 day ago", framework: "Next.js", sslActive: true, monthlyVisits: 8320, uptime: 99.95, subscriptionType: "Pro", subscriptionExpiry: "2026-12-20", renewalPrice: 19 },
  { id: "w3", name: "Dr. Irfan Portfolio", domain: "drirfan.online", type: "static", hostingProvider: "Cloudflare Pages", status: "live", lastDeploy: "3 days ago", framework: "HTML/CSS/JS", sslActive: true, monthlyVisits: 2100, uptime: 100, subscriptionType: "Free", subscriptionExpiry: "2026-08-15", renewalPrice: 0 },
  { id: "w4", name: "UniEdge Creative", domain: "uniedge.uniorbi.com", type: "react", hostingProvider: "Netlify", status: "building", lastDeploy: "5 min ago", framework: "React + Vite", sslActive: true, monthlyVisits: 0, uptime: 0, subscriptionType: "Pro", subscriptionExpiry: "2027-03-10", renewalPrice: 19 },
  { id: "w5", name: "UniSpark Wellness", domain: "unispark.uniorbi.com", type: "react", hostingProvider: "Netlify", status: "live", lastDeploy: "6 hrs ago", framework: "React + Vite", sslActive: true, monthlyVisits: 3670, uptime: 99.92, subscriptionType: "Starter", subscriptionExpiry: "2026-11-30", renewalPrice: 9 },
];

export const PLATFORM_STATS: PlatformStats = {
  totalDomains: 22,
  activeSites: 4,
  emailsToday: 186,
  integrations: 9,
  uptime: "99.97%",
  secureScore: 98,
  globalRegions: 11,
  languages: 11,
};
