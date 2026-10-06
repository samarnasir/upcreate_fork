"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import { Icon } from "@/app/components/Icons";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm rounded-[28px] bg-card p-8">
        <Logo size={40} />
        {sent ? (
          <div key="sent" className="animate-pop mt-6" style={{ transformOrigin: "top" }}>
            <span className="grid place-items-center h-12 w-12 rounded-full bg-accent text-accent-deep mb-4"><Icon name="mail" /></span>
            <h1 className="font-heading text-2xl">Check your email</h1>
            <p className="text-sm text-muted mt-2">If an account exists for that address, we've sent a link to reset your password. It expires in 30 minutes.</p>
            <Link href="/login" className="mt-6 block rounded-full bg-accent text-accent-deep py-2.5 text-center text-sm font-medium">Back to sign in</Link>
          </div>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h1 className="font-heading text-2xl">Reset your password</h1>
            <p className="text-sm text-muted">Enter the email you signed up with and we'll send you a reset link.</p>
            <input type="email" required placeholder="you@example.com" className="w-full rounded-lg border bg-surface px-3 py-2.5 text-sm" />
            <button className="w-full rounded-full bg-accent text-accent-deep py-2.5 text-sm font-medium">Send reset link</button>
            <p className="text-xs text-muted pt-2">
              Remembered it? <Link href="/login" className="text-foreground font-medium underline">Sign in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
