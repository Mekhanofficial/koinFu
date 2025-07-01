import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const updateUserBalance = (userId, amount, actionType) => {
    setUserData((prev) => {
      if (!prev || prev.uid !== userId) return prev;

      const newBalance = prev.balance + amount;
      return {
        ...prev,
        balance: newBalance,
        transactions: [
          ...(prev.transactions || []),
          {
            id: Date.now().toString(),
            type: actionType,
            amount: Math.abs(amount),
            date: new Date().toISOString(),
            status: "Completed",
          },
        ],
      };
    });
    return Promise.resolve();
  };

  const loginUser = (user) => {
    setUserData({
      uid: user.uid,
      email: user.email,
      firstName: user.firstName || "User",
      lastName: user.lastName || "",
      balance: user.balance || 1000, // Default balance
      status: "active",
    });
  };

  const logoutUser = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        loginUser,
        logoutUser,
        updateUserBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
