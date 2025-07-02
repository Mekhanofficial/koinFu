import { useState } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronDown,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useTransactions } from "../context/TransactionContext";

const qrPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f3f3'/%3E%3C/svg%3E";
const qr1 = qrPlaceholder,
  qr2 = qrPlaceholder,
  qr3 = qrPlaceholder,
  qr4 = qrPlaceholder,
  qr5 = qrPlaceholder,
  qr6 = qrPlaceholder;

export default function DepositPage() {
    const { theme } = useTheme();
    const [amount, setAmount] = useState(10);
    const [selectedCrypto, setSelectedCrypto] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showMethods, setShowMethods] = useState(false);

    // Add error handling for context
    const transactionsContext = useTransactions();
    const addTransaction = transactionsContext?.addTransaction;

  const parsedAmount = parseFloat(amount) || 0;
  const fee = (parsedAmount * 0.01).toFixed(2);
  const total = (parsedAmount + parseFloat(fee)).toFixed(2);

  const depositMethods = [
    {
      name: "Bitcoin",
      qr: qr1,
      address: "bc1qxyz123...",
      color: "bg-orange-500/10",
      icon: "🟠",
    },
    {
      name: "Ethereum",
      qr: qr2,
      address: "0xabc123...",
      color: "bg-purple-500/10",
      icon: "🔷",
    },
    {
      name: "Litecoin",
      qr: qr3,
      address: "ltc1qxyz123...",
      color: "bg-gray-400/10",
      icon: "⚪",
    },
    {
      name: "Ripple",
      qr: qr4,
      address: "rXYZ123...",
      color: "bg-blue-500/10",
      icon: "🔵",
    },
    {
      name: "Bitcoin Cash",
      qr: qr5,
      address: "qxyz123...",
      color: "bg-green-500/10",
      icon: "🟢",
    },
    {
      name: "Dogecoin",
      qr: qr6,
      address: "Dxyz123...",
      color: "bg-yellow-500/10",
      icon: "🟡",
    },
  ];

  const selectedMethod = depositMethods.find((m) => m.name === selectedCrypto);

  const copyToClipboard = () => {
    if (selectedMethod) {
      navigator.clipboard.writeText(selectedMethod.address);
      alert("Address copied to clipboard!");
    }
  };

  const handleDeposit = () => {
    if (!selectedCrypto || parsedAmount <= 0) {
      alert("Please select a cryptocurrency and enter a valid amount.");
      return;
    }

    if (!addTransaction) {
      console.error("addTransaction function is not available");
      return;
    }

    addTransaction({
      type: "Deposit",
      amount: total,
      method: selectedCrypto,
      details: `To: ${selectedMethod.address.substring(0, 12)}...`,
      cryptoAmount: (parsedAmount / 10000).toFixed(6),
      status: "Pending",
    });

    setShowSuccess(true);
  };
  return (
    <>
      <section
        className={`min-h-screen px-4 lg:px-10 py-14 flex flex-col md:flex-row gap-6 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 to-gray-900 text-gray-200"
            : "bg-gradient-to-br from-slate-100 to-gray-100 text-gray-800"
        }`}
      >
        {/* Left: Deposit Form */}
        <div
          className={`w-full md:w-1/2 p-6 rounded-2xl shadow-xl ${
            theme === "dark"
              ? "bg-slate-800/70 backdrop-blur-sm"
              : "bg-white/90 backdrop-blur-sm"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">
            Make Deposit
          </h2>

          {/* Crypto Selection */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Deposit Method
            </label>
            <div className="relative">
              <button
                className={`w-full p-3 rounded-xl flex items-center justify-between ${
                  theme === "dark"
                    ? "bg-slate-700/80 hover:bg-slate-700"
                    : "bg-slate-100 hover:bg-slate-200"
                } transition-all duration-200`}
                onClick={() => setShowMethods(!showMethods)}
              >
                <div className="flex items-center">
                  {selectedCrypto ? (
                    <>
                      <span className="mr-3">{selectedMethod.icon}</span>
                      <span>{selectedCrypto}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">-- Select Coin --</span>
                  )}
                </div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-sm transform transition-transform ${
                    showMethods ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showMethods && (
                <div
                  className={`absolute z-10 w-full mt-2 rounded-xl shadow-lg overflow-hidden ${
                    theme === "dark" ? "bg-slate-700" : "bg-white"
                  }`}
                >
                  {depositMethods.map((method, index) => (
                    <div
                      key={index}
                      className={`p-3 flex items-center cursor-pointer hover:bg-teal-500/20 transition-colors ${
                        method.color
                      } ${
                        selectedCrypto === method.name ? "bg-teal-500/30" : ""
                      }`}
                      onClick={() => {
                        setSelectedCrypto(method.name);
                        setShowMethods(false);
                      }}
                    >
                      <span className="mr-3">{method.icon}</span>
                      <span>{method.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pl-8 pr-4 py-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-slate-700/80 border border-slate-600 focus:ring-teal-500 focus:border-teal-500"
                    : "bg-slate-100 border border-slate-200 focus:ring-teal-500 focus:border-teal-500"
                } focus:ring-2 focus:outline-none transition-all`}
              />
            </div>
          </div>

          {/* Fee & Total */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-500">
                Fee (1%)
              </label>
              <div
                className={`p-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-slate-700/50 text-gray-300"
                    : "bg-slate-100 text-gray-700"
                }`}
              >
                ${fee}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-500">
                Total Amount
              </label>
              <div
                className={`p-3 rounded-xl font-medium ${
                  theme === "dark"
                    ? "bg-teal-900/30 text-teal-300"
                    : "bg-teal-500/20 text-teal-700"
                }`}
              >
                ${total}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment Info */}
        <div
          className={`w-full md:w-1/2 p-6 rounded-2xl shadow-xl ${
            theme === "dark"
              ? "bg-slate-800/70 backdrop-blur-sm"
              : "bg-white/90 backdrop-blur-sm"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">
            Payment Details
          </h2>

          {/* Address Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Wallet Address
            </label>
            <div className="flex gap-2">
              <div
                className={`flex-1 p-3 rounded-xl flex items-center ${
                  theme === "dark" ? "bg-slate-700/80" : "bg-slate-100"
                }`}
              >
                <FontAwesomeIcon
                  icon={faQrcode}
                  className={`mr-3 ${
                    theme === "dark" ? "text-teal-400" : "text-teal-600"
                  }`}
                />
                <span className="truncate">
                  {selectedMethod
                    ? selectedMethod.address
                    : "Select a cryptocurrency first"}
                </span>
              </div>
              <button
                onClick={copyToClipboard}
                className={`p-3 rounded-xl flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-teal-700 hover:bg-teal-600"
                    : "bg-teal-600 hover:bg-teal-500"
                } transition-colors`}
                disabled={!selectedMethod}
              >
                <FontAwesomeIcon icon={faCopy} className="text-white" />
              </button>
            </div>
          </div>

          {/* QR Display */}
          {selectedMethod ? (
            <div className="mb-6">
              <div
                className={`p-6 rounded-2xl flex flex-col items-center ${
                  theme === "dark" ? "bg-slate-700/50" : "bg-slate-100"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 flex items-center ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  <span className="mr-2">{selectedMethod.icon}</span>
                  {selectedMethod.name}
                </h3>
                <div
                  className={`p-4 rounded-xl mb-4 ${
                    theme === "dark" ? "bg-white" : "bg-gray-900"
                  }`}
                >
                  <img
                    src={selectedMethod.qr}
                    alt={`${selectedMethod.name} QR code`}
                    className="w-40 h-40"
                  />
                </div>
                <p
                  className={`text-sm text-center ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Scan the QR code to make a deposit
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`p-10 rounded-2xl flex flex-col items-center justify-center ${
                theme === "dark" ? "bg-slate-700/50" : "bg-slate-100"
              }`}
            >
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                  theme === "dark"
                    ? "bg-slate-600 text-teal-400"
                    : "bg-slate-200 text-teal-600"
                }`}
              >
                <FontAwesomeIcon icon={faQrcode} className="text-3xl" />
              </div>
              <p
                className={`text-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Select a cryptocurrency to view deposit details
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 p-px rounded-xl mt-4 shadow-lg shadow-teal-500/20">
            <button
              onClick={handleDeposit}
              className="w-full p-4 rounded-xl text-white text-lg font-bold bg-gradient-to-r from-teal-600 to-teal-700 transition-all"
              disabled={!selectedMethod}
            >
              Confirm Deposit
            </button>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50 backdrop-blur-sm animate-fadeIn">
          <div
            className={`p-8 rounded-2xl text-center w-full max-w-md ${
              theme === "dark"
                ? "bg-gradient-to-br from-slate-800 to-gray-900 text-gray-200"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-4xl"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Deposit Successful!</h2>
            <p className="mb-4 text-gray-500">
              Your deposit request has been submitted
            </p>
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-teal-600/10">
              <p className="font-medium">
                Please upload payment proof for confirmation
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 px-6 py-3 rounded-xl text-white font-medium w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
