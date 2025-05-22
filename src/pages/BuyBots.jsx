import { useTheme } from "next-themes";
import bt1 from "../pictures/bt1.jpeg";

// Bot data array
const bots = [
  {
    id: 1,
    name: "3COMMAS",
    image: bt1,
    profitRate: "25%",
    amount: "$750",
    botLevel: "25",
    winRate: "20%",
  },
  {
    id: 2,
    name: "CRYPTOHOPPER",
    image: bt1,
    profitRate: "30%",
    amount: "$1000",
    botLevel: "30",
    winRate: "25%",
  },
  {
    id: 3,
    name: "TRADINGVIEW",
    image: bt1,
    profitRate: "22%",
    amount: "$600",
    botLevel: "20",
    winRate: "18%",
  },
  {
    id: 4,
    name: "ZIGNALY",
    image: bt1,
    profitRate: "28%",
    amount: "$900",
    botLevel: "28",
    winRate: "22%",
  },
  {
    id: 5,
    name: "SHRIMMPY",
    image: bt1,
    profitRate: "35%",
    amount: "$1200",
    botLevel: "35",
    winRate: "30%",
  },
  {
    id: 6,
    name: "COINRULE",
    image: bt1,
    profitRate: "20%",
    amount: "$500",
    botLevel: "18",
    winRate: "15%",
  },
  {
    id: 7,
    name: "TRADEBOT",
    image: bt1,
    profitRate: "27%",
    amount: "$850",
    botLevel: "25",
    winRate: "20%",
  },
  {
    id: 8,
    name: "BITUNIVERSE",
    image: bt1,
    profitRate: "33%",
    amount: "$1100",
    botLevel: "32",
    winRate: "28%",
  },
];

export default function BuyBotPage() {
  const { theme } = useTheme();

  return (
    <>
      <section
        className={`p-8 min-h-screen ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Trading Bots
          </h1>
          <p
            className={`mt-4 max-w-2xl mx-auto text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Purchasing our Trading Bot can help you streamline your trading
            strategy and potentially maximize your profits. Our Trading Bot is
            designed to analyze market trends and execute trades based on
            pre-programmed rules and parameters. Purchase our Trading Bot today
            and start automating your trades for optimal results!
          </p>
        </div>

        {/* Bot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className={`p-6 rounded-lg flex flex-col items-center text-center shadow-lg border transition-transform duration-300 hover:scale-[1.03] ${
                theme === "dark"
                  ? "bg-slate-900 border-gray-800 hover:shadow-teal-500/20"
                  : "bg-white border-gray-200 hover:shadow-teal-400/20"
              }`}
            >
              {/* Bot Image and Status */}
              <div className="relative mb-4">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={bot.image}
                  alt={bot.name}
                />
                <span
                  className={`absolute top-0 right-0 w-5 h-5 rounded-full border-2 ${
                    theme === "dark"
                      ? "bg-green-500 border-slate-900"
                      : "bg-green-400 border-white"
                  }`}
                ></span>
              </div>

              {/* Bot Name and Profit Rate */}
              <h2
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {bot.name}
              </h2>
              <h5
                className={`mb-4 text-lg ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Profit Rate:{" "}
                <span
                  className={
                    theme === "dark" ? "text-green-500" : "text-green-600"
                  }
                >
                  {bot.profitRate}
                </span>
              </h5>

              {/* Bot Details */}
              <div
                className={`flex justify-between w-full px-6 text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <div className="text-left">
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {bot.amount}
                  </h1>
                  <h1
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    AMOUNT
                  </h1>
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {bot.winRate}
                  </h1>
                </div>
                <div className="text-right">
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    BOT LEVEL
                  </h1>
                  <h1
                    className={
                      theme === "dark" ? "text-orange-400" : "text-orange-500"
                    }
                  >
                    {bot.botLevel}
                  </h1>
                  <h1
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    WIN RATE
                  </h1>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                className={`w-full mt-3 px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300 shadow-lg mb-6 hover:shadow-xl ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-teal-900 to-teal-700 text-white hover:from-teal-800 hover:to-teal-600"
                    : "bg-gradient-to-r from-teal-600 to-teal-400 text-white hover:from-teal-500 hover:to-teal-300"
                }`}
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}