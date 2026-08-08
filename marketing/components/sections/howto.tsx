import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Step = { no: string; name: string; time: string; desc: string };

export function Howto() {
  const t = useTranslations("howto");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <p className="eyebrow text-flare">{t("eyebrow")}</p>
        <h2 className="mt-4 max-w-[22ch] text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[2.75rem]">
          {t("title")}
        </h2>

        <ol className="mt-12 grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.no}>
              <span className="metric block text-[3.5rem] leading-none font-semibold text-flare">
                {step.no}
              </span>
              <h3 className="mt-4 flex flex-wrap items-baseline gap-3 text-[1.1875rem] font-bold">
                {step.name}
                <span className="rounded-full bg-paper-sunk px-2.5 py-1 text-[0.6875rem] font-semibold text-ink-muted">
                  {step.time}
                </span>
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.8] text-ink-muted">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
