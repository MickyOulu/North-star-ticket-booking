import { useNavigate } from "react-router-dom";
import colors from "../styles/colors";

function MovieTile({ movie }) {
  const navigate = useNavigate();

  // safety (prevents crash if movie is missing)
  if (!movie) return null;

  const goToDetails = (e) => {
    e.stopPropagation(); // prevents card click from firing too
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      style={{
        background: colors.card,
        border: "1px solid rgba(15, 23, 42, 0.10)",
        borderRadius: 16,
        padding: 16,
        cursor: "pointer",
      }}
    >
      {/* Poster placeholder */}
      <div
        style={{
          height: 220,
          background: colors.secondary,
          borderRadius: 12,
          marginBottom: 12,
        }}
      />

      {/* Title + meta */}
      <h3 style={{ margin: "0 0 6px 0", color: colors.primary }}>
        {movie.title}
      </h3>

      <p style={{ margin: 0, fontSize: 14, color: colors.secondary }}>
        {movie.genre} • {movie.duration}
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button
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
          onClick={goToDetails} // later we’ll route this to seat selection
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
