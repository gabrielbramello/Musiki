# Parando e removendo containers existentes
echo "Parando e removendo containers existentes..."
docker-compose down

# Atualizando o código do repositório
echo "Atualizando o código do repositório..."
git pull

# Construindo a imagem do Docker para a aplicação
echo "Construindo a imagem do Docker para a aplicação..."
docker-compose build --no-cache

# Subindo os containers com docker-compose
echo "Subindo os containers com docker-compose..."
docker-compose up --build --force-recreate --remove-orphans -d

# Exibindo logs do serviço Spring Boot em background
echo "Exibindo logs do serviço Spring Boot..."
docker-compose logs -f spring-app

# O comando de logs está rodando em background agora, você pode continuar usando o terminal.
# Se você quiser parar os logs, use `fg` para trazê-los de volta para o primeiro plano ou pressione Ctrl+C para matar o processo de logs