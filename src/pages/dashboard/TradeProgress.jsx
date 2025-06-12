export default function TradeProgress({ theme, borderColor }) {
  return (
    <div
      className={`bg-gradient-to-r ${
        theme === "dark"
          ? "from-slate-700 to-slate-950"
          : "from-slate-200 to-slate-400"
      } rounded-lg p-4 lg:p-6 mb-6 shadow-lg hover:shadow-lg transition-all duration-300 border ${borderColor} hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105`}
    >
      <h2 className="text-xl lg:text-2xl font-bold mb-4">Trade Progress</h2>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl lg:text-4xl font-bold">0%</h3>
        <div className="w-3/4 h-2 bg-teal-600 rounded-full">
          <div
            className="h-2 bg-teal-400 rounded-full"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
