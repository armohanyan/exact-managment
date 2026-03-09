"use client";

import Hero from "@/components/Hero";
import PlaceholderImage from "@/components/PlaceholderImage";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { courseCatalog } from "@/lib/courseData";

function CourseCard({
  slug,
  title,
  meta,
  topicKeys,
}: {
  slug: string;
  title: string;
  meta?: { label: string; value: string }[];
  topicKeys: readonly string[];
}) {
  const { t } = useLanguage();
  return (
    <article className="flex h-full flex-col overflow-hidden lux-card card-hover">
      <div className="overflow-hidden">
        <PlaceholderImage theme="planning" aspectRatio="16/10" alt={title} />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a]">
          {title}
        </h3>
        {meta && meta.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-[#4d4d4d]">
            {meta.map(({ label, value }) => (
              <li key={label}>
                <span className="font-semibold text-[#1a1a1a]">{label}:</span> {value}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-5 mb-2 text-sm font-bold uppercase tracking-wider text-primary">
          {t.topics}
        </p>
        <ul className="mb-8 list-inside space-y-2 text-[#4d4d4d]">
          {topicKeys.map((key) => (
            <li key={key}>{t[key as keyof typeof t]}</li>
          ))}
        </ul>
        <Link href={`/training/${slug}`} className="btn-primary mt-auto self-start whitespace-nowrap">
          {t.viewCourse}
        </Link>
      </div>
    </article>
  );
}

export default function TrainingPage() {
  const { t } = useLanguage();

  const read = (key: string) => t[key as keyof typeof t] as string;

  return (
    <>
      <Hero title={t.trainingTitle} lead={t.trainingLead} />
      <section className="section-pad bg-surface">
        <div className="container-narrow animate-fade-up">
          <div className="grid items-stretch gap-10 lg:grid-cols-2">
            {courseCatalog.map((course) => (
              <CourseCard
                key={course.slug}
                slug={course.slug}
                title={read(course.titleKey)}
                meta={course.meta?.map(({ labelKey, valueKey }) => ({
                  label: read(labelKey),
                  value: read(valueKey),
                }))}
                topicKeys={course.topicKeys}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-primary">
        <div className="container-narrow animate-fade-up text-center">
          <p className="text-lg text-white/90">{t.trainingCta}</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-primary-dark transition-all hover:bg-accent-hover"
          >
            {t.ctaContact} →
          </Link>
        </div>
      </section>
    </>
  );
}
