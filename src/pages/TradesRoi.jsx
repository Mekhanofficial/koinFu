import { useTheme } from "next-themes";
import HeaderPage from "../components/Header";

export default function TradesRoiPage() {
  const { theme } = useTheme();

  return (
    <>
      <HeaderPage />
      <section
        className={`min-h-screen overflow-x-hidden px-10 py-14 ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        {/* Recent Trades Section */}
        <div
          className={`font-semibold rounded-md mx-10 p-5 border top-20 relative transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 text-white"
              : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/50 text-gray-800"
          } hover:scale-105`}
        >
          <h1
            className={`font-semibold text-xl mb-6 text-center lg:text-left ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Recent Trades
          </h1>

          {/* Horizontal Scroll Wrapper */}
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <div
                className={`flex justify-between items-center border-b pb-2 ${
                  theme === "dark"
                    ? "border-gray-700 text-gray-400"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <h2 className="px-4">ID</h2>
                <h2 className="px-4">Type</h2>
                <div className="flex items-center gap-8 lg:gap-16 px-4">
                  <h2>Trade Time</h2>
                  <h2>Amount</h2>
                </div>
                <h2 className="px-4">Pair</h2>
                <div className="flex items-center gap-8 lg:gap-16 px-4">
                  <h2>Action</h2>
                  <h2>Entry</h2>
                  <h2>SL</h2>
                  <h2>TP</h2>
                  <h2>Time in Force</h2>
                  <h2>Result</h2>
                  <h2>Details</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <h1
            className={`text-2xl text-center mt-10 font-bold ${
              theme === "dark" ? "text-slate-500" : "text-gray-400"
            }`}
          >
            You haven't placed any trades.
          </h1>
        </div>
      </section>
    </>
  );
}
