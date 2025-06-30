import { useState, useEffect } from "react";
import { useTransactions } from "../context/TransactionContext";
import { useTheme } from "next-themes";
import bt1 from "../pictures/bt9.avif";
import bt2 from "../pictures/bt10.avif";
import bt3 from "../pictures/bt3.jpg";
import bt4 from "../pictures/bt4.jpg";
import bt5 from "../pictures/bt5.png";
import bt6 from "../pictures/bt6.png";
import bt7 from "../pictures/bt2.jpg";
import bt8 from "../pictures/bt8.avif";

import { FaBolt, FaChartLine, FaCrown, FaCoins, FaRobot } from "react-icons/fa";

const bots = [
  {
    id: 1,
    name: "3COMMAS",
    image: bt1,
    profitRate: "25%",
    amount: "$750",
    botLevel: "25",
    winRate: "20%",
  },
  {
    id: 2,
    name: "CRYPTOHOPPER",
    image: bt2,
    profitRate: "30%",
    amount: "$1000",
    botLevel: "30",
    winRate: "25%",
  },
  {
    id: 3,
    name: "TRADINGVIEW",
    image: bt3,
    profitRate: "22%",
    amount: "$600",
    botLevel: "20",
    winRate: "18%",
  },
  {
    id: 4,
    name: "ZIGNALY",
    image: bt4,
    profitRate: "28%",
    amount: "$900",
    botLevel: "28",
    winRate: "22%",
  },
  {
    id: 5,
    name: "SHRIMMPY",
    image: bt5,
    profitRate: "35%",
    amount: "$1200",
    botLevel: "35",
    winRate: "30%",
  },
  {
    id: 6,
    name: "COINRULE",
    image: bt6,
    profitRate: "20%",
    amount: "$500",
    botLevel: "18",
    winRate: "15%",
  },
  {
    id: 7,
    name: "TRADEBOT",
    image: bt7,
    profitRate: "27%",
    amount: "$850",
    botLevel: "25",
    winRate: "20%",
  },
  {
    id: 8,
    name: "BITUNIVERSE",
    image: bt8,
    profitRate: "33%",
    amount: "$1100",
    botLevel: "32",
    winRate: "28%",
  },
];

