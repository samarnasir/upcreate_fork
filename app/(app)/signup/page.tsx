import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/auth";
import Logo from "@/app/components/Logo";
import SignupForm from "./SignupForm";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ prompt?: string }> }) {
  const { prompt } = await searchParams;
  if (await getCurrentUserId()) redirect("/dashboard");
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-border/15 bg-card/60 p-8">
        <div className="flex items-center gap-3 mb-1">
          <Logo size={30} />
          <div className="font-heading text-3xl">Upcreate</div>
        </div>
        <p className="text-sm text-muted mb-6">Create your account</p>

        <SignupForm prompt={prompt} />

        <p className="text-xs text-muted mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-accent underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
