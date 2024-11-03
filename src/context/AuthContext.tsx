// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  status: string;
  imgSrc?: string;
  description?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage เมื่อเริ่มโหลดครั้งแรก
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // บันทึกลง localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ลบจาก localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
