import { useState } from "react";
import Nav from "../components/Nav";

type Record = {
  id: number;
  inputText: string;
  predictedCard: string;
  createdAt: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<Record[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/api/history");
      const data = await res.json();
      if (!res.ok) {
        setError("Failed to load history");
      } else {
        setHistory(data);
        setLoaded(true);
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <Nav />
      <h1>Prediction History</h1>
      <button onClick={loadHistory}>Retrieve History</button>

      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {loaded && history.length === 0 && (
        <p style={{ marginTop: "1rem" }}>No history yet.</p>
      )}

      {history.length > 0 && (
        <table
          style={{
            marginTop: "1rem",
            borderCollapse: "collapse",
            width: "100%"
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                ID
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Text
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Card
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((r) => (
              <tr key={r.id}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {r.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {r.inputText}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {r.predictedCard}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {r.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
