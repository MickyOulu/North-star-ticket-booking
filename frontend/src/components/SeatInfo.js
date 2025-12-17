
import colors from "../styles/colors";

function SeatInfo() {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        marginTop: 18,
        color: colors.secondary,
        fontSize: 13,
        flexWrap: "wrap",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 4,
            border: "1px solid rgba(15, 23, 42, 0.14)",
            background: "#fff",
          }}
        />
        Available
      </span>

      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 4,
            border: "1px solid rgba(15, 23, 42, 0.14)",
            background: "rgba(15, 23, 42, 0.10)",
          }}
        />
        Occupied
      </span>

      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 4,
            background: colors.primary,
          }}
        />
        Selected
      </span>
    </div>
  );
}

export default SeatInfo;
