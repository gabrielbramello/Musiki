echo "Parando e removendo containers existentes..."
docker-compose down

echo "Atualizando o código do repositório..."
git pull

echo "Construindo a imagem do Docker para a aplicação..."
docker-compose build --no-cache

echo "Subindo os containers com docker-compose..."
docker-compose up --build --force-recreate --remove-orphans

echo "Exibindo logs do serviço Spring Boot..."
docker-compose logs -f spring-app