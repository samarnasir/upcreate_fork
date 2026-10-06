"use client";

import { useState } from "react";
import { DISCOVERED_OUTLIERS } from "@/lib/mock-data";
import { Icon } from "./Icons";
import ReelCard from "./ReelCard";

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
      <div className="stagger grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((o) => {
          const isSaved = saved.includes(o.handle);
          return (
            <div key={o.handle} className="rounded-[28px] bg-card p-3 flex gap-4">
              <div className="w-32 shrink-0">
                <ReelCard reel={{ handle: o.handle, hook: o.hook, views: o.views, multiple: o.multiple, hue: o.hue, style: "caption" }} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col py-2 pr-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">{o.handle}</span>
                  <span className="text-xs text-muted shrink-0">{o.age} ago</span>
                </div>
                <p className="font-heading text-base leading-snug mt-3 flex-1">"{o.hook}"</p>
                <div className="text-xs text-muted mt-3">{o.views} views · {o.followers} followers</div>
                <div className="flex gap-1.5 mt-3">
                  <button
                    onClick={() => setSaved(isSaved ? saved.filter((h) => h !== o.handle) : [...saved, o.handle])}
                    className={`flex-1 rounded-full py-2 text-xs font-medium ${isSaved ? "bg-surface" : "bg-accent text-accent-deep"}`}
                  >
                    {isSaved ? "Saved ✓" : "Save to log"}
                  </button>
                  <button className="rounded-full bg-surface px-2.5" title="Turn into a script"><Icon name="pen" size={13} /></button>
                  <button onClick={() => setDismissed([...dismissed, o.handle])} className="rounded-full bg-surface px-2.5 text-muted" title="Dismiss"><Icon name="close" size={13} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
