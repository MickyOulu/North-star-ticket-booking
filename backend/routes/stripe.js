const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// GET /api/stripe-test
router.get("/stripe-test", (req, res) => {
  res.json({ ok: true, message: "Stripe route is working ✅" });
});

// POST /api/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  try {
    
const { movieTitle, showtime, seats } = req.body;

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
},

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
showtime: session.metadata?.showtime || "",
seats: session.metadata?.seats || "",

    });
  } catch (err) {
    console.error("session-status error:", err);
    res.status(500).json({ error: err.message || "Failed to retrieve session" });
  }
});

module.exports = router;
