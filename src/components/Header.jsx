import { useTheme } from "next-themes";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faBars,
  faSun,
  faMoon,
  faUser,
  faBell,
  faCog,
  faSignOutAlt,
  faEnvelope,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

export default function HeaderPage({ isSidebarOpen, setIsSidebarOpen, user }) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target)
      ) {
        setIsNotificationMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pageTitles = {
    "/Dashboard": "Dashboard",
    "/Markets": "Markets",
    "/Mining": "Mining",
    "/Deposits": "Deposits",
    "/Account": "Account",
    "/Referrals": "Referrals",
    "/Withdrawals": "Withdrawals",
    "/EmailUpdate": "Update Email",
    "/PhotoUpdate": "Update Photo",
    "/PasswordUpdate": "Update Password",
    "/AccountSettings": "Account Settings",
    "/Logout": "Logout",
    "/Assets": "Assets",
    "/PaymentProof": "Payment Proof",
    "/transactions": "Transactions",
    "/PlaceTrade": "Place Trade",
    "/Subscription": "Subscription",
    "/MyTraders": "Copy Trade",
    "/DailySignal": "Daily Signal",
    "/BuyBots": "Buy Bots",
    "/Stake": "Stake",
    "/RealEstate": "Real Estate",
    "/MyCopytraders": "My Copy Trade",
    "/TradesRoi": "Trades/ROI",
    "/BuyCrypto": "Buy Crypto",
    "/VerifyAccount": "Verify Account",
  };

  const findCurrentPage = (path) => {
    for (const [key, value] of Object.entries(pageTitles)) {
      if (path.startsWith(key)) {
        return value;
      }
    }
    return null;
  };

  const currentPage = findCurrentPage(location.pathname);

  const notifications = [
    {
      id: 1,
      text: "Your deposit has been approved",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      text: "New trading signal available",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      text: "Account verification successful",
      time: "1 day ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-30 w-full bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-700 transition-all duration-200 ${
        isSidebarOpen ? "md:pl-64" : "md:pl-16"
      } pl-0 pr-4 flex justify-between items-center text-gray-900 dark:text-white`}
    >
      <div className="flex items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors duration-200 mr-2"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon
            icon={faBars}
            className="h-5 w-5 text-gray-700 dark:text-gray-300"
          />
        </button>
        {currentPage && (
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white ml-4 md:ml-6">
            {currentPage}
          </h1>
        )}
      </div>

      <div className="flex gap-5 items-center">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon
            icon={theme === "dark" ? faLightbulb : faMoon}
            className="h-5 w-5 text-amber-500 dark:text-amber-400"
          />
        </button>

        <div className="relative" ref={notificationMenuRef}>
          <button
            onClick={() => {
              setIsNotificationMenuOpen(!isNotificationMenuOpen);
              setIsUserMenuOpen(false);
            }}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors duration-200 relative"
            aria-label="Notifications"
          >
            <FontAwesomeIcon
              icon={faBell}
              className="h-4 w-4 text-gray-700 dark:text-gray-300"
            />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-slate-700">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer ${
                        !notification.read
                          ? "bg-blue-50 dark:bg-slate-700/50"
                          : ""
                      }`}
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {notification.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No new notifications
                    </p>
                  </div>
                )}
                <div className="px-4 py-2 border-t border-gray-200 dark:border-slate-700 text-center">
                  <Link
                    to="/notifications"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsNotificationMenuOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors duration-200"
            aria-label="User menu"
          >
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-slate-700 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="h-4 w-4 text-gray-700 dark:text-gray-300"
              />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
              {user?.name || "User"}
            </span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-slate-700">
              <div className="py-1">
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Settings
                </Link>
                <Link
                  to="/messages"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Messages
                </Link>
                <div className="border-t border-gray-200 dark:border-slate-700"></div>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
