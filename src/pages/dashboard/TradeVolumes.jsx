import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const lineChartData = [
  { value: 10 },
  { value: 0 },
  { value: 100 },
  { value: 30 },
  { value: 88 },
  { value: 15 },
  { value: 115 },
  { value: 40 },
  { value: 65 },
];

const tradeVolumes = [3, 7, 5, 9, 6, 8, 4, 10, 2, 7];

export default function TradeVolumes({
  theme = "dark",
  borderColor = "border-gray-700",
  textColor = "text-white",
  secondaryText = "text-gray-400",
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [totalTrades, setTotalTrades] = useState(0); // default is now always 0

  const maxVolume = Math.max(...tradeVolumes);

  const gradientFrom = theme === "dark" ? "#1A1D2E" : "gray-50";
  const gradientTo = theme === "dark" ? "#121420" : "gray-100";
  const border = theme === "dark" ? "#2A2E45" : "#e5e7eb";

  return (
    <div className="font-sans">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row gap-5 mt-5">
          {/* Volume Bar Card */}
          <div
            className={`relative rounded-2xl p-5 flex-1 flex gap-6 lg:gap-8 items-center transition-all duration-500 
              border bg-gradient-to-br from-[${gradientFrom}] to-[${gradientTo}] border-[${border}] 
              hover:shadow-[0_10px_40px_-15px_rgba(0,199,255,0.5)] hover:border-teal-400 hover:scale-[1.02] h-[140px] overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-spin-slow">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-teal-500 rounded-full filter blur-[80px]"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-500 rounded-full filter blur-[80px]"></div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col">
              <span className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
                {totalTrades}
              </span>
              <span
                className={`text-sm lg:text-base font-medium ${secondaryText}`}
              >
                Total Trades
              </span>
            </div>

            <div className="relative z-10 flex mt-2 gap-2 flex-1 h-[80px] items-end">
              {tradeVolumes.map((height, i) => {
                const barHeight = (height / maxVolume) * 70;
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-1 relative justify-end flex-1 group"
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ease-out ${
                        hoverIndex === i
                          ? "bg-gradient-to-t from-teal-400 to-cyan-500 shadow-[0_0_15px_0px_rgba(0,199,255,0.7)]"
                          : "bg-gradient-to-t from-teal-500/70 to-cyan-400/70"
                      }`}
                      style={{
                        height: isMounted ? `${barHeight}px` : "0px",
                        transitionDelay: `${i * 50}ms`,
                      }}
                    ></div>

                    {hoverIndex === i && (
                      <div
                        className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg ${
                          theme === "dark"
                            ? "bg-gray-800 text-gray-100 border border-gray-700"
                            : "bg-white text-gray-800 border border-gray-200"
                        }`}
                      >
                        <div
                          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[6px] w-3 h-3 rotate-45 ${
                            theme === "dark" ? "bg-gray-800" : "bg-white"
                          } border-b border-r ${
                            theme === "dark"
                              ? "border-gray-700"
                              : "border-gray-200"
                          }`}
                        ></div>
                        {`Trade ${i + 1}: ${height} orders`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Line Chart Card */}
          <div
            className={`relative rounded-2xl p-5 flex flex-col transition-all duration-500 flex-1
              border bg-gradient-to-br from-[${gradientFrom}] to-[${gradientTo}] border-[${border}]
              hover:shadow-[0_10px_40px_-15px_rgba(0,199,255,0.5)] hover:border-teal-400 hover:scale-[1.02] h-[140px] overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-spin-slow">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-indigo-500 rounded-full filter blur-[80px]"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500 rounded-full filter blur-[80px]"></div>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${secondaryText}`}>
                  Total Won
                </p>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                  0
                </p>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded-md ${
                  theme === "dark"
                    ? "bg-indigo-900/50 text-indigo-300"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                +12.5% this week
              </div>
            </div>

            <div className="relative z-10 w-full h-[80px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineChartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00c8ff" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#00c8ff"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="none"
                    fill="url(#colorValue)"
                    fillOpacity={0.3}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#00c8ff"
                    strokeWidth={2}
                    dot={{
                      stroke: "#00c8ff",
                      strokeWidth: 2,
                      r: 3,
                      fill: theme === "dark" ? "#0f172a" : "#f8fafc",
                    }}
                    activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <XAxis dataKey="name" hide />
                  <YAxis hide domain={[0, 120]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                      borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }}
                    itemStyle={{
                      color: theme === "dark" ? "#cbd5e1" : "#334155",
                    }}
                    labelStyle={{
                      color: theme === "dark" ? "#94a3b8" : "#64748b",
                      fontWeight: 600,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          {[
            { title: "Avg. Trade Size", value: "42.7", change: "+3.2%" },
            { title: "Win Rate", value: "67.3%", change: "+5.1%" },
            { title: "Profit Factor", value: "1.85", change: "+0.12" },
            { title: "Max Drawdown", value: "12.4%", change: "-1.8%" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl transition-all duration-300 border 
                bg-gradient-to-br from-[${gradientFrom}] to-[${gradientTo}] border-[${border}]
                hover:shadow-[0_10px_20px_-10px_rgba(0,199,255,0.3)] hover:border-teal-400`}
            >
              <p className={`text-sm font-medium ${secondaryText}`}>
                {stat.title}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-xl font-bold">{stat.value}</p>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    stat.change.startsWith("+")
                      ? theme === "dark"
                        ? "bg-green-900/40 text-green-300"
                        : "bg-green-100 text-green-700"
                      : theme === "dark"
                      ? "bg-rose-900/40 text-rose-300"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
