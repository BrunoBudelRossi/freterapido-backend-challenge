FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
