"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const message = (data.get("message") as string) || "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || "Failed to send");
      }
      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-6 text-center text-emerald-900 shadow-sm" role="status">
        {t.formSuccess}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
          {t.formName}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="input-modern"
          placeholder={t.formName}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
          {t.formEmail}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="input-modern"
          placeholder={t.formEmail}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
          {t.formMessage}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="input-modern min-h-36 resize-y"
          placeholder={t.formMessage}
        />
      </div>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "..." : t.formSend}
      </button>
    </form>
  );
}
