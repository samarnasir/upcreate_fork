import type { IconName } from "./Icons";

type Item = { href: string; label: string; icon: IconName };

export const NAV_GROUPS: { title: string; items: Item[] }[] = [
  { title: "Overview", items: [{ href: "/dashboard", label: "Dashboard", icon: "home" }] },
  {
    title: "Plan",
    items: [
      { href: "/brand", label: "Brand Foundation", icon: "brand" },
      { href: "/calendar", label: "Calendar", icon: "calendar" },
      { href: "/research", label: "Outlier Research", icon: "search" },
    ],
  },
  {
    title: "Create",
    items: [
      { href: "/hooks", label: "Hook Lab", icon: "hook" },
      { href: "/scripts", label: "Script Studio", icon: "pen" },
      { href: "/improve", label: "Script Improver", icon: "sparkle" },
      { href: "/carousels", label: "Carousel Studio", icon: "layers" },
      { href: "/production", label: "Production", icon: "camera" },
    ],
  },
  {
    title: "Grow",
    items: [
      { href: "/funnel", label: "CTA & Funnel", icon: "funnel" },
      { href: "/analytics", label: "Analytics", icon: "chart" },
    ],
  },
  {
    title: "Library",
    items: [
      { href: "/library", label: "Scripts", icon: "book" },
      { href: "/carousel-library", label: "Carousels", icon: "grid" },
      { href: "/prompts", label: "Prompts", icon: "terminal" },
    ],
  },
];

export const HIDDEN_CHROME = ["/login", "/signup", "/onboarding"];

