// src/pages/MovieDetails.styles.js
import colors from "../styles/colors";
import * as ui from "../styles/uiStyles";

export const styles = {
  pageWrap: {
    ...ui.pageWrap,
    fontFamily: "sans-serif",
  },

  container: ui.container,

  backButton: {
    ...ui.backButton,
    marginBottom: 16,
  },

  controlsRow: {
    marginTop: 18,
    display: "flex",
    gap: 12,
  },

  label: {
    fontSize: 12,
    marginBottom: 6,
    color: colors.primary,
  },

  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(15, 23, 42, 0.14)",
    background: "#fff",
    color: colors.primary,
  },

  // for passing into MovieInfoBox / ShowtimeButtons (same as before)
  card: {
    background: colors.card,
    border: "1px solid rgba(15, 23, 42, 0.10)",
    borderRadius: 16,
  },
};
