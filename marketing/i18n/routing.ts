import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  localePrefix: "as-needed",
  // 主要受众是华人商家，但他们的浏览器常是英文的。关掉语言协商，
  // 让 "/" 恒为中文，英文走显式的 /en 与顶部切换。
  localeDetection: false,
});
