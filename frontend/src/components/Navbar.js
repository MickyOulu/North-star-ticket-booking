import { Link, NavLink, useNavigate } from "react-router-dom";
import colors from "../styles/colors";

function Navbar() {
  const navigate = useNavigate();

  // customer auth only (admin handled separately)
  const customerToken = localStorage.getItem("customerToken");

  const logoutCustomer = () => {
    localStorage.removeItem("customerToken");
    navigate("/");
  };

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
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
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

        {/* Customer auth section */}
        {!customerToken ? (
          <NavLink
            to="/login"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? colors.primary : colors.secondary,
              fontWeight: isActive ? "600" : "400",
            })}
          >
            Login
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/my-bookings"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? colors.primary : colors.secondary,
                fontWeight: isActive ? "600" : "400",
              })}
            >
              My Bookings
            </NavLink>

            <button
              onClick={logoutCustomer}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: colors.secondary,
                fontSize: 14,
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
