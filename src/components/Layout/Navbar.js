import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import skillhublogo from "../../skillhublogo.png";
import { logout } from "../../store/authSlice";

function Navbar() {
  const dropdownRef = useRef();
  const [open, setOpen] = useState(false);
  //   const [username, SetUserName] = useState("");
  const user = useSelector((state) => state.auth.data?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    return firstInitial + lastInitial;
  };

  const logoutUser = async () => {
    await dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <img src={skillhublogo} alt="SkillHub Logo" className="h-20 w-30" />
        </div>

        <div className="flex gap-6 text-gray-700 font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-700 font-semibold" : "hover:text-blue-700"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "text-blue-700 font-semibold" : "hover:text-blue-700"
            }
          >
            Explore Courses
          </NavLink>
          <NavLink
            to="/my-learning"
            className={({ isActive }) =>
              isActive ? "text-blue-700 font-semibold" : "hover:text-blue-700"
            }
          >
            My Learnings
          </NavLink>
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
              <ul className="py-1 text-sm text-gray-700">
                {(user?.role === "Admin" || user?.role === "Mentor") && (
                  <li>
                    <button
                      onClick={() => navigate("/addcourse")}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Add Course
                    </button>
                  </li>
                )}
                {user?.role === "Admin" && (
                  <li>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                      Manage User
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={logoutUser}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
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
