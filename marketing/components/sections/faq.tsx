import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Item = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Item[];

  return (
    <section id="faq" className="bg-paper-sunk py-16 sm:py-24">
      <Container>
        <p className="eyebrow text-flare">{t("eyebrow")}</p>
        <h2 className="mt-4 text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[2.75rem]">
          {t("title")}
        </h2>

        <dl className="mt-12 border-t border-rule">
          {items.map((item) => (
            <div
              key={item.q}
              className="grid gap-x-12 gap-y-3 border-b border-rule py-7 lg:grid-cols-[24rem_1fr]"
            >
              <dt className="text-[1rem] leading-snug font-bold">{item.q}</dt>
              <dd className="max-w-3xl text-[0.9375rem] leading-[1.85] text-ink-muted">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
