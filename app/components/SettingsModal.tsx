"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/lib/auth-actions";
import { Icon, type IconName } from "./Icons";
import { TEAM, PLANS, PLATFORMS } from "@/lib/mock-data";

const TABS: { id: string; label: string; icon: IconName }[] = [
  { id: "account", label: "Account", icon: "user" },
  { id: "team", label: "Team", icon: "users" },
  { id: "billing", label: "Billing", icon: "card" },
  { id: "credits", label: "AI Credits", icon: "sparkle" },
  { id: "ai", label: "AI Provider", icon: "key" },
  { id: "integrations", label: "Integrations", icon: "plug" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "privacy", label: "Privacy", icon: "shield" },
  { id: "language", label: "Language", icon: "lang" },
];

const ACCOUNT_SUB: { id: string; label: string; icon: IconName }[] = [
  { id: "profile", label: "Profile", icon: "user" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "delete", label: "Delete account", icon: "trash" },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[180px_1fr] gap-3 py-5 border-b border-border/10 last:border-0">
      <div className="text-sm font-medium">{label}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function Toggle({ on = false }: { on?: boolean }) {
  const [v, setV] = useState(on);
  return (
    <button onClick={() => setV(!v)} className={`relative h-6 w-11 rounded-full transition-colors ${v ? "bg-accent" : "bg-foreground/15"}`} aria-pressed={v}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-surface transition-all ${v ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function Panel({ tab, sub }: { tab: string; sub: string }) {
  if (tab === "account" && sub === "profile")
    return (
      <>
        <Row label="Profile">
          <div className="flex items-center gap-4">
            <span className="grid place-items-center h-12 w-12 rounded-full bg-accent text-accent-deep font-medium">C</span>
            <span className="font-medium">Creator</span>
            <button className="ml-auto font-medium hover:underline underline-offset-4">Update profile</button>
          </div>
        </Row>
        <Row label="Email addresses">
          <div className="flex items-center gap-2">
            demo@upcreate.app <span className="rounded-full bg-card px-2 py-0.5 text-[11px] text-muted">Primary</span>
          </div>
          <button className="mt-3 text-sm font-medium hover:underline underline-offset-4">+ Add email address</button>
        </Row>
        <Row label="Connected accounts">
          <div className="flex items-center gap-2"><Icon name="globe" size={16} /> Google · demo@upcreate.app</div>
        </Row>
      </>
    );
  if (tab === "account" && sub === "security")
    return (
      <>
        <Row label="Password"><button className="font-medium hover:underline underline-offset-4">Set password</button></Row>
        <Row label="Two-factor auth"><Toggle /></Row>
        <Row label="Active sessions"><span className="text-muted">This device · now</span></Row>
      </>
    );
  if (tab === "account")
    return (
      <Row label="Delete account">
        <p className="text-muted mb-3">Permanently remove your workspace and all content.</p>
        <button className="rounded-full border border-red-700/30 text-red-700 px-4 py-2 text-sm">Delete account</button>
      </Row>
    );
  if (tab === "team")
    return (
      <>
        <div className="flex gap-2 mb-4">
          <input placeholder="Invite by email" className="flex-1 rounded-lg border bg-surface px-3 py-2 text-sm" />
          <select className="rounded-lg border bg-surface px-3 py-2 text-sm">
            <option>Editor</option>
            <option>Strategist</option>
            <option>Client (approve only)</option>
          </select>
          <button className="rounded-full bg-accent text-accent-deep px-4 py-2 text-sm font-medium">Invite</button>
        </div>
        <div className="rounded-[18px] bg-card p-1">
          {TEAM.map((m) => (
            <div key={m.email} className="flex items-center gap-3 rounded-[14px] px-3 py-2.5">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-surface text-sm font-medium">{m.name[0]}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{m.name}</div>
                <div className="text-xs text-muted truncate">{m.email}</div>
              </div>
              <span className="rounded-full bg-surface px-3 py-1 text-xs">{m.role}</span>
            </div>
          ))}
        </div>
        <Row label="Approvals">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted">Require client approval before a post is scheduled</span>
            <Toggle />
          </div>
        </Row>
      </>
    );
  if (tab === "billing")
    return (
      <>
        <div className="grid md:grid-cols-3 gap-3 mb-2">
          {PLANS.map((p) => (
            <div key={p.name} className={`rounded-[18px] p-5 flex flex-col ${p.highlight ? "bg-accent text-accent-deep" : "bg-card"}`}>
              <div className="text-sm font-medium">{p.name}</div>
              <div className="font-heading text-3xl mt-2">{p.price}<span className="text-sm opacity-60">/mo</span></div>
              <div className={`text-xs mt-1 ${p.highlight ? "opacity-70" : "text-muted"}`}>{p.blurb}</div>
              <ul className="mt-4 space-y-1.5 text-xs flex-1">
                {p.features.map((f) => <li key={f} className="flex gap-1.5"><Icon name="check" size={13} /> {f}</li>)}
              </ul>
              <button className={`mt-4 rounded-full py-2 text-sm font-medium ${p.highlight ? "bg-accent-deep text-accent" : "bg-surface"}`}>
                {p.name === "Starter" ? "Current plan" : `Upgrade to ${p.name}`}
              </button>
            </div>
          ))}
        </div>
        <Row label="Trial">Free trial · <span className="text-muted">4 days left, then Starter</span></Row>
        <Row label="Payment method"><button className="font-medium hover:underline underline-offset-4">+ Add card</button></Row>
        <Row label="Invoices"><span className="text-muted">No invoices yet.</span></Row>
      </>
    );
  if (tab === "credits")
    return (
      <Row label="Credits this month">
        <div className="text-3xl font-heading">120 <span className="text-base text-muted">/ 500</span></div>
        <div className="mt-3 h-2 rounded-full bg-foreground/10 overflow-hidden"><div className="bar-grow h-full w-1/4 bg-accent" /></div>
      </Row>
    );
  if (tab === "ai")
    return (
      <Row label="AI provider">
        <p className="text-muted mb-3">Connect Gemini, OpenAI, Anthropic or a custom endpoint for the Generate buttons.</p>
        <Link href="/settings" className="inline-flex rounded-full bg-accent text-accent-deep px-5 py-2.5 text-sm font-medium">Manage AI provider</Link>
      </Row>
    );
  if (tab === "integrations")
    return (
      <>
        {PLATFORMS.map((p) => (
          <Row key={p.id} label={p.label}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted">{p.connected ? `${p.handle} · publishing and analytics sync on` : "Post and pull analytics automatically"}</span>
              {p.connected ? (
                <button className="rounded-full border border-border/15 px-4 py-1.5 text-sm hover:bg-foreground/5">Disconnect</button>
              ) : (
                <button className="rounded-full bg-accent text-accent-deep px-4 py-1.5 text-sm font-medium">Connect</button>
              )}
            </div>
          </Row>
        ))}
        {["ManyChat", "Google Drive", "Notion", "Slack"].map((n) => (
          <Row key={n} label={n}>
            <div className="flex justify-end"><button className="rounded-full border border-border/15 px-4 py-1.5 text-sm hover:bg-foreground/5">Connect</button></div>
          </Row>
        ))}
      </>
    );
  if (tab === "notifications")
    return (
      <>
        <Row label="Batch reminders"><Toggle on /></Row>
        <Row label="Outlier alerts"><Toggle on /></Row>
        <Row label="Weekly summary email"><Toggle /></Row>
        <Row label="Filming day reminder"><Toggle on /></Row>
        <Row label="Post published / failed"><Toggle on /></Row>
      </>
    );
  if (tab === "privacy")
    return <Row label="Usage analytics"><Toggle on /></Row>;
  return (
    <Row label="Language">
      <select className="rounded-lg border bg-surface px-3 py-2 text-sm"><option>English</option><option>Español</option><option>हिन्दी</option></select>
    </Row>
  );
}

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState("account");
  const [sub, setSub] = useState("profile");
  const current = TABS.find((t) => t.id === tab)!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="animate-pop relative flex w-full max-w-5xl h-[min(640px,90vh)] overflow-hidden rounded-[28px] bg-surface"
        style={{ transformOrigin: "center" }}
        onClick={(e) => e.stopPropagation()}
      >
        <aside className="hidden sm:flex w-56 shrink-0 flex-col bg-card p-4">
          <div className="px-2 mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-muted">Settings</div>
          <div className="flex flex-col gap-0.5 overflow-y-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 rounded-full px-3 py-2 text-sm text-left ${tab === t.id ? "bg-accent text-accent-deep font-medium" : "text-foreground/75 hover:bg-foreground/5"}`}
              >
                <Icon name={t.icon} size={16} /> {t.label}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <form action={logoutAction} className="border-t border-border/10 pt-3">
            <button className="flex w-full items-center gap-2.5 rounded-full px-3 py-2 text-sm text-foreground/75 hover:bg-foreground/5">
              <Icon name="logout" size={16} /> Sign out
            </button>
          </form>
        </aside>

        {tab === "account" && (
          <div className="hidden md:block w-56 shrink-0 border-r border-border/10 p-6">
            <h2 className="font-heading text-3xl leading-none">Account</h2>
            <p className="text-sm text-muted mt-2 mb-6">Manage your account info.</p>
            {ACCOUNT_SUB.map((s) => (
              <button
                key={s.id}
                onClick={() => setSub(s.id)}
                className={`flex w-full items-center gap-2.5 rounded-full px-3 py-2 text-sm ${sub === s.id ? "bg-card font-medium" : "text-muted hover:text-foreground"}`}
              >
                <Icon name={s.icon} size={15} /> {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 min-w-0 overflow-y-auto p-6 md:p-8">
          {tab !== "account" && <h2 className="font-heading text-3xl leading-none mb-4">{current.label}</h2>}
          <div key={tab + sub} className="animate-pop" style={{ transformOrigin: "top" }}>
            <Panel tab={tab} sub={sub} />
          </div>
        </div>

        <button onClick={onClose} aria-label="Close settings" className="absolute right-4 top-4 rounded-full p-2 text-muted hover:bg-foreground/5 hover:text-foreground">
          <Icon name="close" size={18} />
        </button>
      </div>
    </div>
  );
}
