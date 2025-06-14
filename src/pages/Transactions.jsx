import { useTheme } from "next-themes";

export default function TransactionPage() {
  const { theme } = useTheme();

  return (
    <>

      <div
        className={`min-h-screen p-4 pt-32 ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        <div
          className={`font-semibold rounded-md p-4 sm:p-5 md:p-6 mx-2 sm:mx-5 md:mx-10 hover:shadow-lg transition-all duration-300 border overflow-auto ${
            theme === "dark"
              ? "bg-slate-900 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50"
              : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/50"
          } hover:scale-[1.01]`}
        >
          <h1
            className={`text-base sm:text-lg mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            All Transactions
          </h1>

          <div className="min-w-full overflow-x-auto">
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 md:gap-10 lg:gap-16 text-xs sm:text-sm md:text-base text-center whitespace-nowrap ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <h2>ID</h2>
              <h2>Type</h2>
              <h2>Amount</h2>
              <h2>Method</h2>
              <h2 className="hidden lg:block">Details</h2>
              <h2 className="hidden md:block">Date</h2>
              <h2 className="hidden sm:block">Status</h2>
            </div>
          </div>

          <h1
            className={`text-xl sm:text-2xl text-center mt-10 font-semibold ${
              theme === "dark" ? "text-slate-500" : "text-gray-400"
            }`}
          >
            No Recent Transactions
          </h1>
        </div>
      </div>
    </>
  );
}
