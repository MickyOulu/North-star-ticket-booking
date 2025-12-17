import colors from "../styles/colors";

function BookingInfo({ seatPrice, total, selectedList, onClear, onContinue }) {
  const hasSeats = selectedList.length > 0;

  return (
    <div
      style={{
        background: colors.card,
        border: "1px solid rgba(15, 23, 42, 0.10)",
        borderRadius: 16,
        padding: 18,
        height: "fit-content",
      }}
    >
      <h3 style={{ marginTop: 0, color: colors.primary }}>Summary</h3>

      <div style={{ color: colors.secondary, fontSize: 14 }}>
        Seats selected: <b>{selectedList.length}</b>
      </div>

      <div style={{ marginTop: 8, color: colors.secondary, fontSize: 14 }}>
        Price per seat: <b>€{seatPrice}</b>
      </div>

      <div style={{ marginTop: 12, fontSize: 18, color: colors.primary }}>
        Total: <b>€{total}</b>
      </div>

      <div style={{ marginTop: 14, color: colors.secondary, fontSize: 13 }}>
        Selected seats:
        <div style={{ marginTop: 6 }}>
          {hasSeats ? <b>{selectedList.join(", ")}</b> : <span>None</span>}
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasSeats}
        style={{
          marginTop: 12,
          width: "100%",
          height: 38,
          borderRadius: 12,
          border: "1px solid rgba(15, 23, 42, 0.14)",
          background: "#fff",
          color: colors.primary,
          cursor: !hasSeats ? "not-allowed" : "pointer",
        }}
      >
        Clear selection
      </button>

      <button
        type="button"
        disabled={!hasSeats}
        onClick={onContinue}
        style={{
          marginTop: 12,
          width: "100%",
          height: 42,
          borderRadius: 12,
          border: "none",
          background: !hasSeats ? "rgba(15, 23, 42, 0.25)" : colors.primary,
          color: "#fff",
          cursor: !hasSeats ? "not-allowed" : "pointer",
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default BookingInfo;
