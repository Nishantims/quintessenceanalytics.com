"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <span
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white"
          style={{ background: "var(--teal)" }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-4 font-display text-[20px] font-semibold text-text-primary">Message sent</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">
          Thanks for reaching out — we&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" type="text" required autoComplete="name" />
        <Field label="Work email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" type="text" autoComplete="organization" />
        <Field label="Which service are you interested in?" name="interest" type="text" placeholder="e.g. Custom market sizing" />
      </div>
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold text-text-primary" htmlFor="message">
          Tell us about the decision you&apos;re trying to make
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-[14px] text-text-primary outline-none transition-colors focus:border-coral"
          placeholder="What market, what timeframe, and what would a wrong answer cost you?"
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-coral/30 bg-coral/5 px-4 py-3 text-[13px] text-coral-ink">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
        style={{ background: "var(--coral)" }}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-text-primary" htmlFor={name}>
        {label}
        {!required && <span className="ml-1 font-normal text-text-muted">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-[14px] text-text-primary outline-none transition-colors focus:border-coral"
      />
    </div>
  );
}
