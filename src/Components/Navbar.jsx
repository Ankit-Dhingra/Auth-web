import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {user} = useAuth();

  const cartCount = useSelector((store) => store?.cart?.totalQuantity);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkStyle = ({ isActive }) =>
    `block px-4 py-2 hover:bg-gray-100 ${
      isActive ? "bg-blue-100 text-blue-600" : ""
    }`;

  return (
    <div className="border-2 border-gray-300 rounded-2xl p-3 m-4 flex items-center justify-between">

      {/* LEFT - Logo */}
      <NavLink
        to="/"
        className="text-xl font-bold border-2 border-gray-300 rounded-lg px-4 py-2 hover:border-blue-500 shadow-lg transition duration-300"
      >
        ThinkIt
      </NavLink>

      {/* MIDDLE - Search */}
      <div className="flex-1 mx-10">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* CART ICON */}
        <NavLink
          to="/cart"
          className="relative px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-lg transition duration-300"
        >
          🛒

          {/* Cart Count Badge */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </NavLink>

        {/* USER DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-lg transition duration-300"
          >
            👤
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">

              <div className="px-4 py-3 border-b font-medium">
                Welcome {user?.firstName + " " + user?.lastName || "User"}
              </div>

              <NavLink to="/orders" className={navLinkStyle}>
                My Orders
              </NavLink>

              <NavLink to="/profile" className={navLinkStyle}>
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
