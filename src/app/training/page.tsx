"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import PlaceholderImage from "@/components/PlaceholderImage";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { CourseFromAirtable, FetchStatus } from "@/types";

function CourseCard({
  slug,
  title,
  meta,
  topicKeys,
  topicsFromAirtable,
}: {
  slug: string;
  title: string;
  meta?: { label: string; value: string }[];
  topicKeys?: readonly string[];
  topicsFromAirtable?: string[];
}) {
  const { t } = useLanguage();
  const topics = topicsFromAirtable ?? (topicKeys?.map((key) => t[key as keyof typeof t]) ?? []);
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
          {topics.map((text, i) => (
            <li key={i}>{text}</li>
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
  const { t, lang } = useLanguage();
  const [airtableCourses, setAirtableCourses] = useState<CourseFromAirtable[] | null>(null);
  const [status, setStatus] = useState<FetchStatus>("loading");

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/courses?lang=${lang}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAirtableCourses(data);
          setStatus("success");
        } else {
          setAirtableCourses(null);
          setStatus("success");
        }
      })
      .catch(() => {
        setAirtableCourses(null);
        setStatus("error");
      });
  }, [lang]);

  const courses = status === "success" && Array.isArray(airtableCourses) ? airtableCourses : [];

  return (
    <>
      <Hero title={t.trainingTitle} lead={t.trainingLead} />
      <section className="section-pad bg-surface">
        <div className="container-narrow animate-fade-up">
          {status === "loading" && (
            <div className="mb-8 flex items-center gap-3 text-[#4d4d4d]" role="status" aria-live="polite">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span>Loading courses…</span>
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Could not load courses. Please try again later.
            </div>
          )}
          <div className="grid items-stretch gap-10 lg:grid-cols-2">
            {courses.map((course) => (
              <CourseCard
                key={course.slug}
                slug={course.slug}
                title={course.title}
                meta={course.meta}
                topicsFromAirtable={course.topics}
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
