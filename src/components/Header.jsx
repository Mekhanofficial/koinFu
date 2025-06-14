import { useTheme } from "next-themes";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function HeaderPage({ isSidebarOpen, setIsSidebarOpen }) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "User",
          email: currentUser.email || "user@example.com",
          photoURL: currentUser.photoURL || null,
        });
      } else {
        setUser(null);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-30 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 ${
        isSidebarOpen ? "md:pl-64" : "md:pl-16"
      } pl-0 pr-4 flex justify-between items-center text-slate-900 dark:text-white`}
    >
      <div className="flex items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 rounded-full  transition"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon
            icon={faBars}
            className="h-5 w-5 text-slate-600 dark:text-slate-300"
          />
        </button>
        {currentPage && (
          <h1 className="text-xl md:text-2xl font-semibold ml-4 md:ml-6 text-dark-teal dark:text-teal-400">
            {currentPage}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full transition"
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon
            icon={theme === "dark" ? faLightbulb : faMoon}
            className="h-5 w-5 text-teal-700  hover:text-teal-400 dark:hover:text-teal-900 dark:text-teal-400"
          />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationMenuRef}>
          <button
            onClick={() => {
              setIsNotificationMenuOpen(!isNotificationMenuOpen);
              setIsUserMenuOpen(false);
            }}
            className="p-2 rounded-full transition relative"
            aria-label="Notifications"
          >
            <FontAwesomeIcon
              icon={faBell}
              className="h-5 w-5 text-slate-700 hover:text-teal-400 dark:text-slate-300 dark:hover:text-slate-800"
            />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg z-50 border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Notifications
                </h3>
              </div>
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition ${
                      !notification.read ? "bg-teal-50 dark:bg-teal-900/30" : ""
                    }`}
                  >
                    <p className="text-sm">{notification.text}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-600 text-center">
                <Link
                  to="/notifications"
                  className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsNotificationMenuOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            aria-label="User menu"
          >
            <div className="h-9 w-9 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-xl text-slate-500"
                />
              )}
            </div>
            <span className="hidden md:inline text-sm font-medium truncate max-w-[120px] text-slate-700 dark:text-slate-300">
              {user.name}
            </span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl z-50 border border-slate-200 dark:border-slate-700 overflow-hidden">
              <Link
                to="/account"
                className="block px-4 py-3 text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-3 text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Settings
              </Link>
              <Link
                to="/messages"
                className="block px-4 py-3 text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Messages
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
