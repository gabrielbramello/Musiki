FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /src

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do npm
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Executa o comando de build (se necessário)
RUN npm run build

# Comando padrão para iniciar o aplicativo
CMD [ "npm", "run", "preview" ]