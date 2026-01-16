

# ====== ETAPA 1: BUILD ======
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ====== ETAPA 2: RODAR ======
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./

EXPOSE 5046

# Define the command to run the application
CMD ["npm", "start"]