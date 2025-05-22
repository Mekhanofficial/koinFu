import { useTheme } from "next-themes";

export default function MyCopyTradersPage() {
  const { theme } = useTheme();

  return (
    <>
      <section
        className={`px-10 min-h-screen text-center ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        <h1
          className={`text-3xl font-bold ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          My Copy Traders
        </h1>
        <p
          className={`text-lg mt-7 rounded-3xl p-10 transition-all duration-300 border ${
            theme === "dark"
              ? "bg-slate-900 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 text-gray-500"
              : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/50 text-gray-400"
          } hover:scale-105 hover:shadow-lg`}
        >
          No copy traders yet.
        </p>
      </section>
    </>
  );
}
