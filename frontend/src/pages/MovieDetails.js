import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import colors from "../styles/colors";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");  
  useEffect(() => {
  const fetchMovie = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/api/movies/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to load movie");
        setMovie(null);
      } else {
        setMovie(data);
      }
    } catch (err) {
      setError("Network error (is backend running?)");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  fetchMovie();
}, [id]);


  const [selectedTheatre, setSelectedTheatre] = useState("North Star Oulu");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const showtimes = ["12:30", "15:10", "18:00", "20:40"];

  const cardStyle = {
    background: colors.card,
    border: "1px solid rgba(15, 23, 42, 0.10)",
    borderRadius: 16,
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(15, 23, 42, 0.14)",
    background: "#fff",
    color: colors.primary,
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: colors.background,
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Back + debug */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              height: "36px",
              padding: "0 12px",
              borderRadius: "10px",
              border: "1px solid rgba(15, 23, 42, 0.14)",
              background: "#fff",
              cursor: "pointer",
              color: colors.primary,
            }}
          >
            Back
          </button>

          <span style={{ color: colors.secondary, fontSize: 14 }}>
            Movie ID: <strong>{id}</strong>
          </span>
        </div>

        {/* TOP */}
        <div style={{ marginTop: 18 }}>
          <div className="movie-details-top">
            {/* Poster */}
            <div
              className="movie-poster"
              style={{
                ...cardStyle,
                width: 280,
                height: 400,
                background: colors.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(248, 250, 252, 0.75)",
                fontSize: 14,
              }}
            >
              Poster
            </div>

            {/* Details */}
           {/* Details column */}
<div>
  {loading && <p style={{ color: colors.secondary }}>Loading movie...</p>}

  {error && <p style={{ color: "crimson" }}>{error}</p>}

  {!loading && !error && movie && (
    <>
      <h1 style={{ margin: 0, fontSize: 34, color: colors.primary }}>
        {movie.title}
      </h1>

      <div style={{ marginTop: 10, color: colors.secondary }}>
        {movie.genre} • {movie.duration} • {movie.rating}
      </div>

      <p
        style={{
          marginTop: 16,
          lineHeight: 1.6,
          maxWidth: 700,
          color: colors.primary,
        }}
      >
        {movie.description}
      </p>
    </>
  )}

  {/* Controls */}
  <div
    style={{
      marginTop: 18,
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    }}
  >
    <div>
      <div style={{ fontSize: 12, color: colors.secondary, marginBottom: 6 }}>
        Theatre
      </div>
      <select
        value={selectedTheatre}
        onChange={(e) => setSelectedTheatre(e.target.value)}
        style={inputStyle}
      >
        <option>North Star Oulu</option>
        <option>North Star Helsinki</option>
        <option>North Star Tampere</option>
      </select>
    </div>

    <div>
      <div style={{ fontSize: 12, color: colors.secondary, marginBottom: 6 }}>
        Date
      </div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={inputStyle}
      />
    </div>
  </div>
</div>                        
            </div>
          </div>
        </div>

        {/* Showtimes */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ margin: "0 0 12px 0", color: colors.primary }}>
            Showtimes
          </h2>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {showtimes.map((t) => (
              <button
                key={t}
                onClick={() =>
                  console.log("Selected:", { t, selectedTheatre, selectedDate, id })
                }
                style={{
                  ...cardStyle,
                  padding: "10px 14px",
                  cursor: "pointer",
                  color: colors.primary,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.border = `1px solid ${colors.accent}`)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid rgba(15, 23, 42, 0.10)")
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    
  );
}

export default MovieDetails;
