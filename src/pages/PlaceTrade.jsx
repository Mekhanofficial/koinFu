import { useState } from "react";
import { useTheme } from "next-themes";
import HeaderPage from "../components/Header";
import TradingViewChart from "../components/Tradingview";

export default function PlaceTradePage() {
  const { theme } = useTheme();
  const [tradeType, setTradeType] = useState("");
  const [assets, setAssets] = useState([]);
  const [activeTab, setActiveTab] = useState("buy");
  const [amount, setAmount] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");

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

  // Format currency input
  const formatCurrency = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <section
        className={`min-h-screen px-4 sm:px-6 lg:px-8 py-6 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-2xl font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Trading Dashboard
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Chart Area - 70% width on large screens */}
            <div className="w-full lg:w-[70%]">
              <div className={`rounded-xl shadow-sm p-4 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>BTC/USD</span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      theme === "dark" ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
                    }`}>+2.4%</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`px-3 py-1 text-sm rounded-lg ${
                      theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                    }`}>1H</button>
                    <button className={`px-3 py-1 text-sm rounded-lg ${
                      theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                    }`}>4H</button>
                    <button className={`px-3 py-1 text-sm rounded-lg ${
                      theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                    }`}>1D</button>
                    <button className={`px-3 py-1 text-sm rounded-lg ${
                      theme === "dark" ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-400"
                    } text-white`}>1W</button>
                  </div>
                </div>
                <TradingViewChart
                  symbol="BTC/USD"
                  interval="60"
                  width="100%"
                  height={500}
                />
              </div>
              
              {/* Market Data Section */}
              <div className={`mt-6 rounded-xl shadow-sm p-4 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>Market Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['BTC/USD', 'ETH/USD', 'EUR/USD', 'XAU/USD'].map((pair) => (
                    <div key={pair} className={`p-3 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>{pair}</span>
                        <span className={`text-sm ${
                          pair.includes('BTC') ? 
                            (theme === "dark" ? "text-green-400" : "text-green-600") : 
                            (theme === "dark" ? "text-red-400" : "text-red-600")
                        }`}>
                          {pair.includes('BTC') ? '+2.4%' : '-0.8%'}
                        </span>
                      </div>
                      <div className={`text-xl font-bold mt-1 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {pair.includes('BTC') ? '$42,850.30' : pair.includes('ETH') ? '$2,350.10' : pair.includes('EUR') ? '1.0854' : '1,987.50'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Trade Panel - 30% width on large screens */}
            <div className="w-full lg:w-[30%]">
              <div className={`rounded-xl shadow-sm overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}>
                {/* Buy/Sell Tabs */}
                <div className={`flex border-b ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}>
                  <button
                    onClick={() => setActiveTab("buy")}
                    className={`flex-1 py-3 font-medium text-center ${
                      activeTab === "buy" ? 
                        (theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-white") : 
                        (theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100")
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setActiveTab("sell")}
                    className={`flex-1 py-3 font-medium text-center ${
                      activeTab === "sell" ? 
                        (theme === "dark" ? "bg-red-600 text-white" : "bg-red-500 text-white") : 
                        (theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100")
                    }`}
                  >
                    Sell
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>Place Order</h3>
                  
                  {/* Trade Form */}
                  <div className="space-y-4">
                    {/* Trade Type */}
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        Trade Type
                      </label>
                      <select
                        className={`w-full p-3 rounded-lg text-sm ${
                          theme === "dark" ? 
                            "bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" : 
                            "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        } border`}
                        value={tradeType}
                        onChange={handleTradeTypeChange}
                      >
                        <option value="">Select trade type</option>
                        <option>VIP Trades</option>
                        <option>Crypto</option>
                        <option>Forex</option>
                      </select>
                    </div>
                    
                    {/* Asset */}
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        Asset
                      </label>
                      <select
                        className={`w-full p-3 rounded-lg text-sm ${
                          theme === "dark" ? 
                            "bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" : 
                            "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        } border`}
                        disabled={!tradeType}
                      >
                        {assets.length > 0 ? (
                          assets.map((asset, index) => (
                            <option key={index} value={asset}>
                              {asset}
                            </option>
                          ))
                        ) : (
                          <option>Select trade type first</option>
                        )}
                      </select>
                    </div>
                    
                    {/* Amount */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className={`block text-sm font-medium ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                          Amount
                        </label>
                        <span className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>Balance: $5,430.00</span>
                      </div>
                      <div className="relative">
                        <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>$</span>
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(formatCurrency(e.target.value))}
                          className={`w-full p-3 pl-8 rounded-lg text-sm ${
                            theme === "dark" ? 
                              "bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" : 
                              "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          } border`}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    {/* Lot Size */}
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        Lot Size
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[2, 5, 10, 15].map((size) => (
                          <button
                            key={size}
                            className={`py-2 rounded-lg text-sm ${
                              theme === "dark" ? 
                                "bg-gray-700 hover:bg-gray-600 text-white" : 
                                "bg-gray-100 hover:bg-gray-200 text-gray-800"
                            }`}
                          >
                            {size} LS
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Take Profit & Stop Loss */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                          Take Profit
                        </label>
                        <input
                          type="text"
                          value={takeProfit}
                          onChange={(e) => setTakeProfit(e.target.value)}
                          className={`w-full p-3 rounded-lg text-sm ${
                            theme === "dark" ? 
                              "bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" : 
                              "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          } border`}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                          Stop Loss
                        </label>
                        <input
                          type="text"
                          value={stopLoss}
                          onChange={(e) => setStopLoss(e.target.value)}
                          className={`w-full p-3 rounded-lg text-sm ${
                            theme === "dark" ? 
                              "bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" : 
                              "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          } border`}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    {/* Duration */}
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        Duration
                      </label>
                      <select
                        className={`w-full p-3 rounded-lg text-sm ${
                          theme === "dark" ? 
                            "bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500" : 
                            "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        } border`}
                      >
                        <option>5 Minutes</option>
                        <option>10 Minutes</option>
                        <option>15 Minutes</option>
                        <option>30 Minutes</option>
                      </select>
                    </div>
                    
                    {/* Summary */}
                    <div className={`p-3 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    }`}>
                      <div className="flex justify-between py-1">
                        <span className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>Estimated Profit</span>
                        <span className={`font-medium ${
                          theme === "dark" ? "text-green-400" : "text-green-600"
                        }`}>+$125.00</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>Potential Loss</span>
                        <span className={`font-medium ${
                          theme === "dark" ? "text-red-400" : "text-red-600"
                        }`}>-$75.00</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>Risk/Reward</span>
                        <span className={`font-medium ${
                          theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                        }`}>1:1.67</span>
                      </div>
                    </div>
                    
                    {/* Warning */}
                    <div className={`p-3 rounded-lg text-sm ${
                      theme === "dark" ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-800"
                    }`}>
                      Your trade will auto close if SL or TP does not hit.
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        activeTab === "buy" ? 
                          (theme === "dark" ? 
                            "bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700" : 
                            "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600") : 
                          (theme === "dark" ? 
                            "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700" : 
                            "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600")
                      } text-white`}
                    >
                      {activeTab === "buy" ? "Place Buy Order" : "Place Sell Order"}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Recent Trades */}
              <div className={`mt-6 rounded-xl shadow-sm p-4 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>Recent Trades</h3>
                
                {/* Empty State */}
                <div className={`p-6 text-center rounded-lg ${
                  theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                }`}>
                  <svg
                    className={`mx-auto h-12 w-12 ${
                      theme === "dark" ? "text-gray-600" : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className={`mt-2 text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>No recent trades</h3>
                  <p className={`mt-1 text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}>
                    Get started by placing your first trade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}