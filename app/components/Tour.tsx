"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { TOUR, type TourStep } from "./tour-steps";
import { Icon } from "./Icons";

type TourApi = { start: (steps?: TourStep[]) => void; startPage: () => void };
const TourContext = createContext<TourApi>({ start: () => {}, startPage: () => {} });
export const useTour = () => useContext(TourContext);

// Resolve a step target to an element. "h:<text>" finds a heading starting
// with that text and highlights the card or section that owns it.
function resolve(target: string): HTMLElement | null {
  if (!target.startsWith("h:")) return document.querySelector<HTMLElement>(target);
  const text = target.slice(2).toLowerCase();
  const h = [...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")].find((el) =>
    (el.textContent ?? "").trim().toLowerCase().startsWith(text)
  );
  if (!h) return null;
  const card = h.closest<HTMLElement>('[class*="rounded-[28px]"]');
  const section = h.closest<HTMLElement>("section");
  if (card && section) return section.contains(card) ? card : section;
  return card ?? section ?? h.parentElement;
}

const PAD = 8;
const TIP_W = 340;

export function TourProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [steps, setSteps] = useState<TourStep[] | null>(null);
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [ready, setReady] = useState(false);
  const elRef = useRef<HTMLElement | null>(null);

  const step = steps?.[i];

  const start = useCallback((s?: TourStep[]) => {
    setSteps(s ?? TOUR);
    setI(0);
  }, []);
  const startPage = useCallback(() => {
    const pageSteps = TOUR.filter((s) => s.route === pathname && s.target);
    start(pageSteps.length ? pageSteps : TOUR);
  }, [pathname, start]);
  const close = useCallback(() => {
    setSteps(null);
    setRect(null);
    try { localStorage.setItem("upcreate_tour_done", "1"); } catch {}
  }, []);

  // First visit: offer the full tour automatically.
  useEffect(() => {
    if (pathname !== "/dashboard") return;
    try {
      if (localStorage.getItem("upcreate_tour_done")) return;
    } catch {
      return;
    }
    const t = setTimeout(() => start(), 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate to the step's page, then wait for its target to appear.
  useEffect(() => {
    if (!step) return;
    setReady(false);
    if (step.route !== pathname) {
      router.push(step.route);
      return;
    }
    if (!step.target) {
      elRef.current = null;
      setRect(null);
      setReady(true);
      return;
    }
    let tries = 0;
    const find = () => {
      const el = resolve(step.target!);
      if (el) {
        elRef.current = el;
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        setTimeout(() => {
          setRect(el.getBoundingClientRect());
          setReady(true);
        }, 350);
      } else if (tries++ < 25) {
        setTimeout(find, 120);
      } else {
        elRef.current = null;
        setRect(null);
        setReady(true);
      }
    };
    find();
  }, [step, pathname, router]);

  // Keep the spotlight glued to its element on scroll and resize.
  useLayoutEffect(() => {
    if (!steps) return;
    const update = () => elRef.current && setRect(elRef.current.getBoundingClientRect());
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [steps]);

  useEffect(() => {
    if (!steps) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setI((x) => (x < steps.length - 1 ? x + 1 : x));
      if (e.key === "ArrowLeft") setI((x) => Math.max(0, x - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [steps, close]);

  let overlay: React.ReactNode = null;
  if (steps && step && ready && typeof document !== "undefined") {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const r = rect;
    let tipStyle: React.CSSProperties;
    let arrow: "top" | "bottom" | "left" | "right" | null = null;
    const w = Math.min(TIP_W, vw - 32);

    if (!r) {
      tipStyle = { left: (vw - w) / 2, top: vh / 2 - 120, width: w };
    } else {
      const spaceBelow = vh - r.bottom;
      const spaceRight = vw - r.right;
      if (r.height > vh * 0.55 && spaceRight > w + 32) {
        tipStyle = { left: r.right + 16, top: Math.min(Math.max(16, r.top + 24), vh - 260), width: w };
        arrow = "left";
      } else if (spaceBelow > 230) {
        tipStyle = { left: Math.min(Math.max(16, r.left + r.width / 2 - w / 2), vw - w - 16), top: r.bottom + PAD + 14, width: w };
        arrow = "top";
      } else if (r.top > 230) {
        tipStyle = { left: Math.min(Math.max(16, r.left + r.width / 2 - w / 2), vw - w - 16), bottom: vh - r.top + PAD + 14, width: w };
        arrow = "bottom";
      } else {
        tipStyle = { left: (vw - w) / 2, top: vh - 260, width: w };
      }
    }

    const arrowLeft = r && (arrow === "top" || arrow === "bottom")
      ? Math.min(Math.max(20, r.left + r.width / 2 - (tipStyle.left as number) - 8), w - 36)
      : 0;

    overlay = createPortal(
      <div className="fixed inset-0 z-[90]" aria-live="polite">
        {/* click-catcher */}
        <div className="absolute inset-0" onClick={close} />
        {r ? (
          <div
            className="tour-spot pointer-events-none absolute rounded-[22px]"
            style={{ left: r.left - PAD, top: r.top - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 }}
          />
        ) : (
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        )}

        <div
          key={i}
          role="dialog"
          aria-label={step.title}
          className="animate-pop absolute rounded-[22px] bg-accent text-accent-deep p-5"
          style={{ ...tipStyle, transformOrigin: arrow === "bottom" ? "bottom center" : "top center" }}
          onClick={(e) => e.stopPropagation()}
        >
          {arrow && (
            <span
              className="absolute h-4 w-4 rotate-45 bg-accent"
              style={
                arrow === "top"
                  ? { top: -7, left: arrowLeft }
                  : arrow === "bottom"
                  ? { bottom: -7, left: arrowLeft }
                  : { left: -7, top: 28 }
              }
            />
          )}
          <div className="relative">
            <div className="flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.1em] opacity-70">
              <span>{step.chapter}</span>
              <span className="tabular-nums">{i + 1} / {steps.length}</span>
            </div>
            <h3 className="font-heading text-lg mt-2 leading-snug">{step.title}</h3>
            <p className="text-sm mt-1.5 leading-relaxed opacity-85">{step.body}</p>
            <div className="mt-4 h-1 rounded-full bg-accent-deep/15 overflow-hidden">
              <div className="h-full bg-accent-deep transition-[width] duration-300" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button onClick={close} className="text-xs font-medium opacity-70 hover:opacity-100">Skip tour</button>
              <div className="flex gap-2">
                {i > 0 && (
                  <button onClick={() => setI(i - 1)} className="rounded-full border border-accent-deep/20 px-4 py-1.5 text-sm font-medium hover:bg-accent-deep/5">
                    Back
                  </button>
                )}
                <button
                  onClick={() => (i < steps.length - 1 ? setI(i + 1) : close())}
                  className="flex items-center gap-1 rounded-full bg-accent-deep text-accent px-4 py-1.5 text-sm font-medium"
                  style={{ backgroundImage: "none" }}
                >
                  {i < steps.length - 1 ? <>Next <Icon name="arrow" size={13} /></> : "Finish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <TourContext.Provider value={{ start, startPage }}>
      {children}
      {overlay}
    </TourContext.Provider>
  );
}
