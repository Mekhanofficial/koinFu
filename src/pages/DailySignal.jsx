import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  faSignal,
  faChartLine,
  faCoins,
  faRocket,
  faCrown,
  faGem,
  faStar,
  faCheckCircle,
  faSyncAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Simulated trading data with ups and downs
const performanceData = [
  { day: "Mon", value: 10, profit: 120 },
  { day: "Tue", value: 0, profit: 80 },
  { day: "Wed", value: 100, profit: 450 },
  { day: "Thu", value: 30, profit: 210 },
  { day: "Fri", value: 88, profit: 380 },
  { day: "Sat", value: 15, profit: 150 },
  { day: "Sun", value: 115, profit: 510 },
];

const historicalData = [
  { date: "Jan", signals: 23, winRate: 78, profit: 1200 },
  { date: "Feb", signals: 28, winRate: 82, profit: 1850 },
  { date: "Mar", signals: 31, winRate: 85, profit: 2400 },
  { date: "Apr", signals: 26, winRate: 79, profit: 1650 },
  { date: "May", signals: 29, winRate: 83, profit: 2100 },
  { date: "Jun", signals: 34, winRate: 87, profit: 2950 },
];

// Signal data structure
const SIGNAL_PLANS = [
  {
    id: 1,
    name: "Learn II Trade",
    price: 9899.0,
    active: false,
    winRate: "85%",
    dailySignals: 3,
    description: "Professional trading signals with high accuracy",
    icon: faChartLine,
    color: "from-blue-500 to-cyan-500",
    darkColor: "from-blue-600 to-cyan-600",
    features: [
      "85% Win Rate",
      "3 Daily Signals",
      "24/7 Support",
      "Market Analysis",
    ],
  },
  {
    id: 2,
    name: "AVA TRADE",
    price: 4999.0,
    active: false,
    winRate: "78%",
    dailySignals: 2,
    description: "Reliable signals for consistent profits",
    icon: faCoins,
    color: "from-emerald-500 to-teal-500",
    darkColor: "from-emerald-600 to-teal-600",
    features: [
      "78% Win Rate",
      "2 Daily Signals",
      "Risk Management",
      "Email Alerts",
    ],
  },
  {
    id: 3,
    name: "RoboForex",
    price: 2899.0,
    active: false,
    winRate: "72%",
    dailySignals: 4,
    description: "Automated trading signals powered by AI",
    icon: faRocket,
    color: "from-violet-500 to-purple-500",
    darkColor: "from-violet-600 to-purple-600",
    features: ["72% Win Rate", "4 Daily Signals", "AI Analysis", "Mobile App"],
  },
  {
    id: 4,
    name: "ZERO TO HERO",
    price: 15988.0,
    active: false,
    winRate: "90%",
    dailySignals: 5,
    description: "Premium signals for serious traders",
    icon: faCrown,
    color: "from-amber-500 to-orange-500",
    darkColor: "from-amber-600 to-orange-600",
    features: [
      "90% Win Rate",
      "5 Daily Signals",
      "VIP Support",
      "Advanced Tools",
    ],
  },
  {
    id: 5,
    name: "1000 PIPS",
    price: 1500.0,
    active: false,
    winRate: "65%",
    dailySignals: 1,
    description: "Basic signals for beginners",
    icon: faSignal,
    color: "from-slate-400 to-slate-500",
    darkColor: "from-slate-500 to-slate-600",
    features: [
      "65% Win Rate",
      "1 Daily Signal",
      "Educational Resources",
      "Community Access",
    ],
  },
  {
    id: 6,
    name: "WeTalkTrade",
    price: 10900.0,
    active: false,
    winRate: "82%",
    dailySignals: 3,
    description: "Community-driven trading signals",
    icon: faGem,
    color: "from-rose-500 to-pink-500",
    darkColor: "from-rose-600 to-pink-600",
    features: [
      "82% Win Rate",
      "3 Daily Signals",
      "Live Chat",
      "Expert Sessions",
    ],
  },
];

