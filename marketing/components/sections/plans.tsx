import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Plan = {
  name: string;
  en: string;
  price: string;
  covers: string;
  for: string;
  includes: string[];
  highlight: boolean;
};

type Extra = { name: string; price: string; unit: string; desc: string };

export function Plans() {
  const t = useTranslations("plans");
  const plans = t.raw("items") as Plan[];
  const extras = t.raw("extras") as Extra[];

  return (
    <section id="plans" className="py-16 sm:py-24">
      <Container>
        <p className="eyebrow text-flare">{t("eyebrow")}</p>
        <h2 className="mt-4 text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[2.75rem]">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-muted">
          {t("lede")}
        </p>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex h-full flex-col rounded-2xl p-7 ${
                plan.highlight
                  ? "bg-ink text-paper ring-4 ring-flare"
                  : "bg-paper-sunk"
              }`}
            >
              {plan.highlight ? (
                <span className="mb-4 self-start rounded-full bg-flare px-3 py-1 text-[0.6875rem] font-bold text-white">
                  {t("popularTag")}
                </span>
              ) : null}

              <h3 className="text-[1.375rem] font-bold">
                {plan.name}
                <span
                  className={`metric ml-2 text-xs font-medium tracking-[0.1em] uppercase ${
                    plan.highlight ? "text-paper/50" : "text-ink-muted"
                  }`}
                >
                  {plan.en}
                </span>
              </h3>

              <p className="mt-3 flex items-center gap-2">
                <span
                  className={`eyebrow ${
                    plan.highlight ? "text-paper/50" : "text-ink-muted"
                  }`}
                >
                  {t("coversLabel")}
                </span>
                <span className="metric text-[0.9375rem] font-bold text-flare">
                  {plan.covers}
                </span>
              </p>

              <p
                className={`mt-3 text-[0.875rem] ${
                  plan.highlight ? "text-paper/65" : "text-ink-muted"
                }`}
              >
                {plan.for}
              </p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="metric text-[2.75rem] leading-none font-semibold tracking-[-0.03em]">
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.highlight ? "text-paper/60" : "text-ink-muted"
                  }`}
                >
                  {t("monthly")}
                </span>
              </p>

              <ul className="mt-7 grow space-y-3">
                {plan.includes.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1.125rem_1fr] gap-2 text-[0.9375rem] leading-[1.6]"
                  >
                    <span aria-hidden className="mt-0.5 text-flare">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#start"
                className={`mt-8 rounded-full px-6 py-3 text-center text-[0.9375rem] font-semibold transition-transform hover:-translate-y-0.5 ${
                  plan.highlight ? "bg-flare text-white" : "bg-ink text-paper"
                }`}
              >
                {t("planCta")}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {extras.map((extra) => (
            <article
              key={extra.name}
              className="rounded-2xl border-2 border-dashed border-rule p-7"
            >
              <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[1.125rem] font-bold">
                {extra.name}
                <span className="metric text-[1.5rem] font-semibold text-flare">
                  {extra.price}
                </span>
                <span className="text-xs font-normal text-ink-muted">
                  {extra.unit}
                </span>
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.8] text-ink-muted">
                {extra.desc}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink-muted">
          {t("footnote")}
        </p>
      </Container>
    </section>
  );
}
