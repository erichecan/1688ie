# ---- 阶段 1：构建 /marketing 子站（Next.js 静态导出）----
FROM node:22-alpine AS marketing-build
WORKDIR /build
COPY marketing/package.json marketing/package-lock.json ./
RUN npm ci
COPY marketing/ ./
RUN npm run build

# ---- 阶段 2：nginx 静态托管 ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY pricing-demo.html /usr/share/nginx/html/pricing-demo.html
COPY help.html /usr/share/nginx/html/help.html
COPY flow.html /usr/share/nginx/html/flow.html
COPY demos.html /usr/share/nginx/html/demos.html
COPY nail-salon.html /usr/share/nginx/html/salon.html
COPY warehouse-demo/ /usr/share/nginx/html/warehouse-demo/
COPY local-warehouse-demo/ /usr/share/nginx/html/local-warehouse-demo/
COPY --from=marketing-build /build/out/ /usr/share/nginx/html/marketing/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
