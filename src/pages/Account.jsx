import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faStar,
  faMoneyBill,
  faEnvelope,
  faImage,
  faLock,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function AccountPage() {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "User",
          email: currentUser.email || "user@example.com",
          photoURL: currentUser.photoURL || null,
        });
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 relative ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-950 to-slate-900 text-white"
          : "bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800"
      }`}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8 text-center">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 hover:border-teal-500 shadow-lg hover:shadow-xl transition-all duration-300"
          />
        ) : (
          <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-700 hover:border-teal-500">
            <FontAwesomeIcon
              icon={faImage}
              className="text-7xl text-slate-400 hover:text-teal-500 transition-all duration-300"
            />
          </div>
        )}
        <h2 className="text-3xl font-bold mt-4">{user.name}</h2>
        <p
          className={`text-sm mt-1 ${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}
        >
          {user.email}
        </p>
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl p-4">
        <Button
          icon={faUserFriends}
          text="Referrals"
          iconColor="text-teal-400"
          theme={theme}
          onClick={() => navigate("/referrals")}
        />
        <Button
          icon={faSignOutAlt}
          text="Logout"
          iconColor="text-red-400"
          theme={theme}
          onClick={() => setShowLogoutModal(true)}
        />
        <Button
          icon={faStar}
          text="Watch List"
          iconColor="text-yellow-400"
          theme={theme}
          onClick={() => navigate("/watchlist")}
        />
        <Button
          icon={faEnvelope}
          text="Update Email"
          iconColor="text-blue-400"
          theme={theme}
          onClick={() => navigate("/update-email")}
        />
        <Button
          icon={faMoneyBill}
          text="Withdrawals"
          iconColor="text-green-400"
          theme={theme}
          onClick={() => navigate("/withdrawals")}
        />
        <Button
          icon={faImage}
          text="Update Photo"
          iconColor="text-pink-400"
          theme={theme}
          onClick={() => navigate("/updatephotopage")}
        />
        <Button
          icon={faLock}
          text="Update Password"
          iconColor="text-purple-400"
          theme={theme}
          onClick={() => navigate("/update-password")}
        />
        <Button
          icon={faCog}
          text="Account Settings"
          iconColor="text-orange-400"
          theme={theme}
          onClick={() => navigate("/account-settings")}
        />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            className={`rounded-xl p-6 w-full max-w-md shadow-2xl animate-fade-in ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            } border`}
          >
            <div className="flex items-center gap-3 mb-4">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="text-red-500 text-xl"
              />
              <h3
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Confirm Logout
              </h3>
            </div>
            <p
              className={theme === "dark" ? "text-slate-300" : "text-gray-600"}
            >
              You'll need to sign in again to access your account.
            </p>

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className={`px-4 py-2 rounded-lg border transition-colors disabled:opacity-50 ${
                  theme === "dark"
                    ? "border-slate-600 text-white hover:bg-slate-700"
                    : "border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging Out...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Log Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Button({ icon, text, iconColor, onClick, theme }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center p-5 w-full rounded-lg text-left shadow-md transition-all transform hover:scale-105 hover:shadow-xl sm:text-base text-sm duration-300 border ${
        theme === "dark"
          ? "bg-slate-800 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 text-white"
          : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/50 text-gray-800"
      }`}
    >
      <FontAwesomeIcon icon={icon} className={`text-lg mr-3 ${iconColor}`} />
      {text}
    </button>
  );
}
