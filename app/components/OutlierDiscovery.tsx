"use client";

import { useState } from "react";
import { DISCOVERED_OUTLIERS } from "@/lib/mock-data";
import { Icon } from "./Icons";

export default function OutlierDiscovery() {
  const [saved, setSaved] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const list = DISCOVERED_OUTLIERS.filter((o) => !dismissed.includes(o.handle));

  return (
    <section className="mb-12">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="font-heading text-xl md:text-2xl flex items-center gap-2">
            Auto-discovered <span className="rounded-full bg-accent text-accent-deep px-2.5 py-0.5 text-xs font-medium">{list.length} new</span>
          </h2>
          <p className="text-sm text-muted mt-1">Reels in your niche that hit 5x+ their creator's followers, found daily from your keyword bank.</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted"><span className="h-2 w-2 rounded-full bg-accent pulse-dot" /> Scanning 24 keywords</span>
      </div>
      <div className="stagger grid md:grid-cols-3 gap-4">
        {list.map((o) => {
          const isSaved = saved.includes(o.handle);
          return (
            <div key={o.handle} className="rounded-[28px] bg-card p-5 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{o.handle}</span>
                <span className="rounded-full bg-accent text-accent-deep px-2.5 py-0.5 text-xs font-medium">{o.multiple}x</span>
              </div>
              <p className="font-heading text-lg leading-snug mt-4 flex-1">"{o.hook}"</p>
              <div className="text-xs text-muted mt-4">{o.views} views · {o.followers} followers · {o.age} ago</div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSaved(isSaved ? saved.filter((h) => h !== o.handle) : [...saved, o.handle])}
                  className={`flex-1 rounded-full py-2 text-sm font-medium ${isSaved ? "bg-surface" : "bg-accent text-accent-deep"}`}
                >
                  {isSaved ? "Saved to log ✓" : "Save to log"}
                </button>
                <button className="rounded-full bg-surface px-3 text-sm" title="Turn into a script"><Icon name="pen" size={14} /></button>
                <button onClick={() => setDismissed([...dismissed, o.handle])} className="rounded-full bg-surface px-3 text-sm text-muted" title="Dismiss"><Icon name="close" size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
