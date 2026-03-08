"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    // In production, POST to your API or email service
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    form.reset();
    setSubmitting(false);
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center text-green-800">
        {t.formSuccess}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">
          {t.formName}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-[#1a1a1a] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder={t.formName}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">
          {t.formEmail}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-[#1a1a1a] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder={t.formEmail}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">
          {t.formMessage}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3.5 text-[#1a1a1a] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder={t.formMessage}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-70"
      >
        {submitting ? "..." : t.formSend}
      </button>
    </form>
  );
}