export default function DailySignalPage() {
  const { theme } = useTheme();
  const [activeSignal, setActiveSignal] = useState(null);
  const [showSignalManager, setShowSignalManager] = useState(false);
  const [signalAmount, setSignalAmount] = useState("");
  const [plans, setPlans] = useState(SIGNAL_PLANS);
  const [activeTab, setActiveTab] = useState("performance");

  // Load active signal from localStorage
  useEffect(() => {
    const storedSignal = localStorage.getItem("activeSignal");
    if (storedSignal) {
      setActiveSignal(JSON.parse(storedSignal));
    }
  }, []);

  // Save active signal to localStorage
  useEffect(() => {
    if (activeSignal) {
      localStorage.setItem("activeSignal", JSON.stringify(activeSignal));
    }
  }, [activeSignal]);

  // Handle signal purchase
  const handlePurchase = (planId) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    if (!selectedPlan) return;

    const amount = signalAmount || selectedPlan.price;

    // Update active signal
    const newActiveSignal = {
      ...selectedPlan,
      active: true,
      purchaseDate: new Date().toISOString(),
      amountPaid: parseFloat(amount),
    };

    setActiveSignal(newActiveSignal);

    // Update plans to mark others as inactive
    setPlans(
      plans.map((plan) => ({
        ...plan,
        active: plan.id === planId,
      }))
    );

    setSignalAmount("");
  };

  // Handle signal cancellation
  const cancelSignal = () => {
    setActiveSignal(null);
    setPlans(
      plans.map((plan) => ({
        ...plan,
        active: false,
      }))
    );
    localStorage.removeItem("activeSignal");
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Toggle signal manager visibility
  const toggleSignalManager = () => {
    setShowSignalManager(!showSignalManager);
  };

  // Custom tooltip for performance chart
  const PerformanceTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg shadow-lg ${
            theme === "dark" ? "bg-slate-800" : "bg-white"
          } border ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <p className="font-bold">{label}</p>
          <p className="text-blue-500">Performance: {payload[0].value}%</p>
          <p className="text-teal-500">
            Profit: {formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <section
        className={`min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-10 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 to-slate-800"
            : "bg-gradient-to-br from-slate-50 to-slate-100"
        }`}
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
            Trading Signal Services
          </h1>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Premium trading signals to maximize your profits and minimize risks
          </p>
        </div>

        {/* Signal Stats Card */}
        <div className="max-w-7xl mx-auto mb-10">
          <div
            className={`rounded-2xl shadow-xl overflow-hidden ${
              theme === "dark" ? "bg-slate-800/50" : "bg-white"
            }`}
          >
            <div className="p-6 flex flex-col md:flex-row gap-6 items-stretch">
              {/* Current Signal Info */}
              <div className="flex-1">
                <div
                  className={`p-6 rounded-xl h-full ${
                    theme === "dark" ? "bg-slate-700/30" : "bg-slate-50"
                  } border ${
                    theme === "dark" ? "border-slate-700" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`p-3 rounded-lg ${
                        theme === "dark" ? "bg-blue-900/50" : "bg-blue-100"
                      } mr-4`}
                    >
                      <FontAwesomeIcon
                        icon={faSignal}
                        className={`h-6 ${
                          theme === "dark" ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Current Signal
                      </p>
                      <h2 className="text-2xl font-bold">
                        <span
                          className={
                            activeSignal ? "text-blue-500" : "text-slate-400"
                          }
                        >
                          {activeSignal
                            ? activeSignal.name
                            : "No Active Signal"}
                        </span>
                      </h2>
                    </div>
                  </div>

                  {activeSignal ? (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div
                        className={`p-3 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">Win Rate</p>
                        <p className="text-2xl font-bold text-green-500">
                          {activeSignal.winRate}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">
                          Daily Signals
                        </p>
                        <p className="text-2xl font-bold text-amber-500">
                          {activeSignal.dailySignals}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">
                          Amount Paid
                        </p>
                        <p className="text-xl font-semibold">
                          {formatCurrency(activeSignal.amountPaid)}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">Purchased</p>
                        <p className="text-sm">
                          {new Date(
                            activeSignal.purchaseDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`p-6 rounded-xl text-center mb-6 ${
                        theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                      }`}
                    >
                      <p
                        className={`mb-4 ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        You don't have an active signal service. Subscribe to
                        one of our premium plans below to get started.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={toggleSignalManager}
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 text-white"
                        : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                    }`}
                  >
                    {showSignalManager
                      ? "Hide Signal Manager"
                      : "Manage Signal Service"}
                  </button>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center mb-6">
                  <div
                    className={`p-3 rounded-lg ${
                      theme === "dark" ? "bg-teal-900/50" : "bg-teal-100"
                    } mr-4`}
                  >
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className={`h-6 ${
                        theme === "dark" ? "text-teal-400" : "text-teal-600"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Signal Performance
                  </h3>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={performanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#0ea5e9"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#0ea5e9"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorProfit"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#14b8a6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#14b8a6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="day"
                        tick={{
                          fill: theme === "dark" ? "#cbd5e1" : "#475569",
                        }}
                      />
                      <YAxis
                        tick={{
                          fill: theme === "dark" ? "#cbd5e1" : "#475569",
                        }}
                      />
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
                      />
                      <Tooltip content={<PerformanceTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0ea5e9"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        name="Performance"
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#14b8a6"
                        fillOpacity={1}
                        fill="url(#colorProfit)"
                        name="Profit"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex mt-4 space-x-4">
                  <button
                    onClick={() => setActiveTab("performance")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm ${
                      activeTab === "performance"
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : theme === "dark"
                        ? "bg-slate-700 text-slate-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    Performance
                  </button>
                  <button
                    onClick={() => setActiveTab("historical")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm ${
                      activeTab === "historical"
                        ? theme === "dark"
                          ? "bg-teal-600 text-white"
                          : "bg-teal-500 text-white"
                        : theme === "dark"
                        ? "bg-slate-700 text-slate-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    Historical Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signal Manager Panel */}
        {showSignalManager && (
          <div className="max-w-7xl mx-auto mb-12">
            <div
              className={`rounded-2xl shadow-xl p-8 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}
                >
                  Signal Service Management
                </h2>
                <button
                  onClick={toggleSignalManager}
                  className={`p-2 rounded-full ${
                    theme === "dark"
                      ? "hover:bg-slate-700 text-slate-300"
                      : "hover:bg-slate-100 text-slate-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {activeSignal ? (
                <div className="space-y-6">
                  <div
                    className={`p-6 rounded-xl ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-slate-100"
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Service Details
                        </h3>
                        <p className="font-medium">{activeSignal.name}</p>
                        <p
                          className={`${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          {activeSignal.description}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Performance
                        </h3>
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm">Win Rate</p>
                            <p className="text-xl font-bold text-green-500">
                              {activeSignal.winRate}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm">Daily Signals</p>
                            <p className="text-xl font-bold text-amber-500">
                              {activeSignal.dailySignals}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Subscription
                        </h3>
                        <p className="text-sm">Amount Paid</p>
                        <p className="text-xl font-bold">
                          {formatCurrency(activeSignal.amountPaid)}
                        </p>
                        <p className="text-sm mt-1">
                          Purchased On:{" "}
                          {new Date(
                            activeSignal.purchaseDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <button
                      onClick={cancelSignal}
                      className={`flex-1 py-3 rounded-xl font-medium ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
                          : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white"
                      }`}
                    >
                      Cancel Subscription
                    </button>
                    <button
                      className={`flex-1 py-3 rounded-xl font-medium ${
                        theme === "dark"
                          ? "bg-slate-700 hover:bg-slate-600 text-white"
                          : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                      }`}
                    >
                      Renew Subscription
                    </button>
                    <button
                      className={`flex-1 py-3 rounded-xl font-medium ${
                        theme === "dark"
                          ? "bg-slate-700 hover:bg-slate-600 text-white"
                          : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                      }`}
                    >
                      Download Reports
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-8 rounded-xl text-center ${
                    theme === "dark" ? "bg-slate-700/50" : "bg-slate-100"
                  }`}
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <FontAwesomeIcon
                      icon={faSignal}
                      className="h-8 text-blue-500"
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      theme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    No Active Signal Service
                  </h3>
                  <p
                    className={`mb-6 max-w-md mx-auto ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    You don't have an active signal service. Subscribe to one of
                    our premium plans to start receiving trading signals.
                  </p>
                  <button
                    onClick={toggleSignalManager}
                    className={`px-6 py-3 rounded-xl font-medium ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 text-white"
                        : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                    }`}
                  >
                    View Signal Plans
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Signal Plans Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Premium Signal Services</h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                theme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Choose the signal service that matches your trading style and
              goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                } border ${
                  plan.active
                    ? theme === "dark"
                      ? "border-blue-500 ring-2 ring-blue-500/50"
                      : "border-blue-400 ring-2 ring-blue-400/50"
                    : theme === "dark"
                    ? "border-slate-700"
                    : "border-slate-200"
                }`}
              >
                {/* Plan Header */}
                <div
                  className={`p-6 bg-gradient-to-r ${
                    theme === "dark" ? plan.darkColor : plan.color
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <FontAwesomeIcon
                          icon={plan.icon}
                          className="h-5 text-white/90 mr-2"
                        />
                        <h3 className="text-xl font-bold text-white">
                          {plan.name}
                        </h3>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-1">
                        {formatCurrency(plan.price)}
                      </h4>
                      <p className="text-white/80">{plan.description}</p>
                    </div>

                    {plan.id === 4 && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white">
                        PREMIUM
                      </span>
                    )}
                  </div>
                </div>

                {/* Plan Body */}
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-4">
                      <div>
                        <span
                          className={`font-medium ${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          Win Rate
                        </span>
                        <p className="text-xl font-bold text-green-500">
                          {plan.winRate}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-medium ${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          Signals/Day
                        </span>
                        <p className="text-xl font-bold text-amber-500">
                          {plan.dailySignals}
                        </p>
                      </div>
                    </div>

                    <h5
                      className={`font-bold mb-3 ${
                        theme === "dark" ? "text-slate-300" : "text-slate-800"
                      }`}
                    >
                      Key Features
                    </h5>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={`mt-1 mr-2 h-4 ${
                              theme === "dark"
                                ? "text-blue-400"
                                : "text-blue-600"
                            }`}
                          />
                          <span
                            className={`${
                              theme === "dark"
                                ? "text-slate-300"
                                : "text-slate-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <label
                      className={`block text-sm font-semibold mb-2 ${
                        theme === "dark" ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Custom Investment (USD)
                    </label>
                    <div className="relative mb-4">
                      <span
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        $
                      </span>
                      <input
                        type="number"
                        value={signalAmount}
                        onChange={(e) => setSignalAmount(e.target.value)}
                        placeholder={plan.price.toString()}
                        className={`w-full rounded-xl px-8 py-3 focus:outline-none focus:ring-2 ${
                          theme === "dark"
                            ? "bg-slate-700 text-white focus:ring-blue-500"
                            : "bg-slate-100 text-slate-900 focus:ring-blue-400"
                        }`}
                      />
                    </div>

                    <button
                      onClick={() => handlePurchase(plan.id)}
                      disabled={plan.active}
                      className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
                        plan.active
                          ? "bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed"
                          : theme === "dark"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800"
                          : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                      }`}
                    >
                      {plan.active ? "Active Plan" : "Subscribe Now"}
                    </button>

                    {plan.active && (
                      <div className="mt-3 text-center">
                        <span
                          className={`text-sm font-medium ${
                            theme === "dark" ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          ✓ Your active signal service
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
