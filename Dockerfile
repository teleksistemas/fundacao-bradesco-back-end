FROM node:23

# Cria e entra na pasta do app
WORKDIR /usr/app

COPY package*.json ./


RUN npm install


COPY . .

RUN npx prisma generate

EXPOSE 5046


CMD ["npm", "start"]