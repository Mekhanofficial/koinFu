import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faWallet,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function StatsGrid({ theme, borderColor, secondaryText }) {
  const stats = [
    { label: "0 Live", value: 0, icon: faChartLine, color: "green" },
    { label: "Last Profit", value: 0, icon: faCoins, color: "yellow" },
    { label: "Capital", value: 0, icon: faWallet, color: "teal" },
    { label: "Rewards", value: 0, icon: faCoins, color: "blue" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const isLive = stat.label.includes("Live");
        const baseColor = stat.color || "teal";

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
              hover:border-${baseColor}-400 hover:shadow-${baseColor}-400/50 hover:scale-105
            `}
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                className={`bg-${baseColor}-600 p-2 lg:p-3 rounded-full`}
              >
                <FontAwesomeIcon
                  icon={stat.icon}
                  className="h-4 lg:h-5 text-white"
                />
              </motion.div>
              <div>
                <h3
                  className={`text-xl lg:text-2xl font-bold text-${baseColor}-300`}
                >
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
                      <span className="relative inline-flex h-2.5 w-2.5 bg-green-500 rounded-full"></span>
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
  );
}
