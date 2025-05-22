import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import koinfu from "../pictures/koinfu.png";

export default function HomeHeaderPage() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Navigation links data
  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/services", label: "SERVICES" },
    { path: "/contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.style.pointerEvents = "none";
    }
  }, []);

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="relative top-0 left-0 w-full z-50 bg-slate-950 p-3 flex justify-between items-center text-white shadow-md">
        {/* Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 lg:hidden" ref={hamburgerRef}>
          <FontAwesomeIcon
            className="h-6 cursor-pointer"
            icon={faBars}
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen(!isSidebarOpen);
            }}
            aria-label="Toggle Sidebar"
          />
        </div>

        {/* Logo */}
        <div className="flex items-center lg:ml-4">
          <img
            src={koinfu}
            alt="Company Logo"
            className="h-12 w-auto md:h-16"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 ml-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-teal-400 transition-colors duration-200 ${
                location.pathname === link.path
                  ? "text-teal-400 font-medium"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Sign In Button */}
        <div className="hidden lg:flex items-center mr-4">
          <Link to="/LoginPage">
            <button
              className="bg-teal-600 font-semibold bg-opacity-20 border-opacity-70 border border-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-300 hover:text-slate-900 hover:shadow-teal-300 hover:shadow-lg transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-0 h-screen bg-slate-900 text-white z-[60] transition-all duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="bg-slate-900 p-4 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <img src={koinfu} alt="Company Logo" className="h-10 w-auto" />
            <FontAwesomeIcon
              className="h-6 cursor-pointer text-gray-400 hover:text-white"
              icon={faX}
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(false);
              }}
              aria-label="Close Sidebar"
            />
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block p-4 text-lg rounded-md ${
                    location.pathname === link.path
                      ? "bg-slate-800 text-teal-400"
                      : "hover:bg-slate-800"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="mt-8 space-y-4 px-4">
              <Link
                to="/SignUpPage"
                className="block w-full text-center bg-teal-600 font-semibold border border-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-300 hover:text-slate-900 transition-colors duration-300"
                onClick={() => setIsSidebarOpen(false)}
              >
                REGISTER
              </Link>

              <Link
                to="/LoginPage"
                className="block w-full text-center bg-teal-600 font-semibold border border-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-300 hover:text-slate-900 transition-colors duration-300"
                onClick={() => setIsSidebarOpen(false)}
              >
                SIGN IN
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
