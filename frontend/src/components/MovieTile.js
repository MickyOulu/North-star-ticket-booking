import { useNavigate } from "react-router-dom";
import { useState } from "react";
import colors from "../styles/colors";
//importing poster images
import posterMap from "../assets/posters/posterMap";
import defaultPoster from "../assets/posters/Interstellar.jpg";

function MovieTile({ movie, selectedCity }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  if (!movie) return null;
  const posterImg = posterMap[movie.title] || defaultPoster;

  const goToDetails = (e) => {
    e.stopPropagation();
    console.log("Navigating with city:", selectedCity); // debug
    navigate(`/movie/${movie.id}`, { state: { city: selectedCity } });
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`, { state: { city: selectedCity } })}
      onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.card,
        border: "1px solid rgba(15, 23, 42, 0.10)",
        borderRadius: 16,
        cursor: "pointer",
        overflow: "hidden", // so poster corners match the card radius
      }}
    >
      {/* Poster */}
      <div
        style={{
          height: 320,
          background: colors.secondary,
          overflow: "hidden",
          display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
      >
        <img
          src={posterImg}
          alt={`${movie.title} poster`}
          style={{
            
        width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            margin : "auto",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
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
    </div>
  );
}

export default MovieTile;
