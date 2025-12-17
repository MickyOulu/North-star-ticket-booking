import { useNavigate } from "react-router-dom";
import colors from "../styles/colors";

function MovieTile({ movie, selectedCity }) {
  const navigate = useNavigate();
  if (!movie) return null;

  const goToDetails = (e) => {
    e.stopPropagation();
    console.log("Navigating with city:", selectedCity); // debug
    navigate(`/movie/${movie.id}`, { state: { city: selectedCity } });
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`, { state: { city: selectedCity } })}
      style={{
        background: colors.card,
        border: "1px solid rgba(15, 23, 42, 0.10)",
        borderRadius: 16,
        padding: 16,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: 220,
          background: colors.secondary,
          borderRadius: 12,
          marginBottom: 12,
        }}
      />

      <h3 style={{ margin: "0 0 6px 0", color: colors.primary }}>
        {movie.title}
      </h3>

      <p style={{ margin: 0, fontSize: 14, color: colors.secondary }}>
        {movie.genre} • {movie.duration}
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button
          type="button"
          onClick={goToDetails}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: colors.primary,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          View Details
        </button>

        <button
          type="button"
          onClick={goToDetails}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: `1px solid ${colors.primary}`,
            background: "#fff",
            color: colors.primary,
            cursor: "pointer",
          }}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}

export default MovieTile;
