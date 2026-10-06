"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTour } from "./Tour";
import { Icon } from "./Icons";

const SHORTCUTS = [
  ["Ctrl / ⌘ + K", "Search everything"],
  ["→  /  ←", "Next / previous tour step"],
  ["Esc", "Close any dialog or the tour"],
  ["↑  /  ↓ then Enter", "Pick a search result"],
];

export default function HelpMenu() {
  const { start, startPage } = useTour();
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const item = "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-foreground/5";

  return (
    <div ref={ref} className="relative" data-tour="help-menu">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium hover:bg-foreground/5"
      >
        <Icon name="help" size={14} /> Help
      </button>
      {open && (
        <div className="animate-pop absolute right-0 top-9 z-50 w-72 rounded-[18px] border border-border/10 bg-surface p-2">
          <button className={item} onClick={() => { setOpen(false); start(); }}>
            <span className="grid place-items-center h-8 w-8 shrink-0 rounded-full bg-accent text-accent-deep"><Icon name="map" size={15} /></span>
            <span>
              <span className="block text-sm font-medium">Full product tour</span>
              <span className="block text-xs text-muted">Every page and feature, step by step (about 5 minutes)</span>
            </span>
          </button>
          <button className={item} onClick={() => { setOpen(false); startPage(); }}>
            <span className="grid place-items-center h-8 w-8 shrink-0 rounded-full bg-card"><Icon name="eye" size={15} /></span>
            <span>
              <span className="block text-sm font-medium">Tour this page</span>
              <span className="block text-xs text-muted">Just the features on the page you&apos;re on</span>
            </span>
          </button>
          <button className={item} onClick={() => { setOpen(false); setKeys(true); }}>
            <span className="grid place-items-center h-8 w-8 shrink-0 rounded-full bg-card"><Icon name="command" size={15} /></span>
            <span>
              <span className="block text-sm font-medium">Keyboard shortcuts</span>
              <span className="block text-xs text-muted">Move around faster</span>
            </span>
          </button>
          <a href="#help-center" className={item}>
            <span className="grid place-items-center h-8 w-8 shrink-0 rounded-full bg-card"><Icon name="book" size={15} /></span>
            <span>
              <span className="block text-sm font-medium">Help center</span>
              <span className="block text-xs text-muted">Guides and the full playbook</span>
            </span>
          </a>
        </div>
      )}
      {keys &&
        createPortal(
          <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-4" onClick={() => setKeys(false)}>
            <div className="animate-pop w-full max-w-sm rounded-[28px] bg-surface p-6" style={{ transformOrigin: "center" }} onClick={(e) => e.stopPropagation()}>
              <h2 className="font-heading text-xl mb-4">Keyboard shortcuts</h2>
              {SHORTCUTS.map(([k, d]) => (
                <div key={k} className="flex items-center justify-between gap-4 border-b border-border/10 py-2.5 text-sm last:border-0">
                  <span className="text-muted">{d}</span>
                  <kbd className="rounded-md bg-card px-2 py-0.5 text-xs font-sans">{k}</kbd>
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
