FROM node:20-alpine

WORKDIR /app

# Copia tudo (inclusive a pasta dist já gerada)
COPY . .

# Instala dependências
RUN npm install --production

# Expõe sua porta
EXPOSE 5046

# Roda a aplicação
CMD ["node", "dist/index.js"]
