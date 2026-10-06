"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/auth-actions";
import { Icon } from "./Icons";
import SettingsModal from "./SettingsModal";
import { HIDDEN_CHROME, findItem } from "./nav-config";

const NOTIFICATIONS = [
  { title: "Batch reminder", body: "3 videos are scheduled to film this week.", time: "2h" },
  { title: "Outlier spotted", body: "A post in your niche hit 8.4x its average views.", time: "5h" },
  { title: "Script saved", body: "\"3 pricing mistakes\" was added to your Script Bank.", time: "1d" },
];

function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);
  return ref;
}

const iconBtn = "relative grid place-items-center h-10 w-10 rounded-full text-foreground hover:bg-foreground/5";
const panel = "animate-pop absolute right-0 top-12 z-50 rounded-[18px] border border-border/10 bg-surface p-2";

export default function Topbar() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<null | "notif" | "profile">(null);
  const [dark, setDark] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const ref = useClickOutside(() => setMenu(null));

  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("upcreate_theme", next ? "dark" : "light");
    } catch {}
  }

  if (HIDDEN_CHROME.includes(pathname)) return null;

  const found = findItem(pathname);
  const group = found?.group;
  const item = found?.item;

  return (
    <>
    <div className="flex items-center justify-between gap-3 bg-accent/25 px-4 md:px-10 h-10 text-sm">
      <span className="flex items-center gap-2">
        <Icon name="clock" size={16} />
        <span className="font-medium">Free trial</span>
        <span className="text-muted">· 4d 7h left</span>
      </span>
      <a href="#upgrade" className="rounded-full bg-accent text-accent-deep px-3 py-1 text-xs font-medium hover:brightness-95">Upgrade</a>
    </div>
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-background/90 backdrop-blur px-4 md:px-10 h-16 border-b border-border/10">
      <div className="pl-12 md:pl-0 text-sm text-muted truncate">
        {group && (
          <>
            {group.title} <span className="mx-1.5">/</span>
            <span className={found?.tab ? "" : "text-foreground"}>{item?.label}</span>
            {found?.tab && (<><span className="mx-1.5">/</span><span className="text-foreground">{found.tab.label}</span></>)}
          </>
        )}
        {pathname === "/settings" && <span className="text-foreground">Settings</span>}
      </div>

      <div ref={ref} className="flex items-center gap-1">
        <div className="relative">
          <button className={`${iconBtn} bell`} aria-label="Notifications" onClick={() => setMenu(menu === "notif" ? null : "notif")}>
            <Icon name="bell" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background pulse-dot" />
          </button>
          {menu === "notif" && (
            <div className={`${panel} w-80`}>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">Notifications</span>
                <span className="text-xs text-muted">{NOTIFICATIONS.length} new</span>
              </div>
              {NOTIFICATIONS.map((n) => (
                <div key={n.title} className="flex gap-3 rounded-xl px-3 py-2.5 hover:bg-foreground/5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2 text-sm font-medium">
                      {n.title}
                      <span className="text-xs font-normal text-muted">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">{n.body}</p>
                  </div>
                </div>
              ))}
              <button className="w-full rounded-xl px-3 py-2 text-xs text-muted hover:text-foreground">Mark all as read</button>
            </div>
          )}
        </div>

        <button className={iconBtn} aria-label="Toggle dark mode" onClick={toggleTheme}>
          <span key={dark ? "sun" : "moon"} className="animate-pop grid place-items-center"><Icon name={dark ? "sun" : "moon"} /></span>
        </button>

        <button onClick={() => setSettingsOpen(true)} className={iconBtn} aria-label="Settings">
          <Icon name="settings" />
        </button>

        <div className="relative ml-2">
          <button
            onClick={() => setMenu(menu === "profile" ? null : "profile")}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-foreground/5"
            aria-label="Profile"
          >
            <span className="grid place-items-center h-8 w-8 rounded-full bg-accent text-accent-deep text-sm font-medium">C</span>
            <span className="hidden sm:block text-sm font-medium">Creator</span>
            <Icon name="chevron" size={14} className="text-muted" />
          </button>
          {menu === "profile" && (
            <div className={`${panel} w-60`}>
              <div className="px-3 py-2.5 border-b border-border/10 mb-1">
                <div className="text-sm font-medium">Creator</div>
                <div className="text-xs text-muted">demo@upcreate.app</div>
              </div>
              <Link href="/brand" onClick={() => setMenu(null)} className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-foreground/5">
                <Icon name="user" size={16} /> Brand profile
              </Link>
              <button onClick={() => { setMenu(null); setSettingsOpen(true); }} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-foreground/5">
                <Icon name="settings" size={16} /> Settings
              </button>
              <form action={logoutAction}>
                <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-foreground/5">
                  <Icon name="logout" size={16} /> Log out
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
    {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </>
  );
}
