const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// test route: simple text (old one)
app.get('/', (req, res) => {
  res.send('Backend is working.');
});

// new route: test database connection
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Database connection OK',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error('DB test error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// NEW: get all theatres
app.get('/api/theatres', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM theatres ORDER BY city, name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching theatres:', err);
    res.status(500).json({ error: 'Failed to fetch theatres' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
