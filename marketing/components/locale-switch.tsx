"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

export function LocaleSwitch({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === "zh" ? "en" : "zh";

  return (
    <Link
      href={pathname}
      locale={target}
      className="metric text-xs text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
    >
      {label}
    </Link>
  );
}
