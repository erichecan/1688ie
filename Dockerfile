# ---- nginx 静态托管 ----
# /marketing 子站已于 2026-08-11 下线（内容并入主站模块②），
# 原本的 Next.js 构建阶段一并移除；旧 URL 由 nginx.conf 的 301 承接。
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY pricing-demo.html /usr/share/nginx/html/pricing-demo.html
COPY help.html /usr/share/nginx/html/help.html
COPY flow.html /usr/share/nginx/html/flow.html
COPY demos.html /usr/share/nginx/html/demos.html
COPY nail-salon.html /usr/share/nginx/html/salon.html
COPY robots.txt /usr/share/nginx/html/robots.txt
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY warehouse-demo/ /usr/share/nginx/html/warehouse-demo/
COPY local-warehouse-demo/ /usr/share/nginx/html/local-warehouse-demo/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
