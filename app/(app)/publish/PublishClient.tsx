"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { PLATFORMS, QUEUE, PUBLISHED, BEST_TIMES, type Platform } from "@/lib/mock-data";
import { PageSection } from "@/app/components/ui";
import { Icon } from "@/app/components/Icons";

const PLATFORM_DOT: Record<Platform, string> = { instagram: "IG", tiktok: "TT", youtube: "YT" };
const SLOT_LABELS = ["8am", "12pm", "6pm", "9pm"];

function PlatformChips({ ids }: { ids: Platform[] }) {
  return (
    <span className="flex gap-1">
      {ids.map((p) => (
        <span key={p} className="grid place-items-center h-6 w-6 rounded-full bg-card text-[9px] font-medium">{PLATFORM_DOT[p]}</span>
      ))}
    </span>
  );
}

function Composer({ onClose }: { onClose: () => void }) {
  const [targets, setTargets] = useState<Platform[]>(["instagram"]);
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="animate-pop w-full max-w-2xl rounded-[28px] bg-surface p-6 md:p-8" style={{ transformOrigin: "center" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl">Schedule a post</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-muted hover:bg-foreground/5"><Icon name="close" size={18} /></button>
        </div>
        <div className="grid md:grid-cols-[180px_1fr] gap-6">
          <div className="aspect-[9/16] rounded-[18px] bg-card grid place-items-center text-muted border border-dashed border-border/20">
            <div className="text-center text-xs px-3">
              <Icon name="upload" size={22} className="mx-auto mb-2" />
              Drop video or pick from Media Bank
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted mb-1.5 block">Script</label>
              <select className="w-full rounded-lg border bg-surface px-3 py-2.5 text-sm">
                <option>Comment GUIDE for my pricing sheet</option>
                <option>The 5-line bio framework</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1.5 block">Caption</label>
              <textarea rows={4} className="w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" defaultValue={"Most new consultants underprice by 40%.\nComment GUIDE and I'll DM you my pricing sheet.\n#consulting #pricing #founders"} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1.5 block">Post to</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.filter((p) => p.connected).map((p) => {
                  const on = targets.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => setTargets(on ? targets.filter((t) => t !== p.id) : [...targets, p.id])}
                      className={`rounded-full px-4 py-2 text-sm border ${on ? "bg-accent text-accent-deep border-accent font-medium" : "border-border/15 hover:bg-foreground/5"}`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted mb-1.5 block">Date</label>
                <input type="date" defaultValue="2026-10-08" className="w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1.5 block">Time</label>
                <input type="time" defaultValue="18:30" className="w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" />
              </div>
            </div>
            <p className="text-xs text-muted flex items-center gap-1.5"><Icon name="bolt" size={12} /> Suggested: Thu 6:30 PM, your best-performing slot.</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="rounded-full border border-border/15 px-5 py-2.5 text-sm hover:bg-foreground/5">Save draft</button>
          <button onClick={onClose} className="rounded-full bg-accent text-accent-deep px-5 py-2.5 text-sm font-medium">Schedule</button>
        </div>
      </div>
    </div>
  );
}

export default function PublishClient() {
  const [composing, setComposing] = useState(false);

  return (
    <>
      <PageSection title="Connected accounts">
        <div className="stagger grid sm:grid-cols-3 gap-4">
          {PLATFORMS.map((p) => (
            <div key={p.id} className="rounded-[28px] bg-card p-6 flex items-center gap-4">
              <span className="grid place-items-center h-11 w-11 rounded-full bg-surface text-xs font-medium">{PLATFORM_DOT[p.id]}</span>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{p.label}</div>
                <div className="text-sm text-muted truncate">{p.connected ? `${p.handle} · ${p.followers} followers` : "Not connected"}</div>
              </div>
              {p.connected ? (
                <span className="flex items-center gap-1.5 text-xs text-muted"><span className="h-2 w-2 rounded-full bg-accent pulse-dot" /> Live</span>
              ) : (
                <button className="rounded-full bg-accent text-accent-deep px-4 py-1.5 text-sm font-medium">Connect</button>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Queue"
        description="Posts go out automatically at the scheduled time."
        actions={
          <button onClick={() => setComposing(true)} className="flex items-center gap-1.5 rounded-full bg-accent text-accent-deep px-5 py-2.5 text-sm font-medium">
            <Icon name="plus" size={14} /> Schedule post
          </button>
        }
      >
        <div className="rounded-[28px] bg-card p-2">
          {QUEUE.map((q) => (
            <div key={q.id} className="flex flex-wrap items-center gap-4 rounded-[18px] px-4 py-3.5 hover:bg-surface">
              <span className="grid place-items-center h-14 w-10 shrink-0 rounded-lg text-white" style={{ background: `linear-gradient(170deg, hsl(${q.id * 70} 40% 60%), hsl(${q.id * 70 - 20} 35% 20%))` }}><Icon name="play" size={14} /></span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{q.title}</div>
                <div className="text-xs text-muted mt-0.5">{q.when}</div>
              </div>
              <PlatformChips ids={q.platforms} />
              <span className={`rounded-full px-3 py-1 text-xs ${q.status === "Scheduled" ? "bg-accent text-accent-deep" : q.status === "Needs video" ? "bg-deep-charcoal text-off-white" : "bg-foreground/10"}`}>
                {q.status}
              </span>
            </div>
          ))}
        </div>
      </PageSection>

      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        <PageSection title="Recently published" className="mb-0">
          <div className="rounded-[28px] bg-card p-2">
            {PUBLISHED.map((p) => (
              <div key={p.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_repeat(3,72px)_64px] items-center gap-3 rounded-[18px] px-4 py-3.5 hover:bg-surface text-sm">
                <div className="min-w-0 flex items-center gap-3">
                  <span className="h-14 w-10 shrink-0 rounded-lg" style={{ background: `linear-gradient(170deg, hsl(${p.hue} 40% 60%), hsl(${p.hue - 20} 35% 20%))` }} />
                  <span className="min-w-0">
                  <div className="font-medium truncate">{p.title}</div>
                  <div className="text-xs text-muted">{p.when}</div>
                  </span>
                </div>
                <span className="hidden sm:block text-right tabular-nums">{p.views.toLocaleString()}</span>
                <span className="hidden sm:block text-right tabular-nums text-muted">{p.likes}</span>
                <span className="hidden sm:block text-right tabular-nums text-muted">{p.comments}</span>
                <span className={`justify-self-end rounded-full px-2.5 py-0.5 text-xs font-medium ${p.multiple >= 5 ? "bg-accent text-accent-deep" : "bg-foreground/10"}`}>{p.multiple}x</span>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Best times to post" className="mb-0">
          <div className="rounded-[28px] bg-card p-6">
            <div className="grid grid-cols-[36px_repeat(4,1fr)] gap-1.5 text-[11px] text-muted">
              <span />
              {SLOT_LABELS.map((l) => <span key={l} className="text-center">{l}</span>)}
              {BEST_TIMES.map((row) => (
                <div key={row.day} className="contents">
                  <span className="self-center">{row.day}</span>
                  {row.slots.map((v, i) => (
                    <span key={i} className="h-7 rounded-md" style={{ background: `color-mix(in srgb, var(--accent) ${v * 20}%, var(--surface))` }} />
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-4">Based on when your followers are most active over the last 30 days.</p>
          </div>
        </PageSection>
      </div>

      {composing && createPortal(<Composer onClose={() => setComposing(false)} />, document.body)}
    </>
  );
}
