FROM node:18

WORKDIR /usr/src/app

COPY . .
RUN rm -rf node_modules
RUN npm i
RUN npm run build

CMD npm run start:prod
