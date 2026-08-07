import { useLocale, useTranslations } from "next-intl";

export function HostFooter() {
  const t = useTranslations("host");
  const locale = useLocale();
  const isEn = locale === "en";

  const hostLink = (hash: string) => (isEn ? `/?lang=en${hash}` : `/${hash}`);
  const proposal = isEn ? "/marketing/proposal-en.html" : "/marketing/proposal.html";

  const quickLinks = [
    { href: hostLink("#solutions"), label: t("navSolutions") },
    { href: hostLink("#industries"), label: t("navIndustries") },
    { href: hostLink("#pricing"), label: t("navPricing") },
    { href: isEn ? "/marketing/en/" : "/marketing/", label: t("navMarketing") },
  ];

  return (
    <div className="host-chrome">
      <footer className="host-footer">
        <div className="host-footer-inner">
          <div>
            <a href={isEn ? "/?lang=en" : "/"} className="host-logo">
              {t("brand")}
              <span>{t("brandSuffix")}</span>
            </a>
            <p>{t("footerTagline")}</p>
          </div>
          <div className="host-footer-col">
            <h4>{t("footerQuickLinks")}</h4>
            {quickLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href={proposal}>{t("footerProposal")}</a>
          </div>
          <div className="host-footer-col">
            <h4>{t("footerContact")}</h4>
            <a href="https://wa.me/353XXXXXXXXX">{t("footerWhatsapp")}</a>
            <a href="mailto:hello@1688.ie">{t("footerEmail")}</a>
          </div>
        </div>
        <div className="host-footer-bottom">
          <span>{t("footerCopyright")}</span>
          <span>{t("footerLocation")}</span>
        </div>
      </footer>
    </div>
  );
}
