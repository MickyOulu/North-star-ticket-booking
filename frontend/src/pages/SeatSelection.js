// src/pages/SeatSelection.js
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SeatInfo from "../components/SeatInfo";
import BookingInfo from "../components/BookingInfo";
import { styles, seatButtonStyle } from "./SeatSelection.styles";

/* ---------- Small UI Components (keep Seat here for now) ---------- */

function Seat({ seatId, label, isOccupied, isSelected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(seatId)}
      disabled={isOccupied}
      title={seatId}
      aria-pressed={isSelected}
      aria-label={`Seat ${seatId} ${
        isOccupied ? "occupied" : isSelected ? "selected" : "available"
      }`}
      style={seatButtonStyle({ isOccupied, isSelected })}
    >
      {label}
    </button>
  );
}

/* ------------------------- Main Page ------------------------- */

function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: movieId } = useParams();

  const booking = location.state;

  // Seat layout
  const rows = 8;
  const cols = 12;

  // Fake occupied seats for UI testing (later: from DB)
  const occupied = useMemo(
    () => new Set(["A3", "A4", "B6", "C7", "D2", "F10"]),
    []
  );

  // Selected seats (stored as a Set)
  const [selected, setSelected] = useState(() => new Set());

  // Movie title (fetch by movieId)
  const [movieTitle, setMovieTitle] = useState("");

  // ✅ Hooks must be called before any return
  useEffect(() => {
    if (!movieId) return;

    const fetchMovieTitle = async () => {
      try {
        const res = await fetch(`/api/movies/${movieId}`);
        const data = await res.json();
        setMovieTitle(data.title || "");
      } catch (err) {
        console.error("Failed to fetch movie title:", err);
      }
    };

    fetchMovieTitle();
  }, [movieId]);

  // Pricing
  const seatPrice = 12;
  const total = selected.size * seatPrice;

  const selectedList = Array.from(selected).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );

  const toggleSeat = (seatId) => {
    if (occupied.has(seatId)) return;

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(seatId)) next.delete(seatId);
      else next.add(seatId);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  // ✅ Safe early return AFTER hooks
  if (!booking) {
    return (
      <div style={styles.pageWrap}>
        <Navbar />
        <div style={styles.containerNarrow}>
          <h2 style={{ marginTop: 12 }}>Session expired</h2>
          <p style={styles.headerLine}>Please go back and select a showtime again.</p>

          <button
            onClick={() => navigate(`/movie/${movieId}`)}
            style={styles.actionButton}
          >
            Back to Movie
          </button>
        </div>
      </div>
    );
  }

  // Data passed from MovieDetails
  const theatreId = booking.theatreId || "";
  const date = booking.date || "";
  const time = booking.time || "";
  const theatreName = booking.theatreName || "";

  return (
    <div style={styles.pageWrap}>
      <Navbar />

      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Back
        </button>

        <h1 style={styles.title}>Select your seats</h1>

        <div style={styles.headerLine}>
          Movie: <b>{movieTitle || `Movie ${movieId}`}</b>{" "}
          {theatreName && (
            <>
              • Theatre: <b>{theatreName}</b>
            </>
          )}
          {date && (
            <>
              {" "}
              • Date: <b>{date}</b>
            </>
          )}
          {time && (
            <>
              {" "}
              • Time: <b>{time}</b>
            </>
          )}
        </div>

        <div style={styles.layoutGrid}>
          {/* Seat grid card */}
          <div style={styles.card}>
            {/* Screen */}
            <div style={styles.screen}>SCREEN</div>

            {/* Grid */}
            <div style={styles.gridWrap}>
              {Array.from({ length: rows }).map((_, r) => {
                const rowLetter = String.fromCharCode(65 + r);
                return (
                  <div key={rowLetter} style={styles.rowWrap}>
                    <div style={styles.rowLabel}>{rowLetter}</div>

                    <div style={styles.seatGrid(cols)}>
                      {Array.from({ length: cols }).map((_, c) => {
                        const seatId = `${rowLetter}${c + 1}`;
                        const isOccupied = occupied.has(seatId);
                        const isSelected = selected.has(seatId);

                        return (
                          <Seat
                            key={seatId}
                            seatId={seatId}
                            label={c + 1}
                            isOccupied={isOccupied}
                            isSelected={isSelected}
                            onToggle={toggleSeat}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <SeatInfo />
          </div>

          <BookingInfo
            seatPrice={seatPrice}
            total={total}
            selectedList={selectedList}
            onClear={clearSelection}
            onContinue={() =>
              navigate("/payment", {
                state: {
                  movieTitle: movieTitle || `Movie ${movieId}`,
                  showtime: `${date} ${time}`,
                  seats: selectedList,
                  theatreName: theatreName || "",
                  theatreId,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
