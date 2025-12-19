const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

function getCustomerPayload(req) {
  const header = req.headers.authorization;
  if (!header) return null;

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;

  try {
    return jwt.verify(parts[1], process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// -------- Register (optional but recommended) --------
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO customers (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, password_hash]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- Login --------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const result = await pool.query(
      "SELECT id, email, password_hash FROM customers WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const customer = result.rows[0];
    const ok = await bcrypt.compare(password, customer.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { customerId: customer.id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- My Bookings (protected) --------
router.get("/my-bookings", async (req, res) => {
  const payload = getCustomerPayload(req);
  if (!payload) return res.status(401).json({ message: "Unauthorized" });

  try {
    const result = await pool.query(
      `SELECT id, movie_title, theatre_name, showtime, seats, amount, created_at
       FROM bookings
       WHERE customer_id = $1
       ORDER BY created_at DESC`,
      [payload.customerId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
