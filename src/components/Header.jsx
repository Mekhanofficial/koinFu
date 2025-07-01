import { useState, useRef, useEffect, createContext, useContext } from "react";
import { useTheme } from "next-themes";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSun,
  faMoon,
  faUser,
  faCog,
  faSignOutAlt,
  faEnvelope,
  faLightbulb,
  faBell,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useTransactions } from "../context/TransactionContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const { transactions } = useTransactions();

  useEffect(() => {
    const savedNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    setNotifications(savedNotifications);
    setUnreadCount(savedNotifications.filter((n) => !n.read).length);
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (message, type = "info", data = {}) => {
    const newNotification = {
      id: Date.now(),
      text: message,
      type,
      data,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => {
      const notification = notifications.find((n) => n.id === id);
      return notification && !notification.read ? prev - 1 : prev;
    });
  };

  useEffect(() => {
    if (transactions.length > 0) {
      const latestTx = transactions[0];

      let message = "";
      switch (latestTx.type.toLowerCase()) {
        case "deposit":
          message = `Deposit of $${latestTx.amount} completed`;
          break;
        case "withdrawal":
          message = `Withdrawal of $${latestTx.amount} initiated`;
          break;
        case "subscription":
          message = `Subscription to ${latestTx.method} plan activated`;
          break;
        case "signal":
          message = `Signal service ${latestTx.signalDetails?.planName} purchased`;
          break;
        case "bot":
          message = `${latestTx.botDetails?.name} trading bot activated`;
          break;
        default:
          message = `Transaction completed: ${latestTx.description}`;
      }

      addNotification(message, "transaction", latestTx);
    }
  }, [transactions]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        showPanel,
        setShowPanel,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

export const NotificationPanel = () => {
  const {
    notifications,
    unreadCount,
    showPanel,
    setShowPanel,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();
  const { theme } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
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

      {showPanel && (
        <div
          className={`absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg z-50 border ${
            theme === "dark" ? "border-slate-700" : "border-slate-200"
          } overflow-hidden`}
        >
          <div
            className={`px-4 py-2 flex justify-between items-center ${
              theme === "dark" ? "bg-slate-700" : "bg-slate-100"
            }`}
          >
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Notifications
            </h3>
            <button
              onClick={markAllAsRead}
              className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
            >
              Mark all as read
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition ${
                    !notification.read
                      ? theme === "dark"
                        ? "bg-teal-900/30"
                        : "bg-teal-50"
                      : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm">{notification.text}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {notification.time} • {notification.date}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="ml-2 text-slate-400 hover:text-red-500"
                    >
                      <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                    </button>
                  </div>
                  {notification.type === "transaction" && (
                    <div className="mt-2 text-xs flex items-center text-teal-600 dark:text-teal-400">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                      <span>Transaction ID: {notification.data.id}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-600 text-center">
            <Link
              to="/Notification"
              className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
              onClick={() => setShowPanel(false)}
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default function HeaderPage({ isSidebarOpen, setIsSidebarOpen }) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
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
    <NotificationProvider>
      <header
        className={`fixed top-0 left-0 right-0 h-16 z-30 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 ${
          isSidebarOpen ? "md:pl-64" : "md:pl-16"
        } pl-0 pr-4 flex justify-between items-center text-slate-900 dark:text-white`}
      >
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-full transition"
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
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full transition"
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faLightbulb : faMoon}
              className="h-5 w-5 text-teal-700 hover:text-teal-400 dark:hover:text-teal-900 dark:text-teal-400"
            />
          </button>

          <NotificationPanel />

          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
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
    </NotificationProvider>
  );
}
