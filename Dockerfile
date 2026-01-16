# ========== ETAPA 1: BUILD ==========
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Garante que o TypeScript está instalado
RUN npm install -g typescript

RUN npm run build

# ========== ETAPA 2: RODAR ==========
FROM node:20-alpine

WORKDIR /app

# Copia só o que foi compilado + package.json
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm install --production

EXPOSE 5046

CMD ["node", "dist/index.js"]
