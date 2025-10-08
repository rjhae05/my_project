A full-stack web application built with MERN — MySQL, Express.js, React (with Tailwind CSS), and Node.js.
This setup provides a modern, scalable architecture for web apps with authentication, API integration, and clean UI styling.


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

CREATE DATABASE mern_db;

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
🧰 Tech Stack: MERN (MySQL, Express, React, Node.js) make it a codes 
