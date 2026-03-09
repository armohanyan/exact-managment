import Link from "next/link";

interface CTAProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
  variant?: "default" | "dark";
}

const isExternal = (href: string) =>
  href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");

export default function CTA({
  title,
  description,
  buttonText,
  buttonHref,
  className = "",
  variant = "default",
}: CTAProps) {
  const isDark = variant === "dark";
  const buttonClass =
    isDark
      ? "inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 font-semibold text-primary-dark transition-all duration-300 hover:bg-accent-hover"
      : "btn-primary";

  return (
    <section
      className={`relative overflow-hidden rounded-2xl px-6 py-12 md:px-12 md:py-16 ${
        isDark
          ? "bg-primary text-white"
          : "glass-surface"
      } ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_80%_10%,rgba(184,212,48,0.24),transparent_42%)]"
            : "bg-[radial-gradient(circle_at_90%_0%,rgba(30,77,75,0.07),transparent_38%)]"
        }`}
        aria-hidden
      />
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className={`heading-display text-2xl md:text-3xl lg:text-4xl ${
            isDark ? "text-white" : "text-[#1a1a1a]"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-4 text-lg leading-relaxed ${
              isDark ? "text-white/90" : "text-[#4d4d4d]"
            }`}
          >
            {description}
          </p>
        )}
        <div className="mt-8">
          {isExternal(buttonHref) ? (
            <a href={buttonHref} className={buttonClass}>
              {buttonText}
            </a>
          ) : (
            <Link href={buttonHref} className={buttonClass}>
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
