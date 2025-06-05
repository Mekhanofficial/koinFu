import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faWallet,
  faCoins,
  faPlus,
  faEye,
  faArrowDown,
  faArrowUp,
  faExchangeAlt,
  faHistory,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { auth } from "../../firebase";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import Layout from "../components/Layout";

const data = [
  { value: 10 },
  { value: 0 },
  { value: 100 },
  { value: 30 },
  { value: 88 },
  { value: 15 },
  { value: 115 },
  { value: 40 },
  { value: 65 },
];

const abbreviateVolume = (volume) => {
  if (volume >= 1_000_000_000) {
    return `$${(volume / 1_000_000_000).toFixed(1)}B`;
  } else if (volume >= 1_000_000) {
    return `$${(volume / 1_000_000).toFixed(1)}M`;
  } else if (volume >= 1_000) {
    return `$${(volume / 1_000).toFixed(1)}K`;
  } else {
    return `$${volume.toLocaleString()}`;
  }
};

export default function DashPage() {
  const { theme } = useTheme();
  const [hoverIndex, setHoverIndex] = useState(null);
  const tradeVolumes = [3, 7, 5, 9, 6, 8, 4, 10, 2, 7];

  const actions = [
    { icon: faArrowDown, label: "DEPOSIT", color: "text-green-400" },
    { icon: faArrowUp, label: "WITHDRAW", color: "text-red-400" },
    { icon: faExchangeAlt, label: "TRADE", color: "text-blue-400" },
    { icon: faHistory, label: "HISTORY", color: "text-yellow-400" },
  ];

  const [cryptoData, setCryptoData] = useState([]);
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
      });
    }
  }, []);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,ethereum,tether,ripple,binancecoin,solana,usd-coin,cardano,dogecoin,uniswap,litecoin,chainlink",
              order: "market_cap_desc",
              per_page: 22,
              page: 1,
              sparkline: false,
            },
          }
        );

        const formattedData = response.data.map((crypto) => ({
          name: crypto.name,
          symbol: crypto.symbol.toUpperCase(),
          price: `$${crypto.current_price.toLocaleString()}`,
          change: `${crypto.price_change_percentage_24h.toFixed(2)}%`,
          volume: abbreviateVolume(crypto.total_volume),
          image: crypto.image,
        }));

        setCryptoData(formattedData);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  const bgColor = theme === "dark" ? "bg-zinc-950" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-slate-900" : "bg-white";
  const borderColor = theme === "dark" ? "border-slate-700" : "border-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const secondaryText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <Layout user={user}>
      <section
        className={`flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-white p- lg:p-8 overflow-x-hidden`}
      > 
        <div className="w-full lg:w-1/2 lg:pr-4">
          <div
            className={`bg-gradient-to-r ${
              theme === "dark"
                ? "from-teal-700 to-teal-950"
                : "from-teal-500 to-teal-700"
            } border-2 ${borderColor} rounded-lg p-4 lg:p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hidden lg:block`}
          >
            <h1 className="text-xl lg:text-2xl font-bold mb-2">
              Welcome{" "}
              <span className="truncate max-w-[180px] inline-block align-bottom">
                {user.name}
              </span>{" "}
              to koinfu!
            </h1>
            <p className={`text-sm lg:text-base ${secondaryText} mb-4`}>
              Your gateway to the exciting world of cryptocurrency trading.
            </p>
            <button
              className={`${
                theme === "dark"
                  ? "bg-gray-300 hover:bg-teal-600 hover:text-black text-teal-600"
                  : "bg-white hover:bg-teal-600 text-teal-700"
              } px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 text-sm lg:text-base`}
            >
              <FontAwesomeIcon icon={faBitcoin} />
              Crypto Update
            </button>
          </div>

          {/* Balance Card */}
          <div
            className={`bg-gradient-to-r ${
              theme === "dark"
                ? "from-slate-700 to-slate-950"
                : "from-slate-200 to-slate-400"
            } rounded-lg p-4 lg:p-6 mb-6 shadow-lg hover:shadow-lg transition-all duration-300 border ${borderColor} hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105`}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base lg:text-lg font-semibold">
                Available Balance:
              </h4>
              <FontAwesomeIcon icon={faEye} className="cursor-pointer" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl lg:text-3xl font-bold">$150,975.00</h1>
              <div className="flex items-center gap-3">
                <h3 className="text-sm lg:text-base">Transactions</h3>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="cursor-pointer h-3"
                />
              </div>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 text-sm lg:text-base">
                <FontAwesomeIcon icon={faPlus} />
                Add Funds
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className={`bg-gradient-to-r ${
              theme === "dark"
                ? "from-slate-700 to-slate-950"
                : "from-slate-200 to-slate-400"
            } rounded-lg p-4 lg:p-6 mb-6 shadow-lg hover:shadow-lg transition-all duration-300 border ${borderColor} hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {actions.map((action, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`p-3 lg:p-4 rounded-full inline-block mb-2 ${
                      theme === "dark" ? "bg-slate-950" : "bg-gray-100"
                    } ${action.color} transition-all duration-300 relative`}
                  >
                    <FontAwesomeIcon
                      icon={action.icon}
                      className={`h-5 lg:h-6 ${action.color}`}
                    />
                  </div>
                  <h3 className="text-xs font-bold dark:text-teal-500 text-teal-800">
                    {action.label}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "0 Live", value: "$0.00", icon: faChartLine },
              { label: "Last Profit", value: "$0.00", icon: faCoins },
              { label: "Capital", value: "$0.00", icon: faWallet },
              { label: "Rewards", value: "$0.00", icon: faCoins },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-slate-700 to-slate-950"
                    : "from-slate-200 to-slate-400"
                } rounded-lg p-4 lg:p-6 shadow-lg hover:shadow-lg transition-all duration-300 border ${borderColor} hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-teal-600 p-2 lg:p-3 rounded-full">
                    <FontAwesomeIcon icon={stat.icon} className="h-4 lg:h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold">
                      {stat.value}
                    </h3>
                    <p className={`text-xs lg:text-sm ${secondaryText}`}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trade Volumes and Chart */}
          <div className="flex flex-col sm:flex-row gap-4 mt-5">
            <div
              className={`${
                theme === "dark" ? "bg-[#1A1D2E]" : "bg-gray-200"
              } p-4 lg:p-5 rounded-xl flex-1 flex gap-6 lg:gap-10 items-center hover:shadow-lg transition-all duration-300 border ${borderColor} hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105 h-[100px] lg:h-[120px]`}
            >
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold">
                  {tradeVolumes.reduce((a, b) => a + b, 0)}
                </span>
                <span className={`text-sm lg:text-lg ${secondaryText}`}>
                  Trades
                </span>
              </div>
              <div className="flex mt-2 gap-1">
                {tradeVolumes.map((height, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 relative justify-end"
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {[...Array(height)].map((_, j) => (
                      <div
                        key={j}
                        className={`w-2 lg:w-3 h-1 rounded-sm ${
                          j % 2 === 0
                            ? "bg-green-500 glow"
                            : theme === "dark"
                            ? "bg-gray-400 glowup"
                            : "bg-gray-500 glowup"
                        }`}
                      ></div>
                    ))}
                    {hoverIndex === i && (
                      <div
                        className={`absolute bottom-full mb-2 ${
                          theme === "dark" ? "bg-black" : "bg-white"
                        } ${textColor} text-xs px-2 py-1 rounded-md shadow-md`}
                      >
                        {`Trade ${i + 1}: ${height} orders`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${
                theme === "dark" ? "bg-slate-900" : "bg-gray-200"
              } p-4 flex items-center rounded-xl shadow-lg flex-1 hover:shadow-lg transition-all duration-300 border ${borderColor} hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105 h-[100px] lg:h-[120px]`}
            >
              <div>
                <p className={`text-sm lg:text-md font-bold ${secondaryText}`}>
                  0
                </p>
                <p
                  className={`text-lg lg:text-xl font-bold ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Total
                </p>
                <p
                  className={`text-xs lg:text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Won
                </p>
              </div>
              <ResponsiveContainer height={60} width="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#00c8ff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 lg:pl-4">
          {/* Trade Progress */}
          <div
            className={`bg-gradient-to-r ${
              theme === "dark"
                ? "from-slate-700 to-slate-950"
                : "from-slate-200 to-slate-400"
            } rounded-lg p-4 lg:p-6 mb-6 shadow-lg hover:shadow-lg transition-all duration-300 border ${borderColor} hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105`}
          >
            <h2 className="text-xl lg:text-2xl font-bold mb-4">
              Trade Progress
            </h2>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl lg:text-4xl font-bold">0%</h3>
              <div className="w-3/4 h-2 bg-teal-600 rounded-full">
                <div
                  className="h-2 bg-teal-400 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Verify Account */}
          <button
            className={`w-full bg-gradient-to-r ${
              theme === "dark"
                ? "from-teal-950 to-teal-700"
                : "from-teal-600 to-teal-800"
            } text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300 shadow-lg mb-6 hover:shadow-xl text-sm lg:text-base`}
          >
            VERIFY ACCOUNT
          </button>

          {/* Crypto Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
            {cryptoData.map((crypto, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-slate-800 to-slate-900"
                    : "from-gray-100 to-gray-200"
                } rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border ${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                } hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105 flex items-center`}
              >
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-8 h-8 lg:w-10 lg:h-10 mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs lg:text-sm ${secondaryText} font-medium`}
                    >
                      {crypto.name}
                    </span>
                    <span
                      className={`text-xs lg:text-sm font-semibold ${
                        crypto.change.startsWith("-")
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {crypto.change}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <h2 className={`text-sm lg:text-lg font-bold ${textColor}`}>
                      {crypto.price}
                    </h2>
                    <span className={`text-xs lg:text-sm ${secondaryText}`}>
                      Vol: {crypto.volume}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
