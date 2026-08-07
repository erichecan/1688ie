import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Step = { n: string; label: string };

export function Leak() {
  const t = useTranslations("leak");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="leak" className="bg-paper-sunk py-16 sm:py-24">
      <Container>
        <p className="eyebrow text-flare">{t("eyebrow")}</p>
        <h2 className="mt-4 max-w-[20ch] text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[2.75rem]">
          {t("title")}
        </h2>

        {/* 四个数一眼看完，不做图表、不列漏损原因 */}
        <ol className="mt-12 flex flex-wrap items-end gap-x-4 gap-y-6 sm:gap-x-8">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.label} className="flex items-end gap-4 sm:gap-8">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="pb-3 text-[1.5rem] leading-none text-ink-muted/40 sm:text-[2rem]"
                  >
                    ›
                  </span>
                ) : null}
                <div>
                  <span
                    className={`metric block leading-[0.85] font-bold tracking-[-0.04em] ${
                      last
                        ? "text-[4.5rem] text-flare sm:text-[6.5rem]"
                        : "text-[2.75rem] sm:text-[4rem]"
                    }`}
                  >
                    {step.n}
                  </span>
                  <span className="mt-2 block text-[0.8125rem] font-semibold text-ink-muted sm:text-sm">
                    {step.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-12 max-w-3xl border-t-2 border-ink pt-8 text-[1.375rem] leading-[1.5] font-bold tracking-[-0.02em] sm:text-[1.75rem]">
          {t("line1")}
        </p>
        <p className="mt-5 max-w-3xl text-[1.0625rem] leading-[1.8] text-ink-muted">
          {t("line2")}
        </p>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-muted">
          {t("note")}
        </p>
      </Container>
    </section>
  );
}
