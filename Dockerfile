# Imagem base
FROM node:20-alpine

WORKDIR /usr/app

COPY package.json ./

# Instala dependências do Node
RUN npm install --legacy-peer-deps

COPY . .

# Gera o build de produção do Next.js
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 5055

# Comando de inicialização
CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]