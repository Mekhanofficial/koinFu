import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faReceipt,
  faClock,
  faCheckCircle,
  faXmarkCircle,
  faHistory,
  faCloudUploadAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function PaymentProofPage() {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Sample payment proof data
  const paymentProofs = [
    {
      id: "TX001",
      amount: "$150.00",
      reason: "Deposit",
      date: "2023-07-15",
      status: "Approved",
    },
    {
      id: "TX002",
      amount: "$75.50",
      reason: "Account Top-up",
      date: "2023-07-10",
      status: "Pending",
    },
    {
      id: "TX003",
      amount: "$200.00",
      reason: "Investment",
      date: "2023-07-05",
      status: "Rejected",
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }
    if (!amount || !reason) {
      alert("Please fill in all fields");
      return;
    }

    // Here you would normally handle the form submission
    alert(
      `Proof submitted!\nAmount: $${amount}\nReason: ${reason}\nFile: ${selectedFile.name}`
    );

    // Reset form
    setSelectedFile(null);
    setAmount("");
    setReason("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 md:px-6 lg:px-8 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 to-gray-900 text-gray-200"
          : "bg-gradient-to-br from-slate-100 to-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-3 ${
              theme === "dark"
                ? "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600"
                : "text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700"
            }`}
          >
            Payment Verification
          </h1>
          <p
            className={`max-w-lg mx-auto text-sm md:text-base ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Upload proof of your payment transactions for verification and
            tracking
          </p>
        </div>

        {/* Upload Card */}
        <div
          className={`rounded-2xl shadow-xl p-5 md:p-6 mb-10 md:mb-12 ${
            theme === "dark"
              ? "bg-slate-800/50 backdrop-blur-sm border border-slate-700"
              : "bg-white/90 backdrop-blur-sm border border-gray-200"
          }`}
        >
          <div className="flex items-center mb-4 md:mb-5">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 ${
                theme === "dark"
                  ? "bg-teal-900/30 text-teal-400"
                  : "bg-teal-500/20 text-teal-600"
              }`}
            >
              <FontAwesomeIcon icon={faUpload} className="text-lg md:text-xl" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold">
                Upload Payment Proof
              </h2>
              <p
                className={`text-xs md:text-sm ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}
              >
                Submit your payment confirmation
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Upload Section */}
            <div>
              <label
                className={`block mb-2 font-medium text-sm md:text-base ${
                  theme === "dark" ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Upload Image
              </label>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-4 md:p-6 text-center cursor-pointer transition-all ${
                  theme === "dark"
                    ? isDragging
                      ? "border-teal-500 bg-slate-800/50"
                      : "border-slate-600 hover:border-teal-500 bg-slate-800/30"
                    : isDragging
                    ? "border-teal-500 bg-slate-200"
                    : "border-gray-300 hover:border-teal-500 bg-slate-100"
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  {selectedFile ? (
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded flex items-center justify-center mr-3 ${
                              theme === "dark"
                                ? "bg-slate-700 text-teal-400"
                                : "bg-slate-200 text-teal-600"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faReceipt}
                              className="text-lg"
                            />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm md:text-base truncate max-w-[150px] md:max-w-xs">
                              {selectedFile.name}
                            </p>
                            <p
                              className={`text-xs ${
                                theme === "dark"
                                  ? "text-gray-500"
                                  : "text-gray-600"
                              }`}
                            >
                              {Math.round(selectedFile.size / 1024)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className={`p-2 rounded-full ${
                            theme === "dark"
                              ? "hover:bg-slate-700"
                              : "hover:bg-slate-200"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className={`text-sm ${
                              theme === "dark" ? "text-red-400" : "text-red-500"
                            }`}
                          />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current.click();
                        }}
                        className={`mt-2 px-4 py-2 rounded-lg text-sm ${
                          theme === "dark"
                            ? "bg-slate-700 hover:bg-slate-600"
                            : "bg-slate-200 hover:bg-slate-300"
                        }`}
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 ${
                          theme === "dark"
                            ? "bg-slate-700 text-teal-400"
                            : "bg-slate-200 text-teal-600"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faCloudUploadAlt}
                          className="text-2xl md:text-3xl"
                        />
                      </div>
                      <p className="font-medium mb-1 text-sm md:text-base">
                        Click to upload or drag and drop
                      </p>
                      <p
                        className={`text-xs md:text-sm ${
                          theme === "dark" ? "text-gray-500" : "text-gray-600"
                        }`}
                      >
                        PNG, JPG, GIF (MAX. 5MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>
            </div>

            {/* Amount and Reason Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div>
                <label
                  className={`block mb-2 font-medium text-sm md:text-base ${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className={`w-full pl-8 pr-4 py-2 md:py-3 rounded-xl focus:ring-2 focus:outline-none text-sm md:text-base ${
                      theme === "dark"
                        ? "bg-slate-700/50 border border-slate-600 focus:ring-teal-500 focus:border-teal-500"
                        : "bg-slate-100 border border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block mb-2 font-medium text-sm md:text-base ${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Reason
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason"
                  className={`w-full px-4 py-2 md:py-3 rounded-xl focus:ring-2 focus:outline-none text-sm md:text-base ${
                    theme === "dark"
                      ? "bg-slate-700/50 border border-slate-600 focus:ring-teal-500 focus:border-teal-500"
                      : "bg-slate-100 border border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  }`}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 p-px rounded-xl mt-4 shadow-lg shadow-teal-500/20">
              <button
                type="submit"
                className={`w-full p-3 md:p-4 rounded-xl text-white text-base md:text-lg font-bold transition-all ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-teal-600 to-teal-700"
                    : "bg-gradient-to-r from-teal-500 to-teal-600"
                }`}
              >
                Submit Payment Proof
              </button>
            </div>
          </form>
        </div>

        {/* Payment Proof Table */}
        <div
          className={`rounded-2xl shadow-xl p-5 md:p-6 ${
            theme === "dark"
              ? "bg-slate-800/50 backdrop-blur-sm border border-slate-700"
              : "bg-white/90 backdrop-blur-sm border border-gray-200"
          }`}
        >
          <div className="flex items-center mb-4 md:mb-6">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 ${
                theme === "dark"
                  ? "bg-slate-700 text-teal-400"
                  : "bg-slate-200 text-teal-600"
              }`}
            >
              <FontAwesomeIcon
                icon={faHistory}
                className="text-lg md:text-xl"
              />
            </div>
            <h2 className="text-lg md:text-xl font-bold">Payment History</h2>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr
                  className={`border-b ${
                    theme === "dark" ? "border-slate-700" : "border-gray-200"
                  }`}
                >
                  <th
                    className={`text-left py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    ID
                  </th>
                  <th
                    className={`text-left py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Amount
                  </th>
                  <th
                    className={`text-left py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Reason
                  </th>
                  <th
                    className={`text-left py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Date
                  </th>
                  <th
                    className={`text-left py-2 px-3 md:py-3 md:px-4 font-semibold text-xs md:text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentProofs.length > 0 ? (
                  paymentProofs.map((proof, index) => (
                    <tr
                      key={proof.id}
                      className={`${
                        index % 2 === 0
                          ? theme === "dark"
                            ? "bg-slate-800/30"
                            : "bg-slate-100/50"
                          : ""
                      }`}
                    >
                      <td className="py-2 px-3 md:py-3 md:px-4 font-medium text-sm md:text-base">
                        {proof.id}
                      </td>
                      <td className="py-2 px-3 md:py-3 md:px-4 font-medium text-sm md:text-base">
                        {proof.amount}
                      </td>
                      <td className="py-2 px-3 md:py-3 md:px-4 text-sm md:text-base">
                        {proof.reason}
                      </td>
                      <td
                        className={`py-2 px-3 md:py-3 md:px-4 text-sm md:text-base ${
                          theme === "dark" ? "text-gray-500" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faClock}
                            className={`mr-2 text-xs ${
                              theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          />
                          {proof.date}
                        </div>
                      </td>
                      <td className="py-2 px-3 md:py-3 md:px-4">
                        <span
                          className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium ${
                            proof.status === "Approved"
                              ? "bg-green-500/20 text-green-500"
                              : proof.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={
                                proof.status === "Approved"
                                  ? faCheckCircle
                                  : proof.status === "Pending"
                                  ? faClock
                                  : faXmarkCircle
                              }
                              className="mr-1 md:mr-2 text-xs md:text-sm"
                            />
                            {proof.status}
                          </div>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center">
                      <div
                        className={`p-6 rounded-xl ${
                          theme === "dark" ? "bg-slate-800/30" : "bg-slate-100"
                        }`}
                      >
                        <div
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                            theme === "dark"
                              ? "bg-slate-700 text-teal-400"
                              : "bg-slate-200 text-teal-600"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faReceipt}
                            className="text-2xl md:text-3xl"
                          />
                        </div>
                        <p
                          className={`text-base md:text-lg font-medium mb-2 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          No Payment Proofs Yet
                        </p>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-500" : "text-gray-600"
                          }`}
                        >
                          Submit your first payment proof to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {paymentProofs.length > 0 && (
            <div
              className={`mt-4 p-3 rounded-xl text-center text-xs md:text-sm ${
                theme === "dark"
                  ? "bg-slate-800/30 border border-slate-700"
                  : "bg-slate-100 border border-gray-200"
              }`}
            >
              <p
                className={`flex items-center justify-center ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}
              >
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                Showing {paymentProofs.length} most recent transactions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
