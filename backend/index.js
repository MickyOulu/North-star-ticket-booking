const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// test route
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

//  get thatre info
app.get('/api/theatres', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM theatres ORDER BY city, name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching theatres:', err);
    res.status(500).json({ error: 'Failed to fetch theatres' });
  }
});


//get movies
app.get('/api/movies', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, genre, duration, rating, description, poster_url
       FROM movies
       ORDER BY id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

//get movies by ID
app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid movie ID' });
  }

  try {
    const result = await pool.query(
      `SELECT id, title, genre, duration, rating, description, poster_url
       FROM movies
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
