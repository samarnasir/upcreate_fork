"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findItem } from "./nav-config";

// Shared tab bar for a merged sidebar item (e.g. Scripts: Write / Improve / Library).
export default function SectionTabs() {
  const pathname = usePathname();
  const found = findItem(pathname);
  if (!found?.item.tabs) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex rounded-full bg-card p-1">
        {found.item.tabs.map((t) => {
          const active = t.href === pathname;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${active ? "bg-surface font-medium" : "text-muted hover:text-foreground"}`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
      <span className="text-sm text-muted">{found.tab?.description}</span>
    </div>
  );
}
