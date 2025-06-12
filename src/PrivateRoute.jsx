import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate, Outlet } from "react-router-dom";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-50">
    <div className="relative">
      {/* Modern multi-layer spinner */}
      <div className="w-24 h-24 rounded-full border-4 border-slate-700">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-teal-500 animate-spin-slow"></div>
        <div className="absolute inset-0 rounded-full border-4 border-l-transparent border-teal-300 animate-spin-reverse"></div>
      </div>

      {/* Animated gradient center */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white animate-pulse"></div>
      </div>

      {/* Progress text with fade animation */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
        <span className="text-teal-200 text-sm font-medium tracking-wider animate-fade-in-out">
          Loading...
        </span>
      </div>
    </div>
  </div>
);

export const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />;

  return user ? <Outlet /> : <Navigate to="/LoginPage" replace />;
};