export default function BuyBotPage() {
  const { theme } = useTheme();
  const { addTransaction } = useTransactions();
  const [purchasedBots, setPurchasedBots] = useState([]);
  const [showManager, setShowManager] = useState(false);
  const [hoveredBot, setHoveredBot] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("purchasedBots");
    if (stored) setPurchasedBots(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("purchasedBots", JSON.stringify(purchasedBots));
  }, [purchasedBots]);

  const handlePurchase = (id) => {
    const bot = bots.find((b) => b.id === id);
    if (!bot) return;

    if (!purchasedBots.includes(id)) {
      setPurchasedBots((prev) => [...prev, id]);

      // Record transaction with full bot details
      addTransaction({
        id: Date.now(),
        type: "debit",
        amount: bot.amount,
        description: `Bot purchase: ${bot.name}`,
        date: new Date().toISOString(),
        status: "completed",
        category: "bots",
        currency: "USD",
        botDetails: {
          name: bot.name,
          profitRate: bot.profitRate,
          winRate: bot.winRate,
          level: bot.botLevel,
          features: bot.features,
          description: bot.description,
        },
      });

      setSuccessMessage(`Successfully purchased ${bot.name} trading bot`);
      setShowSuccessModal(true);
    }
  };

  const handleUnsubscribe = (id) => {
    const bot = bots.find((b) => b.id === id);
    if (!bot) return;

    setPurchasedBots((prev) => prev.filter((botId) => botId !== id));

    // Record cancellation transaction
    addTransaction({
      id: Date.now(),
      type: "info",
      amount: 0,
      description: `Bot deactivated: ${bot.name}`,
      date: new Date().toISOString(),
      status: "completed",
      category: "bots",
      currency: "USD",
    });

    setSuccessMessage(`${bot.name} trading bot deactivated`);
    setShowSuccessModal(true);
  };

  const toggleManager = () => setShowManager((prev) => !prev);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-gray-50 to-slate-100"
      }`}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                theme === "dark" ? "bg-slate-800" : "bg-teal-100"
              }`}
            >
              <FaRobot
                className={`text-3xl ${
                  theme === "dark" ? "text-teal-400" : "text-teal-600"
                }`}
              />
            </div>
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
              theme === "dark"
                ? "from-teal-400 to-cyan-500"
                : "from-teal-600 to-cyan-700"
            }`}
          >
            AI Trading Bots
          </h1>

          <p
            className={`mt-4 max-w-2xl mx-auto text-xl ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Advanced algorithms that trade 24/7 to maximize your profits
          </p>

          <button
            onClick={toggleManager}
            className={`mt-8 px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg ${
              theme === "dark"
                ? "bg-gradient-to-r from-teal-600 to-slate-700 hover:from-teal-500 hover:to-slate-600 text-white"
                : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white"
            }`}
          >
            {showManager ? (
              <span>Close Manager</span>
            ) : (
              <>
                <FaRobot className="text-xl" />
                <span>Manage My Bots</span>
              </>
            )}
          </button>
        </div>

        {/* Manage Bots Panel */}
        {showManager && (
          <div
            className={`mb-16 max-w-6xl mx-auto p-6 rounded-2xl backdrop-blur-lg ${
              theme === "dark"
                ? "bg-slate-800/70 border border-slate-700"
                : "bg-white/80 border border-slate-200"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <FaCrown
                className={`${
                  theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                }`}
              />
              <span
                className={`$${
                  theme === "dark" ? "text-teal-300" : "text-teal-600"
                }`}
              >
                My Trading Fleet
              </span>
            </h2>
            {purchasedBots.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-block p-5 rounded-full bg-slate-600/30 dark:bg-slate-700/50 mb-4">
                  <FaRobot className="text-4xl text-slate-400 dark:text-slate-500" />
                </div>
                <p
                  className={`text-lg ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  No active bots. Purchase one to get started!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {bots
                  .filter((bot) => purchasedBots.includes(bot.id))
                  .map((bot) => (
                    <div
                      key={bot.id}
                      className={`p-5 rounded-xl transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-slate-700/50 hover:bg-slate-700"
                          : "bg-white hover:bg-slate-100"
                      } shadow-md`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={bot.image}
                            alt={bot.name}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-teal-400/30"
                          />
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Active
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg dark:text-white">
                            {bot.name}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full">
                            +{bot.profitRate} ROI
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnsubscribe(bot.id)}
                        className="w-full mt-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-slate-500 to-slate-600 text-white hover:from-slate-600 hover:to-slate-700 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Deactivate</span>
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Main Bot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bots.map((bot) => {
            const isPurchased = purchasedBots.includes(bot.id);
            return (
              <div
                key={bot.id}
                className={`relative rounded-3xl overflow-hidden transition duration-500 shadow-lg hover:shadow-2xl border-2
          ${
            theme === "dark"
              ? "bg-slate-900 border-teal-700 hover:border-teal-500"
              : "bg-white border-slate-200 hover:border-slate-400"
          }
        `}
                onMouseEnter={() => setHoveredBot(bot.id)}
                onMouseLeave={() => setHoveredBot(null)}
              >
                {isPurchased && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <FaBolt className="text-yellow-300" />
                      <span>ACTIVE</span>
                    </div>
                  </div>
                )}

                {/* Top Banner with bot info */}
                <div
                  className={`h-36 relative bg-gradient-to-r 
            ${
              theme === "dark"
                ? "from-teal-900 via-slate-800 to-slate-900"
                : "from-teal-100 via-slate-50 to-white"
            }`}
                >
                  <img
                    src={bot.image}
                    alt={bot.name}
                    className="absolute top-4 left-4 w-14 h-14 object-cover rounded-xl border-2 border-white/30"
                  />
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-lg font-bold text-white drop-shadow-md">
                      {bot.name}
                    </h2>
                    <div className="text-sm text-teal-300 flex items-center gap-2">
                      <FaChartLine />
                      {bot.profitRate} Profit
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Investment</span>
                    <span className="text-slate-200 font-semibold">
                      {bot.amount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Level</span>
                    <span className="text-slate-200 font-semibold">
                      {bot.botLevel}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400 mb-4">
                    <span>Win Rate</span>
                    <span className="text-green-400 font-semibold">
                      {bot.winRate}
                    </span>
                  </div>

                  {!isPurchased ? (
                    <button
                      onClick={() => handlePurchase(bot.id)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-teal-600 to-slate-700 text-white hover:from-teal-500 hover:to-slate-600 transition-all"
                    >
                      Purchase
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnsubscribe(bot.id)}
                      className="w-full py-2 rounded-xl bg-slate-600 text-white hover:bg-slate-700 transition-all"
                    >
                      Deactivate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div
            className={`rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-95 animate-scaleIn ${
              theme === "dark" ? "bg-slate-900" : "bg-white"
            } border ${
              theme === "dark" ? "border-slate-700" : "border-gray-200"
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2
                className={`text-2xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Success!
              </h2>

              <p
                className={`mb-6 px-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {successMessage}
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className={`w-full py-3 rounded-xl font-medium ${
                  theme === "dark"
                    ? "bg-teal-700 hover:bg-teal-600 text-white"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
