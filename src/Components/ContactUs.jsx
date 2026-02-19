import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [errors, setErrors] = useState({});

  const { email, mobile, password } = formData;

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) {
        error = "Email is required";
      } else if (value.length > 200) {
        error = "Email cannot exceed 200 characters";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "mobile") {
      if (!/^\d{0,10}$/.test(value)) {
        error = "Only numbers allowed";
      } else if (value.length === 10) {
        error = "";
      } else if (value.length > 0 && value.length < 10) {
        error = "Mobile must be 10 digits";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)
      ) {
        error =
          "Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char";
      }
    }

    return error;
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // Remove non-digits and limit to 10
      const onlyDigits = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        mobile: onlyDigits,
      }));

      const error = validateField(name, onlyDigits);

      setErrors((prev) => ({
        ...prev,
        mobile: error,
      }));

      return;
    }

    // Normal handling for other fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  const validateAll = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateAll();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    console.log("Form submitted:", formData);
    toast.success("Form Submitted Successfully");
    setFormData({
      email: "",
      mobile: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start bg-blue-100 pt-16">
      <div className="flex flex-col w-full max-w-md bg-white rounded-md shadow-2xl p-8">
        <h2 className="font-bold text-center text-4xl text-gray-800 mb-6">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email Id
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              value={email}
              maxLength={200}
              onChange={handleFormData}
              className="border border-blue-400 px-4 py-2 rounded-md focus:outline-none focus:bg-blue-50 focus:border-blue-600 transition"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="MobileNo" className="mb-1">
              Mobile No
            </label>
            <input
              type="tel"
              name="mobile"
              id="MobileNo"
              maxLength={10}
              value={mobile}
              onChange={handleFormData}
              className="border border-blue-400 px-4 py-2 rounded-md focus:outline-none focus:bg-blue-50 focus:border-blue-600 transition"
            />
          </div>
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}

          <div className="flex flex-col relative">
            <label htmlFor="password" className="mb-1">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              maxLength={20}
              value={password}
              onChange={handleFormData}
              className="border border-blue-400 px-4 py-2 rounded-md pr-14 focus:outline-none focus:bg-blue-50 focus:border-blue-600 transition"
            />

            {password && (
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-9.5 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>

          <button
            type="submit"
            className="rounded-md px-4 py-2 bg-blue-500 font-bold mt-4 hover:bg-blue-600 transition text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
