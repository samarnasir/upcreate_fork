export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] bg-card p-6 md:p-7 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({
  num,
  title,
  description,
}: {
  num: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10" data-section={num}>
      <h1 className="font-heading text-3xl md:text-[44px] leading-[1.05]">{title}</h1>
      {description && <p className="text-muted mt-3 max-w-2xl text-sm md:text-base">{description}</p>}
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" | "warn" }) {
  const toneClass =
    tone === "accent"
      ? "bg-accent text-accent-deep"
      : tone === "warn"
      ? "bg-deep-charcoal text-off-white"
      : "bg-foreground/10 text-foreground";
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClass}`}>{children}</span>;
}

export function DeleteForm({ action, id }: { action: (fd: FormData) => Promise<void>; id: number }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button className="text-xs text-red-700 hover:text-red-700">Delete</button>
    </form>
  );
}

export function SubTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-border/15 pb-3">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
            active === t.id ? "bg-accent text-accent-deep font-medium" : "text-muted hover:text-foreground"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// Labelled group inside a page: a small heading row with optional actions,
// then its content. Keeps pages reading as distinct sections.
export function PageSection({
  title,
  description,
  actions,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mb-12 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="font-heading text-xl md:text-2xl">{title}</h2>
          {description && <p className="text-sm text-muted mt-1 max-w-2xl">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="rounded-[28px] bg-card p-6">
      <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted">{label}</div>
      <div className="font-heading text-4xl mt-3 leading-none">{value}</div>
      {hint && <div className="text-xs text-muted mt-3">{hint}</div>}
    </div>
  );
}
