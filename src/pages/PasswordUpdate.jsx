import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaCheck, FaEnvelope } from "react-icons/fa";
import { auth } from "../../firebase";
import { 
  reauthenticateWithCredential, 
  EmailAuthProvider,
  updatePassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function PasswordUpdate() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one special character";
    }
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const user = auth.currentUser;
      
      // Reauthenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      // Send email notification (simulated)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsSuccess(false);
        navigate("/account");
      }, 3000);
      
    } catch (error) {
      let errorMessage = "Failed to update password";
      
      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "Incorrect current password";
          break;
        case "auth/requires-recent-login":
          errorMessage = "This operation requires recent authentication. Please log in again.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
        default:
          errorMessage = error.message;
      }
      
      setErrors({ form: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 p-6 relative">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex justify-center">
            <div className="bg-white/20 p-4 rounded-full">
              <FaLock className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mt-4">
            {isSuccess ? "Password Updated!" : "Update Password"}
          </h1>
        </div>
        
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-green-400 text-3xl" />
              </div>
              <p className="text-lg font-medium text-white">
                Your password has been updated successfully!
              </p>
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700 flex items-start">
                <FaEnvelope className="text-blue-400 text-xl mt-1 mr-3" />
                <p className="text-blue-300 text-left">
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-slate-400" />
                  </div>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`pl-10 w-full p-3 rounded-lg border ${
                      errors.currentPassword ? "border-red-500" : "border-slate-700"
                    } focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-700/50 text-white`}
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-slate-400" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`pl-10 w-full p-3 rounded-lg border ${
                      errors.newPassword ? "border-red-500" : "border-slate-700"
                    } focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-700/50 text-white`}
                    placeholder="Create a new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
                )}
                <div className="mt-2 p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-slate-400 text-sm font-medium mb-2">
                    Password Requirements:
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1">
                    <li className={`flex items-center ${newPassword.length >= 8 ? 'text-teal-400' : ''}`}>
                      <span className="mr-2">•</span> At least 8 characters
                    </li>
                    <li className={`flex items-center ${/[A-Z]/.test(newPassword) ? 'text-teal-400' : ''}`}>
                      <span className="mr-2">•</span> One uppercase letter
                    </li>
                    <li className={`flex items-center ${/[0-9]/.test(newPassword) ? 'text-teal-400' : ''}`}>
                      <span className="mr-2">•</span> One number
                    </li>
                    <li className={`flex items-center ${/[!@#$%^&*]/.test(newPassword) ? 'text-teal-400' : ''}`}>
                      <span className="mr-2">•</span> One special character
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-10 w-full p-3 rounded-lg border ${
                      errors.confirmPassword ? "border-red-500" : "border-slate-700"
                    } focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-700/50 text-white`}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              {errors.form && (
                <div className="p-3 bg-red-900/30 rounded-lg border border-red-700">
                  <p className="text-red-400 text-center">{errors.form}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-lg transition-all ${
                  loading 
                    ? "bg-teal-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating Password...
                  </div>
                ) : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-500 text-sm max-w-md">
        <p>
          For security reasons, we require your current password to update your account credentials.
          An email notification will be sent to your registered address after any password change.
        </p>
      </div>
    </div>
  );
}