
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">

        {/* Logo */}
        <h2 className="text-2xl font-bold">
          Shop <span className="text-red-500">kart</span>
        </h2>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-6">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover: text-red-400 ${isActive ? "text-red-600 font-bold" : "text-white"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/product"
            className={({ isActive }) =>
              `transition hover: text-red-400 ${isActive ? "text-red-600 font-bold" : "text-white"}`
            }
          >
            Product
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `transition hover: text-red-400 ${isActive ? "text-red-600 font-bold" : "text-white"}`
            }
          >
            Cart
          </NavLink>


          <NavLink
            to="/contect"
            className={({ isActive }) =>
              `transition hover: text-red-400 ${isActive ? "text-red-600 font-bold" : "text-white"}`
            }
          >
            Contect
          </NavLink>


          <NavLink
            to="/login"
            className={({ isActive }) =>
              `transition hover: text-red-400 ${isActive ? "text-red-600 font-bold" : "text-white"}`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `transition hover: text-red-400 ${isActive ? "text-red-600 font-bold" : "text-white"}`
            }
          >
            Register
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
