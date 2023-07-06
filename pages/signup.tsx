/* Login */

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // TODO: handle create account

    router.push("/");
  };

  return (
    <div>
      <div className="text-center text-xl font-bold mt-10">Create account</div>
      <form onSubmit={handleSubmit} className="flex flex-col p-4">
        {/* TODO: add any other necessary fields */}
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Jane Doe"
          type="text"
          className="border border-black p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="janedoe@gmail.com"
          type="email"
          className="border border-black p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="border border-black p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" className="bg-gray-200 p-2 mt-2" />
      </form>
      <div className="flex justify-center">
        <Link href="/signin" className="underline">
          Login to an existing account
        </Link>
      </div>
    </div>
  );
}
