"use client";

import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80",
  "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1000&q=80",
];

const ongoingProjects = [
  {
    name: "Zephyr Residential District",
    descKey: "projZephyrDesc" as const,
    num: "01",
    image: PROJECT_IMAGES[0],
  },
  {
    name: "Townhouses in Yeghvard",
    descKey: "projYeghvardDesc" as const,
    num: "02",
    image: PROJECT_IMAGES[1],
  },
  {
    name: "Nur Residential Complex",
    descKey: "projNurDesc" as const,
    num: "03",
    image: PROJECT_IMAGES[2],
  },
];

const completedProjects = [
  {
    name: "Kanach Tagh Residential District",
    descKey: "projKanachDesc" as const,
    num: "04",
    image: PROJECT_IMAGES[3],
  },
  {
    name: "Level 16 Residential Complex",
    descKey: "projLevel16Desc" as const,
    num: "05",
    image: PROJECT_IMAGES[4],
  },
];

function ProjectRow({
  name,
  descKey,
  num,
  image,
  imageLeft,
  ongoing,
  t,
}: {
  name: string;
  descKey: string;
  num: string;
  image: string;
  imageLeft: boolean;
  ongoing: boolean;
  t: (k: string) => string;
}) {
  return (
    <article className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-[#fafaf8] shadow-xl md:grid-cols-2">
      <div
        className={`relative aspect-[16/10] md:aspect-auto md:min-h-[380px] ${
          imageLeft ? "md:col-start-1" : "md:col-start-2"
        }`}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"
          aria-hidden
        />
        {ongoing && (
          <span className="absolute top-5 left-5 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
            {t("ongoingLabel")}
          </span>
        )}
        {!ongoing && (
          <span className="absolute top-5 left-5 rounded-full border border-primary/40 bg-primary/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
            {t("completedLabel")}
          </span>
        )}
      </div>
      <div
        className={`flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 lg:px-16 ${
          imageLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
        }`}
      >
        <span
          className="font-display text-sm font-bold tracking-widest text-primary"
          aria-hidden
        >
          {num}
        </span>
        <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-3xl lg:text-[2rem]">
          {name}
        </h2>
        <p className="mt-5 text-[#4d4d4d] leading-relaxed">
          {t(descKey)}
        </p>
        <ul className="mt-6 space-y-3 border-t border-border pt-6">
          {[t("projectBullet1"), t("projectBullet2"), t("projectBullet3")].map(
            (bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-3 text-[#4d4d4d]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {bullet}
              </li>
            )
          )}
        </ul>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <>
      <Hero title={t.projectsTitle} lead={t.projectsLead} />

      <section className="section-pad bg-[#f5f4f0]">
        <div className="container-narrow">
          <h2 className="heading-section max-w-2xl">
            {t.ongoingProjects}
          </h2>
          <div className="section-divider mt-6 mb-12" style={{ marginLeft: 0 }} />
          <p className="max-w-2xl text-[#4d4d4d] leading-relaxed">
            {t.projectsLead}
          </p>
          <div className="mt-14 space-y-8 md:space-y-12">
            {ongoingProjects.map((p, i) => (
              <ProjectRow
                key={p.name}
                name={p.name}
                descKey={p.descKey}
                num={p.num}
                image={p.image}
                imageLeft={i % 2 === 0}
                ongoing
                t={(k) => t[k as keyof typeof t]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-narrow">
          <h2 className="heading-section max-w-2xl">
            {t.completedProjects}
          </h2>
          <div className="section-divider mt-6 mb-12" style={{ marginLeft: 0 }} />
          <div className="mt-14 space-y-8 md:space-y-12">
            {completedProjects.map((p, i) => (
              <ProjectRow
                key={p.name}
                name={p.name}
                descKey={p.descKey}
                num={p.num}
                image={p.image}
                imageLeft={i % 2 === 0}
                ongoing={false}
                t={(k) => t[k as keyof typeof t]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-narrow">
          <CTA
            title={t.projectsCta}
            buttonText={t.getInTouch}
            buttonHref="/contact"
            variant="dark"
          />
        </div>
      </section>
    </>
  );
}
