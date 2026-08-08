import { setRequestLocale } from "next-intl/server";
import { HostHeader } from "@/components/host-header";
import { HostFooter } from "@/components/host-footer";
import { Hero } from "@/components/sections/hero";
import { CoverWall } from "@/components/sections/cover-wall";
import { Leak } from "@/components/sections/leak";
import { Stages } from "@/components/sections/stages";
import { VersusHire } from "@/components/sections/versus-hire";
import { Plans } from "@/components/sections/plans";
import { Howto } from "@/components/sections/howto";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import "@/components/host-chrome.css";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HostHeader />
      <main>
        <Hero />
        <CoverWall />
        <Leak />
        <Stages />
        <VersusHire />
        <Plans />
        <Howto />
        <Faq />
        <FinalCta />
      </main>
      <HostFooter />
    </>
  );
}
