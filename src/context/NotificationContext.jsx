import { useState, useEffect, createContext, useContext } from 'react';
import { useTransactions } from './TransactionContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const { transactions } = useTransactions();

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || []);
    setNotifications(savedNotifications);
    setUnreadCount(savedNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (message, type = 'info', data = {}) => {
    const newNotification = {
      id: Date.now(),
      text: message,
      type,
      data,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadCount(prev => {
      const notification = notifications.find(n => n.id === id);
      return notification && !notification.read ? prev - 1 : prev;
    });
  };

  const removeAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Watch for new transactions and create notifications
  useEffect(() => {
    if (transactions.length > 0) {
      const latestTx = transactions[0];
      
      let message = '';
      switch(latestTx.type.toLowerCase()) {
        case 'deposit':
          message = `Deposit of $${latestTx.amount} completed`;
          break;
        case 'withdrawal':
          message = `Withdrawal of $${latestTx.amount} initiated`;
          break;
        case 'subscription':
          message = `Subscription to ${latestTx.method} plan activated`;
          break;
        case 'signal':
          message = `Signal service ${latestTx.signalDetails?.planName} purchased`;
          break;
        case 'bot':
          message = `${latestTx.botDetails?.name} trading bot activated`;
          break;
        default:
          message = `Transaction completed: ${latestTx.description}`;
      }

      addNotification(message, 'transaction', latestTx);
    }
  }, [transactions]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      showPanel,
      setShowPanel,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      removeAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);