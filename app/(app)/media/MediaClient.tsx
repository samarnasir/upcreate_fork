"use client";

import { useState } from "react";
import { MEDIA } from "@/lib/mock-data";
import { Icon } from "@/app/components/Icons";

const FILTERS = ["All", "Videos", "Images", "Unlinked"] as const;

export default function MediaClient() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const items = MEDIA.filter((m) =>
    filter === "All" ? true : filter === "Videos" ? m.kind === "video" : filter === "Images" ? m.kind === "image" : !m.script
  );
  const sel = MEDIA.find((m) => m.id === selected);

  return (
    <>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); }}
        className={`mb-8 rounded-[28px] border-2 border-dashed p-8 text-center transition-colors ${dragging ? "border-accent bg-accent/20" : "border-border/15 bg-card"}`}
      >
        <span className="mx-auto grid place-items-center h-12 w-12 rounded-full bg-surface mb-3"><Icon name="upload" /></span>
        <div className="font-medium">Drop footage here</div>
        <p className="text-sm text-muted mt-1">MP4, MOV, JPG or PNG. Files are auto-tagged by what's in them.</p>
        <div className="mt-4 flex justify-center gap-2">
          <button className="rounded-full bg-accent text-accent-deep px-5 py-2.5 text-sm font-medium">Browse files</button>
          <button className="rounded-full border border-border/15 px-5 py-2.5 text-sm hover:bg-foreground/5">Import from Google Drive</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex rounded-full bg-card p-1">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-1.5 text-sm ${filter === f ? "bg-surface font-medium" : "text-muted hover:text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted">{items.length} items · 2.4 GB of 50 GB used</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-4 items-start">
        <div className="stagger grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`lift group text-left rounded-[18px] bg-card p-2 ${selected === m.id ? "ring-2 ring-foreground" : ""}`}
            >
              <div
                className="relative aspect-[9/12] rounded-[12px] overflow-hidden grid place-items-center"
                style={{ background: `linear-gradient(160deg, hsl(${m.hue} 30% 70%), hsl(${m.hue + 30} 25% 40%))` }}
              >
                <Icon name={m.kind === "video" ? "play" : "image"} size={22} className="text-white/90 transition-transform group-hover:scale-110" />
                {m.length && <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white">{m.length}</span>}
                {m.script && <span className="absolute top-2 left-2 grid place-items-center h-6 w-6 rounded-full bg-accent text-accent-deep" title="Linked to a script"><Icon name="link" size={12} /></span>}
              </div>
              <div className="px-1 pt-2 pb-1">
                <div className="text-xs font-medium truncate">{m.name}</div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {m.tags.map((t) => <span key={t} className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-muted">{t}</span>)}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-[28px] bg-card p-6 lg:sticky lg:top-24">
          {sel ? (
            <div key={sel.id} className="animate-pop" style={{ transformOrigin: "top" }}>
              <div className="aspect-video rounded-[18px] mb-4" style={{ background: `linear-gradient(160deg, hsl(${sel.hue} 30% 70%), hsl(${sel.hue + 30} 25% 40%))` }} />
              <div className="font-medium break-all">{sel.name}</div>
              <div className="text-xs text-muted mt-1">{sel.kind === "video" ? `Video · ${sel.length}` : "Image"} · added Oct 4</div>
              <div className="mt-5">
                <div className="text-xs font-medium text-muted mb-1.5">Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  {sel.tags.map((t) => <span key={t} className="rounded-full bg-surface px-2.5 py-1 text-xs">{t}</span>)}
                  <button className="rounded-full border border-dashed border-border/20 px-2.5 py-1 text-xs text-muted">+ tag</button>
                </div>
              </div>
              <div className="mt-5">
                <div className="text-xs font-medium text-muted mb-1.5">Linked script</div>
                <select className="w-full rounded-lg border bg-surface px-3 py-2 text-sm" defaultValue={sel.script}>
                  <option value="">Not linked</option>
                  {MEDIA.filter((m) => m.script).map((m) => <option key={m.id} value={m.script}>{m.script}</option>)}
                </select>
              </div>
              <button className="mt-5 w-full rounded-full bg-accent text-accent-deep py-2.5 text-sm font-medium">Use in a post</button>
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-muted">Select a file to see details, tags and the script it belongs to.</div>
          )}
        </div>
      </div>
    </>
  );
}
