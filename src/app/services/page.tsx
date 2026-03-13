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
      "service1Item1",
      "service1Item2",
      "service1Item3",
      "service1Item4",
      "service1Item5",
      "service1Item6",
      "service1Item7",
    ],
    num: "01",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    imageAltKey: "service1ImageAlt",
  },
  {
    titleKey: "service2Title" as const,
    itemKeys: [
      "service2Item1",
      "service2Item2",
      "service2Item3",
      "service2Item4",
      "service2Item5",
      "service2Item6",
    ],
    num: "02",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    imageAltKey: "service2ImageAlt",
  },
  {
    titleKey: "service3Title" as const,
    itemKeys: [
      "service3Item1",
      "service3Item2",
      "service3Item3",
      "service3Item4",
    ],
    num: "03",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    imageAltKey: "service3ImageAlt",
  },
  {
    titleKey: "service4Title" as const,
    itemKeys: [
      "service4Item1",
      "service4Item2",
      "service4Item3",
      "service4Item4",
      "service4Item5",
    ],
    num: "04",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAltKey: "service4ImageAlt",
  },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <Hero title={t.servicesTitle} lead={t.servicesLead} />
      <section className="section-pad bg-surface">
        <div className="container-narrow animate-fade-up">
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {services.map(({ titleKey, itemKeys, num, image, imageAltKey }, i) => {
              const imageLeft = i % 2 === 0;
              return (
                <article
                  key={titleKey}
                  className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-[#fafaf8] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:grid-cols-2 lg:gap-0 md:even:grid-flow-dense"
                >
                  <div
                    className={`relative aspect-[16/10] md:aspect-auto md:min-h-[320px] ${
                      imageLeft ? "md:col-start-1" : "md:col-start-2"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={t[imageAltKey as keyof typeof t]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div
                    className={`flex flex-col justify-center p-5 sm:p-6 md:p-10 lg:p-12 ${
                      imageLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                    }`}
                  >
                    <span
                      className="font-display mb-3 inline-flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base sm:text-lg font-bold text-primary"
                      aria-hidden
                    >
                      {num}
                    </span>
                    <h2 className="font-display text-[1.35rem] leading-tight sm:text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-3xl">
                      {t[titleKey]}
                    </h2>
                    <ul className="mt-4 sm:mt-5 space-y-1.5 sm:space-y-2 pl-3 sm:pl-4 text-sm sm:text-base text-[#4d4d4d] leading-relaxed [list-style-type:disc]">
                      {itemKeys.map((item) => (
                        <li key={item}>{t[item as keyof typeof t]}</li>
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
        <div className="container-narrow animate-fade-up text-center">
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-2">
            {t.servicesGectaroNote}
          </p>
          <Link
            href="/gectaro"
            className="mt-5 sm:mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-primary-dark transition-all hover:bg-accent-hover"
          >
            {t.learnGectaro}
          </Link>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-narrow animate-fade-up">
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
