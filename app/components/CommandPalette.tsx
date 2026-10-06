"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon, type IconName } from "./Icons";
import { NAV_GROUPS } from "./nav-config";
import { PIPELINE, TOP_HOOKS, DISCOVERED_OUTLIERS } from "@/lib/mock-data";

type Result = { label: string; hint: string; href: string; icon: IconName; section: string };

const PAGES: Result[] = NAV_GROUPS.flatMap((g) =>
  g.items.flatMap((i) =>
    i.tabs
      ? i.tabs.map((t) => ({ label: `${i.label}: ${t.label}`, hint: t.description, href: t.href, icon: i.icon, section: "Pages" }))
      : [{ label: i.label, hint: g.title, href: i.href, icon: i.icon, section: "Pages" }]
  )
);

const CONTENT: Result[] = [
  ...PIPELINE.map((c) => ({ label: c.title, hint: `Pipeline · ${c.stage}`, href: "/pipeline", icon: "kanban" as IconName, section: "Scripts & ideas" })),
  ...TOP_HOOKS.map((h) => ({ label: h.hook, hint: `Hook · ${h.angle}`, href: "/hooks", icon: "hook" as IconName, section: "Hooks" })),
  ...DISCOVERED_OUTLIERS.map((o) => ({ label: o.hook, hint: `Outlier · ${o.handle} · ${o.multiple}x`, href: "/research", icon: "search" as IconName, section: "Outliers" })),
];

export function SearchButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="hidden lg:flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-muted hover:text-foreground w-72"
    >
      <Icon name="search" size={15} />
      <span className="flex-1 text-left">Search scripts, hooks, pages…</span>
      <kbd className="rounded-md bg-surface px-1.5 py-0.5 text-[10px] font-sans">⌘K</kbd>
    </button>
  );
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const all = [...PAGES, ...CONTENT];
    const term = q.trim().toLowerCase();
    return (term ? all.filter((r) => (r.label + r.hint).toLowerCase().includes(term)) : PAGES).slice(0, 10);
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  if (!open) return null;

  function go(r: Result) {
    router.push(r.href);
    onClose();
  }

  let lastSection = "";
  return (
    <div className="fixed inset-0 z-[70] bg-black/40 p-4 pt-[12vh]" onClick={onClose}>
      <div className="animate-pop mx-auto w-full max-w-xl overflow-hidden rounded-[28px] bg-surface" style={{ transformOrigin: "top" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border/10 px-5 py-4">
          <Icon name="search" size={18} className="text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setIdx(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
              if (e.key === "Enter" && results[idx]) go(results[idx]);
              if (e.key === "Escape") onClose();
            }}
            placeholder="Search scripts, hooks, outliers, pages…"
            className="flex-1 bg-transparent text-base outline-none border-0"
            style={{ borderRadius: 0 }}
          />
          <kbd className="rounded-md bg-card px-1.5 py-0.5 text-[10px] text-muted">ESC</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <div className="py-10 text-center text-sm text-muted">No matches for "{q}"</div>}
          {results.map((r, i) => {
            const header = r.section !== lastSection ? r.section : null;
            lastSection = r.section;
            return (
              <div key={r.label + i}>
                {header && <div className="px-3 pt-3 pb-1 text-[10px] font-medium uppercase tracking-[0.1em] text-muted">{header}</div>}
                <button
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => go(r)}
                  className={`flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left ${i === idx ? "bg-accent text-accent-deep" : ""}`}
                >
                  <Icon name={r.icon} size={16} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm truncate">{r.label}</span>
                    <span className={`block text-xs truncate ${i === idx ? "opacity-70" : "text-muted"}`}>{r.hint}</span>
                  </span>
                  {i === idx && <Icon name="arrow" size={14} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
