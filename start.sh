docker-compose down

git pull

docker build -t musiki:latest ./musikiAPI

docker build -t musiki-primefaces:latest ./musikiprimefaces

docker-compose up --build --force-recreate --remove-orphans

docker-compose logs --tail all -f spring-app