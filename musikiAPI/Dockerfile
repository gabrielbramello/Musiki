# Etapa 1: Definir a imagem base para build com Maven e JDK 17
FROM maven:3.9-eclipse-temurin-17 AS spring-build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas o arquivo pom.xml para o contêiner (para otimizar o cache)
COPY pom.xml /app/

# Baixar as dependências do Maven sem compilar o código (isso utiliza o cache do Docker)
RUN mvn dependency:go-offline

# Copiar o código-fonte do projeto
COPY src /app/src/

# Rodar o build Maven, isso agora usa o cache de dependências
RUN mvn clean install -DskipTests

# Etapa 2: Definir a imagem para execução (não precisa de Maven, só do JDK)
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copiar o JAR gerado do build
COPY --from=spring-build /app/target/musikiAPI-0.0.1-SNAPSHOT.jar /app/musiki-api.jar

EXPOSE 8081

# Comando para rodar a aplicação Spring Boot
ENTRYPOINT ["java", "-jar", "/app/musiki-api.jar"]