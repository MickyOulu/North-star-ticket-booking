
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminStaffCard from "../components/AdminStaffCard";

function AdminStaff() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getToken = () =>
    localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");

  const loadStaff = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const res = await fetch("/api/admin/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        // token invalid/expired
        if (res.status === 401) {
          localStorage.removeItem("adminToken");
          sessionStorage.removeItem("adminToken");
          navigate("/admin/login");
          return;
        }

        setError(data.message || "Failed to load staff");
        setStaff([]);
      } else {
        setStaff(data);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addStaff = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add staff");
        return;
      }

      setMessage("Staff added ✅");
      setName("");
      setEmail("");
      setPassword("");
      await loadStaff();
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  const removeStaff = async (id) => {
    setError("");
    setMessage("");

    const ok = window.confirm("Delete this staff member?");
    if (!ok) return;

    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const res = await fetch(`/api/admin/staff/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Failed to delete staff");
        return;
      }

      setMessage("Staff deleted ✅");
      await loadStaff();
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <AdminStaffCard
      staff={staff}
      loading={loading}
      name={name}
      email={email}
      password={password}
      message={message}
      error={error}
      onNameChange={setName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onAdd={addStaff}
      onDelete={removeStaff}
      onBack={() => navigate("/admin/dashboard")}
    />
  );
}

export default AdminStaff;
