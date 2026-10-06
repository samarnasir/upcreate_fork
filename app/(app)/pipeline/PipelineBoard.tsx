"use client";

import { useState } from "react";
import { PIPELINE, STAGES, type PipelineCard, type Stage } from "@/lib/mock-data";
import { Icon } from "@/app/components/Icons";

export default function PipelineBoard() {
  const [cards, setCards] = useState<PipelineCard[]>(PIPELINE);
  const [dragId, setDragId] = useState<number | null>(null);
  const [over, setOver] = useState<Stage | null>(null);
  const [filter, setFilter] = useState<"all" | "authority" | "journey">("all");

  function drop(stage: Stage) {
    if (dragId === null) return;
    setCards((cs) => cs.map((c) => (c.id === dragId ? { ...c, stage } : c)));
    setDragId(null);
    setOver(null);
  }

  const visible = cards.filter((c) => filter === "all" || c.pillar === filter);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex rounded-full bg-card p-1">
          {(["all", "authority", "journey"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm capitalize ${filter === f ? "bg-surface font-medium" : "text-muted hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span>{visible.length} videos</span>
          <button className="flex items-center gap-1.5 rounded-full bg-accent text-accent-deep px-4 py-2 font-medium">
            <Icon name="plus" size={14} /> New idea
          </button>
        </div>
      </div>

      <div data-tour="pipeline-board" className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {STAGES.map((stage) => {
          const col = visible.filter((c) => c.stage === stage.id);
          return (
            <div
              key={stage.id}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(stage.id);
              }}
              onDragLeave={() => setOver(null)}
              onDrop={() => drop(stage.id)}
              className={`w-72 shrink-0 rounded-[28px] p-3 transition-colors ${over === stage.id ? "bg-accent/30" : "bg-card"}`}
            >
              <div className="flex items-center justify-between px-2 py-2 mb-1">
                <span className="text-sm font-medium">{stage.label}</span>
                <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted tabular-nums">{col.length}</span>
              </div>
              <div className="flex flex-col gap-2 min-h-24">
                {col.map((c) => (
                  <div
                    key={c.id}
                    draggable
                    onDragStart={() => setDragId(c.id)}
                    onDragEnd={() => setDragId(null)}
                    className={`lift cursor-grab active:cursor-grabbing rounded-[18px] bg-surface p-4 ${dragId === c.id ? "opacity-40" : ""}`}
                  >
                    <div className="text-sm font-medium leading-snug">{c.title}</div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] ${c.pillar === "authority" ? "bg-accent text-accent-deep" : "bg-foreground/10"}`}>{c.pillar}</span>
                      <span className="rounded-full bg-foreground/5 px-2 py-0.5 text-[11px] text-muted">{c.format}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted">
                      <span className="flex items-center gap-1"><Icon name="clock" size={12} /> {c.due}</span>
                      <span className="grid place-items-center h-6 w-6 rounded-full bg-card text-[10px] font-medium text-foreground" title={c.assignee}>
                        {c.assignee[0]}
                      </span>
                    </div>
                  </div>
                ))}
                {col.length === 0 && <div className="rounded-[18px] border border-dashed border-border/15 py-6 text-center text-xs text-muted">Drop here</div>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
