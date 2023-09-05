FROM node:18.12.1-buster-slim AS builder

WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/ apps/
COPY libs/ libs/
RUN npm ci
RUN npm run build:compapp

FROM nginx:1.23.2-alpine
COPY apps/compapp/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/apps/compapp/ /usr/share/nginx/html
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx
CMD ["nginx", "-g", "daemon off;"]
