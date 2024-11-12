# Etapa 1: Construção do React (Frontend)
FROM node:18 AS build

# Definir o diretório de trabalho dentro do container para a aplicação React
WORKDIR /app

# Copiar os arquivos de dependências do React (package.json e package-lock.json) para o container
COPY package*.json ./

# Copiar o arquivo .env para o container (Deve vir antes do 'npm install' e 'npm run build')
COPY .env . 

# Copiar o restante dos arquivos do projeto, incluindo a pasta public (essencial para o build)
COPY . .

# Instalar as dependências do React
RUN npm install

# Rodar o build do React para gerar os arquivos estáticos
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
# Instalar o "serve" globalmente para servir a aplicação estática gerada
RUN npm install -g serve

# Expor a porta que a aplicação estará rodando (5000 é a porta padrão do "serve")
EXPOSE 5000

# Comando para iniciar o servidor de arquivos estáticos
CMD ["serve", "-s", "build", "-l", "5000"]