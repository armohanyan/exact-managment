"use client";

import Hero from "@/components/Hero";
import PlaceholderImage from "@/components/PlaceholderImage";
import CTA from "@/components/CTA";
import { useLanguage } from "@/context/LanguageContext";

const capabilityKeys = [
  "capability1",
  "capability2",
  "capability3",
  "capability4",
  "capability5",
] as const;

const serviceKeys = [
  "gectaroService1",
  "gectaroService2",
  "gectaroService3",
  "gectaroService4",
] as const;

export default function GectaroPage() {
  const { t } = useLanguage();

  return (
    <>
      <Hero
        title={t.gectaroTitle}
        subtitle={t.gectaroSubtitle}
        lead={t.gectaroLead}
      />
      <section className="section-pad bg-surface">
        <div className="container-narrow animate-fade-up">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <PlaceholderImage theme="planning" aspectRatio="4/3" />
            </div>
            <div>
              <h2 className="heading-section">{t.capabilitiesTitle}</h2>
              <div className="section-divider mt-4 mb-8" style={{ marginLeft: 0 }} />
              <ul className="space-y-4">
                {capabilityKeys.map((key) => (
                  <li key={key} className="lux-card flex items-center gap-4 px-5 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-primary">
                      ✓
                    </span>
                    <span className="text-[#4d4d4d]">{t[key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-bg-alt bg-section-alt">
        <div className="container-narrow animate-fade-up">
          <h2 className="heading-section text-center">
            {t.gectaroServicesTitle}
          </h2>
          <div className="section-divider mt-4 mb-12" />
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {serviceKeys.map((key) => (
              <div key={key} className="lux-card flex items-center gap-4 px-6 py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  ✓
                </span>
                <span className="font-medium text-[#1a1a1a]">{t[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-narrow animate-fade-up">
          <CTA
            title={t.gectaroCta}
            buttonText={t.contactGectaro}
            buttonHref="/contact"
            variant="dark"
          />
        </div>
      </section>
    </>
  );
}
