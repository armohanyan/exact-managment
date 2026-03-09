"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import { useLanguage } from "@/context/LanguageContext";
import { getCourseBySlug } from "@/lib/courseData";

export default function CourseDetailsPage() {
  const { t } = useLanguage();
  const params = useParams<{ slug: string }>();
  const course = getCourseBySlug(params.slug);
  const read = (key: string) => t[key as keyof typeof t] as string;

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
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
          <PlaceholderImage
            theme="planning"
            aspectRatio="16/10"
            alt={read(course.titleKey)}
            priority
          />
        </div>

        <div className="glass-surface mt-8 rounded-2xl p-6 md:p-8">
          <Link href="/training" className="text-sm font-semibold text-primary hover:underline">
            ← {t.backToTraining}
          </Link>
          <h1 className="mt-4 heading-section">{read(course.titleKey)}</h1>

          {course.meta && course.meta.length > 0 && (
            <ul className="mt-6 space-y-2 text-[#4d4d4d]">
              {course.meta.map(({ labelKey, valueKey }) => (
                <li key={labelKey}>
                  <span className="font-semibold text-[#1a1a1a]">{read(labelKey)}:</span>{" "}
                  {read(valueKey)}
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
            <p className="mt-4 text-[#4d4d4d]">{read(course.overviewKey)}</p>
          </article>

          <article className="lux-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a]">
              {t.trainingLearningOutcomes}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#4d4d4d]">
              {course.outcomeKeys.map((key) => (
                <li key={key}>{read(key)}</li>
              ))}
            </ul>
          </article>

          <article className="lux-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a]">
              {t.trainingWhoShouldAttend}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#4d4d4d]">
              {course.audienceKeys.map((key) => (
                <li key={key}>{read(key)}</li>
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
