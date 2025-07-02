// src/context/NotificationContext.js
import { useState, useEffect, createContext, useContext } from "react";
import { useTransactions } from "./TransactionContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const { transactions = [] } = useTransactions(); // Default to empty array

  // Load notifications from localStorage
  useEffect(() => {
    try {
      const savedNotifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );
      setNotifications(savedNotifications);
      setUnreadCount(savedNotifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Add new notification
  const addNotification = (message, type = "info", data = {}) => {
    const newNotification = {
      id: Date.now(),
      text: message,
      type,
      data,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => {
      const notification = notifications.find((n) => n.id === id);
      return notification && !notification.read ? prev - 1 : prev;
    });
  };

  // Remove all notifications
  const removeAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Handle transaction notifications
  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    const latestTx = transactions[0];
    if (!latestTx?.type) return;

    let message = "";
    let notificationType = "transaction";

    try {
      switch (latestTx.type.toLowerCase()) {
        case "deposit":
          message = `Deposit of $${latestTx.amount || 0} ${
            latestTx.status?.toLowerCase() || "processed"
          }`;
          notificationType =
            latestTx.status === "Completed" ? "success" : "info";
          break;
        case "withdrawal":
          message = `Withdrawal of $${latestTx.amount || 0} ${
            latestTx.status?.toLowerCase() || "processed"
          }`;
          notificationType =
            latestTx.status === "Completed"
              ? "success"
              : latestTx.status === "Rejected"
              ? "error"
              : "info";
          break;
        case "subscription":
          message = `Subscription to ${latestTx.method || "plan"} activated`;
          break;
        case "signal":
          message = `Signal service ${
            latestTx.signalDetails?.planName || "signal"
          } purchased`;
          break;
        case "bot":
          message = `${latestTx.botDetails?.name || "Trading"} bot activated`;
          break;
        default:
          message = `Transaction ${
            latestTx.status?.toLowerCase() || "processed"
          }: ${latestTx.description || "Completed"}`;
      }

      if (message) {
        addNotification(message, notificationType, latestTx);
      }
    } catch (error) {
      console.error("Error creating transaction notification:", error);
    }
  }, [transactions]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        showPanel,
        setShowPanel,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        removeAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
