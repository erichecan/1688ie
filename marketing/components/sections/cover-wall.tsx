import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Cover = { tag: string; title: string; color: number };

// 封面卡专用色板。角色限定：只出现在封面卡内，不得用作页面 UI 表面
const COVER_COLORS: Record<number, string> = {
  1: "#FF3B1F",
  2: "#1B3A6B",
  3: "#17805F",
  4: "#F2B705",
  5: "#B02A6F",
  6: "#2B2A28",
  7: "#E0552C",
  8: "#38618C",
};

function CoverCard({ cover }: { cover: Cover }) {
  const bg = COVER_COLORS[cover.color] ?? COVER_COLORS[1];
  const dark = cover.color !== 4;

  return (
    <article
      className="flex aspect-[3/4] w-[168px] flex-none flex-col justify-between overflow-hidden rounded-xl p-4 sm:w-[196px] sm:p-5"
      style={{ background: bg, color: dark ? "#FFFCF7" : "#16120F" }}
    >
      <span
        className="self-start rounded-full px-2.5 py-1 text-[0.625rem] font-semibold tracking-wide"
        style={{
          background: dark ? "rgba(255,252,247,.18)" : "rgba(22,18,15,.12)",
        }}
      >
        {cover.tag}
      </span>
      <h3 className="text-[1.0625rem] leading-[1.35] font-bold tracking-[-0.01em] whitespace-pre-line sm:text-[1.1875rem]">
        {cover.title}
      </h3>
    </article>
  );
}

export function CoverWall() {
  const t = useTranslations("covers");
  const items = t.raw("items") as Cover[];
  const rowA = items.slice(0, 6);
  const rowB = items.slice(6);

  return (
    <section className="overflow-hidden pb-16 sm:pb-20">
      <Container>
        <p className="eyebrow mb-5 text-ink-muted">{t("eyebrow")}</p>
      </Container>

      <div className="marquee space-y-4">
        {[rowA, rowB].map((row, i) => (
          <div key={i} className={i === 1 ? "track track-reverse" : "track"}>
            {[...row, ...row, ...row].map((cover, j) => (
              <CoverCard key={`${cover.title}-${j}`} cover={cover} />
            ))}
          </div>
        ))}
      </div>

      <Container>
        <p className="mt-8 max-w-2xl text-[0.875rem] leading-[1.8] text-ink-muted">
          {t("note")}
        </p>
      </Container>
    </section>
  );
}
