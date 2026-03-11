"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
    altKey: "heroSlide1Alt",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
    altKey: "heroSlide2Alt",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
    altKey: "heroSlide3Alt",
  },
];

const INTERVAL_MS = 5000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden md:min-h-[520px] lg:h-[75vh]">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "z-0 opacity-100" : "z-[-1] opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={t[slide.altKey as keyof typeof t]}
            fill
            className={`object-cover transition-transform duration-[7000ms] ${
              i === index ? "scale-105" : "scale-100"
            }`}
            priority={i === 0}
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/30"
            aria-hidden
          />
        </div>
      ))}

      <div className="container-narrow relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <p className="mb-3 animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-accent md:text-sm">
          {t.heroHomeSubtitle}
        </p>
        <h1 className="heading-display animate-fade-up max-w-4xl text-3xl text-white drop-shadow-md md:text-5xl lg:text-6xl">
          {t.heroHomeTitle}
        </h1>
      </div>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/30 md:left-6"
        aria-label={t.heroPrevSlide}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/30 md:right-6"
        aria-label={t.heroNextSlide}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-accent" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`${t.heroGoToSlide} ${i + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-white/20">
        <div
          key={index}
          className="h-full bg-accent animate-[progress_5000ms_linear_forwards]"
          style={{ width: "100%" }}
        />
      </div>
    </section>
  );
}
