"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [text, setText] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const prompt = text.trim();
    if (!prompt) return;
    router.push(`/signup?prompt=${encodeURIComponent(prompt)}`);
  }

  return (
    <section className="hero">
      <video className="hero-video" src="/hero.mp4" autoPlay muted loop playsInline />
      <a className="signup" href="/signup">Sign Up</a>
      <div className="hero-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="/logo.png" alt="UpCreate" />
        <h1 className="tagline">
          <span className="t-sans">Define Your</span> <span className="t-serif">Brand</span>
        </h1>
        <form className="prompt" onSubmit={onSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your brand"
            aria-label="Describe your brand"
          />
          <button type="submit" className={text.trim() ? "active" : ""} aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
