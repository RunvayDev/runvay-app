"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    // Handle sign-up logic here (e.g., API request to create user)
    console.log("Signing up with", email, password);
    // After successful sign-up, redirect to sign-in
    router.push("/signin");
  };

  const handleSignUpGoogle = async () => {
    await signIn("google");
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md">
        <div className="flex border-b pb-2 mb-4">
          <button className="text-gray-400 cursor-not-allowed">Sign In</button>
          <button className="ml-4 font-semibold text-gray-900">Sign Up</button>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
        <p className="text-gray-600 text-sm mb-4">Create an account to get started</p>

        <form onSubmit={handleSignUp} className="mb-4">
          <label className="block mb-2">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>

        <button
          className="w-full flex items-center justify-center border py-2 rounded-md hover:bg-gray-100 transition"
          onClick={handleSignUpGoogle}
        >
          <FcGoogle className="mr-2" size={20} /> Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/signin" className="text-blue-500">Sign In</a>
        </p>
      </div>
    </div>
  );
}
