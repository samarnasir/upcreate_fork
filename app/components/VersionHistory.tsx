"use client";

import { useState } from "react";
import { SCRIPT_VERSIONS } from "@/lib/mock-data";
import { Icon } from "./Icons";

export default function VersionHistory() {
  const [active, setActive] = useState(SCRIPT_VERSIONS[0].v);
  return (
    <div className="rounded-[28px] bg-card p-6 md:p-7 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-xl flex items-center gap-2"><Icon name="history" size={18} /> Version history</h3>
        <button className="rounded-full border border-border/15 px-4 py-1.5 text-sm hover:bg-foreground/5">Compare versions</button>
      </div>
      <div className="relative pl-5">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/15" />
        {SCRIPT_VERSIONS.map((v) => (
          <button key={v.v} onClick={() => setActive(v.v)} className="relative flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left hover:bg-surface">
            <span className={`absolute -left-[18px] h-3 w-3 rounded-full border-2 border-card ${active === v.v ? "bg-accent" : "bg-foreground/25"}`} />
            <span className="text-xs font-medium tabular-nums text-muted w-6">v{v.v}</span>
            <span className="flex-1 text-sm">{v.label}</span>
            <span className="text-xs text-muted">{v.by} · {v.when}</span>
            {active === v.v ? (
              <span className="rounded-full bg-accent text-accent-deep px-2.5 py-0.5 text-[11px] font-medium">Current</span>
            ) : (
              <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px]">Restore</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
