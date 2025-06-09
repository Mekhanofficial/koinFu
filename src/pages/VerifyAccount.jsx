import { useTheme } from "next-themes";

export default function VerifyAccountPage() {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`min-h-screen px-10 py-14 ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        <section
          className={`max-w-lg mx-auto p-6 mt-8 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-slate-900 text-white border border-gray-800 hover:border-teal-500 hover:shadow-teal-500/20"
              : "bg-white text-gray-800 border border-gray-200 hover:border-teal-400 hover:shadow-teal-400/20"
          } transition-all duration-300`}
        >
          <h1
            className={`text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            VERIFY ACCOUNT
          </h1>
          <p
            className={`text-sm mb-6 ${
              theme === "dark" ? "text-slate-400" : "text-gray-500"
            }`}
          >
            To request an account verification, kindly provide your information
            with a valid means of identification attached as an image document.
          </p>

          <form className="space-y-4">
            <div>
              <label
                className={`block mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Front ID
              </label>
              <input
                type="file"
                accept="image/*"
                className={`w-full p-2 rounded-md ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 focus:border-teal-500"
                    : "bg-gray-100 border-gray-300 focus:border-teal-400"
                } border`}
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Back ID
              </label>
              <input
                type="file"
                accept="image/*"
                className={`w-full p-2 rounded-md ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 focus:border-teal-500"
                    : "bg-gray-100 border-gray-300 focus:border-teal-400"
                } border`}
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                ID Type
              </label>
              <select
                className={`w-full p-2 rounded-md ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 focus:border-teal-500"
                    : "bg-gray-100 border-gray-300 focus:border-teal-400"
                } border`}
              >
                <option value="passport">Passport</option>
                <option value="national-id">National ID</option>
                <option value="driver-license">Driver's License</option>
                <option value="social-security">Social Security Card</option>
                <option value="voters-card">Voter's Card</option>
              </select>
            </div>

            <button
              className={`w-full px-4 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl ${
                theme === "dark"
                  ? "bg-gradient-to-r from-teal-900 to-teal-700 text-white hover:from-teal-800 hover:to-teal-600"
                  : "bg-gradient-to-r from-teal-600 to-teal-400 text-white hover:from-teal-500 hover:to-teal-300"
              }`}
            >
              Submit Verification Request
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
