FROM maven:3.9-eclipse-temurin-17 AS spring-build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY . ./

# Construir o projeto com Maven
RUN mvn clean install -DskipTests

# Etapa 2: Executar o Spring Boot
FROM maven:3.9-eclipse-temurin-17

WORKDIR /app

# Copiar o JAR do build
COPY --from=spring-build /app/target/musikiAPI-0.0.1-SNAPSHOT.jar /app/musiki-api.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/musiki-api.jar"]