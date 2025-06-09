import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import bt1 from "../pictures/bt1.jpeg";
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
    image: bt1,
    profitRate: "30%",
    amount: "$1000",
    botLevel: "30",
    winRate: "25%",
  },
  {
    id: 3,
    name: "TRADINGVIEW",
    image: bt1,
    profitRate: "22%",
    amount: "$600",
    botLevel: "20",
    winRate: "18%",
  },
  {
    id: 4,
    name: "ZIGNALY",
    image: bt1,
    profitRate: "28%",
    amount: "$900",
    botLevel: "28",
    winRate: "22%",
  },
  {
    id: 5,
    name: "SHRIMMPY",
    image: bt1,
    profitRate: "35%",
    amount: "$1200",
    botLevel: "35",
    winRate: "30%",
  },
  {
    id: 6,
    name: "COINRULE",
    image: bt1,
    profitRate: "20%",
    amount: "$500",
    botLevel: "18",
    winRate: "15%",
  },
  {
    id: 7,
    name: "TRADEBOT",
    image: bt1,
    profitRate: "27%",
    amount: "$850",
    botLevel: "25",
    winRate: "20%",
  },
  {
    id: 8,
    name: "BITUNIVERSE",
    image: bt1,
    profitRate: "33%",
    amount: "$1100",
    botLevel: "32",
    winRate: "28%",
  },
];

export default function BuyBotPage() {
  const { theme } = useTheme();
  const [purchasedBots, setPurchasedBots] = useState([]);
  const [showManager, setShowManager] = useState(false);
  const [hoveredBot, setHoveredBot] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("purchasedBots");
    if (stored) {
      setPurchasedBots(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("purchasedBots", JSON.stringify(purchasedBots));
  }, [purchasedBots]);

  const handlePurchase = (id) => {
    if (!purchasedBots.includes(id)) {
      setPurchasedBots((prev) => [...prev, id]);
    }
  };

  const handleUnsubscribe = (id) => {
    setPurchasedBots((prev) => prev.filter((botId) => botId !== id));
  };

  const toggleManager = () => setShowManager((prev) => !prev);

  return (
    <section
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-slate-950"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                theme === "dark" ? "bg-indigo-900" : "bg-indigo-100"
              }`}
            >
              <FaRobot
                className={`text-3xl ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              />
            </div>
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
              theme === "dark"
                ? "from-teal-400 to-indigo-400"
                : "from-teal-600 to-indigo-600"
            }`}
          >
            AI Trading Bots
          </h1>
          <p
            className={`mt-4 max-w-2xl mx-auto text-xl ${
              theme === "dark" ? "text-indigo-200" : "text-indigo-800"
            }`}
          >
            Advanced algorithms that trade 24/7 to maximize your profits
          </p>

          <button
            onClick={toggleManager}
            className={`mt-8 px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg ${
              theme === "dark"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white"
            }`}
          >
            {showManager ? (
              <>
                <span>Close Manager</span>
              </>
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
                : "bg-white/80 border border-gray-200"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <FaCrown
                className={`${
                  theme === "dark" ? "text-yellow-400" : "text-yellow-500"
                }`}
              />
              <span
                className={`${
                  theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                }`}
              >
                My Trading Fleet
              </span>
            </h2>
            {purchasedBots.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-block p-5 rounded-full bg-gray-200/30 dark:bg-slate-700/50 mb-4">
                  <FaRobot className="text-4xl text-gray-400 dark:text-slate-500" />
                </div>
                <p
                  className={`text-lg ${
                    theme === "dark" ? "text-slate-400" : "text-gray-500"
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
                          : "bg-white hover:bg-gray-50"
                      } shadow-md`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={bot.image}
                            alt={bot.name}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-500/30"
                          />
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Active
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg dark:text-white">
                            {bot.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <span className="text-xs px-2 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full">
                              +{bot.profitRate} ROI
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnsubscribe(bot.id)}
                        className="w-full mt-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all flex items-center justify-center gap-2"
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
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-slate-800 to-slate-900"
                    : "bg-gradient-to-br from-white to-gray-50"
                } shadow-xl hover:shadow-2xl border ${
                  theme === "dark"
                    ? "border-slate-700 hover:border-indigo-500/50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
                onMouseEnter={() => setHoveredBot(bot.id)}
                onMouseLeave={() => setHoveredBot(null)}
              >
                {isPurchased && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <FaBolt className="text-yellow-300" />
                      <span>ACTIVE</span>
                    </div>
                  </div>
                )}

                {/* Animated Header */}
                <div
                  className={`h-32 relative overflow-hidden transition-all duration-500 ${
                    hoveredBot === bot.id ? "h-40" : "h-32"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      theme === "dark"
                        ? "from-indigo-900/80 to-purple-900/80"
                        : "from-indigo-500/20 to-purple-500/20"
                    }`}
                  />
                  <div className="absolute top-6 left-6 w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <img
                      src={bot.image}
                      alt={bot.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-2xl font-bold text-white">
                      {bot.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <FaChartLine className="text-green-400" />
                      <span className="text-green-400 font-bold">
                        {bot.profitRate}
                      </span>
                      <span className="text-indigo-200 text-sm">
                        Avg. Profit
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                      className={`p-3 rounded-lg ${
                        theme === "dark" ? "bg-slate-800/50" : "bg-indigo-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <FaCoins
                          className={`${
                            theme === "dark"
                              ? "text-yellow-400"
                              : "text-yellow-500"
                          }`}
                        />
                        <span className="text-sm font-medium dark:text-slate-300">
                          Investment
                        </span>
                      </div>
                      <span
                        className={`font-bold ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {bot.amount}
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        theme === "dark" ? "bg-slate-800/50" : "bg-indigo-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            parseInt(bot.botLevel) > 25
                              ? "bg-green-500"
                              : "bg-orange-500"
                          }`}
                        ></div>
                        <span className="text-sm font-medium dark:text-slate-300">
                          Level
                        </span>
                      </div>
                      <span
                        className={`font-bold ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {bot.botLevel}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="dark:text-slate-400">Win Rate</span>
                      <span className="dark:text-slate-200 font-medium">
                        {bot.winRate}
                      </span>
                    </div>
                    <div
                      className={`h-2 rounded-full overflow-hidden ${
                        theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: bot.winRate }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchase(bot.id)}
                    disabled={isPurchased}
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                      isPurchased
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : theme === "dark"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-indigo-500/30"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-lg hover:shadow-indigo-400/30"
                    }`}
                  >
                    {isPurchased ? "Activated" : "Purchase Bot"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}