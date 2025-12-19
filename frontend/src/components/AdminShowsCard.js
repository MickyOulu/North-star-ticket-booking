import "./AdminShowsCard.css";

function AdminShowsCard({
  movies,
  theatres,
  rows,
  loading,
  selectedMovieId,
  selectedTheatreId,
  date,
  time,
  message,
  error,
  onMovieChange,
  onTheatreChange,
  onDateChange,
  onTimeChange,
  onAdd,
  onDelete,
  onReload,
  onBack,
}) {
  return (
    <div className="admin-shows-page">
      <div className="admin-shows-bg" />

      <div className="admin-shows-container">
        <div className="admin-shows-top">
          <div>
            <h1 className="admin-shows-title">Manage Shows</h1>
            <p className="admin-shows-subtitle">
              Simple showtime management (CRUD-lite)
            </p>
          </div>

          <div className="admin-shows-top-actions">
            <button className="admin-shows-btn" onClick={onBack}>
              Back
            </button>
            <button className="admin-shows-btn" onClick={onReload}>
              Refresh
            </button>
          </div>
        </div>

        <div className="admin-shows-card">
          <h3 className="admin-shows-card-title">Add showtime</h3>

          <form onSubmit={onAdd} className="admin-shows-form">
            <div className="admin-shows-field">
              <div className="admin-shows-label">Movie</div>
              <select
                className="admin-shows-input"
                value={selectedMovieId}
                onChange={(e) => onMovieChange(e.target.value)}
                required
              >
                <option value="">Select movie</option>
                {movies.map((m) => (
                  <option key={m.id} value={String(m.id)}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-shows-field">
              <div className="admin-shows-label">Theatre</div>
              <select
                className="admin-shows-input"
                value={selectedTheatreId}
                onChange={(e) => onTheatreChange(e.target.value)}
                required
              >
                <option value="">Select theatre</option>
                {theatres.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-shows-field">
              <div className="admin-shows-label">Date</div>
              <input
                className="admin-shows-input"
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                required
              />
            </div>

            <div className="admin-shows-field">
              <div className="admin-shows-label">Time</div>
              <input
                className="admin-shows-input"
                type="time"
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                required
              />
            </div>

            <button className="admin-shows-btn" type="submit">
              Add
            </button>
          </form>

          {error && <div className="admin-shows-error">{error}</div>}
          {message && <div className="admin-shows-success">{message}</div>}
        </div>

        <div className="admin-shows-card">
          <h3 className="admin-shows-card-title">Showtimes list</h3>

          {loading ? (
            <div className="admin-shows-muted">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="admin-shows-muted">No showtimes for selected filters.</div>
          ) : (
            <table className="admin-shows-table">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Theatre</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.movie_title}</td>
                    <td>{r.theatre_name}</td>
                    <td>{String(r.show_date).slice(0, 10)}</td>
                    <td>{String(r.show_time).slice(0, 5)}</td>
                    <td>
                      <button
                        className="admin-shows-btn admin-shows-btn-danger"
                        onClick={() => onDelete(r.id)}
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

        <div className="admin-shows-note">
          Only logged-in admin can add/delete showtimes (JWT protected).
        </div>
      </div>
    </div>
  );
}

export default AdminShowsCard;
