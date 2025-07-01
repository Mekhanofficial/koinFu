import { createContext, useContext, useState, useCallback } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all transactions from Firestore
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const transactionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user data
  const fetchUserData = useCallback(async (userId) => {
    setLoading(true);
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: "Pending",
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransactionStatus = async (id, status) => {
    try {
      // Update in Firestore
      const txRef = doc(db, "transactions", id);
      await updateDoc(txRef, { status });

      // Update local state
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === id ? { ...tx, status } : tx))
      );
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  const addPendingRequest = (request) => {
    const newRequest = {
      ...request,
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: "Pending",
    };
    setPendingRequests((prev) => [newRequest, ...prev]);
  };

  const updatePendingRequestStatus = (id, status) => {
    setPendingRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  // Calculate pending requests count
  const pendingRequestsCount = pendingRequests.filter(
    (req) => req.status === "Pending"
  ).length;

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        pendingRequests,
        userData,
        loading,
        pendingRequestsCount,
        fetchTransactions,
        fetchUserData,
        addTransaction,
        updateTransactionStatus,
        addPendingRequest,
        updatePendingRequestStatus,
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
