# Usa uma imagem leve do Node.js
FROM node:18-bookworm

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos essenciais para instalar as dependências
COPY package.json package-lock.json ./

# Instala todas as dependências (produção + desenvolvimento)
RUN npm install

# Copia os arquivos necessários para rodar o projeto
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Expor a porta 3000 (ou outra que seu Nest use)
EXPOSE 3000

# Comando para rodar a aplicação em modo desenvolvimento com hot reload
CMD ["npm", "run", "start:dev"]