import { useState } from "react";
import { useTheme } from "next-themes";
import HeaderPage from "../components/Header";

// Custom Alert Component with theme support
const CustomAlert = ({ message, onClose }) => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div
        className={`p-6 rounded-lg shadow-lg border max-w-md w-full ${
          theme === "dark"
            ? "bg-slate-900 border-slate-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <p>{message}</p>
        <button
          onClick={onClose}
          className={`mt-4 w-full p-2 rounded-md transition ${
            theme === "dark"
              ? "bg-teal-700 hover:bg-teal-600 text-white"
              : "bg-teal-600 hover:bg-teal-500 text-white"
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function WithdrawalPage() {
  const { theme } = useTheme();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [formData, setFormData] = useState({
    cryptoAsset: "BTC",
    amount: "",
    btcAddress: "",
    bankAccountNumber: "",
    bankName: "",
    cashAppId: "",
    paypalEmail: "",
    skrillEmail: "",
  });
  const [balance] = useState(1000);
  const [alertMessage, setAlertMessage] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentOptions(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWithdrawal = () => {
    if (!selectedPaymentMethod) {
      setAlertMessage("Please select a payment method.");
      return;
    }

    switch (selectedPaymentMethod) {
      case "Crypto":
        if (!formData.cryptoAsset || !formData.amount || !formData.btcAddress) {
          setAlertMessage(
            "Please fill in all required fields for crypto withdrawal."
          );
          return;
        }
        break;
      case "Bank Transfer":
        if (!formData.bankAccountNumber || !formData.bankName) {
          setAlertMessage(
            "Please fill in all required fields for bank transfer."
          );
          return;
        }
        break;
      case "Cash App":
        if (!formData.cashAppId) {
          setAlertMessage("Please enter your Cash App ID.");
          return;
        }
        break;
      case "PayPal":
        if (!formData.paypalEmail) {
          setAlertMessage("Please enter your PayPal email.");
          return;
        }
        break;
      case "Skrill":
        if (!formData.skrillEmail) {
          setAlertMessage("Please enter your Skrill email.");
          return;
        }
        break;
      default:
        break;
    }

    setAlertMessage(
      `Withdrawal request for $${formData.amount} via ${selectedPaymentMethod} submitted.`
    );
  };

  const renderFormFields = () => {
    const inputClasses = `w-full p-2 rounded-md border ${
      theme === "dark"
        ? "bg-slate-800 border-slate-700 text-gray-200"
        : "bg-white border-gray-300 text-gray-900"
    }`;

    const labelClasses = `block ${
      theme === "dark" ? "text-gray-400" : "text-gray-700"
    }`;

    switch (selectedPaymentMethod) {
      case "Crypto":
        return (
          <>
            <div>
              <label className={labelClasses}>Coin Assets</label>
              <select
                name="cryptoAsset"
                value={formData.cryptoAsset}
                onChange={handleInputChange}
                className={inputClasses}
              >
                {["BTC", "ETH", "LTC", "XRP", "BCH"].map((coin) => (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={inputClasses}
              />
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}
              >
                Balance: ${balance}
              </p>
            </div>
            <div>
              <label className={labelClasses}>
                {formData.cryptoAsset} Address
              </label>
              <input
                type="text"
                name="btcAddress"
                placeholder={`${formData.cryptoAsset} Address`}
                value={formData.btcAddress}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </div>
          </>
        );
      case "Bank Transfer":
        return (
          <>
            <div>
              <label className={labelClasses}>Bank Name</label>
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Account Number</label>
              <input
                type="text"
                name="bankAccountNumber"
                placeholder="Account Number"
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Account Name</label>
              <input
                type="text"
                name="bankAccountName"
                placeholder="Account Name"
                value={formData.bankAccountName}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={inputClasses}
              />
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}
              >
                Balance: ${balance}
              </p>
            </div>
          </>
        );
      case "Cash App":
        return (
          <>
            <div>
              <label className={labelClasses}>Cash App ID</label>
              <input
                type="text"
                name="cashAppId"
                placeholder="Cash App ID"
                value={formData.cashAppId}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={inputClasses}
              />
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}
              >
                Balance: ${balance}
              </p>
            </div>
          </>
        );
      case "PayPal":
        return (
          <>
            <div>
              <label className={labelClasses}>PayPal Email</label>
              <input
                type="email"
                name="paypalEmail"
                placeholder="PayPal Email"
                value={formData.paypalEmail}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={inputClasses}
              />
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}
              >
                Balance: ${balance}
              </p>
            </div>
          </>
        );
      case "Skrill":
        return (
          <>
            <div>
              <label className={labelClasses}>Skrill Email</label>
              <input
                type="email"
                name="skrillEmail"
                placeholder="Skrill Email"
                value={formData.skrillEmail}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={inputClasses}
              />
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}
              >
                Balance: ${balance}
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <section
        className={`flex flex-col lg:flex-row justify-between min-h-screen p-4 ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        {/* Payment Method Section */}
        <div
          className={`rounded-lg p-6 w-full lg:w-2/3 mb-6 lg:mb-0 lg:mr-4 ${
            theme === "dark" ? "bg-slate-900" : "bg-white shadow"
          }`}
        >
          <h1
            className={`text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-teal-500" : "text-teal-600"
            }`}
          >
            Withdrawal Page
          </h1>
          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Choose a withdrawal method.
          </p>

          <button
            onClick={() => setShowPaymentOptions(!showPaymentOptions)}
            className={`w-full p-2 rounded-md transition ${
              theme === "dark"
                ? "bg-teal-700 hover:bg-teal-600 text-white"
                : "bg-teal-600 hover:bg-teal-500 text-white"
            }`}
          >
            {selectedPaymentMethod || "Select Payment Method"}
          </button>

          {showPaymentOptions && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                theme === "dark" ? "bg-slate-800" : "bg-gray-100"
              }`}
            >
              <h2
                className={`text-xl font-bold mb-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Select Payment Method
              </h2>
              <ul className="space-y-2">
                {[
                  "Bank Transfer",
                  "Crypto",
                  "Cash App",
                  "PayPal",
                  "Skrill",
                ].map((method) => (
                  <li
                    key={method}
                    onClick={() => handlePaymentMethodSelect(method)}
                    className={`p-2 rounded cursor-pointer transition ${
                      theme === "dark"
                        ? "bg-slate-700 text-gray-200 hover:bg-slate-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedPaymentMethod && (
            <div className="mt-6 space-y-4">
              <h2
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {selectedPaymentMethod} Withdrawal
              </h2>
              {renderFormFields()}
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div
          className={`rounded-lg p-6 w-full lg:w-1/3 ${
            theme === "dark" ? "bg-slate-900" : "bg-white shadow"
          }`}
        >
          <h2
            className={`text-xl font-bold mb-4 ${
              theme === "dark" ? "text-teal-500" : "text-teal-600"
            }`}
          >
            Withdrawal Summary
          </h2>
          <div
            className={`space-y-3 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p>
              <span className="font-semibold">Payment Method:</span>{" "}
              {selectedPaymentMethod || "Not selected"}
            </p>
            {selectedPaymentMethod && (
              <>
                <p>
                  <span className="font-semibold">Amount:</span> $
                  {formData.amount}
                </p>
                {selectedPaymentMethod === "Crypto" && (
                  <>
                    <p>
                      <span className="font-semibold">Coin:</span>{" "}
                      {formData.cryptoAsset}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {formData.btcAddress}
                    </p>
                  </>
                )}
                {selectedPaymentMethod === "Bank Transfer" && (
                  <>
                    <p>
                      <span className="font-semibold">Bank Name:</span>{" "}
                      {formData.bankName}
                    </p>
                    <p>
                      <span className="font-semibold">Account Number:</span>{" "}
                      {formData.bankAccountNumber}
                    </p>
                    <p>
                      <span className="font-semibold">Account Name:</span>{" "}
                      {formData.bankAccountName}
                    </p>
                  </>
                )}
                {selectedPaymentMethod === "Cash App" && (
                  <p>
                    <span className="font-semibold">Cash App ID:</span>{" "}
                    {formData.cashAppId}
                  </p>
                )}
                {selectedPaymentMethod === "PayPal" && (
                  <p>
                    <span className="font-semibold">PayPal Email:</span>{" "}
                    {formData.paypalEmail}
                  </p>
                )}
                {selectedPaymentMethod === "Skrill" && (
                  <p>
                    <span className="font-semibold">Skrill Email:</span>{" "}
                    {formData.skrillEmail}
                  </p>
                )}
              </>
            )}
            <button
              onClick={handleWithdrawal}
              className={`w-full p-2 rounded-md transition ${
                theme === "dark"
                  ? "bg-teal-700 hover:bg-teal-600 text-white"
                  : "bg-teal-600 hover:bg-teal-500 text-white"
              }`}
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      </section>

      {/* Custom Alert Popup */}
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </>
  );
}
