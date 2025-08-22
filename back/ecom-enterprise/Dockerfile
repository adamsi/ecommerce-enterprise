FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/ecom-enterprise-0.0.1-SNAPSHOT.jar /app/ecom-enterprise.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/ecom-enterprise.jar"]