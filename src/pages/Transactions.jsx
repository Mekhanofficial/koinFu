import { useTheme } from "next-themes";
import HeaderPage from "../components/Header";

export default function TransactionPage() {
  const { theme } = useTheme();

  return (
    <>
      <div className={`min-h-screen p-4 ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'
      }`}>
        <div className={`font-semibold rounded-md relative top-28 p-5 mx-10 hover:shadow-lg transition-all duration-300 border overflow-x-auto ${
          theme === 'dark' 
            ? 'bg-slate-900 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50' 
            : 'bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/50'
        } hover:scale-[1.01]`}>
          <h1 className={`text-lg mb-10 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            All Transactions
          </h1>

          <div className="min-w-max">
            <div className={`grid grid-cols-7 gap-16 text-sm md:text-base text-center ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <h2>ID</h2>
              <h2>Type</h2>
              <h2>Amount</h2>
              <h2>Method</h2>
              <h2>Details</h2>
              <h2>Date</h2>
              <h2>Status</h2>
            </div>
          </div>

          <h1 className={`text-2xl text-center mt-10 font-semibold ${
            theme === 'dark' ? 'text-slate-500' : 'text-gray-400'
          }`}>
            No Recent Transactions
          </h1>
        </div>
      </div>
    </>
  );
}