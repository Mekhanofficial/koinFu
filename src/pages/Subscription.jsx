import { useTheme } from "next-themes";
import HeaderPage from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function SubscriptionPage() {
  const { theme } = useTheme();
  const plans = [
    {
      name: "Elite",
      price: "$25,000.00",
      minAmount: "Minimum",
      description: "High ROI After Trading Session",
      duration: "7 Days",
      roi: "55.00%",
      features: ["Trading Bot"],
    },
    {
      name: "Premium",
      price: "$10,000.00",
      minAmount: "Minimum",
      description: "Moderate ROI After Trading Session",
      duration: "5 Days",
      roi: "30.00%",
      features: ["Trading Bot"],
    },
    {
      name: "Platinum",
      price: "$5,000.00",
      minAmount: "Minimum",
      description: "Low ROI After Trading Session",
      duration: "3 Days",
      roi: "15.00%",
      features: ["Trading Bot"],
    },
    {
      name: "Standard",
      price: "$1,000.00",
      minAmount: "Minimum",
      description: "Basic ROI After Trading Session",
      duration: "1 Day",
      roi: "5.00%",
      features: ["Manual Trading"],
    },
  ];

  return (
    <>
      <section className={`min-h-screen mx-auto px-4 py-8 ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-6 relative transition-all duration-300 hover:scale-[1.02] ${
                theme === 'dark'
                  ? 'bg-slate-800 border-gray-700 hover:border-teal-500 hover:shadow-teal-500/50 text-white'
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
              <h5 className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
                {plan.minAmount}
              </h5>
              <h4 className={`text-lg mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {plan.description}
              </h4>
              <hr className={`mb-4 ${
                theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
              }`} />
              <div className="space-y-4">
                {/* Duration with Check Icon */}
                <p className="text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`mr-2 h-5 ${
                      theme === 'dark' ? 'text-green-500' : 'text-green-600'
                    }`}
                  />
                  <span className="font-semibold">Duration:</span>{" "}
                  {plan.duration}
                </p>
                {/* ROI with Check Icon */}
                <p className="text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`mr-2 h-5 ${
                      theme === 'dark' ? 'text-green-500' : 'text-green-600'
                    }`}
                  />
                  <span className="font-semibold">ROI:</span> {plan.roi}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span className="font-semibold">Features:</span>{" "}
                  {plan.features.join(", ")}
                </p>
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
                    Subscribe to Plan
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