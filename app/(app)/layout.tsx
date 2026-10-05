import type { Metadata } from "next";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import "@fontsource/geist/700.css";
import "../globals.css";
import Nav from "@/app/components/Nav";
import Tutorial from "@/app/components/Tutorial";
import Topbar from "@/app/components/Topbar";
import HelpBubble from "@/app/components/HelpBubble";

export const metadata: Metadata = {
  title: "Upcreate",
  description: "The Instagram/short-form content operating system: calendar, hooks, scripts, research, and prompts, all in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("upcreate_theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col md:flex-row bg-background text-foreground">
        <Nav />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:px-10 md:py-10">{children}</main>
        </div>
        <Tutorial />
        <HelpBubble />
      </body>
    </html>
  );
}
