import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import {
  RiSearchLine,
  RiShoppingCart2Line,
  RiUser3Line,
} from "@remixicon/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const cartCount = useSelector((store) => store?.cart?.totalQuantity);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleSearch = () => {
    navigate(`/products?search=${search}`)
  }

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
    <div className="w-full border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT - Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            className="h-20 w-auto object-fit-contain"
            src="./src/assets/logo.png"
            alt="logo"
          />
        </NavLink>

        {/* MIDDLE - Search */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-10 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              <button onClick={handleSearch}>
              <RiSearchLine />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* CART ICON */}
          <NavLink
            to="/cart"
            className="relative p-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-lg transition duration-300"
          >
            <RiShoppingCart2Line />

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
              className="p-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-lg transition duration-300"
            >
              <RiUser3Line />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b font-medium">
                  Welcome {user?.firstName + " " + user?.lastName || "User"}
                </div>

                <NavLink to="/my-orders" className={navLinkStyle}>
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
    </div>
  );
};

export default Navbar;
