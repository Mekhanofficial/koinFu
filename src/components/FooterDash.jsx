import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faExchangeAlt,
  faReceipt,
  faCoins,
  faTimes,
  faArrowDown,
  faArrowUp,
  faFileAlt,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import dashbar from "../pictures/dashbar.png";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

const FooterActionWidget = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const actions = [
    { icon: faArrowDown, label: "Deposit", path: "/deposits" },
    { icon: faArrowUp, label: "Withdraw", path: "/withdrawal" },
    { icon: faFileAlt, label: "Proof", path: "/paymentproof" },
    { icon: faDatabase, label: "Stake", path: "/stake" },
  ];

  return (
    <div
      className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 rounded-xl px-3 py-2 flex gap-3 z-30 shadow-lg ${
        theme === "dark"
          ? "bg-slate-800 text-white"
          : "bg-teal-500 text-white"
      }`}
    >
      {actions.map((action, index) => (
        <Link
          to={action.path}
          key={index}
          className={`flex flex-col items-center hover:scale-105 transition-transform min-w-[60px] ${
            theme === "dark" ? "hover:text-teal-300" : "hover:text-amber-100"
          }`}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={action.icon} className="h-4 w-4" />
          <span className="text-xs mt-1">{action.label}</span>
        </Link>
      ))}
    </div>
  );
};

const FooterNavItem = ({ icon, label, path }) => {
  const { theme } = useTheme();

  return (
    <Link
      to={path}
      className={`flex flex-col items-center transition-colors min-w-[50px] ${
        theme === "dark"
          ? "text-gray-400 hover:text-teal-400"
          : "text-gray-600 hover:text-teal-500"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

const FooterToggleButton = ({ isWidgetOpen, onClick }) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`rounded-full p-2 relative -top-4 z-30 transition-transform hover:scale-105 focus:outline-none ${
        theme === "dark"
          ? "bg-teal-700 focus:ring-teal-500"
          : "bg-teal-600 focus:ring-teal-400"
      } focus:ring-2`}
      aria-label={isWidgetOpen ? "Close menu" : "Open menu"}
    >
      {isWidgetOpen ? (
        <FontAwesomeIcon icon={faTimes} className="h-3 w-3 text-white" />
      ) : (
        <img
          src={dashbar}
          className="h-4 w-4"
          alt="Menu"
          style={{ filter: theme === "dark" ? "invert(1)" : "none" }}
        />
      )}
    </button>
  );
};

export default function FooterDash({ isSidebarOpen }) {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const { theme } = useTheme();

  const leftNavItems = [
    { icon: faHome, label: "Home", path: "/" },
    { icon: faCoins, label: "Assets", path: "/assets" },
  ];

  const rightNavItems = [
    { icon: faExchangeAlt, label: "Trade", path: "/trade" },
    { icon: faReceipt, label: "Transactions", path: "/transactions" },
  ];

  return (
    <>
      <FooterActionWidget
        isOpen={isWidgetOpen}
        onClose={() => setIsWidgetOpen(false)}
      />

      <footer
        className={`fixed bottom-0 h-14 z-20 transition-all duration-200 ${
          isSidebarOpen ? "md:left-64 left-0" : "md:left-16 left-0"
        } right-0 ${
          theme === "dark"
            ? "bg-slate-900 text-gray-300 border-slate-700"
            : "bg-white text-gray-700 border-gray-200"
        } border-t`}
      >
        <div className="flex justify-center items-center h-full px-2">
          <div className="flex justify-between items-center w-full max-w-xs">
            <div className="flex gap-2">
              {leftNavItems.map((item, index) => (
                <FooterNavItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                />
              ))}
            </div>

            <FooterToggleButton
              isWidgetOpen={isWidgetOpen}
              onClick={() => setIsWidgetOpen(!isWidgetOpen)}
            />

            <div className="flex gap-2">
              {rightNavItems.map((item, index) => (
                <FooterNavItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
