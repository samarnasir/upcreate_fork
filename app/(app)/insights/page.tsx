import Link from "next/link";
import { SectionHeader, PageSection } from "@/app/components/ui";
import { Icon } from "@/app/components/Icons";
import { TOP_HOOKS, FORMAT_PERFORMANCE, RECOMMENDATIONS } from "@/lib/mock-data";

export default function InsightsPage() {
  const max = Math.max(...FORMAT_PERFORMANCE.map((f) => f.multiple));
  return (
    <div>
      <SectionHeader
        num="IN"
        title="Insights"
        description="What's actually working for your account, learned from every post that syncs back in, and what to make next."
      />

      <PageSection title="Make next" description="Recommendations based on the last 30 days.">
        <div className="stagger grid md:grid-cols-3 gap-4">
          {RECOMMENDATIONS.map((r, i) => (
            <div key={r.title} className={`rounded-[28px] p-6 flex flex-col ${i === 0 ? "bg-accent text-accent-deep" : "bg-card"}`}>
              <span className={`grid place-items-center h-9 w-9 rounded-full mb-5 ${i === 0 ? "bg-accent-deep/10" : "bg-surface"}`}><Icon name="bolt" size={16} /></span>
              <div className="font-heading text-lg leading-snug">{r.title}</div>
              <p className={`text-sm mt-2 flex-1 ${i === 0 ? "opacity-80" : "text-muted"}`}>{r.body}</p>
              <Link href={r.href} className="lift mt-5 inline-flex items-center gap-1.5 self-start rounded-full bg-surface text-foreground px-4 py-2 text-sm font-medium">
                {r.cta} <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
          ))}
        </div>
      </PageSection>

      <div className="grid lg:grid-cols-2 gap-4">
        <PageSection title="Hooks that perform" className="mb-0">
          <div className="rounded-[28px] bg-card p-2">
            {TOP_HOOKS.map((h, i) => (
              <div key={h.hook} className="flex items-center gap-4 rounded-[18px] px-4 py-3.5 hover:bg-surface">
                <span className="w-5 text-sm text-muted tabular-nums">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{h.hook}</div>
                  <div className="text-xs text-muted mt-0.5">{h.angle} · used {h.uses}x</div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${h.avgMultiple >= 5 ? "bg-accent text-accent-deep" : "bg-foreground/10"}`}>{h.avgMultiple}x</span>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Formats by average multiple" className="mb-0">
          <div className="rounded-[28px] bg-card p-6 space-y-4">
            {FORMAT_PERFORMANCE.map((f) => (
              <div key={f.format}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{f.format}</span>
                  <span className="tabular-nums text-muted">{f.multiple}x</span>
                </div>
                <div className="h-2.5 rounded-full bg-foreground/10 overflow-hidden">
                  <div className="bar-grow h-full rounded-full bg-accent" style={{ width: `${(f.multiple / max) * 100}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted pt-2">Multiple = views ÷ followers at time of posting.</p>
          </div>
        </PageSection>
      </div>
    </div>
  );
}
