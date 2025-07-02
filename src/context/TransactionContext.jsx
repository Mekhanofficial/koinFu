import { createContext, useContext, useState, useCallback } from "react";
import { useUser } from "./UserContext";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const { userData, updateUserBalance } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const addTransaction = useCallback(async (transactionData) => {
    setLoading(true);
    try {
      const newTransaction = {
        ...transactionData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };

      setTransactions(prev => [newTransaction, ...prev]);
      
      if (transactionData.type === "Deposit") {
        setPendingRequests(prev => [newTransaction, ...prev]);
        setNotificationCount(prev => prev + 1);
      }

      return newTransaction.id;
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTransactionStatus = useCallback(async (id, status) => {
    setLoading(true);
    try {
      setTransactions(prev => 
        prev.map(tx => tx.id === id ? { ...tx, status } : tx)
      );
      
      setPendingRequests(prev => 
        prev.map(req => req.id === id ? { ...req, status } : req)
      );

      // If deposit is approved, update user balance
      if (status === "Completed") {
        const transaction = transactions.find(t => t.id === id);
        if (transaction?.type === "Deposit" && userData) {
          await updateUserBalance(
            userData.uid, 
            parseFloat(transaction.amount),
            "Deposit"
          );
        }
      }

      if (status !== "Pending") {
        setNotificationCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [transactions, userData, updateUserBalance]);

  const clearNotifications = useCallback(() => {
    setNotificationCount(0);
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        pendingRequests,
        loading,
        notificationCount,
        pendingRequestsCount: notificationCount,
        addTransaction,
        updateTransactionStatus,
        clearNotifications,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
}