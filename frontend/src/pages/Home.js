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

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, []);

  const filteredTheatres =
  city === "All"
    ? theatres
    : theatres.filter((t) => t.city === city);

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
          {movies.map((movie) => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
</div>  
 )}
      </div>
    </div>
  );
}

export default Home;
