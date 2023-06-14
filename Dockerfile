FROM node:18

RUN git clone https://github.com/hanspoo/b2b-starter

WORKDIR /b2b-starter

RUN npm install 
RUN npm run test
RUN npm run build
RUN rm -rf node_modules/
RUN npm i --production


FROM node:18

COPY --from=0 /b2b-starter/dist /b2b-starter/dist
COPY --from=0 /b2b-starter/node_modules /b2b-starter/node_modules
WORKDIR /b2b-starter/dist/apps/api

CMD ["node", "main.js"]

