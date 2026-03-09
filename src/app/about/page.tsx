"use client";

import Hero from "@/components/Hero";
import PlaceholderImage from "@/components/PlaceholderImage";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const professionalAreaKeys = [
  "professionalArea1",
  "professionalArea2",
  "professionalArea3",
  "professionalArea4",
  "professionalArea5",
  "professionalArea6",
] as const;

const teamMembers = [
  { nameKey: "teamMember1Name" as const, roleKey: "teamMember1Role" as const },
  { nameKey: "teamMember2Name" as const, roleKey: "teamMember2Role" as const },
  { nameKey: "teamMember3Name" as const, roleKey: "teamMember3Role" as const },
];

const allFaqKeys = [
  { q: "faqQ1" as const, a: "faqA1" as const },
  { q: "faqQ2" as const, a: "faqA2" as const },
  { q: "faqQ3" as const, a: "faqA3" as const },
  { q: "faqQ4" as const, a: "faqA4" as const },
  { q: "faqQ5" as const, a: "faqA5" as const },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Hero title={t.aboutTitle} lead={t.aboutLead} />
      <section className="section-pad bg-surface">
        <div className="container-narrow animate-fade-up">
          <p className="text-lead mx-auto max-w-3xl text-center text-[#4d4d4d]">
            {t.aboutCollaborate}
          </p>
        </div>
      </section>

      <section className="section-pad bg-bg-alt bg-section-alt">
        <div className="container-narrow animate-fade-up">
          <h2 className="heading-section">{t.missionTitle}</h2>
          <div className="section-divider mt-4 mb-8" style={{ marginLeft: 0 }} />
          <div className="glass-surface max-w-3xl rounded-2xl p-8 md:p-10">
            <p className="text-lead text-[#4d4d4d]">{t.missionText}</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-narrow animate-fade-up">
          <h2 className="heading-section">{t.professionalAreasTitle}</h2>
          <div className="section-divider mt-4 mb-10" style={{ marginLeft: 0 }} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {professionalAreaKeys.map((key) => (
              <li
                key={key}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span className="text-[#4d4d4d]">{t[key]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-narrow animate-fade-up">
          <h2 className="heading-section text-center">{t.ourTeamTitle}</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-lead mx-auto max-w-2xl text-center text-[#4d4d4d]">
            {t.ourTeamLead}
          </p>
          <div className="mx-auto mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map(({ nameKey, roleKey }) => (
              <article
                key={nameKey}
                className="group overflow-hidden lux-card"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <PlaceholderImage theme="team" aspectRatio="4/5" />
                </div>
                <div className="border-t border-border bg-surface p-6 text-center">
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#1a1a1a]">
                    {t[nameKey]}
                  </h3>
                  <p className="mt-2 text-sm text-[#4d4d4d]">{t[roleKey]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad bg-bg-alt bg-section-alt">
        <div className="container-narrow animate-fade-up">
          <h2 className="heading-section text-center">{t.faqTitle}</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-lead mx-auto max-w-2xl text-center text-[#4d4d4d]">
            {t.faqLead}
          </p>
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion
              items={allFaqKeys.map(({ q, a }) => ({
                question: t[q],
                answer: t[a],
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-primary">
        <div className="container-narrow animate-fade-up text-center">
          <p className="text-xl text-white/90">
            {t.readyToStartDesc}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/services" className="rounded-full bg-accent px-8 py-3.5 font-semibold text-primary-dark transition-all hover:bg-accent-hover">
              {t.exploreServices}
            </Link>
            <Link href="/contact" className="rounded-full border-2 border-white/70 bg-transparent px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10">
              {t.ctaContact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
