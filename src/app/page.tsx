"use client";

import HeroSlider from "@/components/HeroSlider";
import Card from "@/components/Card";
import CTA from "@/components/CTA";
import PlaceholderImage from "@/components/PlaceholderImage";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const whyChooseKeys = [
  { title: "whyChoose1Title", body: "whyChoose1Body", num: "01" },
  { title: "whyChoose2Title", body: "whyChoose2Body", num: "02" },
  { title: "whyChoose3Title", body: "whyChoose3Body", num: "03" },
  { title: "whyChoose4Title", body: "whyChoose4Body", num: "04" },
] as const;

const featuredProjects = [
  { name: "Zephyr Residential District", ongoing: true },
  { name: "Nur Residential Complex", ongoing: true },
  { name: "Kanach Tagh Residential District", ongoing: false },
];

const allFaqKeys = [
  { q: "faqQ1" as const, a: "faqA1" as const },
  { q: "faqQ2" as const, a: "faqA2" as const },
  { q: "faqQ3" as const, a: "faqA3" as const },
  { q: "faqQ4" as const, a: "faqA4" as const },
  { q: "faqQ5" as const, a: "faqA5" as const },
];

export default function HomePage() {
  const { t } = useLanguage();
  const faqItems = allFaqKeys.map(({ q, a }) => ({
    question: t[q],
    answer: t[a],
  }));

  return (
    <>
      <HeroSlider />

      <section className="section-pad bg-surface">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lead text-[#4d4d4d]">{t.homeIntro}</p>
            <div className="mt-8 rounded-2xl border-2 border-primary/20 bg-primary/5 px-6 py-5 md:px-8 md:py-6">
              <p className="font-display text-lg font-semibold text-primary md:text-xl">
                {t.homeGoal}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-bg-alt bg-section-alt">
        <div className="container-narrow">
          <h2 className="heading-section text-center">{t.whyChooseTitle}</h2>
          <div className="section-divider mt-4 mb-12" />
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            {whyChooseKeys.map(({ title, body, num }) => (
              <Card key={title} title={t[title]} number={num}>
                <p className="text-base leading-relaxed">{t[body]}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <PlaceholderImage theme="construction" aspectRatio="4/3" />
            </div>
            <div>
              <h2 className="heading-section">{t.fromPlanningTitle}</h2>
              <div className="section-divider mt-4 mb-6 ml-0" />
              <p className="text-lead text-[#4d4d4d]">{t.fromPlanningBody}</p>
              <div className="mt-8">
                <CTA
                  title={t.ctaStartTitle}
                  description={t.ctaStartDesc}
                  buttonText={t.ctaContact}
                  buttonHref="/contact"
                  variant="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-narrow">
          <h2 className="heading-section text-center">{t.homeProjectsTitle}</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-lead mx-auto max-w-2xl text-center text-[#4d4d4d]">
            {t.homeProjectsLead}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map(({ name, ongoing }) => (
              <Link
                key={name}
                href="/projects"
                className="group block overflow-hidden rounded-2xl border border-border bg-[#fafaf8] shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <PlaceholderImage theme="building" aspectRatio="16/10" alt={name} />
                  {ongoing && (
                    <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-dark">
                      Ongoing
                    </span>
                  )}
                </div>
                <div className="border-t border-border p-5">
                  <h3 className="font-display text-lg font-bold tracking-tight text-[#1a1a1a] group-hover:text-primary">
                    {name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/projects" className="btn-outline">
              {t.viewAllProjects}
            </Link>
          </div>
        </div>
      </section>

      {/* Full FAQ */}
      <section id="faq" className="section-pad bg-bg-alt bg-section-alt">
        <div className="container-narrow">
          <h2 className="heading-section text-center">{t.homeFaqTitle}</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-lead mx-auto max-w-2xl text-center text-[#4d4d4d]">
            {t.homeFaqLead}
          </p>
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-primary">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t.homeContactTitle}
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-xl text-white/90">
            {t.homeContactLead}
          </p>
          <a
            href="tel:+37477131020"
            className="mt-6 inline-block text-2xl font-semibold text-accent transition-opacity hover:opacity-90"
          >
            {t.homeContactPhone}
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3.5 font-semibold text-primary-dark transition-all hover:bg-accent-hover"
            >
              {t.ctaContact}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-white/60 bg-transparent px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t.bookACall}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
