import { useState } from "react";
import { useTheme } from "next-themes";
import HeaderPage from "../components/Header";
import TradingViewChart from "../components/Tradingview";

export default function PlaceTradePage() {
  const { theme } = useTheme();
  const [tradeType, setTradeType] = useState("Choose Trade Type");
  const [assets, setAssets] = useState([]);

  const tradeAssets = {
    "VIP Trades": ["VIP Asset 1", "VIP Asset 2", "VIP Asset 3"],
    Crypto: ["BTC/USD", "ETH/USD", "ETM/USD"],
    Forex: ["EUR/USD", "GBP/USD", "JPY/USD"],
  };

  const handleTradeTypeChange = (e) => {
    const selectedTradeType = e.target.value;
    setTradeType(selectedTradeType);
    setAssets(tradeAssets[selectedTradeType] || []);
  };

  return (
    <>
      <section
        className={`overflow-x-hidden px-10 md:px-6 lg:px-10 py-14 ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        <div className="flex flex-col lg:flex-row min-h-screen gap-4">
          {/* Main Chart Content */}
          <div className="w-full lg:w-2/3 flex flex-col text-center">
            <TradingViewChart
              symbol="BTC/USD"
              interval="60"
              width="100%"
              height={400}
            />
          </div>

          {/* Trade Form */}
          <div
            className={`w-full lg:w-1/3 p-5 rounded-lg shadow-lg border ${
              theme === "dark"
                ? "bg-slate-900 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-left mb-5 font-bold text-lg ${
                theme === "dark" ? "text-yellow-500" : "text-yellow-600"
              }`}
            >
              PLACE TRADE
            </h2>
            <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2">
              <button
                className={`px-4 py-2 w-full sm:w-1/2 rounded-lg ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-500 hover:bg-blue-400 text-white"
                } transition-colors`}
              >
                BUY
              </button>
              <button
                className={`px-4 py-2 w-full sm:w-1/2 rounded-lg ${
                  theme === "dark"
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-red-500 hover:bg-red-400 text-white"
                } transition-colors`}
              >
                SELL
              </button>
            </div>
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Type
              </label>
              <select
                className={`w-full p-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } border`}
                value={tradeType}
                onChange={handleTradeTypeChange}
              >
                <option>Choose Trade Type</option>
                <option>VIP Trades</option>
                <option>Crypto</option>
                <option>Forex</option>
              </select>

              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Assets
              </label>
              <select
                className={`w-full p-1 rounded-lg ${
                  theme === "dark"
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } border`}
              >
                {assets.length > 0 ? (
                  assets.map((asset, index) => (
                    <option key={index} value={asset}>
                      {asset}
                    </option>
                  ))
                ) : (
                  <option>Select a trade type first</option>
                )}
              </select>

              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Amount
              </label>
              <input
                type="text"
                className={`w-full p-1 rounded-lg ${
                  theme === "dark"
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } border`}
                placeholder="500"
              />

              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Lot Size
              </label>
              <select
                className={`w-full p-1 rounded-lg ${
                  theme === "dark"
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } border`}
              >
                <option>2 LS</option>
                <option>5 LS</option>
                <option>10 LS</option>
                <option>15 LS</option>
              </select>

              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Take Profit
              </label>
              <input
                type="text"
                className={`w-full p-1 rounded-lg ${
                  theme === "dark"
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } border`}
                placeholder="1.0013"
              />

              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Stop Loss
              </label>
              <input
                type="text"
                className={`w-full p-1 rounded-lg ${
                  theme === "dark"
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } border`}
                placeholder="1.0013"
              />

              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Duration
              </label>
              <select
                className={`w-full p-1 rounded-lg ${
                  theme === "dark"
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } border`}
              >
                <option>5 Minutes</option>
                <option>10 Minutes</option>
                <option>15 Minutes</option>
                <option>30 Minutes</option>
              </select>
            </div>

            <div
              className={`mt-4 mb-2 rounded-md p-4 text-sm ${
                theme === "dark"
                  ? "bg-red-900/50 text-gray-300"
                  : "bg-red-100 text-red-800"
              }`}
            >
              Your trade will auto close if SL or TP does not hit.
            </div>

            <button
              className={`mt-2 w-full py-2 rounded-lg font-semibold transition-colors ${
                theme === "dark"
                  ? "bg-gradient-to-r from-teal-600 to-teal-800 text-white hover:from-teal-500 hover:to-teal-700"
                  : "bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:from-teal-300 hover:to-teal-500"
              }`}
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Recent Trades Section */}
        <div
          className={`font-semibold rounded-md p-5 my-4 border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 text-white"
              : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/50 text-gray-800"
          } hover:scale-[1.01]`}
        >
          <h1
            className={`font-semibold text-xl mb-6 text-center lg:text-left ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Recent Trades
          </h1>

          {/* Horizontal Scroll Wrapper */}
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <div
                className={`flex justify-between items-center border-b pb-2 ${
                  theme === "dark"
                    ? "text-gray-400 border-gray-700"
                    : "text-gray-500 border-gray-200"
                }`}
              >
                <h2 className="px-4">ID</h2>
                <h2 className="px-4">Type</h2>
                <div className="flex items-center gap-8 lg:gap-16 px-4">
                  <h2>Trade Time</h2>
                  <h2>Amount</h2>
                </div>
                <h2 className="px-4">Pair</h2>
                <div className="flex items-center gap-8 lg:gap-16 px-4">
                  <h2>Action</h2>
                  <h2>Entry</h2>
                  <h2>SL</h2>
                  <h2>TP</h2>
                  <h2>Time in Force</h2>
                  <h2>Result</h2>
                  <h2>Details</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <h1
            className={`text-2xl text-center mt-10 font-bold ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            You haven't placed any trades.
          </h1>
        </div>
      </section>
    </>
  );
}
