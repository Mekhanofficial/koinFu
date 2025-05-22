import { useTheme } from "next-themes";

export default function PaymentProofPage() {
  const { theme } = useTheme();

  return (
    <section
      className={`min-h-screen flex flex-col items-center p-4 md:p-10 ${
        theme === "dark" ? "bg-slate-950" : "bg-gray-100"
      }`}
    >
      {/* Payment Proof Form */}
      <div
        className={`p-6 md:p-8 rounded-xl shadow-lg max-w-md lg:max-w-lg w-full mt-10 ${
          theme === "dark" ? "bg-slate-900" : "bg-white border border-gray-200"
        }`}
      >
        <h1
          className={`text-2xl font-bold mb-3 text-center ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          PAYMENT PROOF
        </h1>
        <h3
          className={`text-sm font-semibold mb-5 text-center ${
            theme === "dark" ? "text-red-500" : "text-red-600"
          }`}
        >
          Upload your payment proof once deposit is done
        </h3>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              className={`text-md font-semibold mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              className={`w-full p-2 rounded-md ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-gray-300"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              } border`}
            />
          </div>

          <div className="flex flex-col">
            <label
              className={`text-md font-semibold mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Amount
            </label>
            <input
              type="text"
              placeholder="Enter amount"
              className={`p-2 rounded-md border focus:border-teal-500 focus:ring focus:ring-teal-500/50 ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-gray-300"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label
              className={`text-md font-semibold mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Reason
            </label>
            <input
              type="text"
              placeholder="Enter reason"
              className={`p-2 rounded-md border focus:border-teal-500 focus:ring focus:ring-teal-500/50 ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-gray-300"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        <button
          className={`px-6 py-2 rounded-full transition duration-300 w-full mt-5 ${
            theme === "dark"
              ? "bg-teal-600 hover:bg-teal-500 text-white"
              : "bg-teal-500 hover:bg-teal-400 text-white"
          }`}
        >
          Upload Proof
        </button>
      </div>

      {/* Payment Proof Table with Scrollable Section */}
      <div
        className={`p-5 mt-12 rounded-xl shadow-lg border max-w-full w-full ${
          theme === "dark"
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h1
          className={`font-semibold text-xl mb-5 text-center ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Payment Proof
        </h1>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div
              className={`flex justify-between items-center text-sm font-semibold border-b pb-2 ${
                theme === "dark"
                  ? "text-gray-300 border-slate-700"
                  : "text-gray-700 border-gray-200"
              }`}
            >
              <h2>ID</h2>
              <h2>Amount</h2>
              <h2>Reason</h2>
              <h2>Date</h2>
              <h2>Status</h2>
            </div>

            {/* Empty state */}
            <div
              className={`text-center text-lg font-semibold mt-5 ${
                theme === "dark" ? "text-slate-500" : "text-gray-400"
              }`}
            >
              No Recent Payment Proof
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
