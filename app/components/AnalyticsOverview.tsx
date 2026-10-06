"use client";

import { useState } from "react";
import { Icon, type IconName } from "./Icons";

const PERIODS = ["7 days", "30 days", "Quarter"] as const;
const SERIES = [
  { label: "Views", color: "var(--foreground)" },
  { label: "Instagram posts", color: "var(--accent)" },
  { label: "Profile visits", color: "var(--muted)" },
];

export default function AnalyticsOverview({ posts, views }: { posts: number; views: number }) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("30 days");
  const days = period === "7 days" ? 7 : period === "30 days" ? 30 : 90;
  const tiles: { label: string; value: number; icon: IconName }[] = [
    { label: "Total views", value: views, icon: "eye" },
    { label: "Total likes", value: 0, icon: "heart" },
    { label: "Comments", value: 0, icon: "message" },
    { label: "Posts", value: posts, icon: "doc" },
    { label: "Profile visits", value: 0, icon: "globe" },
  ];
  const labels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - Math.round((days * (6 - i)) / 6));
    return d.toLocaleDateString("en", { month: "short", day: "numeric" });
  });

  return (
    <div className="mb-12">
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-full bg-card p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${period === p ? "bg-surface font-medium" : "text-muted hover:text-foreground"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div data-tour="analytics-overview" className="stagger grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        {tiles.map((t) => (
          <div key={t.label} className="lift rounded-[28px] bg-card p-5">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-surface"><Icon name={t.icon} size={16} /></span>
            <div className="font-heading text-3xl mt-5 leading-none tabular-nums">{t.value.toLocaleString()}</div>
            <div className="text-sm text-muted mt-1.5">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl md:text-2xl">Reach and posts</h2>
            <p className="text-sm text-muted mt-1">Compare what you published with how many people saw it.</p>
          </div>
          <div className="rounded-[18px] bg-surface px-4 py-3">
            <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted">Views / post</div>
            <div className="font-heading text-2xl mt-1">{posts ? Math.round(views / posts).toLocaleString() : 0}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-5 text-sm">
          {SERIES.map((s) => (
            <span key={s.label} className="flex items-center gap-2 text-muted">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} /> {s.label}
            </span>
          ))}
        </div>
        <div className="relative mt-6 h-56">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="absolute inset-x-0 border-t border-dashed border-border/10" style={{ top: `${i * 33.3}%` }} />
          ))}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0 39.5 H100" stroke="var(--foreground)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" fill="none" className="bar-grow" />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="rounded-full bg-surface px-4 py-2 text-sm text-muted">Log posts below to see your trend</span>
          </div>
        </div>
        <div className="mt-3 flex justify-between text-xs text-muted">
          {labels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      </div>
    </div>
  );
}
