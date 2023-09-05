FROM node:18-alpine
RUN git clone  http://github.com/hanspoo/ws-components.git
WORKDIR ws-components
RUN npm install
RUN npm run build:all-components
WORKDIR dist/apps/all-components/

FROM nginx
COPY --from=0 /ws-components/dist/apps/all-components  /usr/share/nginx/html





