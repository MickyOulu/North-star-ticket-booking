import colors from "../styles/colors";

function MovieInfoBox({ movie, loading, error, cardStyle }) {
  return (
    <div className="movie-details-top" style={{ display: "flex", gap: 18 }}>
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
          flexShrink: 0,
        }}
      >
        Poster
      </div>

      {/* Details */}
      <div style={{ flex: 1 }}>
        {loading && <p>Loading movie...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {!loading && !error && movie && (
          <>
            <h1 style={{ margin: 0, color: colors.primary }}>{movie.title}</h1>

            <div style={{ marginTop: 8, color: colors.secondary }}>
              {movie.genre} • {movie.duration} • {movie.rating}
            </div>

            <p style={{ marginTop: 16, lineHeight: 1.6 }}>
              {movie.description}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieInfoBox;
