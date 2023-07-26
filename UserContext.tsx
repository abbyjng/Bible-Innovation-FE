// src/context/auth-context.js
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { UserContextType, StreakType, UserType } from "./utils/types";

const UserContext = React.createContext({} as UserContextType);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType>();
  const [streak, setStreak] = useState<StreakType>();
  const [roots, setRoots] = useState<StreakType>();
  const [token, setToken] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchUserFromCookie() {
      const cookieToken = Cookies.get("token");
      if (cookieToken) {
        setToken(cookieToken);
        const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          method: "GET",
          headers: {
            user: cookieToken,
          },
        });
        if (user && user.status === 200) setUser(await user.json());

        const streak = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/streak`,
          {
            method: "GET",
            headers: {
              user: cookieToken,
            },
          }
        );
        if (streak && streak.status === 200) {
          const jsonData = await streak.json();
          setStreak({ ...jsonData, lastIncrement: jsonData["last-increment"] });
        }

        const roots = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roots`, {
          method: "GET",
          headers: {
            user: cookieToken,
          },
        });
        if (roots && roots.status === 200) {
          const jsonData = await roots.json();
          setRoots({ ...jsonData, count: jsonData.days });
        }
      }
      setIsLoading(false);
    }
    fetchUserFromCookie();
  }, []);

  const setTokenAndUser = async (token: string) => {
    Cookies.set("token", token);
    setToken(token);
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    if (user && user.status === 200) setUser(await user.json());

    const streak = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/streak`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    if (streak && streak.status === 200) {
      const jsonData = await streak.json();
      setStreak({ ...jsonData, lastIncrement: jsonData["last-increment"] });
    }

    const roots = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roots`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    if (roots && roots.status === 200) {
      const jsonData = await roots.json();
      setRoots({ ...jsonData, count: jsonData.days });
    }
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
    setUser(undefined);
    setToken("");
    router.push("/signin");
  };

  const updateStreak = async (count: number, lastIncrement: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/streak`, {
      method: "POST",
      headers: {
        user: token as string,
        "streak-data": JSON.stringify({
          count: count,
          goal: 0,
          "last-increment": lastIncrement,
          period: "",
        }),
      },
    });
    const result = await response.text();
    if (result === "Success") {
      setStreak({
        count: count,
        lastIncrement: lastIncrement,
      });
    }
  };

  const updateRoots = async (count: number, lastIncrement: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roots`, {
      method: "POST",
      headers: {
        user: token as string,
        "roots-data": JSON.stringify({
          days: count,
          startDate: 0,
          lastIncrement: lastIncrement,
        }),
      },
    });
    const result = await response.text();
    if (result === "Success") {
      setRoots({
        count: count,
        lastIncrement: lastIncrement,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: !!user,
        loading: isLoading,
        user,
        streak,
        roots,
        signUp,
        login,
        logout,
        updateStreak,
        updateRoots,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
