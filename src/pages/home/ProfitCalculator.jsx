import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moon1 from "../../pictures/bg16.avif";
import { Link } from "react-router-dom";
export default function ProfitCalculator() {
  const [plan, setPlan] = useState("basic");
  const [amount, setAmount] = useState("");
  const [profit, setProfit] = useState("0.00");
  const [isCalculating, setIsCalculating] = useState(false);

  const profitMultipliers = {
    basic: [4, 7],
    standard: [5, 8],
    premium: [6, 9],
    platinum: [7, 10],
    elite: [8, 12],
  };

  const planInfo = {
    basic: { name: "Basic Package", color: "from-slate-500 to-gray-900" },
    standard: {
      name: "Standard Package",
      color: "from-emerald-500 to-orange-800",
    },
    premium: {
      name: "Premium Package",
      color: "from-cyan-500 to-teal-500",
    },
    platinum: {
      name: "Platinum Package",
      color: "from-blue-500 to-cyan-900",
    },
    elite: { name: "Elite Package", color: "from-purple-500 to-cyan-800" },
  };

  const calculateProfit = (investAmount, planType) => {
    if (!investAmount) return "0.00";

    setIsCalculating(true);
    const [minMultiplier, maxMultiplier] = profitMultipliers[planType];
    const randomMultiplier =
      Math.random() * (maxMultiplier - minMultiplier) + minMultiplier;

    return (investAmount * randomMultiplier).toFixed(2);
  };

  const handleAmountChange = (e) => {
    const investAmount = parseFloat(e.target.value) || 0;
    setAmount(e.target.value);
    setProfit(calculateProfit(investAmount, plan));
  };

  const handlePlanChange = (e) => {
    const newPlan = e.target.value;
    setPlan(newPlan);
    setProfit(calculateProfit(parseFloat(amount) || 0, newPlan));
  };

  useEffect(() => {
    if (profit !== "0.00") {
      const timer = setTimeout(() => setIsCalculating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [profit]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${moon1})` }}
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-slate-900/90 to-black/95" />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-teal-500/20 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block relative mb-5  text-lg uppercase">
            <span className="text-teal-500 font-semibold tracking-wider  px-4 py-1.5 rounded-full  bg-gradient-to-r from-teal-700 to-cyan-900">
              Profit Calculator
            </span>
            <div className="absolute inset-0 bg-teal-400 rounded-full blur-lg opacity-20 -z-10 animate-pulse"></div>
          </div>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 font-light">
            Calculate your potential returns before investing. Our calculator
            provides accurate projections so you can invest with confidence.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Calculator Content */}
          <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 border border-gray-700/50">
            {/* Plan Selection */}
            <div className="mb-10">
              <h2 className="text-xl font-medium text-gray-300 mb-4">
                Investment Plan
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.entries(planInfo).map(([key, { name, color }]) => (
                  <button
                    key={key}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      plan === key
                        ? `bg-gradient-to-r ${color} text-white shadow-lg`
                        : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/50"
                    }`}
                    onClick={() => {
                      setPlan(key);
                      setProfit(calculateProfit(parseFloat(amount) || 0, key));
                    }}
                  >
                    {name.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-center">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${planInfo[plan].color} bg-opacity-20`}
                >
                  {planInfo[plan].name}
                </span>
              </div>
            </div>

            {/* Investment Input */}
            <div className="mb-8">
              <label className="block text-lg font-medium mb-3 text-gray-300">
                Investment Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl">$</span>
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full pl-10 pr-4 py-4 bg-gray-800/70 border border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>
            </div>

            {/* Profit Display */}
            <div className="mb-10">
              <label className="block text-lg font-medium mb-3 text-gray-300">
                Estimated Return
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl">$</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={profit + isCalculating}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full pl-10 pr-4 py-4 bg-gradient-to-r from-teal-900/30 to-cyan-900/20 border border-cyan-500/30 rounded-xl text-white text-xl font-medium"
                  >
                    {isCalculating ? (
                      <div className="flex items-center">
                        <span className="mr-2">Calculating</span>
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.6,
                                delay: i * 0.2,
                              }}
                              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span>{profit}</span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-xl text-white font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
            >
              <Link to="/LoginPage">
                {" "}
                Start Investing Now
                <span className="ml-2">→</span>
              </Link>
            </motion.button>

            {/* Multiplier Info */}
            <div className="mt-6 text-center text-gray-400 text-sm">
              <p>
                {planInfo[plan].name} offers {profitMultipliers[plan][0]}x -{" "}
                {profitMultipliers[plan][1]}x returns
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-10 left-1/4 w-6 h-6 rounded-full bg-cyan-500/30 blur-xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-teal-500/20 blur-xl"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}
