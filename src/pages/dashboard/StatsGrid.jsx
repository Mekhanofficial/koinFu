import imageChartLine from "../../pictures/depositicon.png";
import imageCoins from "../../pictures/tradeicon.png";
import imageWallet from "../../pictures/depositicon.png";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function StatsGrid({ theme, borderColor, secondaryText }) {
  const stats = [
    { label: "0 Live", value: 0, icon: imageChartLine, color: "green" },
    { label: "Last Profit", value: 0, icon: imageCoins, color: "teal" },
    { label: "Capital", value: 0, icon: imageWallet, color: "green" },
    { label: "Rewards", value: 0, icon: imageCoins, color: "teal" },
  ];

  return (
    <div className="flex">
     

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-4">
        {stats.map((stat, index) => {
          const isLive = stat.label.includes("Live");
          const baseColor = stat.color || "teal";

          // Fixed color classes
          const textColor =
            baseColor === "green" ? "text-green-300" : "text-teal-300";
          const borderHover =
            baseColor === "green"
              ? "hover:border-green-400"
              : "hover:border-teal-400";
          const shadowHover =
            baseColor === "green"
              ? "hover:shadow-green-400/50"
              : "hover:shadow-teal-400/50";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`
                bg-gradient-to-r ${
                  theme === "dark"
                    ? isLive
                      ? "from-slate-800 to-slate-900"
                      : "from-slate-700 to-slate-950"
                    : "from-slate-200 to-slate-400"
                }
                rounded-lg p-4 lg:p-6 shadow-lg 
                transition-all duration-300 
                border ${borderColor} 
                ${borderHover} ${shadowHover} hover:scale-105
              `}
            >
              <div className="flex items-center gap-4">
                {/* Fixed icon background */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  className={`p-2 lg:p-3 rounded-full ${
                    theme === "dark" ? "bg-slate-800" : "bg-slate-200"
                  }`}
                >
                  <img
                    src={stat.icon}
                    alt={stat.label}
                    className="h-10 w-10 object-contain"
                  />
                </motion.div>
                <div>
                  <h3 className={`text-xl lg:text-2xl font-bold ${textColor}`}>
                    <CountUp
                      end={stat.value}
                      decimals={2}
                      prefix="$"
                      duration={1.5}
                    />
                  </h3>
                  <p
                    className={`text-xs lg:text-sm ${secondaryText} flex items-center`}
                  >
                    {isLive && (
                      <span className="relative inline-flex mr-2">
                        <span className="absolute inline-flex h-2.5 w-2.5 bg-green-400 rounded-full opacity-75 animate-ping"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 bg-green-900 rounded-full"></span>
                      </span>
                    )}
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
