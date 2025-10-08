import db from "../config/database.js";

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
