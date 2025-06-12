import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  FaCoins,
  FaLock,
  FaCalendarAlt,
  FaChartLine,
  FaPercentage,
  FaChevronRight,
} from "react-icons/fa";
import cp1 from "../pictures/cp1.avif";
import cp2 from "../pictures/cp2.avif";
import cp3 from "../pictures/cp3.avif";
import cp4 from "../pictures/cp4.avif";
import cp5 from "../pictures/cp5.avif";
import cp6 from "../pictures/cp6.avif";
import cp7 from "../pictures/cp7.avif";
import cp8 from "../pictures/cp8.avif";
import cp9 from "../pictures/cp9.avif";


// Staking asset data
const stakeAssets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    img: cp1,
    min: 1,
    max: 10,
    apy: 5.2,
    color: "bg-orange-500",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    img: cp2,
    min: 0.1,
    max: 50,
    apy: 6.8,
    color: "bg-purple-500",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    img: cp3,
    min: 100,
    max: 5000,
    apy: 4.5,
    color: "bg-blue-600",
  },
  {
    name: "Solana",
    symbol: "SOL",
    img: cp4,
    min: 1,
    max: 100,
    apy: 7.2,
    color: "bg-indigo-500",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    img: cp5,
    min: 5,
    max: 500,
    apy: 8.1,
    color: "bg-pink-500",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    img: cp6,
    min: 1,
    max: 200,
    apy: 6.5,
    color: "bg-red-500",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    img: cp7,
    min: 10,
    max: 1000,
    apy: 5.9,
    color: "bg-blue-400",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    img: cp8,
    min: 0.5,
    max: 100,
    apy: 4.8,
    color: "bg-gray-500",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    img: cp9,
    min: 50,
    max: 5000,
    apy: 3.7,
    color: "bg-black",
  },
];

// Mock prices for conversion
const tokenPrices = {
  BTC: 50000,
  ETH: 3000,
  ADA: 1.2,
  SOL: 150,
  DOT: 25,
  AVAX: 80,
  LINK: 15,
  LTC: 120,
  XRP: 0.5,
};

