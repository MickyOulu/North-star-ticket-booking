import colors from "../styles/colors";

function Navbar() {
  return (
    <div
      style={{
        background: colors.card,
        borderBottom: `1px solid ${colors.background}`,
      }}
    >
      <div style={{ fontWeight: 700 }}>North Star</div>

      <div style={{ display: "flex", gap: "16px", fontWeight: 600 }}>
        <div>Home</div>
        <div>Theatre</div>
        <div>Events</div>
      </div>
    </div>
  );
}

export default Navbar;
