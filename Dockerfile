FROM node:20.3.1-alpine3.18

ENV NODE_ENV production

WORKDIR /app

COPY ./package.json ./package.json

COPY ./package-lock.json ./package-lock.json

RUN npm install --omit=dev

COPY . .

CMD ["/usr/bin/bash", "./docker-start.sh"]