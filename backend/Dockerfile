FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY backend/pom.xml .

RUN mvn -q -e -B dependency:go-offline

COPY backend/src ./src
RUN mvn -q -e -B package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Create data directory for SQLite
RUN mkdir -p /app/data

# Copy backend jar
COPY --from=build /app/target/tarot-backend-0.0.1-SNAPSHOT.jar app.jar

# Copy ML folder into backend container so Java can call predict.py
COPY ../ml /app/ml

# Install Python and dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-dev build-essential && \
    pip3 install --no-cache-dir \
        pandas==2.2.2 \
        scikit-learn==1.5.1 \
        joblib==1.4.2 \
        numpy==1.26.4 \
        python-dateutil==2.9.0.post0 \
        pytz==2024.1 && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
