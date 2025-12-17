import { Link, NavLink } from "react-router-dom";
import colors from "../styles/colors";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: colors.primary,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        North Star
      </Link>

      {/* Navigation links */}
      <div style={{ display: "flex", gap: 20 }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? colors.primary : colors.secondary,
            fontWeight: isActive ? "600" : "400",
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/theatre"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? colors.primary : colors.secondary,
            fontWeight: isActive ? "600" : "400",
          })}
        >
          Theatre
        </NavLink>

        <NavLink
          to="/events"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? colors.primary : colors.secondary,
            fontWeight: isActive ? "600" : "400",
          })}
        >
          Events
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
