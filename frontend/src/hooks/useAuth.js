import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, setUser } = useAuthContext();
  const login = (data) => setUser(data);
  const logout = () => setUser(null);
  return { user, login, logout };
};
