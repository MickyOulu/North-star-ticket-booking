function Navbar() {
  return (
    <div
      style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #eee",
        background: "#fff",
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
