import { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
  /** Larger hero for home page */
  size?: "default" | "large";
}

export default function Hero({
  title,
  subtitle,
  lead,
  children,
  className = "",
  size = "default",
}: HeroProps) {
  const isLarge = size === "large";
  return (
    <section
      className={`relative overflow-hidden bg-hero-gradient pb-12 pt-12 md:pb-16 md:pt-16 lg:pb-20 lg:pt-20 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,77,75,0.08),transparent)]" aria-hidden />
      <div className="container-narrow relative z-10 text-center">
        {subtitle && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary md:text-sm">
            {subtitle}
          </p>
        )}
        <h1
          className={`heading-display mx-auto max-w-4xl text-[#1a1a1a] ${
            isLarge
              ? "text-4xl md:text-5xl lg:text-6xl"
              : "text-3xl md:text-4xl lg:text-5xl"
          }`}
        >
          {title}
        </h1>
        {lead && (
          <p className="text-lead mx-auto mt-6 max-w-2xl text-[#4d4d4d]">
            {lead}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
