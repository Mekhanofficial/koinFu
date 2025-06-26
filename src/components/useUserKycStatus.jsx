// src/hooks/useUserKycStatus.js
import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export function useUserKycStatus() {
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setKycStatus("not_verified");
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setKycStatus(data.kycStatus || "not_verified");
      } else {
        setKycStatus("not_verified");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { kycStatus, loading };
}
