import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.join(__dirname, "frontend");

// ==============================
// 📁 STEP 1: Folder Structure Setup
// ==============================
const folders = [
  "src/assets/images",
  "src/assets/icons",
  "src/components/common",
  "src/components/layout",
  "src/pages",
  "src/hooks",
  "src/context",
  "src/api",
  "src/utils",
];

// Create folders
console.log("📁 Creating folder structure...");
folders.forEach((folder) => {
  const fullPath = path.join(base, folder);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log("✅ Created:", folder);
});

// ==============================
// 🧱 STEP 2: Create Sample Files
// ==============================
console.log("🧱 Creating sample files...");

fs.writeFileSync(
  path.join(base, "src/pages/Home.jsx"),
  `function Home() {
  return <h1>🏠 Welcome to the Home Page</h1>;
}
export default Home;
`
);

fs.writeFileSync(
  path.join(base, "src/components/layout/Header.jsx"),
  `function Header() {
  return (
    <header style={{ padding: '10px', background: '#333', color: '#fff' }}>
      <h1>My React App</h1>
    </header>
  );
}
export default Header;
`
);

fs.writeFileSync(
  path.join(base, "src/components/layout/Footer.jsx"),
  `function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '10px', background: '#eee' }}>
      <p>© 2025 My React App</p>
    </footer>
  );
}
export default Footer;
`
);

fs.writeFileSync(
  path.join(base, "src/utils/helpers.js"),
  `// Example utility function
export function greet(name) {
  return \`Hello, \${name}!\`;
}
`
);

fs.writeFileSync(
  path.join(base, "src/context/AppContext.jsx"),
  `import { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
`
);

// ==============================
// ✅ STEP 3: Done
// ==============================
console.log("\n✅ Frontend folder structure updated successfully!");
console.log(`📂 Location: ${base}`);
console.log("You can now start building your components and pages.\n");
