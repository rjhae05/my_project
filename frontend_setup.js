import fs from "fs";
import path from "path";

const base = "./frontend";

// ✅ Folders
const folders = [
  "public",
  "src/api",
  "src/assets",
  "src/components",
  "src/context",
  "src/hooks",
  "src/pages",
  "src/styles"
];

// ✅ Files and Content
const files = {
  ".gitignore": `node_modules
dist
.env
`,

  ".env": `VITE_API_URL=http://localhost:5000/api
`,

  "frontend_requirements.txt": `# Frontend dependencies and their purposes

# Core React library for building user interfaces
react

# React DOM library for rendering components to the browser
react-dom

# Library for routing and navigation between pages
react-router-dom

# HTTP client for making API requests to the backend
axios

# Utility-first CSS framework for styling and layout
tailwindcss

# PostCSS processor for transforming styles
postcss

# Automatically adds vendor prefixes to CSS for browser compatibility
autoprefixer

# Frontend build tool and development server
vite
`,

  "package.json": `{
  "name": "frontend",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.23.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.0"
  }
}
`,

  "vite.config.js": `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
});
`,

  "postcss.config.js": `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,

  "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
`,

  "public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Frontend App</title>
  </head>
  <body class="bg-gray-100">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,

  "src/api/axios.js": `import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
`,

  "src/components/Navbar.jsx": `export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">MyApp</h1>
      <div>
        <a href="/" className="px-2">Home</a>
        <a href="/users" className="px-2">Users</a>
      </div>
    </nav>
  );
}
`,

  "src/components/Footer.jsx": `export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-10">
      <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
}
`,

  "src/components/Loader.jsx": `export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
    </div>
  );
}
`,

  "src/components/ProtectedRoute.jsx": `import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
`,

  "src/context/AuthContext.jsx": `import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
`,

  "src/hooks/useAuth.js": `import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, setUser } = useAuthContext();
  const login = (data) => setUser(data);
  const logout = () => setUser(null);
  return { user, login, logout };
};
`,

  "src/pages/Login.jsx": `import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/users/login", { email, password });
    if (res.data.token) {
      login(res.data);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
`,

  "src/pages/Register.jsx": `import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/users/register", form);
    alert("Registered successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
}
`,

  "src/pages/Dashboard.jsx": `import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <p className="mt-2 text-gray-600">You are logged in.</p>
    </div>
  );
}
`,

  "src/pages/Users.jsx": `import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users List</h1>
      <ul>
        {users.map(u => (
          <li key={u.id} className="border p-2 mb-2 rounded">
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
`,

  "src/router.jsx": `import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
`,

  "src/App.jsx": `import AppRouter from "./router";
import { AuthProvider } from "./context/AuthContext";
import "./styles/index.css";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
`,

  "src/main.jsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

  "src/styles/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;
`
};

// ✅ Create folders
folders.forEach(folder => {
  fs.mkdirSync(path.join(base, folder), { recursive: true });
});

// ✅ Create files
for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(base, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

console.log("✅ Frontend structure and boilerplate created successfully!");
