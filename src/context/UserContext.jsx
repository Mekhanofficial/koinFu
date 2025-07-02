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
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  const updateUserBalance = (userId, amount, actionType) => {
    return new Promise((resolve) => {
      setUserData((prev) => {
        if (!prev || prev.uid !== userId) return prev;

        const newBalance = prev.balance + amount;
        const updatedUser = {
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
        resolve(updatedUser);
        return updatedUser;
      });
    });
  };

  const loginUser = (user) => {
    const newUserData = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName || "User",
      lastName: user.lastName || "",
      balance: user.balance || 1000,
      status: "active",
    };
    setUserData(newUserData);
    return newUserData;
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
