import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

const CONTACT_EMAIL = "hello@1688.ie";

export function FinalCta() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const proposal = locale === "en" ? "/marketing/proposal-en.html" : "/marketing/proposal.html";

  return (
    <section id="start" className="bg-flare py-20 text-white sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-[2.25rem] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[3.25rem]">
            {t("title")}
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-[1.8] text-white/85 sm:text-[1.125rem]">
            {t("sub")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-full bg-ink px-7 py-3.5 text-[0.9375rem] font-semibold text-paper transition-transform hover:-translate-y-0.5"
            >
              {t("button")}
            </a>
            <a
              href={proposal}
              className="rounded-full border-2 border-white/70 px-7 py-3.5 text-[0.9375rem] font-semibold transition-colors hover:bg-white hover:text-flare"
            >
              {t("secondary")}
            </a>
          </div>

          <p className="mt-8 text-sm text-white/75">
            {t("note")}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="metric ml-2 font-medium text-white underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
