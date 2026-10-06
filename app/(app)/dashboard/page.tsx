import Link from "next/link";
import { sql } from "@/lib/db";
import { getBrand } from "@/lib/brand";
import { requireUserId } from "@/lib/auth";
import { Card, Badge, PageSection, Stat } from "@/app/components/ui";
import { NAV_GROUPS } from "@/app/components/nav-config";
import { Icon } from "@/app/components/Icons";
import Quickstart from "@/app/components/Quickstart";

function levelFor(followers: number) {
  if (followers < 1000) return { level: 1, floor: 0, ceil: 1000, name: "Foundation (0 -> 1k)" };
  if (followers < 10000) return { level: 2, floor: 1000, ceil: 10000, name: "Data & Scale (1k -> 10k)" };
  return { level: 3, floor: 10000, ceil: 100000, name: "Personal Brand (10k -> 100k)" };
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await requireUserId();
  const [brand, pillarCounts, conceptCounts, upcoming] = await Promise.all([
    getBrand(userId),
    sql<{ pillar: string; n: number }[]>`
      SELECT pillar, COUNT(*)::int as n FROM calendar_items WHERE user_id = ${userId} GROUP BY pillar
    `,
    sql<{ concept_bucket: string; n: number }[]>`
      SELECT concept_bucket, COUNT(*)::int as n FROM calendar_items WHERE user_id = ${userId} GROUP BY concept_bucket
    `,
    sql<{ id: number; date: string; topic: string; pillar: string; status: string }[]>`
      SELECT * FROM calendar_items WHERE status != 'posted' AND user_id = ${userId} ORDER BY date ASC LIMIT 6
    `,
  ]);

  const level = levelFor(brand.followerCount);
  const progressPct = Math.min(
    100,
    Math.round(((brand.followerCount - level.floor) / (level.ceil - level.floor)) * 100)
  );

  const totalItems = pillarCounts.reduce((s, r) => s + r.n, 0);

  const authorityCount = pillarCounts.find((r) => r.pillar === "authority")?.n ?? 0;
  const authorityPct = totalItems ? Math.round((authorityCount / totalItems) * 100) : 0;
  const journeyPct = totalItems ? 100 - authorityPct : 0;

  const name = brand.nameField.split("|")[0].trim() || "Creator";
  const conceptTotal = conceptCounts.reduce((t, r) => t + r.n, 0);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 mb-12">
        <div className="rounded-[28px] bg-card p-8 md:p-10 flex flex-col justify-between min-h-[240px]">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted">Dashboard</div>
            <h1 className="font-heading text-4xl md:text-[56px] leading-[1] mt-3">Welcome back, {name}</h1>
            <p className="text-muted mt-4 max-w-xl">
              Your content operating system for the next 60-100 videos, built on your growth blueprint.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            <Link href="/calendar" className="rounded-full bg-accent text-accent-deep text-sm font-medium px-5 py-2.5">Plan next batch</Link>
            <Link href="/scripts" className="rounded-full border border-border/15 text-sm px-5 py-2.5 hover:bg-foreground/5">Write a script</Link>
          </div>
        </div>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-accent text-accent-deep p-8 flex flex-col justify-between">
          <div aria-hidden className="drift pointer-events-none absolute -z-10 -right-16 -top-16 h-56 w-56 rounded-full bg-surface/30" />
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] opacity-70">Current level</div>
            <div className="font-heading text-[56px] leading-none mt-3">Level {level.level}</div>
            <div className="text-sm mt-2 opacity-80">{level.name}</div>
          </div>
          <div className="mt-8">
            <div className="h-2 rounded-full bg-accent-deep/15 overflow-hidden">
              <div className="bar-grow h-full bg-accent-deep" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="text-xs mt-2 opacity-80">
              {brand.followerCount.toLocaleString()} / {level.ceil.toLocaleString()} followers · {(level.ceil - brand.followerCount).toLocaleString()} to go
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <Quickstart />
      </div>

      <PageSection title="Content mix" description="How your planned batch tracks against the ratios set in Brand Foundation.">
        <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Planned items" value={totalItems} hint={`Posting ${brand.postingCadence.timesPerWeek}x / week`} />
          <Stat
            label="Authority"
            value={`${authorityPct}%`}
            hint={
              <div>
                <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden mb-2">
                  <div className="bar-grow h-full bg-accent" style={{ width: `${authorityPct}%` }} />
                </div>
                Target {brand.pillarRatio.authority}%
              </div>
            }
          />
          <Stat label="Journey" value={`${journeyPct}%`} hint={`Target ${brand.pillarRatio.journey}%`} />
          <Stat
            label="Concept split"
            value={conceptTotal}
            hint={
              <div className="flex flex-wrap gap-1.5">
                {["proven", "double_down", "experimental"].map((k) => (
                  <Badge key={k} tone={k === "proven" ? "accent" : "default"}>
                    {k.replace("_", " ")} {conceptCounts.find((r) => r.concept_bucket === k)?.n ?? 0}
                  </Badge>
                ))}
              </div>
            }
          />
        </div>
      </PageSection>

      <PageSection
        title="Upcoming in the batch"
        actions={<Link href="/calendar" className="text-sm font-medium hover:underline underline-offset-4">Open calendar →</Link>}
      >
        <Card>
          {upcoming.length === 0 ? (
            <div className="py-10 text-center">
              <div className="font-heading text-xl">Nothing scheduled yet</div>
              <p className="text-sm text-muted mt-2">Plan your first batch to see it here.</p>
              <Link href="/calendar" className="inline-block mt-5 rounded-full bg-accent text-accent-deep text-sm font-medium px-5 py-2.5">Go to calendar</Link>
            </div>
          ) : (
            <ul className="divide-y divide-border/10">
              {upcoming.map((item) => (
                <li key={item.id} className="py-3 flex items-center justify-between text-sm">
                  <span>
                    <span className="text-muted mr-3 tabular-nums">{item.date}</span>
                    {item.topic || "(untitled topic)"}
                  </span>
                  <span className="flex gap-2">
                    <Badge>{item.pillar}</Badge>
                    <Badge tone="accent">{item.status}</Badge>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </PageSection>

      {NAV_GROUPS.filter((g) => g.title !== "Overview").map((g) => (
        <PageSection key={g.title} title={g.title}>
          <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.items.map((l) => (
              <Link key={l.href} href={l.href} className="lift group rounded-[28px] bg-card p-6 hover:bg-accent hover:text-accent-deep">
                <span className="grid place-items-center h-10 w-10 rounded-full bg-surface text-foreground mb-6">
                  <Icon name={l.icon} />
                </span>
                <div className="font-heading text-lg flex items-center justify-between">{l.label}<span className="arrow text-muted group-hover:text-accent-deep">→</span></div>
                <div className="text-sm text-muted group-hover:text-accent-deep/70 mt-1">{DESCRIPTIONS[l.href]}</div>
                {l.tabs && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {l.tabs.map((t) => (
                      <span key={t.href} className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-foreground">{t.label}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </PageSection>
      ))}
    </div>
  );
}

const DESCRIPTIONS: Record<string, string> = {
  "/brand": "Niche, story, visual identity, profile",
  "/calendar": "Plan batches and track ratios",
  "/research": "5x outlier log and keyword bank",
  "/hooks": "Hook stacks, 7 angles, templates",
  "/scripts": "Write, improve and browse scripts in one place",
  "/improve": "Rewrite and tighten any script",
  "/carousels": "Build carousels and browse saved ones",
  "/production": "Formats, equipment, shot lists",
  "/funnel": "TOFU/MOFU/BOFU and captions",
  "/analytics": "Top performers and double-downs",
  "/library": "Ready-made script library",
  "/carousel-library": "Saved and template carousels",
  "/prompts": "Every AI prompt in one place",
};
