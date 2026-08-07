import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Row = {
  role: string;
  roleNote: string;
  cost: string;
  plan: string;
  ratio: string;
};

function VersusCard({ row, ratioLabel }: { row: Row; ratioLabel: string }) {
  return (
    <div className="rounded-2xl bg-paper-sunk p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{row.role}</p>
          <p className="mt-0.5 text-[0.8125rem] text-ink-muted">
            {row.roleNote}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="eyebrow text-ink-muted">{ratioLabel}</p>
          <p className="metric mt-1 text-[2rem] leading-none font-bold text-flare">
            {row.ratio}
          </p>
        </div>
      </div>
      <dl className="mt-5 space-y-2 border-t border-rule pt-4 text-[0.9375rem]">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-muted">{row.plan}</dt>
          <dd className="metric text-ink-muted">{row.cost}</dd>
        </div>
      </dl>
    </div>
  );
}

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

        {/* Below md (768px): stacked cards so the ratio — the point of the
            section — is visible without horizontal scrolling. The table's
            min-w-[640px] already fits inside the Container (max-w-1180,
            px-6) once the viewport clears ~688px, so md is where the table
            has genuine room rather than an arbitrary cutoff. */}
        <div className="mt-10 space-y-4 md:hidden">
          {rows.map((row, i) => (
            <VersusCard key={i} row={row} ratioLabel={t("colRatio")} />
          ))}
        </div>

        <div className="mt-10 hidden overflow-x-auto rounded-2xl bg-paper-sunk md:block">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="py-4 pr-4 pl-7 text-[0.8125rem] font-semibold text-ink-muted">
                  {t("colRole")}
                </th>
                <th scope="col" className="py-4 pr-4 text-[0.8125rem] font-semibold text-ink-muted">
                  {t("colCost")}
                </th>
                <th scope="col" className="py-4 pr-4 text-[0.8125rem] font-semibold text-ink-muted">
                  {t("colPlan")}
                </th>
                <th scope="col" className="py-4 pr-7 text-[0.8125rem] font-semibold text-ink-muted">
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
