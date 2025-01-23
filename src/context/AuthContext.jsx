import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const API_URL = "http://localhost:8080/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      // Configure axios pour inclure le token dans les futures requêtes
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.message || "Erreur de connexion");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  // Configure axios avec le token existant au chargement
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
