import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function Hero() {
  const t = useTranslations("hero");
  const notes = t.raw("notes") as string[];

  return (
    <section id="top" className="pt-14 pb-12 sm:pt-20 sm:pb-14">
      <Container>
        <p className="eyebrow text-flare">{t("eyebrow")}</p>

        {/* 分两句渲染：中文标题若交给自动换行，会把「华人」拆开 */}
        <h1 className="mt-6 text-[2.5rem] leading-[1.08] font-bold tracking-[-0.035em] sm:text-[3.75rem] lg:text-[4.5rem]">
          <span className="block">{t("headlineA")}</span>
          <span className="block">{t("headlineB")}</span>
        </h1>

        <p className="mt-8 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-muted sm:text-[1.125rem]">
          {t("sub")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#start"
            className="rounded-full bg-flare px-7 py-3.5 text-[0.9375rem] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {t("primary")}
          </a>
          <a
            href="#plans"
            className="rounded-full border-2 border-ink px-7 py-3.5 text-[0.9375rem] font-semibold transition-colors hover:bg-ink hover:text-paper"
          >
            {t("secondary")}
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          {notes.map((note) => (
            <li
              key={note}
              className="flex items-center gap-2 text-[0.8125rem] font-medium text-ink-muted"
            >
              <span aria-hidden className="text-flare">
                ✓
              </span>
              {note}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
