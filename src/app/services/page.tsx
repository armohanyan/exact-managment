"use client";

import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  {
    titleKey: "service1Title" as const,
    itemKeys: [
      "Strategic planning",
      "Coordination of design works",
      "Tender organization",
      "Contractor selection",
      "Permit and documentation management",
      "Financial monitoring",
      "Full development project management",
    ],
    num: "01",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    imageAlt: "Development and architecture",
  },
  {
    titleKey: "service2Title" as const,
    itemKeys: [
      "Construction planning",
      "Scheduling",
      "Contractor coordination",
      "Quality control",
      "Collaboration with technical supervision",
      "Acceptance and documentation",
    ],
    num: "02",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    imageAlt: "Construction site",
  },
  {
    titleKey: "service3Title" as const,
    itemKeys: [
      "Tender documentation preparation",
      "Contractor selection",
      "Proposal evaluation",
      "Contract coordination",
    ],
    num: "03",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    imageAlt: "Tender and contracts",
  },
  {
    titleKey: "service4Title" as const,
    itemKeys: [
      "Budgeting",
      "Scheduling",
      "Cost monitoring",
      "Risk management",
      "Financial reporting",
    ],
    num: "04",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Planning and cost control",
  },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <Hero title={t.servicesTitle} lead={t.servicesLead} />
      <section className="section-pad bg-surface">
        <div className="container-narrow">
          <div className="space-y-16 md:space-y-24">
            {services.map(({ titleKey, itemKeys, num, image, imageAlt }, i) => {
              const imageLeft = i % 2 === 0;
              return (
                <article
                  key={titleKey}
                  className="grid gap-8 rounded-2xl border border-border bg-[#fafaf8] shadow-lg overflow-hidden md:grid-cols-2 md:gap-0 md:even:grid-flow-dense"
                >
                  <div
                    className={`relative aspect-[16/10] md:aspect-auto md:min-h-[320px] ${
                      imageLeft ? "md:col-start-1" : "md:col-start-2"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div
                    className={`flex flex-col justify-center p-6 md:p-10 lg:p-12 ${
                      imageLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                    }`}
                  >
                    <span
                      className="font-display mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary"
                      aria-hidden
                    >
                      {num}
                    </span>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-3xl">
                      {t[titleKey]}
                    </h2>
                    <ul className="mt-5 space-y-2 pl-4 text-[#4d4d4d] leading-relaxed [list-style-type:disc]">
                      {itemKeys.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-pad bg-primary">
        <div className="container-narrow text-center">
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {t.servicesGectaroNote}
          </p>
          <Link
            href="/gectaro"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-primary-dark transition-all hover:bg-accent-hover"
          >
            {t.learnGectaro}
          </Link>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-narrow">
          <CTA
            title={t.discussProject}
            description={t.ctaStartDesc}
            buttonText={t.ctaContact}
            buttonHref="/contact"
          />
        </div>
      </section>
    </>
  );
}
