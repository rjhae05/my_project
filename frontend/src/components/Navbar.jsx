export default function Navbar() {
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
