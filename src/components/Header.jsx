import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { user: authUser, logOut } = useAuth();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const signOut = () => {
    logOut();
    toast.success("Log out successful.");
  };

  return (
    <div className="w-full dark:bg-gray-900 bg-gray-50 fixed">
      <header className="flex z-50 bg-gray-50 justify-between w-11/12 mx-auto items-center py-3 dark:bg-gray-900">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          TaskMaster
        </div>

        {/* Right: User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          {authUser ? (
            // If user is logged in, show profile and logout button
            <div className="flex items-center space-x-2">
              {authUser.photoURL && (
                <img
                  src={authUser.photoURL}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-lg dark:text-white">
                {authUser.displayName}
              </span>
              <button onClick={signOut} className="p-2 hover:text-red-500">
                Log out
              </button>
            </div>
          ) : (
            // If user is not logged in, show login button
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              Log In
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
