import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <p className="mt-2 text-gray-600">You are logged in.</p>
    </div>
  );
}
