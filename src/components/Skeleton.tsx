"use client";

export default function Skeleton({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#e5e5e5] dark:bg-[#2a2a2a] ${className}`}
      aria-hidden
      {...props}
    />
  );
}

export function SkeletonCard({
  lines = 3,
}: {
  lines?: number;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <Skeleton className="h-7 w-3/4" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonProjectRow({ imageLeft }: { imageLeft?: boolean }) {
  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-[#fafaf8] md:grid-cols-2">
      <Skeleton className={`aspect-[16/10] md:aspect-auto md:min-h-[380px] ${imageLeft ? "md:col-start-1" : "md:col-start-2"}`} />
      <div className={`flex flex-col justify-center p-6 sm:p-8 md:px-12 md:py-14 ${imageLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`}>
        <Skeleton className="h-4 w-8" />
        <Skeleton className="mt-3 h-8 w-full max-w-sm" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTeamGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
          <Skeleton className="aspect-square w-full" />
          <div className="border-t border-border p-4 text-center">
            <Skeleton className="mx-auto h-5 w-24" />
            <Skeleton className="mx-auto mt-2 h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
