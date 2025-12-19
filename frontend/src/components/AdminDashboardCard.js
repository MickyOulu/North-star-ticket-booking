import "./AdminDashboardCard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboardCard({ data, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="admin-dash-page">
      <div className="admin-dash-bg" />

      <div className="admin-dash-container">
        <div className="admin-dash-top">
          <div>
            <h1 className="admin-dash-title">Admin Dashboard</h1>
            <p className="admin-dash-subtitle">Revenue & bookings overview</p>
          </div>

          <button className="admin-dash-logout" onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* ✅ Quick actions (new) */}
        <div className="admin-dash-actions">
          <div className="admin-dash-action-card">
            <div className="admin-dash-action-title">Staff</div>
            <div className="admin-dash-action-text">
              Add / remove staff accounts
            </div>
            <button
              className="admin-dash-action-btn"
              onClick={() => navigate("/admin/staff")}
            >
              Manage Staff
            </button>
          </div>

          <div className="admin-dash-action-card">
            <div className="admin-dash-action-title">Shows</div>
            <div className="admin-dash-action-text">
              Add showtimes for movies
            </div>
            <button
              className="admin-dash-action-btn"
              onClick={() => navigate("/admin/shows")}
            >
              Manage Shows
            </button>
          </div>
        </div>

        <div className="admin-dash-grid">
          <div className="admin-dash-stat">
            <div className="admin-dash-stat-label">Total bookings</div>
            <div className="admin-dash-stat-value">{data.totalBookings}</div>
          </div>

          <div className="admin-dash-stat">
            <div className="admin-dash-stat-label">Total revenue</div>
            <div className="admin-dash-stat-value">€{data.totalRevenue}</div>
          </div>
        </div>

        <div className="admin-dash-card">
          <h3 className="admin-dash-card-title">Revenue per theatre</h3>

          <table className="admin-dash-table">
            <thead>
              <tr>
                <th>Theatre</th>
                <th>Revenue (€)</th>
              </tr>
            </thead>
            <tbody>
              {data.revenuePerTheatre.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.theatreName}</td>
                  <td>{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Small note (optional, beginner-friendly) */}
        <div className="admin-dash-note">
          Tip: Staff & Shows pages are protected (only logged-in admin can use them).
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardCard;
