import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const dropdownRef = useRef();
  const [open, setOpen] = useState(false);
  //   const [username, SetUserName] = useState("");
  const user = useSelector((state) => state.auth.data?.user);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = () => {
    if (!user) return "";

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    const firstInitial = firstName.charAt(0).toUpperCase() || "";
    const lastInitial = lastName.charAt(0).toUpperCase() || "";
    console.log(user);
    return firstInitial + lastInitial;
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <img
            src="/skillhublogo.png"
            alt="SkillHub Logo"
            className="h-10 w-10"
          />
        </div>

        <div className="flex gap-6 text-gray-700 font-medium">
          <Link to="/dashboard" className="hover:text-blue-700">
            Dashboard
          </Link>
          <Link to="/courses" className="hover:text-blue-700">
            Explore Courses
          </Link>
          <Link to="/mylearnings" className="hover:text-blue-700">
            My Learnings
          </Link>
        </div>

        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-semibold focus:outline-none"
          >
            {getInitials()}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              {/* <div className="py-2 px-4 text-sm text-gray-700 border-b">
                {name}
              </div> */}
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Create User
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Add Course
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
