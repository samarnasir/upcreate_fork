export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] bg-card p-6 md:p-8 ${className}`}>
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
    <div className="mb-8">
      <div className="inline-block rounded-full bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] mb-4">Section {num}</div>
      <h1 className="font-heading text-4xl md:text-6xl leading-none">{title}</h1>
      {description && <p className="text-muted mt-2 max-w-2xl text-sm md:text-base">{description}</p>}
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
