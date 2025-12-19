import { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import "./Ticket.css";

export default function Ticket() {
  const location = useLocation();

  const sessionId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("session_id");
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState("");

  // ✅ prevents duplicate DB inserts (React StrictMode)
  const savedRef = useRef(false);

  // Fetch Stripe session status
  useEffect(() => {
    if (!sessionId) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/session-status?session_id=${sessionId}`);
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

  // ✅ Save booking to DB ONCE after payment success
  useEffect(() => {
    if (!sessionId) return;
    if (!statusData) return;
    if (statusData.payment_status !== "paid") return;

    if (savedRef.current) return;
    savedRef.current = true;

    const customerToken = localStorage.getItem("customerToken");

    fetch("/api/save-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(customerToken ? { Authorization: `Bearer ${customerToken}` } : {}),
      },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then(() => {})
      .catch((err) => {
        console.error("Failed to save booking:", err);
      });
  }, [sessionId, statusData]);

  /* ---------------- Early returns (safe) ---------------- */

  if (!sessionId) {
    return <p>Missing session id</p>;
  }

  if (loading) {
    return <p>Checking ticket...</p>;
  }

  if (error || !statusData || statusData.payment_status !== "paid") {
    return (
      <div style={{ padding: 24 }}>
        <h2>Payment not completed</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  /* ---------------- Payment successful ---------------- */

  return (
    <div className="ticket-wrap">
      <h2 className="ticket-title">🎟️ Ticket Confirmed</h2>

      <div className="ticket-card">
        <div className="ticket-row">
          <span className="ticket-label">Movie:</span> {statusData.movieTitle}
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Theatre:</span> {statusData.theatreName}
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Showtime:</span> {statusData.showtime}
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Seats:</span> {statusData.seats}
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Status:</span> Confirmed
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Email:</span> {statusData.customer_email}
        </div>

        <div className="ticket-qr">
          <QRCodeSVG value={sessionId} size={180} />
          <div style={{ fontSize: 12, marginTop: 6 }}>
            Scan at theatre entrance
          </div>

          <div className="ticket-id">
            Ticket ID: <code>{sessionId}</code>
          </div>

          <Link className="ticket-link" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
