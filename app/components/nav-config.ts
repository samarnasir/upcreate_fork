import type { IconName } from "./Icons";

export type Tab = { href: string; label: string; description: string };

// `tabs` marks an item that merges several closely related pages into one
// sidebar entry; each page keeps its own route and shows the shared tab bar.
type Item = { href: string; label: string; icon: IconName; tabs?: Tab[] };

export const NAV_GROUPS: { title: string; items: Item[] }[] = [
  { title: "Overview", items: [{ href: "/dashboard", label: "Dashboard", icon: "home" }] },
  {
    title: "Plan",
    items: [
      { href: "/brand", label: "Brand Foundation", icon: "brand" },
      { href: "/calendar", label: "Calendar", icon: "calendar" },
      { href: "/pipeline", label: "Pipeline", icon: "kanban" },
      { href: "/research", label: "Outlier Research", icon: "search" },
    ],
  },
  {
    title: "Create",
    items: [
      { href: "/hooks", label: "Hook Lab", icon: "hook" },
      {
        href: "/scripts",
        label: "Scripts",
        icon: "pen",
        tabs: [
          { href: "/scripts", label: "Write", description: "Authority, storytelling, signature series" },
          { href: "/improve", label: "Improve", description: "Rewrite and tighten any script" },
          { href: "/library", label: "Library", description: "Ready-made script library" },
        ],
      },
      {
        href: "/carousels",
        label: "Carousels",
        icon: "layers",
        tabs: [
          { href: "/carousels", label: "Create", description: "Slide-by-slide carousel builder" },
          { href: "/carousel-library", label: "Library", description: "Saved and template carousels" },
        ],
      },
      {
        href: "/production",
        label: "Production",
        icon: "camera",
        tabs: [
          { href: "/production", label: "Planner", description: "Formats, equipment, shot lists" },
          { href: "/media", label: "Media Bank", description: "Footage and images, tagged and linked to scripts" },
        ],
      },
      { href: "/prompts", label: "Prompt Library", icon: "terminal" },
    ],
  },
  {
    title: "Grow",
    items: [
      { href: "/publish", label: "Publish", icon: "send" },
      { href: "/funnel", label: "CTA & Funnel", icon: "funnel" },
      {
        href: "/analytics",
        label: "Analytics",
        icon: "chart",
        tabs: [
          { href: "/analytics", label: "Performance", description: "Logged posts, levels and double-downs" },
          { href: "/insights", label: "Insights", description: "What's working and what to make next" },
        ],
      },
    ],
  },
];

export function isItemActive(item: Item, pathname: string) {
  return item.href === pathname || !!item.tabs?.some((t) => t.href === pathname);
}

export function findItem(pathname: string) {
  for (const g of NAV_GROUPS) {
    const item = g.items.find((i) => isItemActive(i, pathname));
    if (item) return { group: g, item, tab: item.tabs?.find((t) => t.href === pathname) };
  }
  return null;
}

export const HIDDEN_CHROME = ["/login", "/signup", "/onboarding", "/forgot-password"];

