import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  gender?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (redirectPath?: string) => void; // Added redirectPath argument
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // DAuth Configuration
  const CLIENT_ID = import.meta.env.VITE_DAUTH_CLIENT_ID;
  const REDIRECT_URI = `${window.location.origin}/auth/callback`;

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("dauth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (redirectPath?: string) => {
    // 1. Store the page we want to return to (default to current page if not specified)
    // If specific path provided (like clicking 'Get Started'), use that.
    // Otherwise use current location.
    const path = redirectPath || window.location.pathname;
    sessionStorage.setItem("loginRedirect", path);

    // 2. Redirect to DAuth
    window.location.href = `https://auth.delta.nitt.edu/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&grant_type=authorization_code&scope=email+profile+user+openid`;
  };

  const logout = () => {
    localStorage.removeItem("dauth_user");
    sessionStorage.removeItem("loginRedirect");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};