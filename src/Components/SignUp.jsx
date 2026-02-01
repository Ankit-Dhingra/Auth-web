import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const { setUser, setStatus } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      console.log("Sign up response:", response);
      setUser(response?.data?.data?.user);
      setStatus("authenticated");
      if (
        !response?.data?.data.user?.isEmailVerified ||
        !response?.data?.data?.user?.isMobileVerified
      ) {
        navigate("/verification");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side – doodles / animation */}
      <div className="hidden md:block w-2/5 bg-gray-100">
        {/* animations later */}
        <img  className="w-full h-full object-cover" src="/src/assets/Doodle2.jpg" alt="Doodle" />
      </div>

      {/* Right side – form */}
      <div className="w-full md:w-3/5 flex items-start justify-center bg-gray-50">
        <div className="w-full max-w-md px-4 py-8">
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Please fill in the details below
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80
                           focus:border-black"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80
                           focus:border-black"
              />
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
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80
                           focus:border-black"
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
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80
                           focus:border-black"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80
                           focus:border-black"
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="mobile"
                className="text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80
                           focus:border-black"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-10 w-full rounded-md bg-black text-white text-sm font-medium
                         hover:bg-black/90 transition"
            >
              Create Account
            </button>
          </form>
          <h6 className="text-sm text-gray-600 mt-2">
            Already a user?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
