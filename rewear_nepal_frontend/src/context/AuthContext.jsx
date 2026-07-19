import { createContext, useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("rewear_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("rewear_token"));
  const [loading, setLoading] = useState(true);

  // On mount, if a token exists, verify it against the backend and refresh user data
  useEffect(() => {
    const bootstrap = async () => {
      const storedToken = localStorage.getItem("rewear_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await authService.getProfile();
        const profile = data.user || data;
        setUser(profile);
        localStorage.setItem("rewear_user", JSON.stringify(profile));
      } catch {
        localStorage.removeItem("rewear_token");
        localStorage.removeItem("rewear_user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const persistSession = (data) => {
    const authToken = data.token || data.accessToken;
    const authUser = data.user;
    localStorage.setItem("rewear_token", authToken);
    localStorage.setItem("rewear_user", JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
    return authUser;
  };

  const register = useCallback(async (formData) => {
    const { data } = await authService.register(formData);
    const authUser = persistSession(data);
    toast.success("Account created successfully!");
    return authUser;
  }, []);

  const login = useCallback(async (credentials) => {
    const { data } = await authService.login(credentials);
    const authUser = persistSession(data);
    toast.success(`Welcome back, ${authUser.name?.split(" ")[0] || "there"}!`);
    return authUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("rewear_token");
    localStorage.removeItem("rewear_user");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isBuyer: user?.role === "buyer",
    isSeller: user?.role === "seller",
    isAdmin: user?.role === "admin",
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
