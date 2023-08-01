// src/context/auth-context.js
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  UserContextType,
  StreakType,
  UserType,
  NoteDataType,
} from "./utils/types";

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
        if (user && user.status === 200) {
          const userDecoded = await user.json();
          if (userDecoded.friends) {
            const followedArray = [];

            for (const key in userDecoded.friends) {
              if (userDecoded.friends.hasOwnProperty(key)) {
                followedArray.push(userDecoded.friends[key].uid);
              }
            }

            setUser({
              uid: userDecoded.uid,
              photoURL: userDecoded.photoURL,
              displayName: userDecoded.displayName,
              friends: followedArray,
            });
          } else {
            setUser(userDecoded);
          }
        }

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
          if (jsonData)
            setStreak({
              ...jsonData,
              lastIncrement: jsonData["last-increment"],
            });
          else setStreak({ count: 0, lastIncrement: 0 });
        }

        const roots = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roots`, {
          method: "GET",
          headers: {
            user: cookieToken,
          },
        });
        if (roots && roots.status === 200) {
          const jsonData = await roots.json();
          if (jsonData) setRoots({ ...jsonData, count: jsonData.days });
          else setRoots({ count: 0, lastIncrement: 0 });
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
    if (user && user.status === 200) {
      const userDecoded = await user.json();
      if (userDecoded.friends) {
        const followedArray = [];

        for (const key in userDecoded.friends) {
          if (userDecoded.friends.hasOwnProperty(key)) {
            followedArray.push(userDecoded.friends[key].uid);
          }
        }

        setUser({
          uid: userDecoded.uid,
          photoURL: userDecoded.photoURL,
          displayName: userDecoded.displayName,
          friends: followedArray,
        });
      } else {
        setUser(userDecoded);
      }
    }

    const streak = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/streak`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    if (streak && streak.status === 200) {
      const jsonData = await streak.json();
      if (jsonData)
        setStreak({ ...jsonData, lastIncrement: jsonData["last-increment"] });
      else setStreak({ count: 0, lastIncrement: 0 });
    }

    const roots = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roots`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    if (roots && roots.status === 200) {
      const jsonData = await roots.json();
      if (jsonData) setRoots({ ...jsonData, count: jsonData.days });
      else setRoots({ count: 0, lastIncrement: 0 });
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
    if (response.status !== 200) {
      throw Error("Incorrect credentials");
    }
    const token = await response.text();
    setTokenAndUser(token);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(undefined);
    setToken(undefined);
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

  const updateUser = async (displayName: string, photoURL: string) => {
    if (!user) return;

    let headers: any = {
      user: token as string,
    };
    if (displayName) {
      headers.displayName = displayName;
    }
    if (photoURL) {
      headers.photoURL = photoURL;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/update-profile`,
      {
        method: "POST",
        headers,
      }
    );
    const result = await response.text();
    if (result === "Success") {
      if (displayName && photoURL) {
        setUser({ ...user, displayName: displayName, photoURL: photoURL });
      } else if (displayName) {
        setUser({ ...user, displayName: displayName });
      } else if (photoURL) {
        setUser({ ...user, photoURL: photoURL });
      }
    }
  };

  const followUser = async (toFollow: string) => {
    if (!token || !user) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-friend`,
        {
          method: "POST",
          headers: {
            user: token,
            "to-follow": toFollow,
          },
        }
      );
      if (response && response.status === 201)
        setUser({
          ...user,
          friends: [...(user.friends ? user.friends : []), toFollow],
        });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const unfollowUser = async (toUnfollow: string) => {
    if (!token || !user || !user.friends) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/remove-friend`,
        {
          method: "POST",
          headers: {
            user: token,
            "to-unfollow": toUnfollow,
          },
        }
      );
      if (response && response.status === 200)
        setUser({
          ...user,
          friends: user.friends.filter((u) => u !== toUnfollow),
        });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: !!user,
        loading: isLoading,
        token,
        user,
        streak,
        roots,
        signUp,
        login,
        logout,
        updateStreak,
        updateRoots,
        updateUser,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
