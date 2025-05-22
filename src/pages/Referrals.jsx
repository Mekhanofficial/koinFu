import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import HeaderPage from "../components/Header";

export default function ReferralsPage() {
  const { theme } = useTheme();
  const referralLink = "https://koinfu.net/log_opt/register.php?ref=457689";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <>
      <HeaderPage />
      <section
        className={`min-h-screen flex flex-col items-center p-4 md:p-10 ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        {/* Referral Stats */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
          <div
            className={`flex items-center gap-4 p-4 rounded-lg shadow-md w-full md:w-auto ${
              theme === "dark"
                ? "bg-slate-800 text-white"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
          >
            <FontAwesomeIcon
              icon={faUserFriends}
              className={`h-6 ${
                theme === "dark" ? "text-teal-400" : "text-teal-500"
              }`}
            />
            <div>
              <h1 className="text-3xl font-bold">0</h1>
              <h6
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              >
                Total Referrals
              </h6>
            </div>
          </div>

          {/* Referral Link */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg shadow-md w-full ${
              theme === "dark"
                ? "bg-slate-800 text-white"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
          >
            <h3 className="text-sm break-all">{referralLink}</h3>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                theme === "dark"
                  ? "bg-teal-600 hover:bg-teal-500 text-white"
                  : "bg-teal-500 hover:bg-teal-400 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faCopy} className="h-4" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Referrals List */}
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
            All Referrals
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
                <h2>Email</h2>
                <h2>Full Name</h2>
                <h2>Date</h2>
              </div>

              {/* Empty state */}
              <div
                className={`text-center text-lg font-bold mt-5 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                No Referrals
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
