"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Icon, type IconName } from "./Icons";
import { NAV_GROUPS, HIDDEN_CHROME } from "./nav-config";

const FOOTER_LINKS: { href: string; label: string; icon: IconName }[] = [
  { href: "#refer", label: "Refer & Earn", icon: "gift" },
  { href: "#guide", label: "Guide", icon: "map" },
  { href: "#feedback", label: "Feedback", icon: "message" },
];

function NavLinks({ pathname, collapsed, onNavigate }: { pathname: string; collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      {NAV_GROUPS.map((g) => (
        <div key={g.title}>
          {collapsed ? (
            <div className="mx-auto mb-2 h-px w-6 bg-border/10" />
          ) : (
            <div className="px-3 mb-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-muted">{g.title}</div>
          )}
          <div className="flex flex-col gap-0.5">
            {g.items.map((s) => {
              const active = pathname === s.href;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={onNavigate}
                  title={collapsed ? s.label : undefined}
                  className={`flex items-center gap-3 rounded-full py-2 text-sm transition-all duration-200 ${
                    collapsed ? "justify-center px-0" : "px-3 hover:translate-x-0.5"
                  } ${active ? "bg-accent text-accent-deep font-medium" : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"}`}
                >
                  <Icon name={s.icon} size={16} />
                  {!collapsed && s.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Footer({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="mt-6 pt-4 border-t border-border/10 flex flex-col gap-0.5">
      <a
        href="#upgrade"
        title={collapsed ? "Upgrade" : undefined}
        className={`mb-2 flex items-center gap-3 rounded-full bg-surface py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-deep ${collapsed ? "justify-center" : "px-3"}`}
      >
        <Icon name="dollar" size={16} />
        {!collapsed && "Upgrade to Pro"}
      </a>
      {FOOTER_LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          title={collapsed ? l.label : undefined}
          className={`flex items-center gap-3 rounded-full py-2 text-sm text-foreground/75 hover:bg-foreground/5 hover:text-foreground ${collapsed ? "justify-center" : "px-3"}`}
        >
          <Icon name={l.icon} size={16} />
          {!collapsed && l.label}
        </a>
      ))}
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("upcreate_sidebar") === "collapsed");
    } catch {}
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem("upcreate_sidebar", next ? "collapsed" : "open");
    } catch {}
  }

  if (HIDDEN_CHROME.includes(pathname)) return null;

  return (
    <>
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <div className="animate-pop absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-card px-4 py-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8 px-2">
              <Logo size={32} />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-muted">
                <Icon name="close" size={20} />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
            <Footer />
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden fixed left-4 top-[3.4rem] z-40 rounded-full p-2 text-foreground hover:bg-foreground/5"
      >
        <Icon name="menu" size={20} />
      </button>

      <nav
        className={`hidden md:flex shrink-0 flex-col bg-card py-5 sticky top-0 h-screen overflow-y-auto transition-[width] duration-300 ${
          collapsed ? "w-[76px] px-3" : "w-64 px-3"
        }`}
      >
        <div className={`flex items-center mb-6 ${collapsed ? "flex-col gap-3" : "justify-between pl-2"}`}>
          <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
            {collapsed ? (
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-accent text-accent-deep font-medium">U</span>
            ) : (
              <Logo size={34} />
            )}
          </Link>
          <button onClick={toggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="rounded-lg p-1.5 text-muted hover:bg-foreground/5 hover:text-foreground">
            <Icon name="sidebar" size={18} className={collapsed ? "rotate-180" : ""} />
          </button>
        </div>

        {!collapsed && (
          <button className="mb-6 flex items-center gap-3 rounded-[18px] bg-surface p-2.5 text-left hover:bg-foreground/5">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-deep-charcoal text-off-white text-xs font-medium">CW</span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium truncate">Creator Workspace</span>
              <span className="block text-xs text-muted">Free trial</span>
            </span>
            <Icon name="chevron" size={14} className="text-muted" />
          </button>
        )}

        <NavLinks pathname={pathname} collapsed={collapsed} />
        <div className="flex-1" />
        <Footer collapsed={collapsed} />
      </nav>
    </>
  );
}
