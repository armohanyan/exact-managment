"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import Skeleton from "@/components/Skeleton";
import { useLanguage } from "@/context/LanguageContext";
import type { CourseFromAirtable, FetchStatus } from "@/types";

export default function CourseDetailsPage() {
  const { t, lang } = useLanguage();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [course, setCourse] = useState<CourseFromAirtable | null | undefined>(undefined);
  const [status, setStatus] = useState<FetchStatus>("loading");

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/courses?lang=${lang}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setCourse(null);
          setStatus("success");
          return;
        }
        const found = data.find((c: CourseFromAirtable) => c.slug === slug);
        setCourse(found ?? null);
        setStatus("success");
      })
      .catch(() => {
        setCourse(null);
        setStatus("error");
      });
  }, [lang, slug]);

  if (status === "loading") {
    return (
      <section className="section-pad bg-[#ebe9e3]">
        <div className="container-narrow max-w-5xl animate-fade-up" role="status" aria-live="polite">
          <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
          <div className="mt-8 space-y-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="section-pad bg-[#ebe9e3]">
        <div className="container-narrow animate-fade-up">
          <div className="glass-surface rounded-2xl p-8">
            <h1 className="heading-section">{t.courseNotFoundTitle}</h1>
            <p className="mt-3 text-[#4d4d4d]">{t.loadErrorTryAgain}</p>
            <Link href="/training" className="btn-outline mt-6">
              {t.backToTraining}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="section-pad bg-[#ebe9e3]">
        <div className="container-narrow animate-fade-up">
          <div className="glass-surface rounded-2xl p-8">
            <h1 className="heading-section">{t.courseNotFoundTitle}</h1>
            <p className="mt-3 text-[#4d4d4d]">{t.courseNotFoundBody}</p>
            <Link href="/training" className="btn-outline mt-6">
              {t.backToTraining}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad bg-[#ebe9e3]">
      <div className="container-narrow max-w-5xl animate-fade-up">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          ) : (
            <PlaceholderImage
              theme="planning"
              aspectRatio="16/10"
              alt={course.title}
              priority
            />
          )}
        </div>

        <div className="glass-surface mt-8 rounded-2xl p-6 md:p-8">
          <Link href="/training" className="text-sm font-semibold text-primary hover:underline">
            ← {t.backToTraining}
          </Link>
          <h1 className="mt-4 heading-section">{course.title}</h1>

          {course.meta && course.meta.length > 0 && (
            <ul className="mt-6 space-y-2 text-[#4d4d4d]">
              {course.meta.map(({ label, value }) => (
                <li key={label}>
                  <span className="font-semibold text-[#1a1a1a]">{label}:</span> {value}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <article className="lux-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a]">
              {t.trainingCourseOverview}
            </h2>
            <p className="mt-4 text-[#4d4d4d]">{course.overview}</p>
          </article>

          <article className="lux-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a]">
              {t.trainingLearningOutcomes}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#4d4d4d]">
              {course.outcomes.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </article>

          <article className="lux-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a]">
              {t.trainingWhoShouldAttend}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#4d4d4d]">
              {course.audience.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href={course.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t.registerNow}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
