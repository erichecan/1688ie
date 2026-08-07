import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { LocaleSwitch } from "@/components/locale-switch";

export function SiteHeader() {
  const t = useTranslations("nav");

  const links = [
    { href: "#leak", label: t("leak") },
    { href: "#stages", label: t("stages") },
    { href: "#plans", label: t("plans") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-baseline gap-2.5">
          <span className="text-xl font-bold tracking-[-0.02em]">
            {t("brand")}
          </span>
          <span className="metric text-[0.6875rem] font-semibold tracking-[0.18em] text-flare uppercase">
            {t("brandEn")}
          </span>
        </a>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LocaleSwitch label={t("langLabel")} />
          <a
            href="#start"
            className="rounded-full bg-flare px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {t("cta")}
          </a>
        </nav>
      </Container>
    </header>
  );
}
