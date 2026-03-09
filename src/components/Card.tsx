import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  /** Optional number or icon (e.g. "01") for visual hierarchy */
  number?: string;
}

export default function Card({
  title,
  children,
  className = "",
  noPadding,
  number,
}: CardProps) {
  return (
    <article
      className={`group lux-card card-hover overflow-hidden ${
        noPadding ? "" : "p-6 md:p-8"
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        {number && (
          <span
            className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-lg font-bold text-primary shadow-sm transition-transform duration-300 group-hover:scale-105"
            aria-hidden
          >
            {number}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-bold tracking-tight text-[#1a1a1a] md:text-[1.25rem]">
            {title}
          </h3>
          <div className="mt-3 text-[#4d4d4d] leading-relaxed [&>ul]:space-y-2 [&>ul]:pl-4">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
