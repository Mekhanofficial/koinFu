import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCrown,
  faTimes,
  faChartLine,
  faCoins,
  faRocket,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function SubscriptionPage() {
  const { theme } = useTheme();
  const [currentPlan, setCurrentPlan] = useState("Basic");
  const [isClient, setIsClient] = useState(false);
  const [investmentAmounts, setInvestmentAmounts] = useState({});
  const [subscribingPlan, setSubscribingPlan] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeBar, setActiveBar] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const initialAmounts = {
      Elite: "25000",
      Premium: "4000",
      Platinum: "10000",
      Standard: "2500",
    };
    setInvestmentAmounts(initialAmounts);
  }, []);

  const paidPlans = [
    {
      name: "Elite",
      price: "$25,000.00",
      minAmount: "Minimum $25,000",
      description: "Premium trading experience with maximum returns",
      duration: "7 Days",
      roi: "55.00%",
      roiValue: 55,
      features: [
        "AI Trading Bot",
        "24/7 Priority Support",
        "Advanced Analytics",
        "Custom Strategies",
        "VIP Events",
      ],
      icon: faGem,
      color: "from-purple-600 to-indigo-700",
      darkColor: "from-purple-700 to-indigo-800",
      buttonColor:
        "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800",
    },
    {
      name: "Platinum",
      price: "$10,000.00",
      minAmount: "Minimum $5,000",
      description: "Professional trading tools for serious investors",
      duration: "3 Days",
      roi: "15.00%",
      roiValue: 15,
      features: [
        "AI Trading Bot",
        "Email & Chat Support",
        "Portfolio Analysis",
        "Market Insights",
      ],
      icon: faRocket,
      color: "from-blue-500 to-cyan-600",
      darkColor: "from-blue-600 to-cyan-700",
      buttonColor:
        "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700",
    },
    {
      name: "Premium",
      price: "$4,000.00",
      minAmount: "Minimum $4,000",
      description: "Enhanced features for active traders",
      duration: "5 Days",
      roi: "30.00%",
      roiValue: 30,
      features: [
        "AI Trading Bot",
        "Email Support",
        "Basic Analytics",
        "Trading Signals",
      ],
      icon: faChartLine,
      color: "from-teal-500 to-emerald-600",
      darkColor: "from-teal-600 to-emerald-700",
      buttonColor:
        "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700",
    },
    {
      name: "Standard",
      price: "$2,500.00",
      minAmount: "Minimum $2,500",
      description: "Solid foundation for new investors",
      duration: "1 Day",
      roi: "5.00%",
      roiValue: 5,
      features: ["Manual Trading", "Basic Support", "Market Overview"],
      icon: faCoins,
      color: "from-amber-500 to-orange-500",
      darkColor: "from-amber-600 to-orange-600",
      buttonColor:
        "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
    },
  ];

  const basicPlan = {
    name: "Basic",
    price: "Free",
    minAmount: "Minimum $100",
    description: "Starter plan with essential features",
    duration: "N/A",
    roi: "2.00%",
    roiValue: 2,
    features: ["Manual Trading", "Basic Support", "Limited Access"],
    icon: faCoins,
    color: "from-gray-400 to-gray-500",
    darkColor: "from-gray-600 to-gray-700",
    buttonColor:
      "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600",
  };

  const roiChartData = [
    {
      name: "Basic",
      roi: basicPlan.roiValue,
      current: currentPlan === "Basic",
    },
    {
      name: "Standard",
      roi: paidPlans.find((p) => p.name === "Standard").roiValue,
      current: currentPlan === "Standard",
    },
    {
      name: "Premium",
      roi: paidPlans.find((p) => p.name === "Premium").roiValue,
      current: currentPlan === "Premium",
    },
    {
      name: "Platinum",
      roi: paidPlans.find((p) => p.name === "Platinum").roiValue,
      current: currentPlan === "Platinum",
    },
    {
      name: "Elite",
      roi: paidPlans.find((p) => p.name === "Elite").roiValue,
      current: currentPlan === "Elite",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const plan = payload[0].payload;
      const planDetails =
        plan.name === "Basic"
          ? basicPlan
          : paidPlans.find((p) => p.name === plan.name);

      return (
        <div
          className={`p-4 rounded-lg shadow-lg backdrop-blur-sm ${
            theme === "dark" ? "bg-slate-800/90" : "bg-white/90"
          } border ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <p className="font-bold text-lg">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="flex items-center">
              <span className="font-medium w-24">ROI:</span>
              <span
                className={`font-bold ${
                  theme === "dark" ? "text-teal-300" : "text-teal-600"
                }`}
              >
                {payload[0].value}%
              </span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">Price:</span>
              <span>{planDetails.price}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">Min Investment:</span>
              <span>{planDetails.minAmount}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium w-24">Duration:</span>
              <span>{planDetails.duration}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleAmountChange = (planName, value) => {
    setInvestmentAmounts((prev) => ({
      ...prev,
      [planName]: value,
    }));
  };

  const handleSubscribe = async (planName) => {
    setSubscribingPlan(planName);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentPlan(planName);
      setSuccessMessage(
        `Successfully subscribed to ${planName} plan with $${investmentAmounts[planName]} investment`
      );
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setSubscribingPlan(null);
    }
  };

  const handleManageSubscription = () => {
    setShowManageModal(true);
  };

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentPlan("Basic");
      setSuccessMessage("Your subscription has been cancelled successfully");
      setShowSuccessModal(true);
      setShowManageModal(false);
    } catch (error) {
      console.error("Cancellation failed:", error);
    } finally {
      setIsCancelling(false);
    }
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
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
            Investment Plans
          </h1>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Choose the perfect plan to maximize your returns with our advanced
            trading solutions
          </p>
        </div>

        {isClient && (
          <div className="max-w-7xl mx-auto mb-16">
            <div
              className={`rounded-3xl shadow-xl overflow-hidden ${
                theme === "dark" ? "bg-slate-800/50" : "bg-white"
              }`}
            >
              <div className="p-8 flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Plan Info Section */}
                <div className="flex-1">
                  <div
                    className={`p-6 rounded-2xl h-full ${
                      theme === "dark" ? "bg-slate-700/30" : "bg-slate-50"
                    } border ${
                      theme === "dark" ? "border-slate-700" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-2 rounded-lg ${
                          theme === "dark" ? "bg-teal-900/50" : "bg-teal-100"
                        } mr-3`}
                      >
                        <FontAwesomeIcon
                          icon={faCrown}
                          className={`h-6 ${
                            paidPlans.some((p) => p.name === currentPlan)
                              ? "text-yellow-400"
                              : "text-slate-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-500"
                          }`}
                        >
                          Current Plan
                        </p>
                        <h2 className="text-2xl font-bold">
                          <span
                            className={
                              paidPlans.some((p) => p.name === currentPlan)
                                ? "text-teal-400"
                                : "text-slate-400"
                            }
                          >
                            {currentPlan}
                          </span>
                        </h2>
                      </div>
                    </div>

                    <p
                      className={`text-lg mb-6 ${
                        theme === "dark" ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {currentPlan === "Basic"
                        ? basicPlan.description
                        : paidPlans.find((p) => p.name === currentPlan)
                            ?.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div
                        className={`p-4 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">ROI:</p>
                        <p
                          className={`text-2xl font-bold ${
                            theme === "dark" ? "text-teal-400" : "text-teal-600"
                          }`}
                        >
                          {currentPlan === "Basic"
                            ? basicPlan.roi
                            : paidPlans.find((p) => p.name === currentPlan)
                                ?.roi}
                        </p>
                      </div>
                      <div
                        className={`p-4 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">Duration:</p>
                        <p className="text-xl font-semibold">
                          {currentPlan === "Basic"
                            ? basicPlan.duration
                            : paidPlans.find((p) => p.name === currentPlan)
                                ?.duration}
                        </p>
                      </div>
                      <div
                        className={`p-4 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">Price:</p>
                        <p className="text-xl font-semibold">
                          {currentPlan === "Basic"
                            ? basicPlan.price
                            : paidPlans.find((p) => p.name === currentPlan)
                                ?.price}
                        </p>
                      </div>
                      <div
                        className={`p-4 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">
                          Min Investment:
                        </p>
                        <p className="text-xl font-semibold">
                          {currentPlan === "Basic"
                            ? basicPlan.minAmount
                            : paidPlans.find((p) => p.name === currentPlan)
                                ?.minAmount}
                        </p>
                      </div>
                    </div>

                    {currentPlan !== "Basic" && (
                      <button
                        onClick={handleManageSubscription}
                        className={`w-full py-3 rounded-xl font-medium transition-all ${
                          theme === "dark"
                            ? "bg-slate-700 hover:bg-slate-600 text-white"
                            : "bg-white hover:bg-slate-100 text-slate-800 shadow-md hover:shadow-lg"
                        }`}
                      >
                        Manage Subscription
                      </button>
                    )}
                  </div>
                </div>

                {/* ROI Chart Section */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center mb-6">
                    <div
                      className={`p-2 rounded-lg ${
                        theme === "dark" ? "bg-blue-900/50" : "bg-blue-100"
                      } mr-3`}
                    >
                      <FontAwesomeIcon
                        icon={faChartLine}
                        className={`h-6 ${
                          theme === "dark" ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-bold ${
                        theme === "dark" ? "text-white" : "text-slate-800"
                      }`}
                    >
                      ROI Comparison
                    </h3>
                  </div>

                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={roiChartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        onMouseOver={(data) =>
                          setActiveBar(data.activeTooltipIndex)
                        }
                        onMouseLeave={() => setActiveBar(null)}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="name"
                          tick={{
                            fill: theme === "dark" ? "#cbd5e1" : "#475569",
                          }}
                        />
                        <YAxis
                          tick={{
                            fill: theme === "dark" ? "#cbd5e1" : "#475569",
                          }}
                          label={{
                            value: "ROI (%)",
                            angle: -90,
                            position: "insideLeft",
                            fill: theme === "dark" ? "#94a3b8" : "#64748b",
                            style: { textAnchor: "middle" },
                          }}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                          cursor={{
                            fill:
                              theme === "dark"
                                ? "rgba(30, 41, 59, 0.5)"
                                : "rgba(226, 232, 240, 0.5)",
                          }}
                        />
                        <Bar
                          dataKey="roi"
                          name="Return on Investment"
                          radius={[6, 6, 0, 0]}
                          barSize={50}
                        >
                          {roiChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                activeBar === index
                                  ? theme === "dark"
                                    ? "#0ea5e9"
                                    : "#38bdf8"
                                  : entry.current
                                  ? theme === "dark"
                                    ? "#0d9488"
                                    : "#14b8a6"
                                  : theme === "dark"
                                  ? "#4b5563"
                                  : "#9ca3af"
                              }
                              stroke={theme === "dark" ? "#1e293b" : "#f1f5f9"}
                              strokeWidth={1}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div
                    className={`mt-4 p-4 rounded-xl ${
                      theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      <span className="font-semibold">Tip:</span> Higher-tier
                      plans offer significantly better ROI potential with
                      advanced trading algorithms and market analysis tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Choose Your Investment Plan
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                theme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Select the plan that matches your investment goals and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paidPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  theme === "dark"
                    ? "bg-gradient-to-b from-slate-800 to-slate-900"
                    : "bg-gradient-to-b from-white to-slate-50"
                } border ${
                  currentPlan === plan.name
                    ? theme === "dark"
                      ? "border-teal-500 ring-2 ring-teal-500/50"
                      : "border-teal-400 ring-2 ring-teal-400/50"
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
                      <h4 className="text-3xl font-bold text-white mb-1">
                        {plan.price}
                      </h4>
                      <p className="text-white/80">{plan.minAmount}</p>
                    </div>

                    {plan.name === "Premium" && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-purple-700">
                        POPULAR
                      </span>
                    )}
                    {plan.name === "Elite" && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white">
                        PREMIUM
                      </span>
                    )}
                  </div>
                </div>

                {/* Plan Body */}
                <div className="p-6">
                  <h4
                    className={`text-lg mb-4 font-medium ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {plan.description}
                  </h4>

                  <div className="mb-6">
                    <div className="flex justify-between mb-3">
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        Duration
                      </span>
                      <span className="font-semibold">{plan.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        ROI
                      </span>
                      <span
                        className={`font-bold ${
                          theme === "dark" ? "text-teal-400" : "text-teal-600"
                        }`}
                      >
                        {plan.roi}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5
                      className={`font-bold mb-3 ${
                        theme === "dark" ? "text-slate-300" : "text-slate-800"
                      }`}
                    >
                      Features
                    </h5>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={`mt-1 mr-2 h-4 ${
                              theme === "dark"
                                ? "text-teal-400"
                                : "text-teal-600"
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
                      Investment Amount
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
                        value={investmentAmounts[plan.name] || ""}
                        onChange={(e) =>
                          handleAmountChange(plan.name, e.target.value)
                        }
                        className={`w-full rounded-xl px-8 py-3 focus:outline-none focus:ring-2 ${
                          theme === "dark"
                            ? "bg-slate-800 text-white focus:ring-teal-500"
                            : "bg-slate-100 text-slate-900 focus:ring-teal-400"
                        }`}
                        min={plan.price.replace("$", "").replace(",", "")}
                      />
                    </div>

                    <button
                      onClick={() => handleSubscribe(plan.name)}
                      disabled={
                        currentPlan === plan.name ||
                        subscribingPlan === plan.name
                      }
                      className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
                        currentPlan === plan.name
                          ? "bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed"
                          : plan.buttonColor
                      } ${
                        subscribingPlan === plan.name
                          ? "opacity-80"
                          : "hover:opacity-95"
                      }`}
                    >
                      {subscribingPlan === plan.name
                        ? "Processing..."
                        : currentPlan === plan.name
                        ? "Active Plan"
                        : "Upgrade Now"}
                    </button>

                    {currentPlan === plan.name && (
                      <div className="mt-3 text-center">
                        <span
                          className={`text-sm font-medium ${
                            theme === "dark" ? "text-teal-400" : "text-teal-600"
                          }`}
                        >
                          ✓ Your active plan
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manage Subscription Modal */}
        {showManageModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div
              className={`rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-95 animate-scaleIn ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}
                >
                  Manage Your Plan
                </h2>
                <button
                  onClick={() => setShowManageModal(false)}
                  className={`p-2 rounded-full ${
                    theme === "dark"
                      ? "hover:bg-slate-700 text-slate-300"
                      : "hover:bg-slate-100 text-slate-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div
                className={`p-5 rounded-xl mb-6 ${
                  theme === "dark" ? "bg-slate-700/50" : "bg-slate-100"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`font-semibold ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Plan:
                  </span>
                  <span className="font-bold text-lg text-teal-500">
                    {currentPlan}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span
                      className={`${
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Status:
                    </span>
                    <span className="font-semibold text-green-500">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`${
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Investment:
                    </span>
                    <span className="font-semibold">
                      ${investmentAmounts[currentPlan]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`${
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Next Renewal:
                    </span>
                    <span className="font-semibold">In 7 days</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowManageModal(false)}
                  className={`w-full py-3 rounded-xl font-medium ${
                    theme === "dark"
                      ? "bg-slate-700 hover:bg-slate-600 text-white"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                  }`}
                >
                  Update Payment Method
                </button>

                <button
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    theme === "dark"
                      ? "bg-red-700/80 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  } ${isCancelling ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isCancelling ? "Processing..." : "Cancel Subscription"}
                </button>

                <button
                  onClick={() => setShowManageModal(false)}
                  className={`w-full py-3 rounded-xl font-medium ${
                    theme === "dark"
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div
              className={`rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-95 animate-scaleIn ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
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
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}
                >
                  Success!
                </h2>

                <p
                  className={`mb-6 px-4 ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
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
      </section>

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
    </>
  );
}
