import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { logIn } from "../services/auth.service";
import { Link,  useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Login (sets cookies)
      await logIn({ email, password });

      // 2️⃣ Fetch fresh user from backend
      const user = await refreshUser();

      // 3️⃣ Redirect based on verification
      if (user?.isEmailVerified && user?.isMobileVerified) {
        navigate("/", { replace: true });
      } else {
        navigate("/verification", { replace: true });
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden md:block w-2/5 bg-gray-100">
        <img
          className="w-full h-full object-cover"
          src="/src/assets/Doodle2.jpg"
          alt="Doodle"
        />
      </div>

      {/* Right side */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md px-4 py-8 space-y-5"
        >
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Please fill in the details below
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-md border border-gray-300 px-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black/80"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-md border border-gray-300 px-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black/80"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="h-10 w-full rounded-md bg-black text-white text-sm font-medium
                       hover:bg-black/90 transition"
          >
            Login
          </button>

          {/* Footer link */}
          <p className="text-sm text-gray-600 text-center pt-2">
            New user?{" "}
            <Link to="/signUp" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
