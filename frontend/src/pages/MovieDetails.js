import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

import MovieInfoBox from "../components/MovieInfoBox";
import ShowtimeButtons from "../components/ShowtimeButtons";

import { styles } from "./MovieDetails.styles";

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
    <div style={styles.pageWrap}>
      <Navbar />

      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Back
        </button>

        <MovieInfoBox
          movie={movie}
          loading={loading}
          error={error}
          cardStyle={styles.card}
        />

        {/* Controls */}
        <div style={styles.controlsRow}>
          <div>
            <div style={styles.label}>Theatre</div>
            <select
              value={selectedTheatre}
              onChange={(e) => setSelectedTheatre(e.target.value)}
              style={styles.input}
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
            <div style={styles.label}>Date</div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <ShowtimeButtons
          showtimes={showtimes}
          showtimesLoading={showtimesLoading}
          showtimesError={showtimesError}
          cardStyle={styles.card}
          onPickTime={handlePickTime}
        />
      </div>
    </div>
  );
}

export default MovieDetails;
