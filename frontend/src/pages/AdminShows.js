
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminShowsCard from "../components/AdminShowsCard";

function AdminShows() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);

  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedTheatreId, setSelectedTheatreId] = useState("");

  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("18:00");

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getToken = () =>
    localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");

  const loadBasics = async () => {
    try {
      const [mRes, tRes] = await Promise.all([
        fetch("/api/movies"),
        fetch("/api/theatres"),
      ]);

      const mData = await mRes.json();
      const tData = await tRes.json();

      setMovies(mRes.ok ? mData : []);
      setTheatres(tRes.ok ? tData : []);
    } catch (e) {
      setMovies([]);
      setTheatres([]);
    }
  };

  const loadShowtimes = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const qs = new URLSearchParams();
      if (date) qs.set("date", date);
      if (selectedTheatreId) qs.set("theatreId", selectedTheatreId);

      const res = await fetch(`/api/admin/showtimes?${qs.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("adminToken");
          sessionStorage.removeItem("adminToken");
          navigate("/admin/login");
          return;
        }
        setError(data.message || "Failed to load showtimes");
        setRows([]);
      } else {
        setRows(data);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBasics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadShowtimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedTheatreId]);

  const addShowtime = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const res = await fetch("/api/admin/showtimes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: selectedMovieId,
          theatreId: selectedTheatreId,
          showDate: date,
          showTime: time,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add showtime");
        return;
      }

      setMessage("Showtime added ✅");
      await loadShowtimes();
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  const deleteShowtime = async (id) => {
    const ok = window.confirm("Delete this showtime?");
    if (!ok) return;

    setError("");
    setMessage("");

    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const res = await fetch(`/api/admin/showtimes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Failed to delete showtime");
        return;
      }

      setMessage("Showtime deleted ✅");
      await loadShowtimes();
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <AdminShowsCard
      movies={movies}
      theatres={theatres}
      rows={rows}
      loading={loading}
      selectedMovieId={selectedMovieId}
      selectedTheatreId={selectedTheatreId}
      date={date}
      time={time}
      message={message}
      error={error}
      onMovieChange={setSelectedMovieId}
      onTheatreChange={setSelectedTheatreId}
      onDateChange={setDate}
      onTimeChange={setTime}
      onAdd={addShowtime}
      onDelete={deleteShowtime}
      onReload={loadShowtimes}
      onBack={() => navigate("/admin/dashboard")}
    />
  );
}

export default AdminShows;
