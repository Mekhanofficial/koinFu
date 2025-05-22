import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DashboardSidebar from "../constants/DashboardSidebar";
import { useTheme } from "next-themes";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { theme } = useTheme();
  const sidebarRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const showFullSidebar = isSidebarOpen || isHovered;

  const sidebarBg = theme === "dark" ? "bg-zinc-950" : "bg-gray-50";
  const headerBg = theme === "dark" ? "bg-slate-800" : "bg-gray-200";
  const hoverBg = theme === "dark" ? "hover:bg-slate-700" : "hover:bg-gray-300";
  const borderColor = theme === "dark" ? "border-slate-700" : "border-gray-200";

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 bottom-0 z-40 transition-all duration-200 ease-in-out ${
          showFullSidebar ? "w-64" : "w-16"
        } ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner Wrapper with Spacing */}
        <div className="h-full p-1.5">
          {/* Main Sidebar Content */}
          <div
            className={`h-full ${sidebarBg} ${borderColor} border shadow-xl flex flex-col rounded-r-xl overflow-hidden`}
          >
            {/* Header Section */}
            <div
              className={`flex items-center ${
                showFullSidebar
                  ? `justify-between ${headerBg}`
                  : "justify-center"
              } h-16 mx-2 mt-2 rounded-lg`}
            >
              {showFullSidebar ? (
                <h1 className="text-xl font-bold text-amber-500 dark:text-amber-600 whitespace-nowrap ml-3">
                  PRIME
                  <span className="text-amber-400 dark:text-amber-500">
                    HUB
                  </span>
                </h1>
              ) : (
                <span className="text-xl font-bold text-amber-500 dark:text-amber-600">
                  PR
                </span>
              )}
              {showFullSidebar && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`p-2 rounded-full ${hoverBg} mr-2`}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Content Section */}
            <div
              className={`flex-1 ${
                showFullSidebar ? "overflow-y-auto" : "overflow-hidden"
              } mx-2 mb-2`}
            >
              <div className="py-1">
                <DashboardSidebar isCollapsed={!showFullSidebar} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
