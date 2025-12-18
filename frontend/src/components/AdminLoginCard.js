import "./AdminLoginCard.css";

function AdminLoginCard({
  email,
  password,
  message,
  remember,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onToggleShowPassword,
  onSubmit,
}) {
  return (
    <div className="admin-login-page">
      <div className="admin-login-bg" />

      <div className="admin-login-card">
        <div className="admin-login-badge" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-subtitle">Enter your credentials</p>

        <form onSubmit={onSubmit} className="admin-login-form">
          <label className="admin-login-label">Email Address</label>
          <div className="admin-input">
            <span className="admin-input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16v12H4V6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 7l8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              type="email"
              placeholder="admin@nstar.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
            />
          </div>

          <label className="admin-login-label" style={{ marginTop: 14 }}>
            Password
          </label>
          <div className="admin-input">
            <span className="admin-input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 11V8a5 5 0 0110 0v3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 11h12v10H6V11z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
            />

            <button
              type="button"
              className="admin-eye-btn"
              onClick={onToggleShowPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className="admin-login-row">
            <label className="admin-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => onRememberChange(e.target.checked)}
              />
              Remember me
            </label>

            <button
              type="button"
              className="admin-link"
              onClick={() => alert("Not implemented (demo)")}
            >
              Forgot password?
            </button>
          </div>

          <button className="admin-login-btn" type="submit">
            Login
          </button>

          {message && <div className="admin-error">{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default AdminLoginCard;
