import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function BalanceCard({
  theme = "light",
  borderColor = "border-gray-200",
  balance = 150975.0,
  currency = "USD",
}) {
  const [showBalance, setShowBalance] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  const formatBalance = () => {
    if (!showBalance) return "•••••••";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  };

  const gradientColors =
    theme === "dark"
      ? "from-slate-800 to-slate-900"
      : "from-slate-100 to-slate-300";

  const textColor = theme === "dark" ? "text-white" : "text-slate-800";
  const secondaryTextColor =
    theme === "dark" ? "text-slate-300" : "text-slate-600";

  const handleViewTransactions = () => {
    navigate("/transactions");
  };

  const handleAddFunds = () => {
    navigate("/deposits");
  };

  return (
    <div
      className={`bg-gradient-to-r ${gradientColors} rounded-xl p-5 lg:p-7 mb-6 shadow-lg transition-all duration-300 border ${borderColor} 
        ${isHovered ? "border-teal-500 shadow-teal-500/20 scale-[1.02]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-5">
        <h4
          className={`text-sm lg:text-base font-medium ${secondaryTextColor}`}
        >
          Available Balance
        </h4>
        <button
          onClick={toggleBalanceVisibility}
          className={`p-2 rounded-full ${
            theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"
          }`}
          aria-label={showBalance ? "Hide balance" : "Show balance"}
        >
          <FontAwesomeIcon
            icon={showBalance ? faEyeSlash : faEye}
            className={secondaryTextColor}
          />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1
          className={`text-3xl lg:text-4xl font-bold ${textColor} tracking-tight`}
        >
          {formatBalance()}
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <button
            onClick={handleViewTransactions}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <span
              className={`font-medium ${secondaryTextColor} group-hover:text-teal-400 transition-colors`}
            >
              View Transactions
            </span>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`${secondaryTextColor} group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all`}
            />
          </button>

          <button
            onClick={handleAddFunds}
            className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 font-medium shadow-md hover:shadow-teal-500/30 text-sm lg:text-base w-full sm:w-auto justify-center"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
}
