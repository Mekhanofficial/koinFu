import { useState } from "react";
import { FaEnvelope, FaCheck, FaArrowLeft } from "react-icons/fa";
import HeaderPage from "../components/Header";

export default function EmailUpdatePage() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (email !== confirmEmail) {
      newErrors.confirmEmail = "Emails do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setEmail("");
        setConfirmEmail("");
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <HeaderPage />
      
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Header with back button */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative">
            <button 
              className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft className="text-white text-lg" />
            </button>
            <div className="flex items-center justify-center">
              <div className="bg-white/20 p-3 rounded-full">
                <FaEnvelope className="text-white text-3xl" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mt-4">
              {isSuccess ? "Email Updated!" : "Update Your Email"}
            </h1>
          </div>
          
          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="text-green-600 dark:text-green-400 text-3xl" />
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  Your email has been updated successfully!
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  You'll receive a confirmation email shortly.
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Enter your new email address below. We'll send a verification link to your new email.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 w-full p-3 rounded-lg border ${
                          errors.email ? "border-red-500" : "border-gray-300 dark:border-slate-700"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700/50 dark:text-white`}
                        placeholder="your.new@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        className={`pl-10 w-full p-3 rounded-lg border ${
                          errors.confirmEmail ? "border-red-500" : "border-gray-300 dark:border-slate-700"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700/50 dark:text-white`}
                        placeholder="confirm.new@email.com"
                      />
                    </div>
                    {errors.confirmEmail && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmEmail}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${
                      isLoading 
                        ? "bg-blue-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </div>
                    ) : "Update Email"}
                  </button>
                </form>
                
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 flex items-center">
                    <FaCheck className="mr-2" /> Important Information
                  </h3>
                  <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
                    <li>You'll need to verify your new email address</li>
                    <li>Your login credentials will remain the same</li>
                    <li>All account notifications will be sent to the new email</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}