import { Icon } from "./Icons";

export type Reel = {
  handle: string;
  hook: string;
  views: string;
  multiple?: number;
  hue: number;
  style?: "caption" | "bold" | "split";
  label?: string;
};

// A vertical 9:16 reel mock: gradient "footage", on-screen hook text in one of
// three common overlay styles, and the engagement rail on the right.
export default function ReelCard({ reel, size = "md", footer }: { reel: Reel; size?: "sm" | "md"; footer?: React.ReactNode }) {
  const { hook, hue, style = "caption" } = reel;
  return (
    <div className={`lift group shrink-0 ${size === "sm" ? "w-40" : "w-full"}`}>
      <div
        className="relative aspect-[9/16] overflow-hidden rounded-[18px] text-white"
        style={{
          background: `radial-gradient(120% 80% at 30% 20%, hsl(${hue} 45% 62%), transparent 60%), linear-gradient(170deg, hsl(${hue + 25} 30% 38%), hsl(${hue - 20} 35% 14%))`,
        }}
      >
        {/* subject silhouette */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[62%] h-[58%] rounded-t-full bg-black/25 blur-[2px]" />
        <div className="absolute left-1/2 bottom-[46%] -translate-x-1/2 w-[30%] aspect-square rounded-full bg-black/25 blur-[2px]" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2.5 text-[10px]">
          <span className="rounded-full bg-black/35 px-2 py-0.5 backdrop-blur-sm">{reel.label ?? "Reel"}</span>
          {reel.multiple !== undefined && (
            <span className="rounded-full bg-accent text-accent-deep px-2 py-0.5 font-medium">{reel.multiple}x</span>
          )}
        </div>

        <div className={`absolute inset-x-3 ${style === "split" ? "top-[38%]" : "top-[22%]"} text-center`}>
          {style === "caption" && (
            <span className="box-decoration-clone rounded-[4px] bg-white px-1.5 py-0.5 text-[11px] font-medium leading-[1.7] text-black">
              {hook}
            </span>
          )}
          {style === "bold" && (
            <span className="block text-[15px] font-medium uppercase leading-tight tracking-tight [text-shadow:0_2px_8px_rgba(0,0,0,.5)]">{hook}</span>
          )}
          {style === "split" && (
            <span className="block rounded-lg bg-black/55 px-2 py-1.5 text-[11px] leading-snug backdrop-blur-sm">{hook}</span>
          )}
        </div>

        <div className="absolute right-2 bottom-12 flex flex-col items-center gap-2.5 text-[9px] opacity-90">
          <Icon name="heart" size={15} />
          <Icon name="message" size={15} />
          <Icon name="send" size={15} />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/60 to-transparent">
          <div className="text-[11px] font-medium">{reel.handle}</div>
          <div className="flex items-center gap-1 text-[10px] opacity-80"><Icon name="play" size={9} /> {reel.views}</div>
        </div>

        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="grid place-items-center h-11 w-11 rounded-full bg-white/85 text-black"><Icon name="play" size={16} /></span>
        </span>
      </div>
      {footer}
    </div>
  );
}
