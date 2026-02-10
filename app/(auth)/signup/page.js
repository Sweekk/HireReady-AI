"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount, googlelogin } from "../authlogic";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl text-amber-950 mb-4 font-semibold">
        Job Seeker Portal
      </h2>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign up for HireReady
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1 text-sm">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 mt-5 rounded-xl"
          onClick={async () => {
            const success = await createAccount(email, password);
            if (success) {
              router.push("/login");
            }
          }}
        >
          Sign Up
        </button>

        <h2 className="flex font-semibold mt-2.5 justify-center">OR</h2>

        <button
          onClick={async () => {
            const token = await googlelogin();
            if (token) {
              router.push("/dashboard");
            }
          }}
          className="border p-2 rounded-lg flex items-center gap-2 w-full justify-center mt-3"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRwSSm1FIX8PTMhol9LHlJ7nGjsPDl0b2MIA&s"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <a className="text-blue-600 hover:underline" href="login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
