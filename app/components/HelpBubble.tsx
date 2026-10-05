"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "./Icons";
import { HIDDEN_CHROME } from "./nav-config";

export default function HelpBubble() {
  const pathname = usePathname();
  const [hint, setHint] = useState(true);
  const [open, setOpen] = useState(false);
  if (HIDDEN_CHROME.includes(pathname)) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-pop w-80 rounded-[28px] bg-surface border border-border/10 p-5" style={{ transformOrigin: "bottom right" }}>
          <div className="font-heading text-lg">Hi there 👋</div>
          <p className="text-sm text-muted mt-1">Ask anything about planning, hooks or scripts.</p>
          <div className="mt-4 flex items-center gap-2 rounded-full border bg-background px-4 py-2">
            <input placeholder="Type a message…" className="flex-1 bg-transparent text-sm outline-none border-0" />
            <Icon name="arrow" size={16} className="text-muted" />
          </div>
        </div>
      )}
      {hint && !open && (
        <div className="animate-pop relative rounded-[18px] bg-surface border border-border/10 px-4 py-2.5 text-sm" style={{ transformOrigin: "bottom right" }}>
          What can I help you with?
          <button onClick={() => setHint(false)} aria-label="Dismiss" className="absolute -right-2 -top-2 grid place-items-center h-5 w-5 rounded-full bg-card text-muted hover:text-foreground">
            <Icon name="close" size={10} />
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Help"
        className="lift grid place-items-center h-14 w-14 rounded-full bg-accent text-accent-deep"
      >
        <Icon name={open ? "close" : "message"} size={22} />
      </button>
    </div>
  );
}
