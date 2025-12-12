import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Home() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/theatres")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch theatres");
        return res.json();
      })
      .then((data) => {
        setTheatres(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load theatres.");
        setLoading(false);
      });
  }, []);

  return (
  <div style={{ fontFamily: "sans-serif" }}>
    <Navbar />

    {/* Hero */}
    <Hero city={city} setCity={setCity} />

    {/* Content */}
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginTop: 0 }}>Now showing</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {/* For now, reuse theatres as tiles (we’ll replace with movies next) */}
          {theatres.map((t) => (
            <div
              key={t.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "16px",
                background: "#fff",
              }}
            >
              <div
                style={{
                  height: "70px",
                  borderRadius: "12px",
                  background: "#EEF2FF",
                  marginBottom: "12px",
                }}
              />

              <div style={{ fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: "14px", marginTop: "6px" }}>
                {t.city}
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                <button
                  style={{
                    flex: 1,
                    height: "36px",
                    borderRadius: "10px",
                    border: "1px solid #2563EB",
                    background: "#fff",
                    color: "#2563EB",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>

                <button
                  style={{
                    flex: 1,
                    height: "36px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#2563EB",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default Home;
