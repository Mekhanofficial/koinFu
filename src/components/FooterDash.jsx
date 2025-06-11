import { useRef, useEffect, useState } from "react";
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

// --- FooterActionWidget ---
const FooterActionWidget = ({ isOpen, onClose, centerX }) => {
  const { theme } = useTheme();

  if (!isOpen || centerX === null) return null;

  return (
    <div
      className={`fixed bottom-20 z-40 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-80 transition-all duration-300 flex gap-6`}
      style={{
        left: `${centerX}px`,
        transform: "translateX(-50%)",
        ...(theme === "dark"
          ? { backgroundColor: "rgba(30, 41, 59, 0.8)", color: "#99f6e4" }
          : { backgroundColor: "rgba(13, 148, 136, 0.9)", color: "#fff" }),
      }}
    >
      {[
        { icon: faArrowDown, label: "Deposit", path: "/deposits" },
        { icon: faArrowUp, label: "Withdraw", path: "/withdrawal" },
        { icon: faFileAlt, label: "Proof", path: "/paymentproof" },
        { icon: faDatabase, label: "Stake", path: "/stake" },
      ].map(({ icon, label, path }, index) => (
        <Link
          to={path}
          key={index}
          onClick={onClose}
          className="flex flex-col items-center hover:scale-110 transition-transform"
        >
          <FontAwesomeIcon icon={icon} className="h-5 w-5" />
          <span className="text-[11px] mt-1 font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
};

// --- FooterNavItem ---
const FooterNavItem = ({ icon, label, path }) => {
  const { theme } = useTheme();

  return (
    <Link
      to={path}
      className={`flex flex-col items-center gap-0.5 text-xs transition-all duration-150 ${
        theme === "dark"
          ? "text-slate-400 hover:text-teal-300"
          : "text-slate-600 hover:text-teal-600"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
};

// --- FooterToggleButton ---
const FooterToggleButton = ({ isWidgetOpen, onClick, buttonRef }) => {
  const { theme } = useTheme();

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      aria-label={isWidgetOpen ? "Close menu" : "Open menu"}
      className={`rounded-full p-3 shadow-md relative -top-4 transition-transform hover:scale-105 focus:outline-none
        ${
          theme === "dark"
            ? "bg-teal-700 focus:ring-2 focus:ring-teal-400"
            : "bg-teal-500 focus:ring-2 focus:ring-teal-300"
        }`}
    >
      {isWidgetOpen ? (
        <FontAwesomeIcon icon={faTimes} className="h-4 w-4 text-white" />
      ) : (
        <img
          src={dashbar}
          alt="Menu"
          className="h-4 w-4"
          style={{ filter: theme === "dark" ? "invert(1)" : "none" }}
        />
      )}
    </button>
  );
};

// --- FooterDash ---
export default function FooterDash({ isSidebarOpen }) {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [buttonCenter, setButtonCenter] = useState(null);
  const buttonRef = useRef(null);
  const { theme } = useTheme();

  const updateButtonCenter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonCenter(rect.left + rect.width / 2);
    }
  };

  useEffect(() => {
    if (isWidgetOpen) {
      updateButtonCenter();
      window.addEventListener("resize", updateButtonCenter);
    }
    return () => window.removeEventListener("resize", updateButtonCenter);
  }, [isWidgetOpen]);

  const leftNavItems = [
    { icon: faHome, label: "Home", path: "/dashboard" },
    { icon: faCoins, label: "Assets", path: "/assets" },
  ];

  const rightNavItems = [
    { icon: faExchangeAlt, label: "Trade", path: "/placetrade" },
    { icon: faReceipt, label: "Transactions", path: "/transactions" },
  ];

  return (
    <>
      <FooterActionWidget
        isOpen={isWidgetOpen}
        onClose={() => setIsWidgetOpen(false)}
        centerX={buttonCenter}
      />

      <footer
        className={`fixed bottom-0 w-full h-16 z-30 transition-all duration-200 border-t px-4
        ${isSidebarOpen ? "md:left-64 left-0" : "md:left-16 left-0"} right-0
        ${
          theme === "dark"
            ? "bg-slate-900 border-slate-700 text-slate-300"
            : "bg-white border-slate-200 text-slate-700"
        }`}
      >
        <div className="flex justify-center items-center h-full">
          <div className="flex items-center gap-x-6">
            <div className="flex gap-x-4">
              {leftNavItems.map((item, i) => (
                <FooterNavItem key={i} {...item} />
              ))}
            </div>

            <FooterToggleButton
              isWidgetOpen={isWidgetOpen}
              onClick={() => setIsWidgetOpen(!isWidgetOpen)}
              buttonRef={buttonRef}
            />

            <div className="flex gap-x-4">
              {rightNavItems.map((item, i) => (
                <FooterNavItem key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
