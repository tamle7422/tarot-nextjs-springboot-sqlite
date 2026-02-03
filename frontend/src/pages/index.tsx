import { FormEvent, useState } from "react";
import Nav from "../components/Nav";

export default function HomePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<null | {
    predictedCard: string;
    createdAt: string;
  }>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8080/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Prediction failed");
      } else {
        setResult({
          predictedCard: data.predictedCard,
          createdAt: data.createdAt
        });
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <Nav />
      <h1>Tarot Card Classifier</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Keywords / Text:
            <br />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              cols={60}
            />
          </label>
        </div>
        <button type="submit">Predict Card</button>
      </form>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Prediction</h2>
          <p>
            <strong>Card:</strong> {result.predictedCard}
          </p>
          <p>
            <strong>Timestamp:</strong> {result.createdAt}
          </p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
