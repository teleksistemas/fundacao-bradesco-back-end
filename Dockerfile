FROM node:20.19-alpine

# Cria e entra na pasta do app
WORKDIR /usr/app

COPY package*.json ./


RUN npm i


COPY . .

RUN npx prisma generate

EXPOSE 5046


CMD ["npm", "start"]