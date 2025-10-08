import AppRouter from "./router";
import { AuthProvider } from "./context/AuthContext";
import "./styles/index.css";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
