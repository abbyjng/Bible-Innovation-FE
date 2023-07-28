/* Login */

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/UserContext";
import Loader from "@/components/Loader";

export default function Signin() {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const { login, user } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await login(email, password);
    } catch (error) {
      setSubmitting(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (user) {
      const nextPage = localStorage.getItem("nextPage");
      localStorage.removeItem("nextPage");
      if (nextPage) {
        router.push(nextPage);
      } else router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      {submitting && (
        <div className="w-screen h-screen bg-black/20 absolute top-0 left-0">
          <Loader />
        </div>
      )}
      <div className="text-center text-xl font-bold mt-10">Login</div>
      <form onSubmit={handleSubmit} className="flex flex-col p-4">
        {error && (
          <div className="text-red-500">
            We couldn&apos;t find an account with that email and password.
            Please try again.
          </div>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="janedoe@gmail.com"
          type="email"
          className="border border-black p-2"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="border border-black p-2"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
        />
        <input
          type="submit"
          value="Submit"
          className="bg-[#657786] text-white p-2 mt-2 cursor-pointer"
        />
      </form>
      <div className="flex justify-center">
        <Link href="/signup" className="underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}
