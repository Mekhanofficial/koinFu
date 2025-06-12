import depositIcon from "../../pictures/depositicon.png";
import withdrawIcon from "../../pictures/withdrawicon.png";
import tradeIcon from "../../pictures/tradeicon.png";
import historyIcon from "../../pictures/historyicon.png";

export default function QuickActions({ theme }) {
  const isDark = theme === "dark";

  const actions = [
    {
      icon: depositIcon,
      label: "DEPOSIT",
      color: "text-emerald-400",
      ring: "ring-emerald-500/40",
    },
    {
      icon: withdrawIcon,
      label: "WITHDRAW",
      color: "text-rose-400",
      ring: "ring-rose-500/40",
    },
    {
      icon: tradeIcon,
      label: "TRADE",
      color: "text-sky-400",
      ring: "ring-sky-500/40",
    },
    {
      icon: historyIcon,
      label: "HISTORY",
      color: "text-amber-400",
      ring: "ring-amber-500/40",
    },
  ];

  return (
    <div
      className={`rounded-3xl p-6 mb-6 transition-all duration-500 border-2 shadow-2xl hover:scale-[1.02] hover:border-teal-400 hover:shadow-teal-400/20
        ${
          isDark
            ? "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-slate-700 shadow-slate-900/50"
            : "bg-gradient-to-br from-slate-300 via-slate-100 to-slate-400 border-slate-200 shadow-slate-300/30"
        }`}
    >
      <h2
        className={`text-xl font-bold mb-6 text-center tracking-wider ${
          isDark ? "text-teal-300" : "text-teal-600"
        }`}
      >
        QUICK ACTIONS
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`relative w-16 h-16 flex items-center justify-center rounded-full shadow-md transition-all duration-300
                ${
                  isDark
                    ? "bg-slate-950 border border-slate-700"
                    : "bg-white border border-slate-300"
                }
                ${action.ring} ${action.color} group-hover:-translate-y-1`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-white/10 pointer-events-none" />

              <img
                src={action.icon}
                alt={action.label}
                className={`object-contain transition-transform duration-300 group-hover:scale-110 group-hover:animate-shake
    ${
      action.label === "WITHDRAW"
        ? "h-12 w-12" // Slightly bigger withdraw icon
        : "h-9 w-10"
    }`}
              />
            </div>
            <p
              className={`mt-4 text-sm font-semibold tracking-wide transition-colors duration-300
                ${
                  isDark
                    ? "text-slate-300 group-hover:text-teal-300"
                    : "text-slate-600 group-hover:text-teal-600"
                }`}
            >
              {action.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
