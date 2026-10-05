import type { Metadata } from "next";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import "@fontsource/geist/700.css";
import "../globals.css";
import Nav from "@/app/components/Nav";
import Tutorial from "@/app/components/Tutorial";

export const metadata: Metadata = {
  title: "Upcreate",
  description: "The Instagram/short-form content operating system: calendar, hooks, scripts, research, and prompts, all in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col md:flex-row bg-background text-foreground">
        <Nav />
        <main className="flex-1 min-w-0 px-4 py-6 md:px-10 md:py-10">{children}</main>
        <Tutorial />
      </body>
    </html>
  );
}
