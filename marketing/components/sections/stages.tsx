import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Stage = {
  no: string;
  name: string;
  en: string;
  goal: string;
  symptom: string;
  does: string[];
  badge?: string;
  note?: string;
};

// 每段独占一个通版底色。角色限定：只作该段底色，不得挪作它用
const STAGE_BG = [
  "var(--color-stage-1)",
  "var(--color-stage-2)",
  "var(--color-stage-3)",
  "var(--color-stage-4)",
];

export function Stages() {
  const t = useTranslations("stages");
  const items = t.raw("items") as Stage[];

  return (
    <section id="stages">
      <Container className="py-16 sm:pt-24 sm:pb-14">
        <p className="eyebrow text-flare">{t("eyebrow")}</p>
        <h2 className="mt-4 text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[2.75rem]">
          {t("title")}
        </h2>
      </Container>

      {items.map((stage, i) => (
        <div
          key={stage.no}
          className="py-14 text-paper sm:py-20"
          style={{ background: STAGE_BG[i] }}
        >
          <Container>
            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <div className="flex items-start gap-5">
                  <span className="metric text-[3.5rem] leading-[0.8] font-bold tracking-[-0.04em] text-paper/35 sm:text-[5rem]">
                    {stage.no}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-[1.875rem] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[2.5rem]">
                      {stage.name}
                    </h3>
                    <p className="metric mt-1.5 text-[0.6875rem] font-semibold tracking-[0.18em] text-paper/55 uppercase">
                      {stage.en}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-[1.0625rem] leading-[1.6] font-semibold sm:text-[1.1875rem]">
                  {stage.goal}
                </p>

                <blockquote className="mt-6 border-l-2 border-paper/35 pl-5 text-[0.9375rem] leading-[1.85] text-paper/75">
                  {stage.symptom}
                </blockquote>

                {stage.badge ? (
                  <p className="mt-7 inline-block bg-paper px-3 py-1.5 text-[0.8125rem] font-bold text-stage-4">
                    {stage.badge}
                  </p>
                ) : null}
              </div>

              <div className="lg:pt-4">
                <ul className="space-y-4">
                  {stage.does.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.25rem_1fr] gap-3 border-b border-paper/20 pb-4 text-[0.9375rem] leading-[1.6]"
                    >
                      <span aria-hidden className="mt-0.5 text-paper/60">
                        →
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {stage.note ? (
                  <p className="mt-6 text-[0.875rem] leading-[1.85] text-paper/70">
                    {stage.note}
                  </p>
                ) : null}
              </div>
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}
