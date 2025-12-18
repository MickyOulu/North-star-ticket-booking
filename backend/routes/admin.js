const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

function getTokenPayload(req) {
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


/* ---------------- LOGIN ---------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await pool.query(
      "SELECT id, email, password_hash FROM owners WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const owner = result.rows[0];

    const ok = await bcrypt.compare(password, owner.password_hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { ownerId: owner.id, email: owner.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- PROTECTED DASHBOARD ---------------- */
router.get("/dashboard", async (req, res) => {
  try {
    // --- JWT check (same as before) ---
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    // --- 1) Total bookings ---
    const bookingsResult = await pool.query("SELECT COUNT(*) FROM bookings");
    const totalBookings = Number(bookingsResult.rows[0].count);

    // --- 2) Total revenue ---
    const revenueResult = await pool.query("SELECT COALESCE(SUM(amount), 0) AS total FROM bookings");
    const totalRevenue = Number(revenueResult.rows[0].total);

    // --- 3) Revenue per theatre ---
    const perTheatreResult = await pool.query(`
      SELECT theatre_name, COALESCE(SUM(amount), 0) AS revenue
      FROM bookings
      GROUP BY theatre_name
      ORDER BY revenue DESC
    `);

    const revenuePerTheatre = perTheatreResult.rows.map((r) => ({
      theatreName: r.theatre_name,
      revenue: Number(r.revenue),
    }));

    return res.json({
      totalBookings,
      totalRevenue,
      revenuePerTheatre,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

//staff list
router.get("/staff", async (req, res) => {
  const payload = getTokenPayload(req);
  if (!payload) return res.status(401).json({ message: "Unauthorized" });

  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM staff WHERE owner_id = $1 ORDER BY id DESC",
      [payload.ownerId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//add staff
router.post("/staff", async (req, res) => {
  const payload = getTokenPayload(req);
  if (!payload) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO staff (owner_id, name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, created_at`,
      [payload.ownerId, name, email, password_hash]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    // unique email violation
    if (err.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


//delete staff
router.delete("/staff/:id", async (req, res) => {
  const payload = getTokenPayload(req);
  if (!payload) return res.status(401).json({ message: "Unauthorized" });

  try {
    const staffId = req.params.id;

    const result = await pool.query(
      "DELETE FROM staff WHERE id = $1 AND owner_id = $2 RETURNING id",
      [staffId, payload.ownerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json({ message: "Staff deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
