import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboardCard from "../components/AdminDashboardCard";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const load = async () => {
      try {
        const res = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const d = await res.json();

        if (!res.ok) {
          setError(d.message || "Unauthorized");
          return;
        }

        setData(d);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Server error");
      }
    };

    load();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (error) return <div style={{ padding: 20 }}>{error}</div>;
  if (!data) return <div style={{ padding: 20 }}>Loading...</div>;

  return <AdminDashboardCard data={data} onLogout={logout} />;
}

export default AdminDashboard;
