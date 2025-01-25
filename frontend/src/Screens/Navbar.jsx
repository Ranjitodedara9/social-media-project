import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Using icons for hamburger menu

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-bg-color text-white shadow-md">
      {/* Desktop & Mobile Navbar */}
      <div className="flex justify-between items-center px-5 h-[60px]">
        {/* Logo or Brand */}
        <Link
          to="/"
          className="text-xl font-semibold hover:text-gray-300 md:hidden">
          MyBlog
        </Link>
        {/* Hamburger Menu (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            to="/"
            className="text-xl font-semibold hover:text-gray-300">
            MyBlog
          </Link>
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
          <Link
            to="/yourpost"
            className="hover:text-gray-300">
            Your Post
          </Link>
        </div>

        {/* Right Section: Username and Logout */}
        <div className="hidden md:flex items-center gap-5">
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
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-bg-color text-white">
          <Link
            to="/"
            onClick={toggleMenu}
            className="py-2 px-4 hover:bg-gray-700">
            Home
          </Link>
          <Link
            to="/createpost"
            onClick={toggleMenu}
            className="py-2 px-4 hover:bg-gray-700">
            Create New Post
          </Link>
          <Link
            to="/register"
            onClick={toggleMenu}
            className="py-2 px-4 hover:bg-gray-700">
            Registration
          </Link>
          <Link
            to="/yourpost"
            onClick={toggleMenu}
            className="py-2 px-4 hover:bg-gray-700">
            Your Post
          </Link>
          {token && username ? (
            <div className="py-2 px-4 flex items-center justify-between">
              <span>
                Welcome, <span className="text-yellow-300">{username}</span>
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-btn-color px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300">
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="py-2 px-4 hover:bg-gray-700">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
