import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { CoverWall } from "@/components/sections/cover-wall";
import { Leak } from "@/components/sections/leak";
import { Stages } from "@/components/sections/stages";
import { Plans } from "@/components/sections/plans";
import { Howto } from "@/components/sections/howto";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CoverWall />
        <Leak />
        <Stages />
        <Plans />
        <Howto />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
