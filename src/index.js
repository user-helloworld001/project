import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "database_name",
  password: "your_password",
  port: 5432, // default PostgreSQL port
});

// Create a table if not exists (run once)


app.post("/api/food", async (req, res) => {
  const { foodType, quantity, expiry, additionalNotes } = req.body;

  try {
    await pool.query(
      "INSERT INTO food_entries (food_type, quantity, expiry_date_time, additional_notes) VALUES ($1, $2, $3, $4)",
      [foodType, quantity, expiry, additionalNotes]
    );
    res.status(200).json({ message: "Data inserted successfully!" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
