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
      className={`group lux-card card-hover overflow-hidden ${noPadding ? "" : "p-5 sm:p-6 md:p-8"
        } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-5">
        {number && (
          <span
            className="font-display flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-base sm:text-lg font-bold text-primary shadow-sm transition-transform duration-300 group-hover:scale-105"
            aria-hidden
          >
            {number}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[1.15rem] leading-tight sm:text-xl font-bold tracking-tight text-[#1a1a1a] md:text-[1.25rem]">
            {title}
          </h3>
          <div className="mt-2 sm:mt-3 text-sm sm:text-base text-[#4d4d4d] leading-relaxed [&>ul]:space-y-1.5 sm:[&>ul]:space-y-2 [&>ul]:pl-3 sm:[&>ul]:pl-4">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
