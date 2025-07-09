// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../features/auth/types";
import * as authApi from "../features/auth/api";
import apiClient from "../lib/apiClient";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const saveToken = (token: string) => {
    localStorage.setItem("token", token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    saveToken(data.token);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await authApi.register(name, email, password);
    saveToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      saveToken(token);
      try {
        const res = await authApi.getProfile();
        setUser(res.user);
      } catch {
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
