# Etapa 1: Build do React
FROM node:18 AS build

# Definir o diretório de trabalho dentro do container para a aplicação React
WORKDIR /app

# Copiar os arquivos de dependências do React (package.json e package-lock.json) para o container
COPY package*.json ./
COPY .env .env
COPY . .

# Instalar as dependências do React
RUN npm install

# Rodar o build do React para gerar os arquivos estáticos
RUN npm run build

# Etapa 2: Imagem final com 'serve' para servir o build
FROM node:18-alpine

WORKDIR /app

# Instala o pacote serve
RUN npm install -g serve

# Copia o build do React
COPY --from=build /app/build ./build

# Expõe a porta padrão usada pelo serve
EXPOSE 3000

# Comando para servir os arquivos estáticos
CMD ["serve", "-s", "build", "-l", "3000"]