import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TradeProgress({
  theme,
  borderColor,
  initialProgress = 0,
}) {
  const [progress, setProgress] = useState(initialProgress);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const trackColor = theme === "dark" ? "bg-slate-800" : "bg-slate-200";
  const textColor = theme === "dark" ? "text-white" : "text-slate-900";
  const secondaryText = theme === "dark" ? "text-slate-300" : "text-slate-600";

  const getStatusText = () => {
    if (progress < 30) return "Initializing trade";
    if (progress < 70) return "Processing transaction";
    if (progress < 100) return "Finalizing details";
    return "Trade completed!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl p-3 mb-4 shadow-xl ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-100 to-slate-300"
      } border ${borderColor} transition-all duration-300`}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <>
          <motion.div
            className="absolute top-8 -left-8 w-36 h-36 rounded-full bg-teal-400 opacity-10 blur-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-4 -right-4 w-24 h-24 rounded-full bg-indigo-400 opacity-10 blur-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </>
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2
              className={`text-base lg:text-lg font-bold mb-0.5 ${textColor}`}
            >
              Trade Progress
            </h2>
            <p
              className={`text-xs ${secondaryText} transition-all duration-300 ${
                isHovered ? "opacity-100" : "opacity-80"
              }`}
            >
              {getStatusText()}
            </p>
          </div>
          <motion.div
            className={`text-lg lg:text-xl font-bold bg-clip-text ${
              progress < 100
                ? "text-transparent bg-gradient-to-r from-cyan-400 to-teal-500"
                : "text-emerald-400"
            }`}
            key={progress}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {progress}%
          </motion.div>
        </div>

        <div
          className={`${trackColor} rounded-full h-2.5 overflow-hidden mb-2`}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {progress > 0 && progress < 100 && (
              <motion.div
                className="absolute right-0 top-0 h-full w-1 bg-white opacity-70"
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            )}
          </motion.div>
        </div>

        <div className="flex justify-between text-[10px] mt-3">
          {[0, 25, 50, 75, 100].map((milestone) => (
            <div key={milestone} className="flex flex-col items-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  progress >= milestone
                    ? "bg-teal-400 ring-2 ring-teal-400/30"
                    : trackColor
                } mb-0.5`}
              />
              <span className={`${secondaryText}`}>{milestone}%</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`px-3 py-1.5 rounded-lg font-medium text-xs ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                : "bg-slate-200 hover:bg-slate-300 text-slate-700"
            } transition-colors`}
          >
            View Details
          </motion.button>

          {progress === 100 ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium text-xs shadow-lg shadow-emerald-500/20"
            >
              Complete Trade
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setProgress(0)}
              className={`px-3 py-1.5 rounded-lg font-medium text-xs ${
                theme === "dark"
                  ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-700"
              } transition-colors`}
            >
              Reset Demo
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
