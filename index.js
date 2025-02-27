import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import 'dotenv/config';

// Configuration
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8080;
const SSL_CONFIG = { rejectUnauthorized: false }; // Azure SSL requirement

// Database Client
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: SSL_CONFIG
});

// Initialize Database Connection
db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection failed:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Route Helpers
const serveHTML = (fileName) => (req, res) => 
  res.sendFile(path.join(__dirname, "public", `${fileName}.html`));

// Routes
app.get("/", serveHTML("index"));
app.get("/login", serveHTML("login"));
app.get("/signup", serveHTML("signup"));

app.post("/signup", async (req, res) => {
  const { person: username, email, password, confirmPassword } = req.body;
  
  try {
    // Basic validation
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    // TODO: Add database insertion
    console.log("New user:", { username, email });
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Registration failed");
  }
});

// Database Test Route (Remove in production)
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() as current_time");
    res.send(`Database OK! Time: ${result.rows[0].current_time}`);
  } catch (err) {
    res.status(500).send(`Database error: ${err.message}`);
  }
});

// Server Initialization
app.listen(port, () => 
  console.log(`Server running on port ${port}`));