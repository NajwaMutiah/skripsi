import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

app.use(
  "/images",
  express.static(path.join(__dirname, "../public"))
);

// Middleware


// Routes
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({
      message: "Database connected ✅",
      result: rows
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed ❌",
      error: error.message
    });
  }
});

// Basic route
app.get("/api/destinations", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM destinations");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});