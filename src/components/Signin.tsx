"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(""); // Added state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
  
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Sending name field
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Signup successful! Please sign in.");
        setIsSignUp(false);
      } else {
        alert(data.error);
      }
    } else {
      await signIn("credentials", { email, password, redirect: false });
    }
  };
  
  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="/runvay-bl.jpg" alt="Logo" className="h-12 w-auto" />
        </div>

        <div className="flex border-b-2 border-gray-200 pb-2 mb-4 relative">
          <div
            className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out"
            style={{
              width: '50%',
              transform: `translateX(${isSignUp ? '100%' : '0%'})`
            }}
          />
          <button
            onClick={() => setIsSignUp(false)}
            className={`w-1/2 transition-colors duration-300 text-lg ${
              !isSignUp ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`w-1/2 transition-colors duration-300 text-lg ${
              isSignUp ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && ( // Show name field only for signup
            <div>
              <label className="block">
                <span className="text-gray-700 text-sm font-medium mb-1 block">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-200 rounded-md focus:border-black focus:outline-none transition-colors duration-200"
                  required
                />
              </label>
            </div>
          )}

          <div>
            <label className="block">
              <span className="text-gray-700 text-sm font-medium mb-1 block">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border-2 border-gray-200 rounded-md focus:border-black focus:outline-none transition-colors duration-200"
                required
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-gray-700 text-sm font-medium mb-1 block">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border-2 border-gray-200 rounded-md focus:border-black focus:outline-none transition-colors duration-200"
                required
              />
            </label>
          </div>

          {isSignUp && (
            <div>
              <label className="block">
                <span className="text-gray-700 text-sm font-medium mb-1 block">Confirm Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-200 rounded-md focus:border-black focus:outline-none transition-colors duration-200"
                  required
                />
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transform transition-all duration-300 hover:scale-[1.02] text-base font-medium"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center border-2 border-gray-200 py-2.5 rounded-md hover:bg-gray-50 transition-all duration-300"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="mr-2" size={20} />
            <span className="text-gray-700">
              {isSignUp ? "Sign up" : "Sign in"} with Google
            </span>
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-black font-medium hover:text-gray-700 transition-colors duration-300"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
