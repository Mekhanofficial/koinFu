import { useTheme } from "next-themes";
import HeaderPage from "../components/Header";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Simulated trading data with ups and downs
const data = [
  { value: 10 },
  { value: 0 },
  { value: 100 },
  { value: 30 },
  { value: 88 },
  { value: 15 },
  { value: 115 },
  { value: 40 },
  { value: 65 },
];

export default function DailySignalPage() {
  const { theme } = useTheme();
  const plans = [
    {
      name: "Learn II Trade",
      price: "$9,899.00",
    },
    {
      name: "AVA TRADE",
      price: "$4,999.00",
    },
    {
      name: "RoboForex",
      price: "$2,899.00",
    },
    {
      name: "ZERO TO HERO",
      price: "$15,988.00",
    },
    {
      name: "1000 PIPS",
      price: "$1,500.00",
    },
    {
      name: "WeTalkTrade",
      price: "$10,900.00",
    },
  ];

  return (
    <>
      <section className={`min-h-screen mx-auto px-4 py-8 ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'
      }`}>
        {/* Signal Stats Card */}
        <div className={`p-6 flex items-center mb-10 rounded-xl shadow-lg w-full md:w-96 ${
          theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-gray-800 border border-gray-200'
        }`}>
          <div className="mr-4">
            <p className={`text-md font-bold ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Purchased Signal
            </p>
            <p className={`text-xl font-bold ${
              theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
            }`}>
              None
            </p>
            <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
              $0.00
            </p>
          </div>
          <div className="flex-1">
            <ResponsiveContainer height={100} width="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme === 'dark' ? "#00c8ff" : "#0088cc"}
                  strokeWidth={4}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Signal Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-6 relative transition-all duration-300 hover:scale-[1.02] ${
                theme === 'dark'
                  ? 'bg-slate-800 border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 text-white'
                  : 'bg-white border-gray-200 hover:border-teal-400 hover:shadow-teal-400/50 text-gray-800'
              } border`}
            >
              {/* Try It Now Button */}
              <button className={`absolute -top-4 right-4 px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 shadow-md ${
                theme === 'dark'
                  ? 'bg-teal-600 hover:bg-teal-500 text-white'
                  : 'bg-teal-500 hover:bg-teal-400 text-white'
              }`}>
                Try It Now
              </button>

              <h1 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {plan.name}
              </h1>
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {plan.price}
              </h3>
              <hr className={`mb-4 ${
                theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
              }`} />
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder={plan.price.replace("$", "").replace(",", "")}
                    className={`w-full rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 ${
                      theme === 'dark'
                        ? 'bg-slate-700 text-white focus:ring-teal-500'
                        : 'bg-gray-100 text-gray-900 focus:ring-teal-400'
                    }`}
                  />
                  <button className={`w-full px-4 py-3 rounded-lg font-semibold transition duration-300 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white'
                      : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 text-white'
                  }`}>
                    Purchase Signal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}