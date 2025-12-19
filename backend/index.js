const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/stripe"));
app.use("/api/admin", require("./routes/admin"));

app.use("/api/customer", require("./routes/customer"));



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
// get movies (optionally filtered by city)
app.get('/api/movies', async (req, res) => {
  const { city } = req.query;

  try {
    // If no city or city is "All", return all movies
    if (!city || city === "All") {
      const result = await pool.query(
        `SELECT id, title, genre, duration, rating, description, poster_url
         FROM movies
         ORDER BY id`
      );
      return res.json(result.rows);
    }

    // If a city is selected, return only movies available in theatres of that city
    const result = await pool.query(
      `SELECT DISTINCT m.id, m.title, m.genre, m.duration, m.rating, m.description, m.poster_url
       FROM movies m
       JOIN movie_theatres mt ON mt.movie_id = m.id
       JOIN theatres t ON t.id = mt.theatre_id
       WHERE t.city = $1
       ORDER BY m.id`,
      [city]
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


// get showtimes by movie + theatre + date
app.get("/api/showtimes", async (req, res) => {
  const { movieId, theatreId, date } = req.query;

  if (!movieId || !theatreId || !date) {
    return res
      .status(400)
      .json({ error: "movieId, theatreId, and date are required" });
  }

  try {
    const result = await pool.query(
      `SELECT id, show_time
       FROM showtimes
       WHERE movie_id = $1 AND theatre_id = $2 AND show_date = $3
       ORDER BY show_time`,
      [movieId, theatreId, date]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching showtimes:", err);
    res.status(500).json({ error: "Failed to fetch showtimes" });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
