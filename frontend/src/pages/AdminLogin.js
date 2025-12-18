import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginCard from "../components/AdminLoginCard";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("adminToken", data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <AdminLoginCard
      email={email}
      password={password}
      message={message}
      remember={remember}
      showPassword={showPassword}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onRememberChange={setRemember}
      onToggleShowPassword={() => setShowPassword((s) => !s)}
      onSubmit={handleSubmit}
    />
  );
}

export default AdminLogin;
