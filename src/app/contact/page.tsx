"use client";

import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.365484472!2d44.5136!3d40.1872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5d%3Ax3d1479ae87da526a!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Hero title={t.contactTitle} lead={t.contactLead} />

      {/* Company details + contact form in one row */}
      <section className="section-pad bg-surface">
        <div className="container-narrow animate-fade-up">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Left: company details + map */}
            <div className="overflow-hidden rounded-2xl border border-border bg-[#fafaf8] shadow-xl">
              <div className="p-8 md:p-10">
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-primary">
                  {t.phone}
                </h2>
                <a
                  href="tel:+37477131020"
                  className="mt-2 block text-2xl font-bold text-[#1a1a1a] transition-colors hover:text-primary"
                >
                  +374 77 13 10 20
                </a>
                <div className="mt-8">
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider text-primary">
                    {t.addressTitle}
                  </h2>
                  <p className="mt-2 font-display text-lg font-semibold text-[#1a1a1a]">
                    {t.addressLine2}
                  </p>
                  <p className="mt-1 text-[#4d4d4d]">{t.addressLine1}</p>
                  <p className="mt-4 text-sm text-[#4d4d4d]">
                    {t.addressDirections}
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Yerevan+Armenia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {t.viewOnMap}
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] md:aspect-[3/2]">
                <iframe
                  title={t.officeMapLabel}
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </div>

            {/* Right: contact form */}
            <div className="glass-surface rounded-2xl p-8 md:p-10">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#1a1a1a] md:text-2xl">
                {t.contactFormTitle}
              </h2>
              <p className="mt-2 text-[#4d4d4d]">{t.contactFormLead}</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-narrow animate-fade-up">
          <CTA
            title={t.readyToStartTitle}
            description={t.readyToStartDesc}
            buttonText={t.ctaContact}
            buttonHref="tel:+37477131020"
            variant="dark"
          />
        </div>
      </section>
    </>
  );
}
