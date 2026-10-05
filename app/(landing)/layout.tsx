import type { Metadata } from "next";
import "@fontsource/geist/400.css";
import "@fontsource-variable/inter/opsz.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./landing.css";

export const metadata: Metadata = {
  title: "Upcreate",
  description: "Define your brand.",
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
