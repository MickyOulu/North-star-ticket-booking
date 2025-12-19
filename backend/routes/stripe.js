const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const jwt = require("jsonwebtoken");
const pool = require("../db");


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// GET /api/stripe-test
router.get("/stripe-test", (req, res) => {
  res.json({ ok: true, message: "Stripe route is working ✅" });
});

// POST /api/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  try {
    
const { movieTitle, showtime, seats, theatreName } = req.body;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: 1200, // €12.00 in cents
            product_data: {
              name: "Movie Ticket",
            },
          },
        },
      ],

      return_url: "http://localhost:3000/ticket?session_id={CHECKOUT_SESSION_ID}",
      metadata: {
  movieTitle: movieTitle || "",
  showtime: showtime || "",
  seats: Array.isArray(seats) ? seats.join(",") : (seats || ""),
  theatreName: theatreName || "",},

    });

    res.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    res.status(500).json({ error: err.message || "Failed to create session" });
  }
});

// GET /api/session-status?session_id=cs_test_...
router.get("/session-status", async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session.status, // open / complete
      payment_status: session.payment_status, // paid / unpaid
      customer_email: session.customer_details?.email || null,
      movieTitle: session.metadata?.movieTitle || "",
theatreName: session.metadata?.theatreName || "",
showtime: session.metadata?.showtime || "",
seats: session.metadata?.seats || "",

    });
  } catch (err) {
    console.error("session-status error:", err);
    res.status(500).json({ error: err.message || "Failed to retrieve session" });
  }
});


// ---------------- SAVE BOOKING (after payment success) ----------------
router.post("/bookings", async (req, res) => {
  try {
    const { movieTitle, theatreName, amount } = req.body;

    if (!movieTitle || !theatreName || !amount) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    await pool.query(
      `INSERT INTO bookings (movie_title, theatre_name, amount)
       VALUES ($1, $2, $3)`,
      [movieTitle, theatreName, amount]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Save booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/save-booking", async (req, res) => {
  try {
    const { session_id } = req.body;
    if (!session_id) {
      return res.status(400).json({ message: "session_id is required" });
    }

    // Optional: link to logged-in customer if token exists
    let customerId = null;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      try {
        const token = auth.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        customerId = payload.customerId || null;
      } catch (e) {
        // ignore invalid customer token (still allow guest save)
        customerId = null;
      }
    }

    // Verify Stripe session on server (trusted)
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Get booking info from metadata (you already send these)
    const movieTitle = session.metadata?.movieTitle || "Movie Ticket";
    const theatreName = session.metadata?.theatreName || "";
    const showtime = session.metadata?.showtime || "";
    const seats = session.metadata?.seats || "";
    const customerEmail = session.customer_details?.email || "";

    const amount = session.amount_total ? session.amount_total / 100 : 0;

    // Insert once (session_id is UNIQUE → prevents duplicates)
    const result = await pool.query(
      `INSERT INTO bookings (movie_title, theatre_name, showtime, seats, customer_email, amount, customer_id, session_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (session_id) DO NOTHING
       RETURNING id`,
      [movieTitle, theatreName, showtime, seats, customerEmail, amount, customerId, session_id]
    );

    // If it already existed, return ok anyway
    return res.json({ ok: true, inserted: result.rows.length === 1 });
  } catch (err) {
    console.error("save-booking error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
