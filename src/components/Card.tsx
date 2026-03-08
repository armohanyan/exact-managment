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
      className={`group rounded-2xl border border-border bg-surface shadow-md card-hover overflow-hidden ${
        noPadding ? "" : "p-6 md:p-8"
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        {number && (
          <span
            className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary"
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
