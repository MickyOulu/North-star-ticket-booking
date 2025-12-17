import colors from "../styles/colors";
import posterMap from "../assets/posters/posterMap";
import defaultPoster from "../assets/posters/Interstellar.jpg";


function MovieInfoBox({ movie, loading, error, cardStyle }) {

    const posterImg = movie ? (posterMap[movie.title] || defaultPoster) : defaultPoster;
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
       <img
    src={posterImg}
    alt={`${movie?.title || "Movie"} poster`}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    }}
  />
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
