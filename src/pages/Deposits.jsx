import { useState } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import qr1 from "../pictures/qr1.png";
import qr2 from "../pictures/qr1.png";
import qr3 from "../pictures/qr1.png";
import qr4 from "../pictures/qr1.png";
import qr5 from "../pictures/qr1.png";
import qr6 from "../pictures/qr1.png";

export default function DepositPage() {
  const { theme } = useTheme();
  const [amount, setAmount] = useState(10);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const fee = (amount * 0.01).toFixed(2);
  const total = (parseFloat(amount) + parseFloat(fee)).toFixed(2);

  const depositMethods = [
    { name: "Bitcoin", qr: qr1, address: "bc1qxyz123..." },
    { name: "Ethereum", qr: qr2, address: "0xabc123..." },
    { name: "Litecoin", qr: qr3, address: "ltc1qxyz123..." },
    { name: "Ripple", qr: qr4, address: "rXYZ123..." },
    { name: "Bitcoin Cash", qr: qr5, address: "qxyz123..." },
    { name: "Dogecoin", qr: qr6, address: "Dxyz123..." },
  ];

  const selectedMethod = depositMethods.find(
    (method) => method.name === selectedCrypto
  );

  const copyToClipboard = () => {
    if (selectedMethod) {
      navigator.clipboard.writeText(selectedMethod.address);
      alert("Address copied to clipboard!");
    }
  };

  const handleDeposit = () => {
    if (!selectedCrypto || amount <= 0) {
      alert("Please select a cryptocurrency and enter a valid amount.");
      return;
    }
    setShowSuccess(true);
  };

  return (
    <>
      <section
        className={`min-h-screen px-10 py-14 flex flex-col md:flex-row gap-6 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Deposit Form */}
        <div
          className={`w-full md:w-1/2 p-6 rounded-xl ${
            theme === "dark"
              ? "bg-slate-950"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Make Deposit</h2>

          <label
            className={`block mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Deposit Method:
          </label>
          <select
            className={`w-full p-2 rounded mb-4 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            } border`}
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
          >
            <option value="">-- Select Coin --</option>
            {depositMethods.map((method, index) => (
              <option key={index} value={method.name}>
                {method.name}
              </option>
            ))}
          </select>

          <label
            className={`block mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full p-2 rounded mb-4 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            } border`}
          />

          <label
            className={`block mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Fee (1%)
          </label>
          <input
            type="text"
            value={fee}
            disabled
            className={`w-full p-2 rounded mb-4 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-gray-400"
                : "bg-gray-100 border-gray-300 text-gray-600"
            } border`}
          />

          <label
            className={`block mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Total Amount ($)
          </label>
          <input
            type="text"
            value={total}
            disabled
            className={`w-full p-2 rounded mb-4 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-gray-400"
                : "bg-gray-100 border-gray-300 text-gray-600"
            } border`}
          />
        </div>

        {/* Payment Info */}
        <div
          className={`w-full md:w-1/2 p-6 rounded-xl ${
            theme === "dark"
              ? "bg-slate-950"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Pay with Crypto</h2>

          <label
            className={`block mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Address:
          </label>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={selectedMethod ? selectedMethod.address : ""}
              disabled
              className={`w-full p-2 rounded ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-gray-300"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              } border`}
            />
            <button
              onClick={copyToClipboard}
              className={`p-2 rounded text-white ${
                theme === "dark"
                  ? "bg-teal-700 hover:bg-teal-600"
                  : "bg-teal-600 hover:bg-teal-500"
              } transition-colors`}
              disabled={!selectedMethod}
            >
              Copy
            </button>
          </div>

          <p
            className={`text-sm mb-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Kindly copy and make your deposit into the provided address and tap
            the deposit button. Or scan the QR Code below.
          </p>

          {selectedMethod && (
            <div className="text-center">
              <h3
                className={`text-lg font-semibold mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {selectedMethod.name}
              </h3>
              <img
                src={selectedMethod.qr}
                alt={`${selectedMethod.name} QR code`}
                className="w-32 h-32 mx-auto mb-2"
              />
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Scan the QR code to make a deposit.
              </p>
            </div>
          )}

          <button
            onClick={handleDeposit}
            className={`w-full p-3 rounded text-white text-lg font-bold mt-4 ${
              theme === "dark"
                ? "bg-teal-700 hover:bg-teal-600"
                : "bg-teal-600 hover:bg-teal-500"
            } transition-colors`}
          >
            Deposited
          </button>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div
            className={`p-6 rounded-xl text-center w-full max-w-sm ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-4xl mb-4"
            />
            <h2 className="text-2xl font-bold">Success!</h2>
            <p className="mb-2">Your deposit request has been submitted.</p>
            <p>Kindly upload payment proof for confirmation.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className={`mt-4 p-2 rounded text-white w-full ${
                theme === "dark"
                  ? "bg-teal-700 hover:bg-teal-600"
                  : "bg-teal-600 hover:bg-teal-500"
              } transition-colors`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
