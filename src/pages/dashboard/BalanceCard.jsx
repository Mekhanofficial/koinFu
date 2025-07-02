import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function BalanceCard({
  theme = "light",
  borderColor = "border-gray-200",
  currency = "USD",
  isKycVerified = false,
  refreshTrigger,
}) {
  const { userData, refreshUser } = useUser();
  const [showBalance, setShowBalance] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshTrigger) {
      refreshUser();
    }
  }, [refreshTrigger, refreshUser]);

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  const formatBalance = () => {
    if (!showBalance) return "******";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(userData?.balance || 0);
  };

  const gradientColors =
    theme === "dark"
      ? "from-slate-800 to-slate-900"
      : "from-slate-400 via-slate-100 to-slate-300";

  const textColor = theme === "dark" ? "text-white" : "text-slate-800";
  const secondaryTextColor =
    theme === "dark" ? "text-slate-300" : "text-slate-600";

  const handleViewTransactions = () => navigate("/transactions");
  const handleAddFunds = () => {
    if (!isKycVerified) {
      toast.error("Complete KYC verification to add funds");
      navigate("/kyc-verification");
      return;
    }
    navigate("/deposits");
  };

  return (
    <div
      className={`bg-gradient-to-r ${gradientColors} rounded-xl p-5 lg:p-7 mb-6 shadow-lg transition-all duration-300 border ${borderColor} ${
        isHovered ? "border-teal-500 shadow-teal-500/20 scale-[1.02]" : ""
      }`}
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

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">
        <h1
          className={`text-3xl lg:text-4xl font-bold ${textColor} tracking-tight`}
        >
          {formatBalance()}
        </h1>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 w-full">
          <button
            onClick={handleViewTransactions}
            className="group flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center sm:justify-start"
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
            disabled={!isKycVerified}
            title={
              !isKycVerified
                ? "Complete KYC verification to add funds"
                : undefined
            }
            className={`${
              isKycVerified
                ? "bg-teal-500 hover:bg-teal-600 shadow-md hover:shadow-teal-500/30 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            } text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 font-medium text-sm lg:text-base w-full sm:w-auto justify-center`}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
}
