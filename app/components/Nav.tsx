"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Icon } from "./Icons";
import { NAV_GROUPS, HIDDEN_CHROME } from "./nav-config";

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      {NAV_GROUPS.map((g) => (
        <div key={g.title}>
          <div className="px-3 mb-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-muted">{g.title}</div>
          <div className="flex flex-col gap-0.5">
            {g.items.map((s) => {
              const active = pathname === s.href;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm transition-all duration-200 hover:translate-x-0.5 ${
                    active ? "bg-accent text-accent-deep font-medium" : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <Icon name={s.icon} size={16} />
                  {s.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (HIDDEN_CHROME.includes(pathname)) return null;

  return (
    <>
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-card px-4 py-6 overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 px-2">
              <Logo size={32} />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-muted">
                <Icon name="close" size={20} />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden fixed left-4 top-3.5 z-40 rounded-full p-2 text-foreground hover:bg-foreground/5"
      >
        <Icon name="menu" size={20} />
      </button>

      <nav className="hidden md:flex w-60 shrink-0 flex-col bg-card px-3 py-6 sticky top-0 h-screen overflow-y-auto no-scrollbar">
        <Link href="/dashboard" className="mb-8 px-3">
          <Logo size={36} />
        </Link>
        <NavLinks pathname={pathname} />
      </nav>
    </>
  );
}
