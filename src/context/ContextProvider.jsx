"use client";

import { UserContext } from "./UserContext";
import { useState, useEffect, use } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const userAuth = async (currentUser) => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser?.uid);

      const docSnap = getDoc(docRef);

      setUser({ id: currentUser?.uid, ...(await docSnap).data() });
      return;
    }

    setUser(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      userAuth(currentUser);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
