"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./Icons";

const STEPS = [
  { label: "Set up your brand foundation", href: "/brand" },
  { label: "Log your first outlier", href: "/research" },
  { label: "Generate a hook stack", href: "/hooks" },
  { label: "Schedule your first batch", href: "/calendar" },
];

export default function Quickstart() {
  const [done, setDone] = useState<boolean[]>([true, false, false, false]);
  const count = done.filter(Boolean).length;
  const next = STEPS[done.findIndex((d) => !d)] ?? STEPS[0];

  return (
    <div className="rounded-[28px] bg-card p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl md:text-2xl">Quickstart</h2>
          <p className="text-sm text-muted mt-1">Complete these to get the most out of Upcreate.</p>
        </div>
        <span className="rounded-full bg-surface px-3 py-1 text-sm font-medium tabular-nums">{count}/{STEPS.length}</span>
      </div>
      <div className="mt-5 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
        <div className="h-full bg-accent-deep transition-[width] duration-500" style={{ width: `${(count / STEPS.length) * 100}%` }} />
      </div>
      <div className="mt-5 grid sm:grid-cols-2 gap-2">
        {STEPS.map((s, i) => (
          <div key={s.href} className={`group flex items-center gap-3 rounded-[18px] px-4 py-3 ${done[i] ? "bg-foreground/5" : "bg-surface"}`}>
            <button
              onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))}
              aria-label={done[i] ? "Mark incomplete" : "Mark complete"}
              className={`grid place-items-center h-5 w-5 shrink-0 rounded-full border transition-colors ${done[i] ? "bg-accent border-accent text-accent-deep" : "border-foreground/30"}`}
            >
              {done[i] && <Icon name="check" size={12} />}
            </button>
            <Link href={s.href} className={`flex-1 text-sm ${done[i] ? "line-through text-muted" : ""}`}>
              {s.label}
            </Link>
            <Icon name="arrow" size={14} className="text-muted transition-transform group-hover:translate-x-1" />
          </div>
        ))}
      </div>
      <Link href={next.href} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-accent text-accent-deep py-3 text-sm font-medium hover:brightness-95">
        Continue setup <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
