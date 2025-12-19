import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const load = async () => {
      try {
        const res = await fetch("/api/customer/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load bookings");
          setBookings([]);
        } else {
          setBookings(data);
        }
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        <h2>My Bookings</h2>

        {loading && <p>Loading...</p>}

        {!loading && bookings.length === 0 && (
          <p>You currently have no bookings.</p>
        )}

        {bookings.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              marginBottom: 12,
              borderRadius: 8,
            }}
          >
            <b>{b.movie_title}</b>
            <div>{b.theatre_name}</div>
            <div>{b.showtime}</div>
            <div>Seats: {b.seats}</div>
          </div>
        ))}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}

export default MyBookings;
