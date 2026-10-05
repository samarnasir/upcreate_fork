"use client";

import { useState } from "react";

export default function PromptRunner({
  prompt,
  label = "Generate",
  onSave,
  saveLabel = "Save to bank",
}: {
  prompt: string;
  label?: string;
  onSave?: (text: string) => void;
  saveLabel?: string;
}) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "no_key" | "quota" | "error">(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setStatus(null);
    setErrorMessage("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.text) {
        setOutput(data.text);
        setStatus("ok");
      } else if (data.error === "no_key") {
        setStatus("no_key");
      } else if (data.error === "quota") {
        setStatus("quota");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  function copy(text: string, which: "prompt" | "output") {
    navigator.clipboard?.writeText(text).catch(() => {});
    if (which === "prompt") {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1500);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 1500);
    }
  }

  return (
    <div className="rounded-[18px] bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-full bg-accent text-accent-deep text-sm font-medium px-5 py-2.5 disabled:opacity-60"
        >
          {loading ? "Generating…" : label}
        </button>
        <button
          onClick={() => copy(prompt, "prompt")}
          className="rounded-full border border-border/15 text-sm px-4 py-2.5 hover:bg-foreground/5"
        >
          {copiedPrompt ? "Copied ✓" : "Copy prompt"}
        </button>
      </div>
      <details className="group mt-3">
        <summary className="cursor-pointer list-none text-xs text-muted hover:text-foreground select-none">
          <span className="group-open:hidden">View assembled prompt</span>
          <span className="hidden group-open:inline">Hide prompt</span>
        </summary>
        <textarea
          readOnly
          value={prompt}
          rows={8}
          className="mt-2 w-full rounded-lg border bg-background text-foreground text-xs p-3 font-mono"
        />
      </details>

      {status === "no_key" && (
        <p className="text-xs text-[#e0a458] mt-2">
          No AI provider connected yet —{" "}
          <a href="/settings" className="underline">
            add an API key in Settings
          </a>
          , or copy the prompt above and paste it into your AI tool manually.
        </p>
      )}
      {status === "quota" && (
        <p className="text-xs text-[#e0a458] mt-2">
          Provider quota/rate limit hit — copy the prompt above and run it manually for now.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-700 mt-2">
          Generation failed{errorMessage ? `: ${errorMessage}` : ""} — copy the prompt and run it manually, or check
          your provider/key in{" "}
          <a href="/settings" className="underline">
            Settings
          </a>
          .
        </p>
      )}

      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-muted">Output (editable)</span>
            <div className="flex gap-2">
              <button
                onClick={() => copy(output, "output")}
                className="text-xs rounded-full border border-border/20 px-2.5 py-1 hover:bg-foreground/5"
              >
                {copiedOutput ? "Copied ✓" : "Copy"}
              </button>
              {onSave && (
                <button
                  onClick={() => onSave(output)}
                  className="text-xs rounded-full bg-accent text-accent-deep px-2.5 py-1"
                >
                  {saveLabel}
                </button>
              )}
            </div>
          </div>
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            rows={10}
            className="w-full rounded-lg border border-border/15 bg-surface text-foreground text-sm p-3"
          />
        </div>
      )}
    </div>
  );
}
