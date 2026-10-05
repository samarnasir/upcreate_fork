"use server";

import { redirect } from "next/navigation";

// Wireframe mode: forms just move you to the next screen.

export async function signupAction(_prev: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const prompt = String(formData.get("prompt") || "").trim();
  redirect(prompt ? `/onboarding?prompt=${encodeURIComponent(prompt)}` : "/onboarding");
}

export async function loginAction(_prev: { error?: string } | null, _formData: FormData): Promise<{ error?: string } | null> {
  void _formData;
  redirect("/dashboard");
}

export async function logoutAction() {
  redirect("/login");
}
