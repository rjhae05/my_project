import fs from "fs";
import path from "path";

const base = "./backend";

// ✅ Folders
const folders = [
  "config",
  "controllers",
  "middleware",
  "models",
  "routes",
  "uploads"
];

// ✅ Files and Content
const files = {
  ".gitignore": `node_modules
.env
uploads/
`,
  ".env": `PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=ferndb
JWT_SECRET=mysecretkey
`,
  "requirements.txt": `express
mysql2
dotenv
bcryptjs
jsonwebtoken
multer
cors
morgan
`,

  // CONFIG
  "config/database.js": `import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

export default db;
`,

  // MODEL
  "models/User.js": `import db from "../config/database.js";

const User = {
  create: (data, callback) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [data.name, data.email, data.password], callback);
  },

  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  getAll: callback => {
    db.query("SELECT id, name, email FROM users", callback);
  }
};

export default User;
`,

  // CONTROLLER
  "controllers/usersController.js": `import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = bcrypt.hashSync(password, 10);
    User.create({ name, email, password: hashed }, err => {
      if (err) throw err;
      res.json({ message: "User registered successfully" });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful", token });
  });
};

export const getUsers = (req, res) => {
  User.getAll((err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
`,

  // MIDDLEWARES
  "middleware/auth.js": `import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
`,

  "middleware/errorHandler.js": `export default (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
};
`,

  // ROUTE
  "routes/users.js": `import express from "express";
import { register, login, getUsers } from "../controllers/usersController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, getUsers);

export default router;
`,

  // SERVER
  "server.js": `import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import db from "./config/database.js";
import userRoutes from "./routes/users.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
`
};

// ✅ Create Folders
folders.forEach(folder => {
  fs.mkdirSync(path.join(base, folder), { recursive: true });
});

// ✅ Create Files
for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(base, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

console.log("✅ Backend structure and code created successfully!");
