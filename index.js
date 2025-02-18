import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import bodyParser from "body-parser";
// import { hostname } from "os";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "meal_health_app",
  password: "password",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.post("/signup", async (req, res) => {
  const user = req.body.person;
  const email = req.body.email;
  const pass = req.body.password;
  const confirmPass = req.body.confirmPassword;
  console.log(user);
  console.log(email);
  console.log(pass);
  console.log(confirmPass);
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
