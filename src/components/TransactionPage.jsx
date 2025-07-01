// src/components/TransactionPage.jsx
import { useTheme } from "next-themes";
import { useTransactions } from "../context/TransactionContext";

export default function TransactionPage() {
  const { theme } = useTheme();
  const { transactions } = useTransactions();

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Failed":
        return "text-red-500";
      default:
        return theme === "dark" ? "text-gray-300" : "text-gray-700";
    }
  };

  const getAmountColor = (type) => {
    return type === "Deposit" ? "text-green-500" : "text-red-500";
  };

  const getPaymentMethod = (tx) => {
    return (
      tx.method ||
      tx.paymentMethod ||
      (tx.signalDetails ? "Signal Subscription" : "N/A")
    );
  };

  const getTransactionDetails = (tx) => {
    return (
      tx.details ||
      tx.description ||
      (tx.signalDetails ? `Signal: ${tx.signalDetails.planName}` : "N/A")
    );
  };

  return (
    <div
      className={`min-h-screen p-4 pt-32 ${
        theme === "dark" ? "bg-slate-950" : "bg-gray-100"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto rounded-xl p-6 ${
          theme === "dark" ? "bg-slate-900" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Transaction History
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  theme === "dark" ? "border-slate-700" : "border-gray-200"
                }`}
              >
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Method</th>
                <th className="text-left p-3 hidden lg:table-cell">Details</th>
                <th className="text-left p-3 hidden md:table-cell">Date</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className={`border-b ${
                    theme === "dark"
                      ? "border-slate-800 hover:bg-slate-800"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3">{tx.type}</td>
                  <td className={`p-3 font-medium ${getAmountColor(tx.type)}`}>
                    {tx.type === "Withdrawal" ? "-" : "+"}${tx.amount}
                  </td>
                  <td className="p-3">{getPaymentMethod(tx)}</td>
                  <td className="p-3 hidden lg:table-cell">
                    {getTransactionDetails(tx)}
                  </td>
                  <td className="p-3 hidden md:table-cell">{tx.date}</td>
                  <td className={`p-3 ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length === 0 && (
            <div className="py-10 text-center">
              <p
                className={`text-lg ${
                  theme === "dark" ? "text-slate-500" : "text-gray-500"
                }`}
              >
                No transactions found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
