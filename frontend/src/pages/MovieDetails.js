import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import colors from "../styles/colors";

import MovieInfoBox from "../components/MovieInfoBox";
import ShowtimeButtons from "../components/ShowtimeButtons";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCity = location.state?.city || "All";

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [theatres, setTheatres] = useState([]);
  const [theatresLoading, setTheatresLoading] = useState(true);

  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const [showtimes, setShowtimes] = useState([]);
  const [showtimesLoading, setShowtimesLoading] = useState(false);
  const [showtimesError, setShowtimesError] = useState("");

  // Fetch movie
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

  // Fetch theatres
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/theatres");
        const data = await res.json();
        setTheatres(res.ok ? data : []);
      } catch (err) {
        setTheatres([]);
      } finally {
        setTheatresLoading(false);
      }
    };

    fetchTheatres();
  }, []);

  // Filter theatres by city
  const filteredTheatres =
    selectedCity === "All"
      ? theatres
      : theatres.filter((t) => t.city === selectedCity);

  // Auto-select first theatre
  useEffect(() => {
    if (!selectedTheatre && filteredTheatres.length > 0) {
      setSelectedTheatre(String(filteredTheatres[0].id));
    }
  }, [filteredTheatres, selectedTheatre]);

  // Fetch showtimes
  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!selectedTheatre) return;

      setShowtimesLoading(true);
      setShowtimesError("");

      try {
        const url = `http://localhost:5000/api/showtimes?movieId=${id}&theatreId=${selectedTheatre}&date=${selectedDate}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          setShowtimesError(data?.error || "Failed to load showtimes");
          setShowtimes([]);
        } else {
          setShowtimes(data);
        }
      } catch (err) {
        setShowtimesError("Network error loading showtimes");
        setShowtimes([]);
      } finally {
        setShowtimesLoading(false);
      }
    };

    fetchShowtimes();
  }, [id, selectedTheatre, selectedDate]);

  // UI helpers
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

  // When a user picks a showtime button
  const handlePickTime = (showtime) => {
    const theatreName =
      filteredTheatres.find((t) => String(t.id) === String(selectedTheatre))
        ?.name || "";

    navigate(`/movie/${id}/seats`, {
      state: {
        movieId: id,
        theatreId: selectedTheatre,
        theatreName,
        date: selectedDate,
        time: String(showtime.show_time).slice(0, 5),
        showtimeId: showtime.id,
        city: selectedCity,
      },
    });
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
            marginBottom: 16,
          }}
        >
          Back
        </button>

        {/* ✅ Movie top section extracted */}
        <MovieInfoBox movie={movie} loading={loading} error={error} cardStyle={cardStyle} />

        {/* Controls (kept here because it changes state) */}
        <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, marginBottom: 6 }}>Theatre</div>
            <select
              value={selectedTheatre}
              onChange={(e) => setSelectedTheatre(e.target.value)}
              style={inputStyle}
              disabled={theatresLoading || filteredTheatres.length === 0}
            >
              {theatresLoading && <option>Loading theatres...</option>}

              {!theatresLoading &&
                filteredTheatres.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <div style={{ fontSize: 12, marginBottom: 6 }}>Date</div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* ✅ Showtimes section extracted */}
        <ShowtimeButtons
          showtimes={showtimes}
          showtimesLoading={showtimesLoading}
          showtimesError={showtimesError}
          cardStyle={cardStyle}
          onPickTime={handlePickTime}
        />
      </div>
    </div>
  );
}

export default MovieDetails;