export default function StakePage() {
  const { theme } = useTheme();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [duration, setDuration] = useState(30); // days
  const [stakingPositions, setStakingPositions] = useState([]);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pools");

  // Determine if we're in dark mode
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Load staking positions from localStorage
  useEffect(() => {
    const savedPositions = localStorage.getItem("stakingPositions");
    if (savedPositions) {
      setStakingPositions(JSON.parse(savedPositions));
    }
  }, []);

  // Save staking positions to localStorage
  useEffect(() => {
    if (stakingPositions.length > 0) {
      localStorage.setItem(
        "stakingPositions",
        JSON.stringify(stakingPositions)
      );
    }
  }, [stakingPositions]);

  const openStakeModal = (asset) => {
    setSelectedAsset(asset);
    setStakeAmount("");
    setShowStakeModal(true);
  };

  const closeStakeModal = () => {
    setShowStakeModal(false);
    setSelectedAsset(null);
  };

  const handleStake = () => {
    if (!selectedAsset || !stakeAmount) return;

    const amount = parseFloat(stakeAmount);
    if (
      isNaN(amount) ||
      amount < selectedAsset.min ||
      amount > selectedAsset.max
    ) {
      alert(
        `Please enter a valid amount between ${selectedAsset.min} and ${selectedAsset.max} ${selectedAsset.symbol}`
      );
      return;
    }

    const newPosition = {
      id: `stake-${Date.now()}`,
      ref: `REF-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      asset: selectedAsset.symbol,
      amount: amount,
      amountUSD: amount * tokenPrices[selectedAsset.symbol],
      duration: duration,
      startDate: new Date().toISOString(),
      endDate: new Date(
        Date.now() + duration * 24 * 60 * 60 * 1000
      ).toISOString(),
      roi: ((((amount * selectedAsset.apy) / 100) * duration) / 365).toFixed(4),
      status: "active",
    };

    setStakingPositions([...stakingPositions, newPosition]);
    closeStakeModal();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const calculateEstimatedRewards = () => {
    if (!selectedAsset || !stakeAmount || isNaN(parseFloat(stakeAmount)))
      return 0;
    const amount = parseFloat(stakeAmount);
    return (((amount * selectedAsset.apy) / 100) * duration) / 365;
  };

  return (
    <div
      className={`min-h-screen px-4 py-12 md:px-8 bg-gradient-to-br from-slate-900 to-teal-900`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
            Crypto Staking
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-teal-300">
            Earn passive income by staking your cryptocurrencies with
            industry-leading yields
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-teal-700 mb-8">
          <button
            onClick={() => setActiveTab("pools")}
            className={`px-6 py-3 font-medium text-lg relative group`}
          >
            Staking Pools
            <div
              className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
                activeTab === "pools"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500"
                  : "bg-transparent group-hover:bg-teal-700"
              }`}
            ></div>
          </button>
          <button
            onClick={() => setActiveTab("positions")}
            className={`px-6 py-3 font-medium text-lg relative group`}
          >
            Your Positions
            <div
              className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
                activeTab === "positions"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500"
                  : "bg-transparent group-hover:bg-teal-700"
              }`}
            ></div>
          </button>
        </div>

        {/* Pools Tab */}
        {activeTab === "pools" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeAssets.map((asset, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/80 backdrop-blur-sm border border-teal-800/50 hover:border-teal-600 transition-all duration-300 hover:shadow-teal-900/30"
              >
                <div className="p-5">
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${asset.color} ring-2 ring-white/20`}
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src={asset.img}
                        alt={asset.name}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {asset.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 rounded-full bg-teal-900/40 text-cyan-300">
                          {asset.symbol}
                        </span>
                        <div className="flex items-center gap-1 text-cyan-400">
                          <FaPercentage className="text-xs" />
                          <span className="text-sm font-bold">
                            {asset.apy}% APY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-teal-900/50">
                      <div className="flex items-center gap-2 text-sm mb-1 text-teal-400">
                        <FaLock className="text-teal-500" />
                        <span>Min. Stake</span>
                      </div>
                      <div className="font-bold text-white">
                        {asset.min} {asset.symbol}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/50 border border-teal-900/50">
                      <div className="flex items-center gap-2 text-sm mb-1 text-teal-400">
                        <FaCoins className="text-teal-500" />
                        <span>Max. Stake</span>
                      </div>
                      <div className="font-bold text-white">
                        {asset.max} {asset.symbol}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openStakeModal(asset)}
                    className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-800 text-white hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Stake Now
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Positions Tab */}
        {activeTab === "positions" && (
          <div className="rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-slate-800/70 to-slate-900/80 backdrop-blur-sm border border-teal-800/50">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
                <FaCoins className="text-cyan-500" />
                Your Staking Positions
              </h2>

              {stakingPositions.length > 0 ? (
                <div className="space-y-4">
                  {stakingPositions.map((position) => {
                    const daysLeft = calculateDaysRemaining(position.endDate);
                    const progress = Math.min(
                      100,
                      100 - (daysLeft / position.duration) * 100
                    );
                    const asset = stakeAssets.find(
                      (a) => a.symbol === position.asset
                    );

                    return (
                      <div
                        key={position.id}
                        className="p-5 rounded-xl bg-slate-800/50 border border-teal-900/50"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            {asset && (
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${asset.color} ring-2 ring-white/20`}
                              >
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={asset.img}
                                  alt={asset.name}
                                />
                              </div>
                            )}
                            <div>
                              <h3 className="text-lg font-bold text-white">
                                {position.asset} Staking
                              </h3>
                              <div className="text-sm text-teal-400">
                                REF: {position.ref}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              position.status === "active"
                                ? "bg-gradient-to-r from-teal-700/30 to-cyan-800/30 text-cyan-400"
                                : "bg-gray-500/20 text-gray-500"
                            }`}
                          >
                            {position.status === "active"
                              ? `Active (${daysLeft}d left)`
                              : position.status}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1 text-teal-400">
                            <span>Progress</span>
                            <span>{progress.toFixed(1)}%</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden bg-slate-700">
                            <div
                              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-teal-400 text-sm">Amount</div>
                            <div className="font-bold text-white">
                              {position.amount} {position.asset}
                            </div>
                            <div className="text-sm text-cyan-400">
                              ${position.amountUSD.toFixed(2)}
                            </div>
                          </div>

                          <div>
                            <div className="text-teal-400 text-sm">
                              Duration
                            </div>
                            <div className="font-bold text-white flex items-center gap-1">
                              <FaCalendarAlt className="text-sm text-cyan-500" />
                              {position.duration} days
                            </div>
                          </div>

                          <div>
                            <div className="text-teal-400 text-sm">
                              Start Date
                            </div>
                            <div className="font-bold text-white">
                              {formatDate(position.startDate)}
                            </div>
                          </div>

                          <div>
                            <div className="text-teal-400 text-sm">
                              Est. Rewards
                            </div>
                            <div className="font-bold text-cyan-400 flex items-center gap-1">
                              <FaChartLine className="text-cyan-500" />
                              {position.roi} {position.asset}
                            </div>
                            <div className="text-sm text-cyan-400">
                              $
                              {(
                                position.roi * tokenPrices[position.asset]
                              ).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-block p-6 rounded-full bg-slate-800/50 mb-4">
                    <FaCoins className="text-4xl text-teal-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-slate-300">
                    No active staking positions
                  </h3>
                  <p className="text-teal-400">
                    Stake your crypto to start earning rewards
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stake Modal */}
        {showStakeModal && selectedAsset && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="rounded-xl w-full max-w-md overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-teal-800/50">
              <div className="p-6 border-b border-teal-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-cyan-400">
                    Stake {selectedAsset.name} ({selectedAsset.symbol})
                  </h2>
                  <button
                    onClick={closeStakeModal}
                    className="p-2 rounded-full hover:bg-slate-700 text-gray-300"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <label className="block mb-3 font-medium text-teal-300">
                    Amount to Stake
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder={`Enter amount (${selectedAsset.min}-${selectedAsset.max} ${selectedAsset.symbol})`}
                      className="w-full p-4 rounded-xl bg-slate-800 border border-teal-800 text-white placeholder:text-slate-500"
                    />
                    <span className="absolute right-4 top-4 font-bold text-cyan-400">
                      {selectedAsset.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-teal-500">
                    <span>
                      Min: {selectedAsset.min} {selectedAsset.symbol}
                    </span>
                    <span>
                      Max: {selectedAsset.max} {selectedAsset.symbol}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-3 font-medium text-teal-300">
                    Staking Duration
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[7, 14, 30, 60, 90].map((days) => (
                      <button
                        key={days}
                        onClick={() => setDuration(days)}
                        className={`py-3 rounded-xl ${
                          duration === days
                            ? "bg-gradient-to-r from-teal-600 to-cyan-700 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-gray-300"
                        }`}
                      >
                        {days} days
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl mb-6 bg-slate-800/50 border border-teal-800/50">
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-cyan-400">
                    <FaChartLine />
                    Estimated Rewards
                  </h3>
                  {stakeAmount && !isNaN(parseFloat(stakeAmount)) ? (
                    <div>
                      <div className="flex justify-between items-center mb-2 text-teal-300">
                        <span>APY</span>
                        <span className="font-bold text-cyan-400">
                          {selectedAsset.apy}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2 text-teal-300">
                        <span>Duration</span>
                        <span className="font-bold">{duration} days</span>
                      </div>
                      <div className="flex justify-between items-center mb-2 text-teal-300">
                        <span>Rewards</span>
                        <span className="font-bold text-cyan-400">
                          {calculateEstimatedRewards().toFixed(6)}{" "}
                          {selectedAsset.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-teal-800 text-white">
                        <span>Total Value</span>
                        <span className="text-lg font-bold text-cyan-400">
                          $
                          {(
                            calculateEstimatedRewards() *
                            tokenPrices[selectedAsset.symbol]
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-teal-500">
                      Enter an amount to see estimated rewards
                    </p>
                  )}
                </div>

                <button
                  onClick={handleStake}
                  disabled={!stakeAmount || isNaN(parseFloat(stakeAmount))}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                    !stakeAmount || isNaN(parseFloat(stakeAmount))
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal-600 to-cyan-700 text-white hover:from-teal-500 hover:to-cyan-600"
                  }`}
                >
                  Confirm Stake
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
