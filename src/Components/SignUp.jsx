import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value, formData) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.length > 100) return "Max 100 characters allowed";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters allowed";
        return "";

      case "lastName":
        if (value && value.length > 100) return "Max 100 characters allowed";
        if (value && !/^[a-zA-Z\s]+$/.test(value))
          return "Only letters allowed";
        return "";

      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email address";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";

      case "confirmPassword":
        if (value !== formData.password) return "Passwords do not match";
        return "";

      case "mobile":
        if (!value) return "Mobile number is required";
        if (!/^\d{10}$/.test(value)) return "Mobile number must be 10 digits";
        return "";

      default:
        return "";
    }
  };

  const { setUser, setStatus } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const errorMessage = validateField(name, value, {
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key], formData);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors");
      return;
    }
    try {
      const response = await signUp(formData);
      toast.success("Account created successfully");
      setUser(response?.data?.data?.user);
      setStatus("authenticated");
      if (
        !response?.data?.data.user?.isEmailVerified ||
        !response?.data?.data?.user?.isMobileVerified
      ) {
        navigate("/verification");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side – doodles / animation */}
      <div className="hidden md:block w-2/5 bg-gray-100">
        {/* animations later */}
        <img
          className="w-full h-full object-cover"
          src="/src/assets/Doodle2.jpg"
          alt="Doodle"
        />
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
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName}</p>
            )}

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
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName}</p>
            )}

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
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}

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
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}

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
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}

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
            {errors.mobile && (
              <p className="text-xs text-red-500">{errors.mobile}</p>
            )}

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
