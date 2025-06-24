# Etapa 1: Build com Maven e JDK 17
FROM maven:3.9-eclipse-temurin-17-alpine AS spring-build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração Maven (melhora cache)
COPY pom.xml ./ 
COPY .mvn/ .mvn/

# Baixar dependências (aproveitando cache do Docker)
RUN mvn dependency:go-offline -B

# Copiar código-fonte
COPY src ./src/

# Build da aplicação com otimizações
RUN mvn clean package -DskipTests -B -q && \
    mv target/*.jar target/app.jar

# Etapa 2: Imagem de runtime otimizada
FROM eclipse-temurin:17-jdk-alpine

# Instalar dumb-init para melhor gerenciamento de processos
RUN apk add --no-cache dumb-init

# Definir diretório de trabalho
WORKDIR /app

# Copiar JAR da etapa de build
COPY --from=spring-build /app/target/app.jar ./app.jar

# Expor porta da aplicação (sem SSL, pois o NGINX irá gerenciar o SSL)
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]