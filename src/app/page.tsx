"use client";

import { useEffect, useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import Card from "@/components/Card";
import CTA from "@/components/CTA";
import PlaceholderImage from "@/components/PlaceholderImage";
import FAQAccordion from "@/components/FAQAccordion";
import Skeleton, { SkeletonCard } from "@/components/Skeleton";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { ProjectFromAirtable } from "@/types";

type ProjectsStatus = "loading" | "success" | "error";

const whyChooseKeys = [
  { title: "whyChoose1Title", body: "whyChoose1Body", num: "01" },
  { title: "whyChoose2Title", body: "whyChoose2Body", num: "02" },
  { title: "whyChoose3Title", body: "whyChoose3Body", num: "03" },
  { title: "whyChoose4Title", body: "whyChoose4Body", num: "04" },
] as const;

const allFaqKeys = [
  { q: "faqQ1" as const, a: "faqA1" as const },
  { q: "faqQ2" as const, a: "faqA2" as const },
  { q: "faqQ3" as const, a: "faqA3" as const },
  { q: "faqQ4" as const, a: "faqA4" as const },
  { q: "faqQ5" as const, a: "faqA5" as const },
];

export default function HomePage() {
  const { t, lang } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState<ProjectFromAirtable[]>([]);
  const [projectsStatus, setProjectsStatus] = useState<ProjectsStatus>("loading");

  useEffect(() => {
    setProjectsStatus("loading");
    fetch(`/api/projects?lang=${lang}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: ProjectFromAirtable[]) => {
        if (Array.isArray(data)) {
          const completed = data.filter((p) => p.status === "Completed");
          setFeaturedProjects(completed.slice(0, 3));
        } else {
          setFeaturedProjects([]);
        }
        setProjectsStatus("success");
      })
      .catch(() => {
        setFeaturedProjects([]);
        setProjectsStatus("error");
      });
  }, [lang]);

  const faqItems = allFaqKeys.map(({ q, a }) => ({
    question: t[q],
    answer: t[a],
  }));

  return (
    <>
      <HeroSlider />

      <section className="section-pad bg-surface">
        <div className="container-narrow animate-fade-up">
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-lg leading-relaxed text-[#4d4d4d] sm:text-xl sm:leading-relaxed">
              {t.homeIntro}
            </p>
            <div className="mt-10 rounded-2xl border-l-4 border-primary bg-gradient-to-br from-primary/5 to-primary/10 px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-9">
              <p className="font-display text-xl font-semibold leading-snug text-[#1a1a1a] sm:text-2xl md:text-[1.6rem]">
                {t.homeGoal}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-bg-alt bg-section-alt">
        <div className="container-narrow animate-fade-up">
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
        <div className="container-narrow animate-fade-up">
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
        <div className="container-narrow animate-fade-up">
          <h2 className="heading-section text-center">{t.homeProjectsTitle}</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-lead mx-auto max-w-2xl text-center text-[#4d4d4d]">
            {t.homeProjectsLead}
          </p>

          {projectsStatus === "loading" && (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {projectsStatus === "success" && featuredProjects.length === 0 && (
            <div className="mt-12 rounded-2xl border border-border bg-[#fafaf8] px-6 py-10 text-center sm:py-14">
              <p className="text-[#4d4d4d]">{t.dataEmptyProjectsHome}</p>
            </div>
          )}

          {projectsStatus === "success" && featuredProjects.length > 0 && (
            <>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href="/projects"
                    className="group block overflow-hidden lux-card"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <PlaceholderImage theme="building" aspectRatio="16/10" alt={project.name} />
                      )}
                      {project.status === "Ongoing" && (
                        <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-dark">
                          {t.ongoingLabel}
                        </span>
                      )}
                    </div>
                    <div className="border-t border-border p-5">
                      <h3 className="font-display text-lg font-bold tracking-tight text-[#1a1a1a] group-hover:text-primary">
                        {project.name}
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
            </>
          )}

          {projectsStatus === "error" && (
            <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10 text-center text-amber-900 sm:py-14">
              <p>{t.loadErrorTryAgain}</p>
            </div>
          )}
        </div>
      </section>

      {/* Full FAQ */}
      <section id="faq" className="section-pad bg-bg-alt bg-section-alt">
        <div className="container-narrow animate-fade-up">
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
        <div className="container-narrow animate-fade-up text-center">
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
