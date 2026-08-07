import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const proposal = locale === "en" ? "/proposal-en.html" : "/proposal.html";

  const links = [
    { href: "#leak", label: nav("leak") },
    { href: "#stages", label: nav("stages") },
    { href: "#plans", label: nav("plans") },
    { href: "#faq", label: nav("faq") },
    { href: proposal, label: t("quote") },
  ];

  return (
    <footer className="border-t border-rule py-14">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-lg font-bold">{nav("brand")}</span>
              <span className="metric text-[0.6875rem] font-semibold tracking-[0.18em] text-flare uppercase">
                {nav("brandEn")}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-muted">{t("tagline")}</p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a className="hover:text-ink" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-3xl border-t border-rule pt-6 text-xs leading-relaxed text-ink-muted">
          {t("legal")}
        </p>
      </Container>
    </footer>
  );
}
