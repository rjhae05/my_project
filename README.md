A full-stack web application built with FERN — MySQL, Express.js, React (with Tailwind CSS), and Node.js.
This setup provides a modern, scalable architecture for web apps with authentication, API integration, and clean UI styling.

🧱 Tech Stack
Frontend

⚛️ React (Vite)

🎨 Tailwind CSS

🌐 Axios for API communication

🧭 React Router DOM

🧠 Context API for global state management

Backend

🟢 Node.js

🚀 Express.js

🗄️ MySQL (using mysql2)

🔐 Authentication using bcryptjs + jsonwebtoken

⚙️ Other tools: dotenv, cors, multer, morgan, nodemon

📁 Project Structure
Backend
backend/
├─ config/
│  └─ db.js              # Database connection
│
├─ controllers/          # Business logic
│  └─ userController.js
│
├─ models/               # Database queries / ORM
│  └─ userModel.js
│
├─ routes/               # API endpoints
│  └─ userRoutes.js
│
├─ middleware/
│  └─ authMiddleware.js
│
├─ uploads/              # Uploaded files (if using multer)
│
├─ .env
├─ package.json
├─ server.js             # Entry point
└─ requirements.txt      # Backend dependencies

Frontend
frontend/
├─ public/
│  ├─ index.html
│  ├─ favicon.ico
│  └─ logo.png
│
├─ src/
│  ├─ api/axios.js
│  ├─ assets/
│  ├─ components/
│  ├─ context/
│  ├─ hooks/
│  ├─ pages/
│  ├─ styles/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ router.jsx
│
├─ .env
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/fern-stack-app.git
cd fern-stack-app

2. Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=fern_db
JWT_SECRET=your_jwt_secret


Run the server:

npm run dev


👉 Backend runs on: http://localhost:5000

3. Frontend Setup
cd ../frontend
npm install


Create .env file:

VITE_API_URL=http://localhost:5000


Run the frontend:

npm run dev


👉 Frontend runs on: http://localhost:5173

🚀 Features

✅ RESTful API with MySQL database
✅ JWT-based authentication (login/register)
✅ Password encryption using bcrypt
✅ File upload support via Multer
✅ Global state management with React Context
✅ Responsive UI with Tailwind CSS
✅ Organized folder structure for scalability

🧩 Scripts
Backend
Command	Description
npm start	Run backend in production mode
npm run dev	Run backend with nodemon for development
Frontend
Command	Description
npm run dev	Start Vite development server
npm run build	Build frontend for production
npm run preview	Preview the production build
🗃️ Database Setup

Run this SQL script in your MySQL console:

CREATE DATABASE fern_db;

USE fern_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

📦 Dependencies
Backend
express
mysql2
dotenv
bcryptjs
jsonwebtoken
multer
cors
morgan
nodemon

Frontend
react
react-dom
react-router-dom
axios
tailwindcss
postcss
autoprefixer

💡 Author

👨‍💻 Developed by: Sir Aries
🏫 Institution: ACTEC
🧰 Tech Stack: FERN (MySQL, Express, React, Node.js) make it a codes 
