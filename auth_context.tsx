// src/context/auth-context.js
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  signUp: (displayName: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
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

  const setTokenAndUser = async (token: string) => {
    Cookies.set("token", token);
    setStoredToken(token);
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    if (user && user.status === 200) setUser(await user.json());
  };

  const signUp = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signUp`, {
      method: "POST",
      headers: {
        displayName: displayName,
        email: email,
        password: password,
      },
    });
    const token = await response.text();
    setTokenAndUser(token);
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
      method: "POST",
      headers: {
        email: email,
        password: password,
      },
    });
    const token = await response.text();
    setTokenAndUser(token);
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
        loading: isLoading,
        user,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
