# Etapa 1: Construção do React (Frontend)
FROM node:14 AS build

# Definir o diretório de trabalho dentro do container para a aplicação React
WORKDIR /src

# Copiar os arquivos de dependências do React (package.json e package-lock.json) para o container
COPY package*.json ./

# Instalar as dependências do React
RUN npm install

# Copiar o restante do código-fonte do React para o container
COPY . ./

# Rodar o build do React para gerar os arquivos estáticos
RUN npm run build

# Comando padrão para iniciar o aplicativo
CMD [ "npm", "run", "preview" ]