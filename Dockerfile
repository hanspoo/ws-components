FROM node:18-buster-slim AS builder

WORKDIR /app
COPY package-lock.json package.json tsconfig.base.json ./

COPY apps/ apps/
COPY libs/ libs/
COPY .env .
RUN npm ci
RUN npm run build:api
RUN npm run build:archimail
RUN rm -rf node_modules
RUN npm ci --production

FROM node:18-buster-slim
COPY --from=builder /app/dist/apps/api /app
COPY --from=builder /app/dist/apps/archimail /app/public
COPY --from=builder /app/node_modules /app/node_modules
COPY .env app
WORKDIR /app
COPY --from=builder /app/node_modules node_modules

CMD ["node", "main.js"]
