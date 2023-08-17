FROM node:18.16.0 as common-build-stage

WORKDIR /app
COPY . .

RUN npm i --location=global @nestjs/cli
RUN npm i --location=global dotenv-cli

ENV NODE_ENV=production
RUN yarn

CMD dotenv -e .env -- node dist/main.js
