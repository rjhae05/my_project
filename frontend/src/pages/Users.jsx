import { useEffect, useState } from "react";
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
