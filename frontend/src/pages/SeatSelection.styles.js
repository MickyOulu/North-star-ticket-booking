
// src/pages/SeatSelection.styles.js
import colors from "../styles/colors";
import * as ui from "../styles/uiStyles";

export const styles = {
  pageWrap: ui.pageWrap,
  container: ui.container,
  containerNarrow: ui.containerNarrow,

  headerLine: {
    ...ui.mutedText,
    marginBottom: 18,
  },

  layoutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: 18,
  },

  card: {
    ...ui.card,
    padding: 18,
  },

  screen: {
    textAlign: "center",
    padding: "10px 0",
    borderRadius: 10,
    background: "rgba(15, 23, 42, 0.06)",
    color: colors.secondary,
    marginBottom: 18,
  },

  gridWrap: {
    display: "grid",
    gap: 8,
  },

  rowWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  rowLabel: {
    width: 18,
    color: colors.secondary,
    fontSize: 12,
  },

  seatGrid: (cols) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: 8,
    flex: 1,
  }),

  title: ui.title,
  backButton: ui.backButton,
  actionButton: ui.actionButton,
};

export const seatButtonStyle = ({ isOccupied, isSelected }) => ({
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
});
