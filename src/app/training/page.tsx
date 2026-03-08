"use client";

import Hero from "@/components/Hero";
import PlaceholderImage from "@/components/PlaceholderImage";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const course1TopicKeys = ["course1Topic1", "course1Topic2", "course1Topic3", "course1Topic4"] as const;
const course2TopicKeys = ["course2Topic1", "course2Topic2", "course2Topic3", "course2Topic4", "course2Topic5", "course2Topic6"] as const;

function CourseCard({
  title,
  meta,
  topicKeys,
  registerHref = "#",
}: {
  title: string;
  meta?: { label: string; value: string }[];
  topicKeys: readonly string[];
  registerHref?: string;
}) {
  const { t } = useLanguage();
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg card-hover">
      <div className="overflow-hidden">
        <PlaceholderImage theme="planning" aspectRatio="16/10" alt={title} />
      </div>
      <div className="p-6 md:p-8">
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
        <Link href={registerHref} className="btn-primary">
          {t.registerNow}
        </Link>
      </div>
    </article>
  );
}

export default function TrainingPage() {
  const { t } = useLanguage();

  const course1Meta = [
    { label: t.location, value: t.course1Location },
    { label: t.instructor, value: t.course1Instructor },
    { label: t.format, value: t.course1Format },
    { label: t.duration, value: t.course1Duration },
    { label: t.schedule, value: t.course1Schedule },
  ];

  return (
    <>
      <Hero title={t.trainingTitle} lead={t.trainingLead} />
      <section className="section-pad bg-surface">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-2">
            <CourseCard
              title={t.course1Title}
              meta={course1Meta}
              topicKeys={[...course1TopicKeys]}
            />
            <CourseCard
              title={t.course2Title}
              topicKeys={[...course2TopicKeys]}
            />
          </div>
        </div>
      </section>
      <section className="section-pad bg-primary">
        <div className="container-narrow text-center">
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
