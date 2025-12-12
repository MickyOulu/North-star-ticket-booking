function AdminLogin() {
  return (
    <div>
      <h1>Admin Login</h1>

      <form>
        <div>
          <label>Username</label><br />
          <input type="text" />
        </div>

        <div style={{ marginTop: '8px' }}>
          <label>Password</label><br />
          <input type="password" />
        </div>

        <button type="submit" style={{ marginTop: '12px' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
