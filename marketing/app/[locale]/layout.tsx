import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const canonicalPath = locale === "en" ? "/marketing/en/" : "/marketing/";
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL("https://1688.ie"),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "zh-Hans": "/marketing/",
        "en-IE": "/marketing/en/",
        "x-default": "/marketing/",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalPath,
      locale: locale === "en" ? "en_IE" : "zh_CN",
      siteName: "1688.ie",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en-IE"}>
      <body className={`${plexSans.variable} ${plexMono.variable}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
