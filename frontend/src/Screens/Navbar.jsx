import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="bg-bg-color h-[60px] text-white flex justify-between items-center px-5 shadow-md ">
      {/* Left Links */}
      <div className="flex items-center gap-5">
        <Link
          to="/"
          className="hover:text-gray-300">
          Home
        </Link>
        <Link
          to="/createpost"
          className="hover:text-gray-300">
          Create New Post
        </Link>
        <Link
          to="/register"
          className="hover:text-gray-300">
          Registration
        </Link>
      </div>

      {/* Right Section: Username and Logout */}
      <div className="flex items-center gap-5">
        {token && username ? (
          <>
            <span className="font-medium">
              Welcome, <span className="text-yellow-300">{username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-btn-color px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300">
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
