# Use Maven with Java 17 to build the project
FROM maven:3.9.8-eclipse-temurin-17 AS build

WORKDIR /app

# Copy project files
COPY . .

# Build the Spring Boot application
RUN mvn clean package -DskipTests

# -----------------------------

# Use a lightweight Java runtime
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the generated JAR file
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]