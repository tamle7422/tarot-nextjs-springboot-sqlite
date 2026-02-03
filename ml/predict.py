import sys
import os
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")

def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"Model file not found at {MODEL_PATH}. Run train_model.py first."
        )
    return joblib.load(MODEL_PATH)

def predict(text: str) -> str:
    model = load_model()
    return model.predict([text])[0]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No text provided", file=sys.stderr)
        sys.exit(1)
    text = " ".join(sys.argv[1:])
    card = predict(text)
    # Print only the card name so Java can read a single line
    print(card)
