// Sample data for UI mockups of features that don't have a backend yet.
// Everything here is illustrative only.

export type Stage = "idea" | "scripted" | "filmed" | "edited" | "scheduled" | "posted";

export const STAGES: { id: Stage; label: string }[] = [
  { id: "idea", label: "Idea" },
  { id: "scripted", label: "Scripted" },
  { id: "filmed", label: "Filmed" },
  { id: "edited", label: "Edited" },
  { id: "scheduled", label: "Scheduled" },
  { id: "posted", label: "Posted" },
];

export type PipelineCard = {
  id: number;
  title: string;
  stage: Stage;
  pillar: "authority" | "journey";
  format: string;
  due: string;
  assignee: string;
};

export const PIPELINE: PipelineCard[] = [
  { id: 1, title: "3 pricing mistakes new consultants make", stage: "idea", pillar: "authority", format: "Talking head", due: "Oct 9", assignee: "You" },
  { id: 2, title: "Day 1 of rebuilding my studio", stage: "idea", pillar: "journey", format: "Vlog", due: "Oct 10", assignee: "You" },
  { id: 3, title: "Smart vs dumb founder: client onboarding", stage: "idea", pillar: "authority", format: "Split screen", due: "Oct 12", assignee: "Aisha" },
  { id: 4, title: "The 5-line bio framework", stage: "scripted", pillar: "authority", format: "Green screen", due: "Oct 7", assignee: "You" },
  { id: 5, title: "Why I fired my biggest client", stage: "scripted", pillar: "journey", format: "Story", due: "Oct 8", assignee: "You" },
  { id: 6, title: "Myth: you need 10k followers to sell", stage: "filmed", pillar: "authority", format: "Talking head", due: "Oct 6", assignee: "Leo" },
  { id: 7, title: "Behind the scenes: client workshop", stage: "edited", pillar: "journey", format: "B-roll + VO", due: "Oct 6", assignee: "Leo" },
  { id: 8, title: "Comment GUIDE for my pricing sheet", stage: "scheduled", pillar: "authority", format: "Talking head", due: "Oct 7 · 6:30pm", assignee: "Aisha" },
  { id: 9, title: "How I'd enter the coffee industry", stage: "posted", pillar: "authority", format: "Series", due: "Oct 3", assignee: "You" },
  { id: 10, title: "My first $10k month, honestly", stage: "posted", pillar: "journey", format: "Story", due: "Oct 1", assignee: "You" },
];

export type Platform = "instagram" | "tiktok" | "youtube";

export const PLATFORMS: { id: Platform; label: string; handle: string; connected: boolean; followers: string }[] = [
  { id: "instagram", label: "Instagram", handle: "@creator", connected: true, followers: "842" },
  { id: "tiktok", label: "TikTok", handle: "@creator", connected: true, followers: "1.2k" },
  { id: "youtube", label: "YouTube Shorts", handle: "", connected: false, followers: "" },
];

export const QUEUE = [
  { id: 1, title: "Comment GUIDE for my pricing sheet", when: "Today · 6:30 PM", platforms: ["instagram", "tiktok"] as Platform[], status: "Scheduled" },
  { id: 2, title: "The 5-line bio framework", when: "Tomorrow · 12:00 PM", platforms: ["instagram"] as Platform[], status: "Scheduled" },
  { id: 3, title: "Why I fired my biggest client", when: "Thu · 7:00 PM", platforms: ["instagram", "tiktok"] as Platform[], status: "Needs video" },
  { id: 4, title: "Myth: you need 10k followers to sell", when: "Sat · 10:00 AM", platforms: ["tiktok"] as Platform[], status: "Draft" },
];

export const PUBLISHED = [
  { id: 1, hue: 15, title: "How I'd enter the coffee industry", when: "Oct 3", views: 12400, likes: 860, comments: 94, multiple: 14.7 },
  { id: 2, hue: 330, title: "My first $10k month, honestly", when: "Oct 1", views: 3100, likes: 240, comments: 31, multiple: 3.7 },
  { id: 3, hue: 200, title: "3 signs your offer is underpriced", when: "Sep 28", views: 980, likes: 61, comments: 7, multiple: 1.2 },
];

export const BEST_TIMES = [
  { day: "Mon", slots: [1, 2, 4, 2] },
  { day: "Tue", slots: [1, 3, 5, 3] },
  { day: "Wed", slots: [2, 2, 4, 4] },
  { day: "Thu", slots: [1, 3, 5, 5] },
  { day: "Fri", slots: [1, 2, 3, 2] },
  { day: "Sat", slots: [3, 4, 2, 1] },
  { day: "Sun", slots: [2, 4, 3, 2] },
];

export const MEDIA = [
  { id: 1, name: "studio-desk-wide.mp4", kind: "video", length: "0:42", tags: ["b-roll", "studio"], script: "Behind the scenes: client workshop", hue: 80 },
  { id: 2, name: "talking-head-pricing.mp4", kind: "video", length: "1:12", tags: ["a-roll"], script: "3 pricing mistakes", hue: 30 },
  { id: 3, name: "coffee-pour-slowmo.mp4", kind: "video", length: "0:08", tags: ["b-roll", "coffee"], script: "How I'd enter the coffee industry", hue: 20 },
  { id: 4, name: "whiteboard-framework.jpg", kind: "image", length: "", tags: ["carousel", "framework"], script: "", hue: 200 },
  { id: 5, name: "client-call-screen.mov", kind: "video", length: "0:31", tags: ["screen rec"], script: "", hue: 260 },
  { id: 6, name: "walk-to-office.mp4", kind: "video", length: "0:19", tags: ["b-roll", "journey"], script: "Day 1 of rebuilding my studio", hue: 140 },
  { id: 7, name: "headshot-clean.jpg", kind: "image", length: "", tags: ["profile"], script: "", hue: 50 },
  { id: 8, name: "laptop-typing-close.mp4", kind: "video", length: "0:12", tags: ["b-roll"], script: "", hue: 180 },
];

