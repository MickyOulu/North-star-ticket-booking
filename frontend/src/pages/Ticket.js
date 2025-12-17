import { useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { QRCodeSVG} from "qrcode.react";

export default function Ticket() {
  const location = useLocation();

  const sessionId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("session_id");
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `/api/session-status?session_id=${sessionId}`
        );
        const data = await res.json();
        setStatusData(data);
      } catch (err) {
        setError("Failed to verify ticket.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [sessionId]);

  if (!sessionId) {
    return <p>Missing session id</p>;
  }

  if (loading) {
    return <p>Checking ticket...</p>;
  }

  if (error || statusData.payment_status !== "paid") {
    return (
      <div style={{ padding: 24 }}>
        <h2>❌ Payment not completed</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  // ✅ PAID
  return (
    <div style={{ padding: 24, maxWidth: 500 }}>
      <h2>🎟️ Ticket Confirmed</h2>

      <p><strong>Status:</strong> Paid</p>
      <p><strong>Email:</strong> {statusData.customer_email}</p>

      <div style={{ margin: "20px 0" }}>
        <QRCodeSVG value={sessionId} size={180} />
        <p style={{ fontSize: 12 }}>Scan at theatre entrance</p>
      </div>

      <p style={{ fontSize: 12 }}>
        Ticket ID: <code>{sessionId}</code>
      </p>

      <Link to="/">Back to Home</Link>
    </div>
  );
}
