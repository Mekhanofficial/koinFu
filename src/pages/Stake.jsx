import { useTheme } from "next-themes";
import bt1 from "../pictures/bt1.jpeg";

const stakeAssets = [
  { name: "Bitcoin", symbol: "BTC", img: bt1, min: "1 BTC", max: "10 BTC" },
  { name: "Ethereum", symbol: "ETH", img: bt1, min: "0.1 ETH", max: "50 ETH" },
  { name: "Cardano", symbol: "ADA", img: bt1, min: "100 ADA", max: "5000 ADA" },
  { name: "Solana", symbol: "SOL", img: bt1, min: "1 SOL", max: "100 SOL" },
  { name: "Polkadot", symbol: "DOT", img: bt1, min: "5 DOT", max: "500 DOT" },
  {
    name: "Avalanche",
    symbol: "AVAX",
    img: bt1,
    min: "1 AVAX",
    max: "200 AVAX",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    img: bt1,
    min: "10 LINK",
    max: "1000 LINK",
  },
  { name: "Litecoin", symbol: "LTC", img: bt1, min: "0.5 LTC", max: "100 LTC" },
  { name: "Ripple", symbol: "XRP", img: bt1, min: "50 XRP", max: "5000 XRP" },
];

export default function StakePage() {
  const { theme } = useTheme();

  return (
    <>
      <section
        className={`px-4 md:px-10 flex flex-col items-center ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        <div className="text-center mb-10">
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Stake
          </h1>
          <h4
            className={`text-lg ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Earn profits from staking and manage your staking history
          </h4>
        </div>

        <h1
          className={`text-2xl font-semibold mb-5 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          POOLS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeAssets.map((asset, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg flex flex-col items-center text-center w-full max-w-xs shadow-lg border ${
                theme === "dark"
                  ? "bg-slate-900 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/20"
                  : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/20"
              } transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="relative mb-4">
                <img
                  className="w-16 h-16 rounded-full"
                  src={asset.img}
                  alt={asset.name}
                />
                <span
                  className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 ${
                    theme === "dark"
                      ? "bg-green-500 border-slate-900"
                      : "bg-green-400 border-white"
                  }`}
                ></span>
              </div>
              <h2
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {asset.name}
              </h2>
              <h5
                className={`font-semibold mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {asset.symbol}
              </h5>
              <div
                className={`flex justify-between w-full px-6 text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <div className="text-left">
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {asset.min}
                  </h1>
                  <h1
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    MINIMUM
                  </h1>
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {asset.max}
                  </h1>
                </div>
                <div className="text-right">
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    MAXIMUM
                  </h1>
                  <h1
                    className={
                      theme === "dark" ? "text-orange-400" : "text-orange-500"
                    }
                  >
                    Daily
                  </h1>
                  <h1
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    CYCLE
                  </h1>
                </div>
              </div>
              <button
                className={`w-full mt-3 px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300 shadow-lg mb-6 hover:shadow-xl ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-teal-900 to-teal-700 text-white hover:from-teal-800 hover:to-teal-600"
                    : "bg-gradient-to-r from-teal-600 to-teal-400 text-white hover:from-teal-500 hover:to-teal-300"
                }`}
              >
                Stake
              </button>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 p-5 rounded-md transition-all duration-300 w-full max-w-4xl ${
            theme === "dark"
              ? "bg-slate-900 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/20 text-white"
              : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/20 text-gray-800"
          } border hover:scale-[1.01]`}
        >
          <h1
            className={`text-2xl font-bold mb-5 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Stakings
          </h1>
          <div
            className={`flex justify-between items-center text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            }`}
          >
            <h2>ID</h2>
            <h2>Ref</h2>
            <div className="flex items-center gap-4 md:gap-10">
              <h2>Amount</h2>
              <h2>Duration</h2>
            </div>
            <h2>Total (USD)</h2>
            <h2>ROI</h2>
            <div className="flex items-center gap-4 md:gap-10">
              <h2>Stake Date</h2>
              <h2>Status</h2>
            </div>
          </div>
          <h1
            className={`text-2xl text-center mt-10 font-semibold ${
              theme === "dark" ? "text-slate-500" : "text-gray-400"
            }`}
          >
            You haven't made any stake.
          </h1>
        </div>
      </section>
    </>
  );
}
