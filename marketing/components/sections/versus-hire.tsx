import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Row = {
  role: string;
  roleNote: string;
  cost: string;
  plan: string;
  ratio: string;
};

export function VersusHire() {
  const t = useTranslations("versus");
  const rows = t.raw("rows") as Row[];

  return (
    <section id="versus" className="py-16 sm:py-24">
      <Container>
        <p className="eyebrow text-flare">{t("eyebrow")}</p>
        <h2 className="mt-4 text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[2.75rem]">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-muted">
          {t("lede")}
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl bg-paper-sunk">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                <th className="py-4 pr-4 pl-7 text-[0.8125rem] font-semibold text-ink-muted">
                  {t("colRole")}
                </th>
                <th className="py-4 pr-4 text-[0.8125rem] font-semibold text-ink-muted">
                  {t("colCost")}
                </th>
                <th className="py-4 pr-4 text-[0.8125rem] font-semibold text-ink-muted">
                  {t("colPlan")}
                </th>
                <th className="py-4 pr-7 text-[0.8125rem] font-semibold text-ink-muted">
                  {t("colRatio")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-rule/60 last:border-b-0">
                  <td className="py-5 pr-4 pl-7">
                    <span className="font-semibold">{row.role}</span>
                    <span className="mt-0.5 block text-[0.8125rem] text-ink-muted">
                      {row.roleNote}
                    </span>
                  </td>
                  <td className="metric py-5 pr-4 text-lg text-ink-muted">
                    {row.cost}
                  </td>
                  <td className="py-5 pr-4 text-[0.9375rem]">{row.plan}</td>
                  <td className="metric py-5 pr-7 text-[1.75rem] font-bold text-flare">
                    {row.ratio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink-muted">
          {t("note")}
        </p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-ink-muted">
          <span className="font-semibold">{t("sourceLabel")}：</span>
          {t("sources")}
        </p>
      </Container>
    </section>
  );
}
