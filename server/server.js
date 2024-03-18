// server.js
const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(require("./routes/record"));

// Get MongoDB driver connection
// const dbo = require("./db/conn");

// API endpoint example
app.get('/records', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM records');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching records' });
  }
});

app.listen(port, () => {
  // Perform a database connection when server starts

  console.log(`Server is running on port: ${port}`);
});
