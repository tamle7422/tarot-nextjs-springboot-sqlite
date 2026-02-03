import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "train_data.csv")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")

def load_data():
    df = pd.read_csv(DATA_PATH)
    # Expect columns: cards,keywords
    df["keywords"] = df["keywords"].astype(str)
    df["card"] = df["card"].astype(str)
    return df

def train():
    df = load_data()
    X = df["keywords"]
    y = df["card"]

    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer()),
        ("clf", LogisticRegression(max_iter=1000))
    ])

    pipeline.fit(X, y)
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Model trained and saved to {MODEL_PATH}")

if __name__ == "__main__":
    train()
