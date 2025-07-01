import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTransactions } from "../../context/TransactionContext";

export default function AdminTransactions({ defaultFilter = "All" }) {
  const { theme } = useTheme();
  const { transactions, pendingRequests, updateTransactionStatus } =
    useTransactions();
  const [filter, setFilter] = useState(defaultFilter);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  useEffect(() => {
    if (filter === "Pending") {
      setDisplayedTransactions(pendingRequests);
    } else if (filter === "All") {
      setDisplayedTransactions(transactions);
    } else {
      setDisplayedTransactions(
        transactions.filter((tx) => tx.status === filter)
      );
    }
  }, [filter, transactions, pendingRequests]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateTransactionStatus(id, status);
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "All"
                ? "bg-teal-500 text-white"
                : theme === "dark"
                ? "bg-slate-700"
                : "bg-gray-200"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "Pending"
                ? "bg-yellow-500 text-white"
                : theme === "dark"
                ? "bg-slate-700"
                : "bg-gray-200"
            }`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "Completed"
                ? "bg-green-500 text-white"
                : theme === "dark"
                ? "bg-slate-700"
                : "bg-gray-200"
            }`}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "Rejected"
                ? "bg-red-500 text-white"
                : theme === "dark"
                ? "bg-slate-700"
                : "bg-gray-200"
            }`}
            onClick={() => setFilter("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr
            className={`border-b ${
              theme === "dark" ? "border-slate-700" : "border-gray-200"
            }`}
          >
            <th className="text-left p-3">User</th>
            <th className="text-left p-3">Type</th>
            <th className="text-left p-3">Amount</th>
            <th className="text-left p-3">Method</th>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.map((tx) => (
            <tr
              key={tx.id}
              className={`border-b ${
                theme === "dark"
                  ? "border-slate-800 hover:bg-slate-800"
                  : "border-gray-100 hover:bg-gray-50"
              }`}
            >
              <td className="p-3">{tx.userName || "N/A"}</td>
              <td className="p-3">{tx.type}</td>
              <td className={`p-3 font-medium`}>${tx.amount}</td>
              <td className="p-3">{tx.method}</td>
              <td className="p-3">{formatDate(tx.date)}</td>
              <td
                className={`p-3 ${
                  tx.status === "Completed"
                    ? "text-green-500"
                    : tx.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {tx.status}
              </td>
              <td className="p-3">
                {tx.status === "Pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(tx.id, "Completed")}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(tx.id, "Rejected")}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {displayedTransactions.length === 0 && (
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
  );
}
