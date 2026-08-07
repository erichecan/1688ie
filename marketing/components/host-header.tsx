import { useLocale, useTranslations } from "next-intl";

export function HostHeader() {
  const t = useTranslations("host");
  const locale = useLocale();
  const isEn = locale === "en";

  // 回主站带上语言状态，主站读 ?lang= 后写入 localStorage
  const hostHome = isEn ? "/?lang=en" : "/";
  const hostLink = (hash: string) => (isEn ? `/?lang=en${hash}` : `/${hash}`);
  const pageLink = (page: string) => (isEn ? `/${page}?lang=en` : `/${page}`);
  const langHref = isEn ? "/marketing/" : "/marketing/en/";

  const links = [
    { href: hostLink("#solutions"), label: t("navSolutions") },
    { href: hostLink("#industries"), label: t("navIndustries") },
    { href: hostLink("#pricing"), label: t("navPricing") },
    { href: isEn ? "/marketing/en/" : "/marketing/", label: t("navMarketing"), current: true },
    { href: pageLink("flow.html"), label: t("navFlow") },
    { href: pageLink("help.html"), label: t("navHelp") },
    { href: hostLink("#contact"), label: t("navContact") },
  ];

  return (
    <div className="host-chrome">
      <nav className="host-nav">
        <div className="host-container">
          <a href={hostHome} className="host-logo">
            {t("brand")}
            <span>{t("brandSuffix")}</span>
          </a>
          <ul className="host-links">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} aria-current={link.current ? "page" : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="host-lang" href={langHref}>
            {t("langLabel")}
          </a>
        </div>
      </nav>
    </div>
  );
}
