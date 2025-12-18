import "./AdminDashboardCard.css";

function AdminDashboardCard({ data, onLogout }) {
  return (
    <div className="admin-dash-page">
      <div className="admin-dash-bg" />

      <div className="admin-dash-container">
        <div className="admin-dash-top">
          <div>
            <h1 className="admin-dash-title">Admin Dashboard</h1>
            <p className="admin-dash-subtitle">
              Revenue & bookings overview
            </p>
          </div>

          <button className="admin-dash-logout" onClick={onLogout}>
            Logout
          </button>
        </div>

        <div className="admin-dash-grid">
          <div className="admin-dash-stat">
            <div className="admin-dash-stat-label">Total bookings</div>
            <div className="admin-dash-stat-value">
              {data.totalBookings}
            </div>
          </div>

          <div className="admin-dash-stat">
            <div className="admin-dash-stat-label">Total revenue</div>
            <div className="admin-dash-stat-value">
              €{data.totalRevenue}
            </div>
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
      </div>
    </div>
  );
}

export default AdminDashboardCard;
