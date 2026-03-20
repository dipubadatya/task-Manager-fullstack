import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

// custom hook to access auth state easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // on first load, restore the saved user from localstorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, [token]);

  // helper to save auth data in state and localstorage
  const saveAuth = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // register a new user
  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    saveAuth(res.data.user, res.data.token);
    return res.data;
  };

  // login with existing credentials
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    saveAuth(res.data.user, res.data.token);
    return res.data;
  };

  // clear everything on logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
