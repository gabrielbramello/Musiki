FROM eclipse-temurin:17.0.8.1_1-jdk-jammy
RUN apt update && apt install -y maven
COPY . .
RUN mvn clean install -DskipTests
ENTRYPOINT [ "java", "-jar","target/musikiAPI-0.0.1-SNAPSHOT.jar" ]
