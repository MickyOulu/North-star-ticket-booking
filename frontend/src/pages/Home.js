import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieTile from "../components/MovieTile";

function Home() {
  const [theatres, setTheatres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("All");

  // dropdown city
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/theatres");
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error || "Failed to load theatres");
          setTheatres([]);
        } else {
          setTheatres(data);
        }
      } catch (err) {
        setError("Network error (backend not running?)");
        setTheatres([]);
      }
    };

    fetchTheatres();
  }, []);

  // fetching movies based on city
  useEffect(() => {
  const fetchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const url =
        city === "All"
          ? "http://localhost:5000/api/movies"
          : `http://localhost:5000/api/movies?city=${encodeURIComponent(city)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to load movies");
        setMovies([]);
      } else {
        setMovies(data);
      }
    } catch (err) {
      setError("Network error (backend not running?)");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, [city]);


  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <Hero
        city={city}
        setCity={setCity}
        theatres={theatres} //  pass theatres if Hero needs it to build dropdown
      />

      {/* Content */}
      <div style={{ padding: "24px" }}>
        <h2 style={{ marginTop: 0 }}>Now showing</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && movies.length === 0 && (
          <p>No movies available for this city.</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {movies.map((movie) => (
              <MovieTile key={movie.id} movie={movie} selectedCity={city} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
