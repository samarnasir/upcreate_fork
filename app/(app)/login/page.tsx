import Link from "next/link";
import Logo from "@/app/components/Logo";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-border/15 bg-card/60 p-8">
        <div className="flex items-center gap-3 mb-1">
          <Logo size={40} />
        </div>
        <p className="text-sm text-muted mb-6">content os</p>

        <LoginForm />

        <p className="text-xs text-muted mt-5">
          No account yet?{" "}
          <Link href="/signup" className="text-accent underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
