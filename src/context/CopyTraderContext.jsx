import { createContext, useContext, useState, useEffect } from "react";

const CopyTradersContext = createContext();

export function CopyTradersProvider({ children }) {
  const [copiedTraders, setCopiedTraders] = useState([]);

  // Load from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("copiedTraders");
    if (saved) {
      setCopiedTraders(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever copiedTraders changes
  useEffect(() => {
    localStorage.setItem("copiedTraders", JSON.stringify(copiedTraders));
  }, [copiedTraders]);

  const addCopiedTrader = (trader) => {
    setCopiedTraders((prev) =>
      prev.some((t) => t.id === trader.id) ? prev : [...prev, trader]
    );
  };

  const removeCopiedTrader = (id) => {
    setCopiedTraders((prev) => prev.filter((trader) => trader.id !== id));
  };

  return (
    <CopyTradersContext.Provider
      value={{ copiedTraders, addCopiedTrader, removeCopiedTrader }}
    >
      {children}
    </CopyTradersContext.Provider>
  );
}

export function useCopyTraders() {
  return useContext(CopyTradersContext);
}
