import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { showToast } from "./Toast";
import logoPng from "../assets/main.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    showToast("success", "Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="bg-white text-black p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold gap-2 text-green-700">
          <img src={logoPng} alt="logo" className="w-10 h-10" />
          GreenNest
        </Link>

        {/* Center: Menu for small devices */}
        <div className="flex items-center gap-4">
          {/* Mobile Dropdown */}
          <div className="dropdown md:hidden">
            <button tabIndex={0} className="btn btn-ghost text-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-white text-black rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/plants">Plants</Link>
              </li>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-green-600">
              Home
            </Link>
            <Link to="/plants" className="hover:text-green-600">
              Plants
            </Link>
            <Link to="/profile" className="hover:text-green-600">
              My Profile
            </Link>
          </div>

          {/* Right: User / Auth */}
          {user ? (
            <div className="relative flex items-center">
              <img
                src={user.photoURL || "https://i.postimg.cc/0jGGGk0L/user.png"}
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              />
              {dropdown && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-3 w-48 z-50">
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full bg-green-600 text-white py-1 rounded hover:bg-green-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
