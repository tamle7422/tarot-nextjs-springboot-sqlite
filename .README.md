# Tarot Classifier App
  - A full‑stack, containerized Tarot prediction system combining: Next.js frontend, Spring Boot backend, Python ML pipeline (TF‑IDF + LinearSVC), & SQLite persistent storage via Docker volumes.
  - This project predicts tarot cards from user‑entered text and stores a full history of predictions for later analysis.

## Architecture Overview
- tarot-classifier-app/
  │
  ├── frontend/        # Next.js UI
  ├── backend/         # Spring Boot API + SQLite persistence
  ├── ml/              # Python training pipeline + model.joblib
  ├── docker-compose.yml
  └── README.md

## Flow
  - User enters text in the Next.js  UI
  - Frontend sends request → Spring Boot backend
  - Backend loads ML model (Python) and predicts tarot card
  - Prediction + timestamp stored in SQLite
  - History persists across container restarts via Docker volume

## Features
### 🔮 Tarot Prediction
  - ML model trained on symbolic tarot text
  - TF‑IDF vectorizer + LinearSVC classifier
  - Predicts one of 78 Major/Minor Arcana cards

### 📦 Persistent Storage
  - SQLite database stored in a Docker volume
  - Survives container restarts, rebuilds, and power loss

### 🧠 ML Pipeline
  - Python training script (ml/train_model.py)
  - Reproducible environment via pinned dependencies
  - Model saved as model.joblib

### 🌐 Frontend
  - Next.js  14
  - Clean UI for entering text and viewing predictions
  - History view powered by backend API

### ⚙️ Backend
  - Spring Boot 3
  - REST API for predictions + history
  - Loads Python model using scikit‑learn
  - Stores results in SQLite

## Prerequisites
  - Docker & Docker Compose
  - (Optional) Python 3.10+ if retraining the model
  - (Optional) Node.js  18+ if running frontend locally

## Running the App
### 1. Build and start everything
bash
```
docker compose up --build
```
  - Services: Frontend → http://localhost:3000, Backend → http://localhost:8080

### 2. Stop the App
bash
```
docker compose down
```

### 3. Confirm SQLite persistence
#### Your DB lives in the Docker volume:
bash
```
docker volume ls
docker volume inspect tarot-classifier-app_backend_data
```

## Retraining the ML Model
### If you want to update the model:
bash
```
cd ml
pip install -r requirements.txt
python train_model.py
```
### This regenerates: ml/model.joblib
### Then rebuild backend:
bash
```
docker compose build backend
```

## Environment Variables
### Backend uses: SPRING_DATASOURCE_URL=jdbc:sqlite:/app/data/tarot.db
### Frontend uses: NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

## Project Commands
### Backend (local)
bash
```
cd backend
./mvnw spring-boot:run
```

### Frontend (local)
bash
```
cd frontend
npm install
npm run dev
``` 

## Tech Stack
| Layer | Technology |
|:-------:|:-------:|
| Frontend | Next.js 14, React
| Backend | Spring Boot 3, Java 17	
| ML | Python 3, scikit-learn 1.5.1
| Database | SQLite (persistent volume)
| Container | Docker + Docker Compose
