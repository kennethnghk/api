FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn* ./

RUN yarn

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]