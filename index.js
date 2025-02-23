// Import necessary modules
import express from "express"; // Express framework for building the server
import path, { dirname } from "path"; // Utilities for working with file and directory paths
import { fileURLToPath } from "url"; // Utility to convert file URL to file path
// Import pg from "pg"; // PostgreSQL client for Node.js
import bodyParser from "body-parser"; // Middleware to parse incoming request bodies
// Import { hostname } from "os"; // (Commented out) Utility to get the system's hostname

// Initialize the Express application
const app = express();

// Define the port on which the server will listen
const port = 3000;

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create a new PostgreSQL client instance and configure the database connection
// const db = new pg.Client({
//  user: "postgres", // Database username
//  host: "localhost", // Database host
//  database: "postgres", // Database name
//  password: "henry", // Database password
//  port: 5432, // Database port
//});

// Connect to the PostgreSQL database
// db.connect();

// Middleware to parse URL-encoded request bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
  // Send the "index.html" file as the response
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Define a route for the "/login" URL
app.get("/login", (req, res) => {
  // Send the "login.html" file as the response
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Define a route for the "/signup" URL
app.get("/signup", (req, res) => {
  // Send the "signup.html" file as the response
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// Define a POST route for the "/signup" URL to handle form submissions
app.post("/signup", async (req, res) => {
  // Extract form data from the request body
  const user = req.body.person; // User's name
  const email = req.body.email; // User's email
  const pass = req.body.password; // User's password
  const confirmPass = req.body.confirmPassword; // User's confirmed password

  // Log the extracted form data to the console (for debugging purposes)
  console.log(user);
  console.log(email);
  console.log(pass);
  console.log(confirmPass);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
