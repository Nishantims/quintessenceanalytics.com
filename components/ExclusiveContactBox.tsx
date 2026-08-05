"use client";

import { useState, type FormEvent } from "react";

type Step = "closed" | "name" | "message" | "sending" | "sent" | "error";

// Exclusive contact widget for the /yum page - two-step (name, then message)
// straight to Nishant's inbox via /api/yum-contact, separate from the
// standard /contact form and its shared queue. Not a live chat - see the
// conversation this was scoped down from; a real two-way chat needs a
// database and an admin inbox this site doesn't have yet.
export function ExclusiveContactBox() {
  const [step, setStep] = useState<Step>("closed");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleNameSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setStep("message");
  }

  async function handleMessageSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStep("sending");
    try {
      const res = await fetch("/api/yum-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error();
      setStep("sent");
    } catch {
      setStep("error");
    }
  }

  function reset() {
    setStep("closed");
    setName("");
    setMessage("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {step === "closed" && (
        <button
          onClick={() => setStep("name")}
          className="flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[14px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
          style={{ background: "var(--pink)" }}
        >
          <ChatIcon />
          Message us directly
        </button>
      )}

      {step !== "closed" && (
        <div className="w-[300px] rounded-2xl border border-border bg-surface p-5 shadow-xl sm:w-[320px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChatIcon color="var(--pink)" />
              <p className="text-[14px] font-bold text-text-primary">Message us directly</p>
            </div>
            <button onClick={reset} aria-label="Close" className="text-text-muted hover:text-text-primary">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {(step === "name" || step === "message" || step === "sending") && (
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-secondary">
              Goes straight to our team for this proposal — we&apos;ll reply by email as soon as we see it.
            </p>
          )}

          {step === "name" && (
            <form onSubmit={handleNameSubmit} className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-[12px] font-semibold text-text-primary">Your name</span>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-[13px] text-text-primary outline-none focus:border-pink"
                  placeholder="e.g. Jordan Lee"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-lg py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.01]"
                style={{ background: "var(--pink)" }}
              >
                Next →
              </button>
            </form>
          )}

          {(step === "message" || step === "sending") && (
            <form onSubmit={handleMessageSubmit} className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-[12px] font-semibold text-text-primary">Your message</span>
                <textarea
                  autoFocus
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  disabled={step === "sending"}
                  className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2.5 text-[13px] text-text-primary outline-none focus:border-pink disabled:opacity-60"
                  placeholder="What would you like to ask?"
                />
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("name")}
                  disabled={step === "sending"}
                  className="rounded-lg border border-border px-3 py-2.5 text-[13px] font-semibold text-text-primary disabled:opacity-60"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={step === "sending"}
                  className="flex-1 rounded-lg py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
                  style={{ background: "var(--pink)" }}
                >
                  {step === "sending" ? "Sending…" : "Send →"}
                </button>
              </div>
            </form>
          )}

          {step === "sent" && (
            <div className="mt-4">
              <p className="text-[13.5px] leading-relaxed text-text-primary">
                Thanks, {name} — your message is on its way to our team. We&apos;ll be in touch shortly.
              </p>
              <button
                onClick={reset}
                className="mt-3 text-[12.5px] font-semibold text-text-muted hover:text-text-primary"
              >
                Close
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="mt-4">
              <p className="text-[13.5px] leading-relaxed text-text-primary">
                Something went wrong sending that. Please try again, or email us at{" "}
                <a href="mailto:contact@market-reports.com" className="font-semibold text-pink-ink underline">
                  contact@market-reports.com
                </a>
                .
              </p>
              <button
                onClick={() => setStep("message")}
                className="mt-3 text-[12.5px] font-semibold text-text-muted hover:text-text-primary"
              >
                ← Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChatIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path
        d="M4 11.5c0-4.14 3.58-7.5 8-7.5s8 3.36 8 7.5-3.58 7.5-8 7.5c-1.06 0-2.07-.19-3-.55L4 19.5l1.13-3.4A7.36 7.36 0 0 1 4 11.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="11.5" r="1" fill={color} />
      <circle cx="12" cy="11.5" r="1" fill={color} />
      <circle cx="15.5" cy="11.5" r="1" fill={color} />
    </svg>
  );
}
