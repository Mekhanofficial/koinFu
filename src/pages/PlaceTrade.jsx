import { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import TradingViewChart from "../components/Tradingview";

// Trade form component
const TradeForm = ({ theme, tradeType, setTradeType, assets }) => {
  const tradeAssets = {
    "VIP Trades": ["VIP Asset 1", "VIP Asset 2", "VIP Asset 3"],
    Crypto: ["BTC/USD", "ETH/USD", "ETM/USD"],
    Forex: ["EUR/USD", "GBP/USD", "JPY/USD"],
  };

  const handleTradeTypeChange = (e) => {
    const selectedTradeType = e.target.value;
    setTradeType(selectedTradeType);
  };

  const currentAssets = useMemo(
    () => tradeAssets[tradeType] || [],
    [tradeType]
  );

  return (
    <div
      className={`w-full max-w-full lg:w-1/3 p-4 sm:p-6 rounded-xl shadow-lg border transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-900 border-gray-800 hover:border-teal-500"
          : "bg-white border-gray-200 hover:border-teal-400"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-xl font-bold ${
            theme === "dark" ? "text-teal-400" : "text-teal-600"
          }`}
        >
          PLACE TRADE
        </h2>
        <div className="flex space-x-2">
          <span
            className={`px-2 py-1 text-xs rounded ${
              theme === "dark"
                ? "bg-slate-800 text-gray-400"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            LIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          className={`py-3 rounded-xl font-medium transition-all ${
            theme === "dark"
              ? "bg-emerald-700 hover:bg-emerald-600 text-white"
              : "bg-emerald-500 hover:bg-emerald-400 text-white"
          } shadow-md hover:shadow-lg`}
        >
          BUY
        </button>
        <button
          className={`py-3 rounded-xl font-medium transition-all ${
            theme === "dark"
              ? "bg-rose-700 hover:bg-rose-600 text-white"
              : "bg-rose-500 hover:bg-rose-400 text-white"
          } shadow-md hover:shadow-lg`}
        >
          SELL
        </button>
      </div>

      <div className="space-y-4">
        <FormField theme={theme} label="Type" id="trade-type">
          <select
            id="trade-type"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-slate-800 text-white border-gray-700 focus:border-teal-500"
                : "bg-gray-50 text-gray-900 border-gray-200 focus:border-teal-400"
            } border focus:ring-2 focus:ring-teal-500/30`}
            value={tradeType}
            onChange={handleTradeTypeChange}
          >
            <option>Choose Trade Type</option>
            <option>VIP Trades</option>
            <option>Crypto</option>
            <option>Forex</option>
          </select>
        </FormField>

        <FormField theme={theme} label="Assets" id="assets">
          <select
            id="assets"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-slate-800 text-white border-gray-700 focus:border-teal-500"
                : "bg-gray-50 text-gray-900 border-gray-200 focus:border-teal-400"
            } border focus:ring-2 focus:ring-teal-500/30`}
          >
            {currentAssets.length > 0 ? (
              currentAssets.map((asset, index) => (
                <option key={index} value={asset}>
                  {asset}
                </option>
              ))
            ) : (
              <option>Select a trade type first</option>
            )}
          </select>
        </FormField>

        <FormField theme={theme} label="Amount" id="amount">
          <div className="relative">
            <input
              id="amount"
              type="number"
              className={`w-full p-3 rounded-lg ${
                theme === "dark"
                  ? "bg-slate-800 text-white border-gray-700 focus:border-teal-500"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-teal-400"
              } border focus:ring-2 focus:ring-teal-500/30`}
              placeholder="500"
            />
            <span className="absolute right-3 top-3 text-gray-500">USD</span>
          </div>
        </FormField>

        <FormField theme={theme} label="Lot Size" id="lot-size">
          <select
            id="lot-size"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-slate-800 text-white border-gray-700 focus:border-teal-500"
                : "bg-gray-50 text-gray-900 border-gray-200 focus:border-teal-400"
            } border focus:ring-2 focus:ring-teal-500/30`}
          >
            <option>2 LS</option>
            <option>5 LS</option>
            <option>10 LS</option>
            <option>15 LS</option>
          </select>
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField theme={theme} label="Take Profit" id="take-profit">
            <input
              id="take-profit"
              type="text"
              className={`w-full p-3 rounded-lg ${
                theme === "dark"
                  ? "bg-slate-800 text-white border-gray-700 focus:border-teal-500"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-teal-400"
              } border focus:ring-2 focus:ring-teal-500/30`}
              placeholder="1.0013"
            />
          </FormField>

          <FormField theme={theme} label="Stop Loss" id="stop-loss">
            <input
              id="stop-loss"
              type="text"
              className={`w-full p-3 rounded-lg ${
                theme === "dark"
                  ? "bg-slate-800 text-white border-gray-700 focus:border-teal-500"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-teal-400"
              } border focus:ring-2 focus:ring-teal-500/30`}
              placeholder="1.0013"
            />
          </FormField>
        </div>

        <FormField theme={theme} label="Duration" id="duration">
          <select
            id="duration"
            className={`w-full p-3 rounded-lg ${
              theme === "dark"
                ? "bg-slate-800 text-white border-gray-700 focus:border-teal-500"
                : "bg-gray-50 text-gray-900 border-gray-200 focus:border-teal-400"
            } border focus:ring-2 focus:ring-teal-500/30`}
          >
            <option>5 Minutes</option>
            <option>10 Minutes</option>
            <option>15 Minutes</option>
            <option>30 Minutes</option>
          </select>
        </FormField>
      </div>

      <div
        className={`mt-6 mb-4 rounded-lg p-3 text-center text-sm ${
          theme === "dark"
            ? "bg-amber-900/30 text-amber-200"
            : "bg-amber-100 text-amber-800"
        }`}
      >
        Your trade will auto close if SL or TP does not hit
      </div>

      <button
        className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-lg ${
          theme === "dark"
            ? "bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600"
            : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"
        } text-white hover:shadow-xl`}
      >
        PLACE ORDER
      </button>
    </div>
  );
};

// Reusable form field component
const FormField = ({ theme, label, id, children }) => (
  <div>
    <label
      htmlFor={id}
      className={`block mb-2 text-sm font-medium ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {label}
    </label>
    {children}
  </div>
);

