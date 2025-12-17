import colors from "../styles/colors";

function ShowtimeButtons({
  showtimes,
  showtimesLoading,
  showtimesError,
  cardStyle,
  onPickTime,
}) {
  return (
    <div style={{ marginTop: 28 }}>
      <h2 style={{ marginBottom: 10, color: colors.primary }}>Showtimes</h2>

      {showtimesLoading && <p>Loading showtimes...</p>}
      {showtimesError && <p style={{ color: "crimson" }}>{showtimesError}</p>}

      {!showtimesLoading && !showtimesError && showtimes.length === 0 && (
        <p>No showtimes available for this theatre/date.</p>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {showtimes.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onPickTime(s)}
            style={{
              ...cardStyle,
              padding: "10px 14px",
              cursor: "pointer",
              color: colors.primary,
            }}
          >
            {String(s.show_time).slice(0, 5)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShowtimeButtons;
