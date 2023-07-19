// src/context/auth-context.js
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = React.createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [storedToken, setStoredToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchUserFromCookie() {
      const token = Cookies.get("token");
      if (token) {
        setStoredToken(token);
        const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          method: "GET",
          headers: {
            user: token,
          },
        });
        if (user && user.status === 200) setUser(await user.json());
      }
      setIsLoading(false);
    }
    fetchUserFromCookie();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
      method: "POST",
      headers: {
        email: email,
        password: password,
      },
    });
    const token = await response.text();

    if (token) {
      Cookies.set("token", token);
      setStoredToken(token);
      const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "GET",
        headers: {
          user: token,
        },
      });
      if (user && user.status === 200) setUser(await user.json());
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setStoredToken("");
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading: isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
