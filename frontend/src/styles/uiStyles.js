
// src/styles/uiStyles.js
import colors from "./colors";

export const pageWrap = {
  minHeight: "100vh",
  background: colors.background,
};

export const container = {
  padding: 24,
  maxWidth: 1100,
  margin: "0 auto",
};

export const containerNarrow = {
  padding: 24,
  maxWidth: 800,
  margin: "0 auto",
};

export const card = {
  background: colors.card,
  border: "1px solid rgba(15, 23, 42, 0.10)",
  borderRadius: 16,
};

export const buttonBase = {
  borderRadius: 10,
  border: "1px solid rgba(15, 23, 42, 0.14)",
  background: "#fff",
  cursor: "pointer",
  color: colors.primary,
};

export const backButton = {
  ...buttonBase,
  height: 36,
  padding: "0 12px",
};

export const actionButton = {
  ...buttonBase,
  height: 40,
  padding: "0 14px",
};

export const title = {
  marginTop: 16,
  marginBottom: 6,
  color: colors.primary,
};

export const mutedText = {
  color: colors.secondary,
};
