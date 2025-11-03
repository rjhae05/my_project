import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.join(__dirname, "frontend");

// ==============================
// ⚙️ STEP 1: Create Vite + React App
// ==============================
console.log("⚡ Creating Vite + React app...");
execSync("npm create vite@latest frontend -- --template react", { stdio: "inherit" });

// ==============================
// ✅ STEP 2: Done
// ==============================
console.log("\n✅ Vite + React setup completed successfully!");
console.log("🚀 To start your project:");
console.log(`   cd ${base}`);
console.log("   npm install");
console.log("   npm run dev\n");
