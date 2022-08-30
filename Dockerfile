FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN ci --only=production

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
