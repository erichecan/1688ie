FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY pricing-demo.html /usr/share/nginx/html/pricing-demo.html
COPY help.html /usr/share/nginx/html/help.html
COPY flow.html /usr/share/nginx/html/flow.html
COPY assets/ /usr/share/nginx/html/assets/
COPY warehouse-demo/ /usr/share/nginx/html/warehouse-demo/
COPY local-warehouse-demo/ /usr/share/nginx/html/local-warehouse-demo/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
