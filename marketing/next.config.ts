import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // 作为 1688.ie 的 /marketing 子站发布，产物由 nginx 静态托管
  output: "export",
  basePath: "/marketing",
  // 保证产物为 zh/index.html 目录形式，nginx 路由才可预测
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
