// src/pages/SeatSelection.js
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import colors from "../styles/colors";
import SeatInfo from "../components/SeatInfo";
import BookingInfo from "../components/BookingInfo";

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
      style={{
        height: 34,
        borderRadius: 10,
        border: "1px solid rgba(15, 23, 42, 0.14)",
        background: isOccupied
          ? "rgba(15, 23, 42, 0.10)"
          : isSelected
          ? colors.primary
          : "#fff",
        color: isSelected ? "#fff" : colors.primary,
        cursor: isOccupied ? "not-allowed" : "pointer",
        fontSize: 12,
      }}
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

  // Pricing
  const seatPrice = 12;
  const total = selected.size * seatPrice;

  // ✅ Change: no useMemo for selectedList (beginner-friendly)
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

  const cardStyle = {
    background: colors.card,
    border: "1px solid rgba(15, 23, 42, 0.10)",
    borderRadius: 16,
  };

  // Safe early return AFTER hooks
  if (!booking) {
    return (
      <div style={{ minHeight: "100vh", background: colors.background }}>
        <Navbar />
        <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ color: colors.primary, marginTop: 12 }}>Session expired</h2>
          <p style={{ color: colors.secondary }}>
            Please go back and select a showtime again.
          </p>

          <button
            onClick={() => navigate(`/movie/${movieId}`)}
            style={{
              height: 40,
              padding: "0 14px",
              borderRadius: 10,
              border: "1px solid rgba(15, 23, 42, 0.14)",
              background: "#fff",
              cursor: "pointer",
              color: colors.primary,
            }}
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
    <div style={{ minHeight: "100vh", background: colors.background }}>
      <Navbar />

      <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            height: 36,
            padding: "0 12px",
            borderRadius: 10,
            border: "1px solid rgba(15, 23, 42, 0.14)",
            background: "#fff",
            cursor: "pointer",
            color: colors.primary,
          }}
        >
          Back
        </button>

        <h1 style={{ marginTop: 16, marginBottom: 6, color: colors.primary }}>
          Select your seats
        </h1>

        <div style={{ color: colors.secondary, marginBottom: 18 }}>
          Movie ID: <b>{movieId}</b>{" "}
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
          {/* Seat grid card */}
          <div style={{ ...cardStyle, padding: 18 }}>
            {/* Screen */}
            <div
              style={{
                textAlign: "center",
                padding: "10px 0",
                borderRadius: 10,
                background: "rgba(15, 23, 42, 0.06)",
                color: colors.secondary,
                marginBottom: 18,
              }}
            >
              SCREEN
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gap: 8 }}>
              {Array.from({ length: rows }).map((_, r) => {
                const rowLetter = String.fromCharCode(65 + r);
                return (
                  <div
                    key={rowLetter}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div style={{ width: 18, color: colors.secondary, fontSize: 12 }}>
                      {rowLetter}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gap: 8,
                        flex: 1,
                      }}
                    >
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
              alert("Next step: payment later. For now we just built seat selection UI.")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