export const TOP_HOOKS = [
  { hook: "If I had to start over in [industry], I'd do this", angle: "Transformation", avgMultiple: 9.8, uses: 4 },
  { hook: "Smart [role] vs dumb [role]", angle: "Comparison", avgMultiple: 6.1, uses: 6 },
  { hook: "Stop doing [common thing]", angle: "Myth bust", avgMultiple: 4.4, uses: 5 },
  { hook: "3 levels of [topic]", angle: "Framework", avgMultiple: 2.2, uses: 3 },
];

export const FORMAT_PERFORMANCE = [
  { format: "Series", multiple: 11.2 },
  { format: "Story", multiple: 5.4 },
  { format: "Split screen", multiple: 4.1 },
  { format: "Talking head", multiple: 2.6 },
  { format: "Green screen", multiple: 1.9 },
];

export const RECOMMENDATIONS = [
  { title: "Double down on the industry-entry series", body: "Your last 2 series episodes averaged 11x. Script episode 4 (\"How I'd enter skincare\") next.", cta: "Write episode 4", href: "/scripts" },
  { title: "Journey content is under target", body: "You're at 18% journey vs a 30% target this batch. Add 2 story videos.", cta: "Plan journey posts", href: "/calendar" },
  { title: "Thursday 6-8pm is your best slot", body: "Posts in that window got 2.3x the views of your average.", cta: "Open publishing queue", href: "/publish" },
];

export const TRENDING_REELS = [
  { handle: "@maya.builds", hook: "Nobody tells you this about your first client", views: "182k", multiple: 44, hue: 25, style: "caption" as const },
  { handle: "@thefounderdesk", hook: "I priced my service at $50", views: "301k", multiple: 25, hue: 210, style: "bold" as const },
  { handle: "@opslena", hook: "3 questions before every sales call", views: "38k", multiple: 16, hue: 140, style: "split" as const },
  { handle: "@ruthless.ops", hook: "Smart founder vs dumb founder: hiring", views: "92k", multiple: 12, hue: 280, style: "caption" as const },
  { handle: "@studio.kade", hook: "If I started my agency again", views: "64k", multiple: 9, hue: 45, style: "bold" as const },
  { handle: "@coffee.margins", hook: "How I'd enter the coffee industry", views: "12k", multiple: 14, hue: 15, style: "split" as const },
];

export const HOOK_ANGLE_EXAMPLES: Record<string, { hook: string; hue: number; style: "caption" | "bold" | "split" }> = {
  "Framework / Formula / Acronym": { hook: "The 3-2-1 pricing formula", hue: 200, style: "bold" },
  Comparison: { hook: "Smart founder vs dumb founder", hue: 280, style: "split" },
  "Myth Bust / Common Mistake": { hook: "Stop sending proposals as PDFs", hue: 10, style: "caption" },
  "Do vs Don't (Right vs Wrong)": { hook: "Do this, not that, on discovery calls", hue: 150, style: "split" },
  "Educational Tip / Hack": { hook: "One email that doubled my replies", hue: 45, style: "caption" },
  Transformation: { hook: "Year 1 vs year 3 of my business", hue: 330, style: "bold" },
  Challenge: { hook: "Day 1 of landing 10 clients in 30 days", hue: 100, style: "caption" },
};

export const DISCOVERED_OUTLIERS = [
  { handle: "@maya.builds", followers: "4.1k", views: "182k", multiple: 44, hook: "Nobody tells you this about your first client", age: "2d", hue: 25 },
  { handle: "@thefounderdesk", followers: "12k", views: "301k", multiple: 25, hook: "I priced my service at $50. Here's what happened", age: "4d", hue: 210 },
  { handle: "@opslena", followers: "2.3k", views: "38k", multiple: 16, hook: "3 questions I ask before every sales call", age: "1d", hue: 140 },
];

export const SCRIPT_VERSIONS = [
  { v: 3, label: "Improver rewrite: tighter hook", when: "Today, 10:42", by: "AI" },
  { v: 2, label: "Manual edit: new CTA", when: "Yesterday, 18:10", by: "You" },
  { v: 1, label: "Original from Script Studio", when: "Oct 3, 09:15", by: "AI" },
];

export const TEAM = [
  { name: "Creator", email: "demo@upcreate.app", role: "Owner" },
  { name: "Aisha Khan", email: "aisha@studio.co", role: "Strategist" },
  { name: "Leo Park", email: "leo@edits.io", role: "Editor" },
];

export const BRANDS = [
  { initials: "CW", name: "Creator Workspace", plan: "Free trial" },
  { initials: "AC", name: "Acme Coffee", plan: "Client · Pro" },
];

export const PLANS = [
  { name: "Starter", price: "$0", blurb: "Plan and script solo", features: ["1 brand", "50 AI credits / mo", "Manual analytics"] },
  { name: "Pro", price: "$29", blurb: "Publish and learn from results", features: ["3 brands", "500 AI credits / mo", "Auto-publish + analytics sync", "Media bank 50 GB"], highlight: true },
  { name: "Agency", price: "$99", blurb: "Run a team and clients", features: ["Unlimited brands", "2,000 AI credits / mo", "Team roles + approvals", "Client reports"] },
];
