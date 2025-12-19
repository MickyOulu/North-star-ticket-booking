
import "./AdminStaffCard.css";

function AdminStaffCard({
  staff,
  loading,
  name,
  email,
  password,
  message,
  error,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onAdd,
  onDelete,
  onBack,
}) {
  return (
    <div className="admin-staff-page">
      <div className="admin-staff-bg" />

      <div className="admin-staff-container">
        <div className="admin-staff-top">
          <div>
            <h1 className="admin-staff-title">Staff Management</h1>
            <p className="admin-staff-subtitle">Add and remove staff accounts</p>
          </div>

          <div className="admin-staff-top-actions">
            <button className="admin-staff-btn" onClick={onBack}>
              Back
            </button>
          </div>
        </div>

        {/* Add staff */}
        <div className="admin-staff-card">
          <h3 className="admin-staff-card-title">Add staff</h3>

          <form onSubmit={onAdd} className="admin-staff-form">
            <div className="admin-staff-field">
              <div className="admin-staff-label">Name</div>
              <input
                className="admin-staff-input"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="e.g. John"
                required
              />
            </div>

            <div className="admin-staff-field">
              <div className="admin-staff-label">Email</div>
              <input
                className="admin-staff-input"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="staff@example.com"
                type="email"
                required
              />
            </div>

            <div className="admin-staff-field">
              <div className="admin-staff-label">Password</div>
              <input
                className="admin-staff-input"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="create password"
                type="password"
                required
              />
            </div>

            <button className="admin-staff-btn" type="submit">
              Add
            </button>
          </form>

          {error && <div className="admin-staff-error">{error}</div>}
          {message && <div className="admin-staff-success">{message}</div>}
        </div>

        {/* List staff */}
        <div className="admin-staff-card">
          <h3 className="admin-staff-card-title">Staff list</h3>

          {loading ? (
            <div className="admin-staff-muted">Loading...</div>
          ) : staff.length === 0 ? (
            <div className="admin-staff-muted">No staff added yet.</div>
          ) : (
            <table className="admin-staff-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.created_at ? String(s.created_at).slice(0, 10) : "-"}</td>
                    <td>
                      <button
                        className="admin-staff-btn admin-staff-btn-danger"
                        onClick={() => onDelete(s.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="admin-staff-note">
          Only logged-in admin can manage staff (JWT protected).
        </div>
      </div>
    </div>
  );
}

export default AdminStaffCard;