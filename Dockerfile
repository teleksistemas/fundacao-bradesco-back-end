FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Gera Prisma (importante no seu caso)
RUN npx prisma generate

EXPOSE 5046

# Rodar em modo desenvolvimento
CMD ["npm", "run", "dev"]
