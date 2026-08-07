import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function Proof() {
  const t = useTranslations("proof");

  return (
    <section className="bg-ink py-16 text-paper sm:py-24">
      <Container>
        <p className="eyebrow text-flare">{t("eyebrow")}</p>
        <h2 className="mt-4 text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[2.75rem]">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.8] text-paper/65">
          {t("lede")}
        </p>

        <figure className="mt-12">
          <figcaption className="eyebrow text-paper/50">
            {t("reviewLabel")}
          </figcaption>
          <blockquote className="mt-3 max-w-3xl border-l-4 border-paper/25 pl-5 text-[1.0625rem] leading-[1.7] italic">
            “{t("review")}”
          </blockquote>
        </figure>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-paper/8 p-6 ring-1 ring-paper/15">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-flare px-2.5 py-1 text-[0.6875rem] font-bold text-white">
                {t("badTag")}
              </span>
              <span className="text-sm font-semibold text-paper/70">
                {t("badLabel")}
              </span>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-paper/85">
              {t("bad")}
            </p>
            <p className="mt-4 border-t border-paper/15 pt-4 text-[0.8125rem] leading-[1.75] text-paper/55">
              {t("badNote")}
            </p>
          </div>

          <div className="rounded-xl bg-paper p-6 text-ink">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-ink px-2.5 py-1 text-[0.6875rem] font-bold text-paper">
                {t("goodTag")}
              </span>
              <span className="text-sm font-semibold text-ink-muted">
                {t("goodLabel")}
              </span>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-[1.75]">{t("good")}</p>
            <p className="mt-4 border-t border-rule pt-4 text-[0.8125rem] leading-[1.75] text-ink-muted">
              {t("goodNote")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