// Recent trades component
const RecentTrades = ({ theme }) => {
  const columns = [
    "ID",
    "Type",
    "Trade Time",
    "Amount",
    "Pair",
    "Action",
    "Entry",
    "SL",
    "TP",
    "Time in Force",
    "Result",
    "Details",
  ];

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 my-6 border transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-900 border-gray-800 hover:border-teal-500"
          : "bg-white border-gray-200 hover:border-teal-400"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1
          className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Recent Trades
        </h1>
        <div className="flex space-x-3 mt-2 md:mt-0">
          <button
            className={`px-4 py-2 rounded-lg text-sm ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            History
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  theme === "dark" ? "border-gray-800" : "border-gray-200"
                }`}
              >
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`p-3 text-left text-xs font-medium ${
                      theme === "dark" ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={12} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className={`w-16 h-16 mb-4 ${
                        theme === "dark" ? "text-gray-700" : "text-gray-300"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <h3
                      className={`text-lg font-medium ${
                        theme === "dark" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      No trades yet
                    </h3>
                    <p
                      className={`mt-1 text-sm ${
                        theme === "dark" ? "text-gray-700" : "text-gray-500"
                      }`}
                    >
                      Your trade history will appear here
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main page component
export default function PlaceTradePage() {
  const { theme } = useTheme();
  const [tradeType, setTradeType] = useState("Choose Trade Type");

  return (
    <section
      className={`px-4 sm:px-6 md:px-10 py-10 sm:py-14 min-h-screen w-full overflow-x-hidden ${
        theme === "dark" ? "bg-slate-950" : "bg-gray-50"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
        {/* Chart Section */}
        <div className="w-full max-w-full lg:w-2/3">
          <div
            className={`rounded-xl p-4 mb-6 ${
              theme === "dark" ? "bg-slate-900" : "bg-white"
            } shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2
                className={`font-bold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                BTC/USD Chart
              </h2>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded-lg text-sm ${
                    theme === "dark"
                      ? "bg-slate-800 text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  1H
                </button>
                <button
                  className={`px-3 py-1 rounded-lg text-sm ${
                    theme === "dark"
                      ? "bg-teal-900/50 text-teal-400"
                      : "bg-teal-100 text-teal-700"
                  }`}
                >
                  4H
                </button>
                <button
                  className={`px-3 py-1 rounded-lg text-sm ${
                    theme === "dark"
                      ? "bg-slate-800 text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  1D
                </button>
              </div>
            </div>
            <TradingViewChart
              symbol="BTC/USD"
              interval="60"
              width="100%"
              height={500}
            />
          </div>
        </div>

        {/* Trade Form */}
        <TradeForm
          theme={theme}
          tradeType={tradeType}
          setTradeType={setTradeType}
        />
      </div>

      {/* Recent Trades */}
      <RecentTrades theme={theme} />
    </section>
  );
}
