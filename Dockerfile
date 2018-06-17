FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8080

CMD [ "yarn" ]
CMD [ "yarn", "start" ]