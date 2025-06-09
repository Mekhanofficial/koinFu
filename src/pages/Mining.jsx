import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons";
import {
  faCoins,
  faRobot,
  faTrash,
  faBolt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

// Bot data imported from BuyBot page
const BOT_DATA = [
  { id: 1, name: "3COMMAS", botLevel: "25" },
  { id: 2, name: "CRYPTOHOPPER", botLevel: "30" },
  { id: 3, name: "TRADINGVIEW", botLevel: "20" },
  { id: 4, name: "ZIGNALY", botLevel: "28" },
  { id: 5, name: "SHRIMMPY", botLevel: "35" },
  { id: 6, name: "COINRULE", botLevel: "18" },
  { id: 7, name: "TRADEBOT", botLevel: "25" },
  { id: 8, name: "BITUNIVERSE", botLevel: "32" },
];

// Cryptocurrency config
const COIN_CONFIG = {
  BTC: {
    name: "Bitcoin",
    price: 30000,
    rate: 0.00000002,
    icon: faBitcoin,
    color: "bg-orange-500",
  },
  ETH: {
    name: "Ethereum",
    price: 2000,
    rate: 0.0000005,
    icon: faEthereum,
    color: "bg-purple-500",
  },
  LTC: {
    name: "Litecoin",
    price: 90,
    rate: 0.000005,
    icon: faCoins,
    color: "bg-gray-500",
  },
  DOGE: {
    name: "Dogecoin",
    price: 0.12,
    rate: 0.0001,
    icon: faCoins,
    color: "bg-yellow-500",
  },
  SOL: {
    name: "Solana",
    price: 160,
    rate: 0.000001,
    icon: faCoins,
    color: "bg-indigo-500",
  },
};

// Local storage hook
const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

const MiningPage = () => {
  const { theme } = useTheme();
  const [bots, setBots] = useLocalStorage("miningBots", []);
  const [newBotCrypto, setNewBotCrypto] = useState("BTC");
  const [newBotHashRate, setNewBotHashRate] = useState(1000);
  const [selectedBot, setSelectedBot] = useState(null);
  const [purchasedBots, setPurchasedBots] = useState([]);
  const [isAddingBot, setIsAddingBot] = useState(false);

  // Load purchased bots from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("purchasedBots");
    if (stored) {
      setPurchasedBots(JSON.parse(stored));
    }
  }, []);

  // Mining effect with bot boost calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setBots((prevBots) =>
        prevBots.map((bot) => {
          if (!bot.active) return bot;

          // Base mining rate
          let baseRate = bot.hashRate * (COIN_CONFIG[bot.crypto]?.rate || 0);

          // Apply boost if a bot is selected
          let multiplier = 1;
          if (selectedBot) {
            // Convert botLevel to number and calculate boost (25% for level 25)
            multiplier = 1 + parseInt(selectedBot.botLevel) / 100;
          }

          const increment = baseRate * multiplier;
          return { ...bot, earnings: (bot.earnings || 0) + increment };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [setBots, selectedBot]);

  // Add new mining bot
  const addBot = () => {
    const hashRateNum = Number(newBotHashRate);
    if (!hashRateNum || hashRateNum <= 0) return;

    const newBot = {
      id: Date.now(),
      crypto: newBotCrypto,
      hashRate: hashRateNum,
      earnings: 0,
      active: true,
      startTime: Date.now(),
    };
    setBots([...bots, newBot]);
    setNewBotHashRate(1000);
    setIsAddingBot(false);
  };

  const toggleBot = (id) => {
    setBots((prev) =>
      prev.map((bot) => (bot.id === id ? { ...bot, active: !bot.active } : bot))
    );
  };

  const deleteBot = (id) => {
    setBots((prev) => prev.filter((bot) => bot.id !== id));
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const calculateEarningsPerDay = (bot) => {
    const config = COIN_CONFIG[bot.crypto];
    const baseRate = bot.hashRate * config.rate;
    const multiplier = selectedBot
      ? 1 + parseInt(selectedBot.botLevel) / 100
      : 1;
    const daily = baseRate * 86400 * multiplier;
    return daily * config.price;
  };

  return (
    <div
      className={`min-h-screen px-4 py-12 md:px-8 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 to-gray-900"
          : "bg-gradient-to-br from-gray-50 to-blue-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
              theme === "dark"
                ? "from-cyan-400 to-blue-500"
                : "from-blue-600 to-indigo-700"
            }`}
          >
            Mining Bot Manager
          </h1>
          <p
            className={`max-w-2xl mx-auto text-lg ${
              theme === "dark" ? "text-cyan-200" : "text-blue-700"
            }`}
          >
            Maximize your crypto earnings with automated mining bots and trading
            bot synergies
          </p>
        </div>

        {/* Bot Boost Section */}
        {purchasedBots.length > 0 && (
          <div
            className={`mb-10 p-6 rounded-2xl shadow-xl backdrop-blur-sm ${
              theme === "dark"
                ? "bg-slate-800/70 border border-slate-700"
                : "bg-white/90 border border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faBolt}
                  className={`text-xl ${
                    theme === "dark" ? "text-yellow-400" : "text-yellow-500"
                  }`}
                />
                <span
                  className={
                    theme === "dark" ? "text-cyan-300" : "text-indigo-700"
                  }
                >
                  Mining Performance Boost
                </span>
              </h2>

              {selectedBot && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium">
                  <span>Active: {selectedBot.name}</span>
                  <span className="bg-black/20 px-2 py-0.5 rounded-full">
                    +{selectedBot.botLevel}% boost
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {BOT_DATA.filter((bot) => purchasedBots.includes(bot.id)).map(
                (bot) => (
                  <button
                    key={bot.id}
                    onClick={() =>
                      setSelectedBot(selectedBot?.id === bot.id ? null : bot)
                    }
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                      selectedBot?.id === bot.id
                        ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg"
                        : theme === "dark"
                        ? "bg-slate-700 hover:bg-slate-600 text-gray-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faRobot}
                      className={
                        selectedBot?.id === bot.id
                          ? "text-yellow-300"
                          : "text-blue-500"
                      }
                    />
                    <span>
                      {bot.name}{" "}
                      <span className="font-bold">Lv.{bot.botLevel}</span>
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Add Bot Section */}
        <div
          className={`mb-10 p-6 rounded-2xl shadow-xl backdrop-blur-sm ${
            theme === "dark"
              ? "bg-slate-800/70 border border-slate-700"
              : "bg-white/90 border border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span
                className={
                  theme === "dark" ? "text-cyan-300" : "text-indigo-700"
                }
              >
                Configure New Mining Bot
              </span>
            </h2>
            <button
              onClick={() => setIsAddingBot(!isAddingBot)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isAddingBot
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : theme === "dark"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white"
              }`}
            >
              {isAddingBot ? "Cancel" : "Add New Bot"}
            </button>
          </div>

          {isAddingBot && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label
                  className={`block mb-2 text-sm font-medium ${
                    theme === "dark" ? "text-cyan-200" : "text-indigo-700"
                  }`}
                >
                  Cryptocurrency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(COIN_CONFIG).map(
                    ([symbol, { name, color }]) => (
                      <button
                        key={symbol}
                        onClick={() => setNewBotCrypto(symbol)}
                        className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                          newBotCrypto === symbol
                            ? "ring-2 ring-blue-500 ring-opacity-70 transform scale-[1.02]"
                            : theme === "dark"
                            ? "bg-slate-700 hover:bg-slate-600"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}
                        >
                          <FontAwesomeIcon
                            icon={COIN_CONFIG[symbol].icon}
                            className="text-white text-lg"
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {name}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label
                  className={`block mb-2 text-sm font-medium ${
                    theme === "dark" ? "text-cyan-200" : "text-indigo-700"
                  }`}
                >
                  Hash Rate (GH/s)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={newBotHashRate}
                    onChange={(e) => setNewBotHashRate(e.target.value)}
                    className="w-full h-2 bg-gray-300 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>100 GH/s</span>
                    <span>10,000 GH/s</span>
                  </div>
                  <div
                    className={`text-center mt-4 text-2xl font-bold ${
                      theme === "dark" ? "text-cyan-400" : "text-blue-600"
                    }`}
                  >
                    {newBotHashRate} GH/s
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-cyan-200" : "text-indigo-700"
                    }`}
                  >
                    Estimated Daily Earnings
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    $
                    {calculateEarningsPerDay({
                      crypto: newBotCrypto,
                      hashRate: newBotHashRate,
                    }).toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={addBot}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-green-500/30 transition-all"
                >
                  Activate Mining Bot
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mining Bot List */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span
                className={
                  theme === "dark" ? "text-cyan-300" : "text-indigo-700"
                }
              >
                Active Mining Operations
              </span>
            </h2>
            <div
              className={`text-sm px-3 py-1 rounded-full ${
                theme === "dark"
                  ? "bg-slate-700 text-cyan-300"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {bots.filter((bot) => bot.active).length} Active
            </div>
          </div>

          {bots.length === 0 ? (
            <div
              className={`text-center py-16 rounded-2xl ${
                theme === "dark" ? "bg-slate-800/50" : "bg-white/80"
              }`}
            >
              <div className="inline-block p-6 rounded-full bg-gray-200/30 dark:bg-slate-700/50 mb-4">
                <FontAwesomeIcon
                  icon={faRobot}
                  className="text-4xl text-gray-400 dark:text-slate-500"
                />
              </div>
              <h3
                className={`text-xl font-medium mb-2 ${
                  theme === "dark" ? "text-slate-300" : "text-gray-700"
                }`}
              >
                No active mining bots
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-slate-500" : "text-gray-500"
                }`}
              >
                Add your first mining bot to start earning cryptocurrency
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bots.map((bot) => {
                const config = COIN_CONFIG[bot.crypto];
                const earningsUSD = bot.earnings * (config.price || 0);
                const runtime = Date.now() - bot.startTime;
                const runtimePercentage = Math.min(
                  100,
                  (runtime / (24 * 60 * 60 * 1000)) * 100
                ); // 24h max

                return (
                  <div
                    key={bot.id}
                    className={`rounded-2xl p-5 shadow-lg transition-all hover:shadow-xl ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
                        : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${config.color}`}
                        >
                          <FontAwesomeIcon
                            icon={config.icon}
                            className="text-white text-xl"
                          />
                        </div>
                        <div>
                          <h3
                            className={`text-lg font-bold ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {config.name} Miner
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                theme === "dark"
                                  ? "bg-slate-700 text-cyan-300"
                                  : "bg-indigo-100 text-indigo-700"
                              }`}
                            >
                              {bot.hashRate} GH/s
                            </span>
                            <FontAwesomeIcon
                              icon={faCircle}
                              className={`text-xs ${
                                bot.active ? "text-green-500" : "text-gray-500"
                              }`}
                            />
                            <span
                              className={`text-xs ${
                                theme === "dark"
                                  ? "text-slate-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {bot.active ? "Active" : "Paused"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleBot(bot.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            bot.active
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={bot.active ? faCircle : faBolt}
                            className="text-xs"
                          />
                        </button>
                        <button
                          onClick={() => deleteBot(bot.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-xs" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span
                          className={
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-gray-600"
                          }
                        >
                          Time running
                        </span>
                        <span className="font-medium">
                          {formatTime(runtime)}
                        </span>
                      </div>
                      <div
                        className={`h-2 rounded-full overflow-hidden ${
                          theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${runtimePercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          theme === "dark" ? "bg-slate-800" : "bg-indigo-50"
                        }`}
                      >
                        <div
                          className={
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-gray-600"
                          }
                        >
                          Earnings
                        </div>
                        <div className="text-lg font-bold text-green-500">
                          {bot.earnings.toFixed(6)} {bot.crypto}
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-xl ${
                          theme === "dark" ? "bg-slate-800" : "bg-indigo-50"
                        }`}
                      >
                        <div
                          className={
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-gray-600"
                          }
                        >
                          USD Value
                        </div>
                        <div className="text-lg font-bold text-green-500">
                          ${earningsUSD.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {selectedBot && bot.active && (
                      <div className="mt-4 flex items-center gap-2 text-sm bg-gradient-to-r from-green-500/20 to-emerald-600/20 p-2 rounded-lg">
                        <FontAwesomeIcon
                          icon={faBolt}
                          className="text-yellow-400"
                        />
                        <span
                          className={
                            theme === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                          }
                        >
                          {selectedBot.name} boost active (+
                          {selectedBot.botLevel}%)
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiningPage;
