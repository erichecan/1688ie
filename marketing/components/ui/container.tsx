import clsx from "clsx";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1180px] px-6", className)}>
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-ink-muted">{eyebrow}</p>
      <h2 className="mt-4 text-[1.75rem] leading-[1.25] font-semibold tracking-[-0.02em] sm:text-[2.125rem]">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 text-[0.9375rem] leading-[1.75] text-ink-muted sm:text-base">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
