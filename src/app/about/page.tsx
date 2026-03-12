"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import PlaceholderImage from "@/components/PlaceholderImage";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { FetchStatus, TeamMemberFromAirtable } from "@/types";

const professionalAreaKeys = [
  "professionalArea1",
  "professionalArea2",
  "professionalArea3",
  "professionalArea4",
  "professionalArea5",
  "professionalArea6",
] as const;

const allFaqKeys = [
  { q: "faqQ1" as const, a: "faqA1" as const },
  { q: "faqQ2" as const, a: "faqA2" as const },
  { q: "faqQ3" as const, a: "faqA3" as const },
  { q: "faqQ4" as const, a: "faqA4" as const },
  { q: "faqQ5" as const, a: "faqA5" as const },
];

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const [airtableTeam, setAirtableTeam] = useState<TeamMemberFromAirtable[] | null>(null);
  const [status, setStatus] = useState<FetchStatus>("loading");

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/team?lang=${lang}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAirtableTeam(data);
          setStatus("success");
        } else {
          setAirtableTeam(null);
          setStatus("success");
        }
      })
      .catch(() => {
        setAirtableTeam(null);
        setStatus("error");
      });
  }, [lang]);

  const teamList =
    status === "success" && Array.isArray(airtableTeam) ? airtableTeam : [];

  return (
    <>
      <Hero title={t.aboutTitle} lead={t.aboutLead} />
      {/*<section className="section-pad bg-surface">*/}
      {/*  <div className="container-narrow animate-fade-up">*/}
      {/*    <p className="text-lead mx-auto max-w-3xl text-center text-[#4d4d4d]">*/}
      {/*      {t.aboutCollaborate}*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</section>*/}

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
          {status === "loading" && (
            <div className="mx-auto mt-14 flex justify-center gap-3 text-[#4d4d4d]" role="status" aria-live="polite">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span>Loading team…</span>
            </div>
          )}
          {status === "error" && (
            <div className="mx-auto mt-6 max-w-xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
              Could not load team. Please try again later.
            </div>
          )}
          <div className="mx-auto mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamList.map((member) => (
              <article
                key={member.id}
                className="group overflow-hidden lux-card"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <PlaceholderImage theme="team" aspectRatio="4/5" />
                  )}
                </div>
                <div className="border-t border-border bg-surface p-6 text-center">
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#1a1a1a]">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#4d4d4d]">{member.role}</p>
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
