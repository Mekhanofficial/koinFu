import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function () {
  return (
    <>
      <div className="bg-gray-950 text-white py-16 px-6 sm:px-12 md:px-20 lg:px-32 relative z-40">
        <div className="text-center mb-16">
        <div className="inline-block relative mb-5">
            <span className="text-teal-400 text-sm font-semibold tracking-wider uppercase bg-teal-400/10 px-4 py-1.5 rounded-full">
              Pricing Plan
            </span>
            <div className="absolute inset-0 bg-teal-400 rounded-full blur-lg opacity-20 -z-10 animate-pulse"></div>
            </div>
          <h2 className="text-white text-5xl font-bold mb-5">
            Investment Plan
          </h2>
          <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
            Our plans are designed to provide high returns and reliable mining
            operations, with expert guidance and support every step of the way.
          </h4>
        </div>

        <div className="text-white">
          <div className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Starter Plan */}
              <div className="bg-gray-900 rounded-2xl p-10 relative overflow-hidden transition-all duration-300 border border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-110">
                <h2 className="text-3xl font-semibold text-gray-300 mb-5">
                  Starter Plan
                </h2>
                <p className="text-gray-500 mb-5 text-lg">/3 Layers</p>
                <p className="text-4xl font-bold text-white mb-6">
                  $100{" "}
                  <span className="text-base text-teal-700">
                    / Starting price
                  </span>
                </p>
                <ul className="space-y-5 mb-8 text-base">
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 1 - Daily income - 0.9% ROI - 60 Days - Dedicated
                      support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 2 - Weekly iconic - 6.5% ROI - 8 Weeks - Dedicated
                      Support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 3 - Monthly iconic - 28.0% ROI - 2 Months -
                      Dedicated Support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">Capital Back - Yes</span>
                  </li>
                </ul>
                <button className="w-full bg-transparent text-teal-500 border border-gray-800 py-4 px-6 rounded-full hover:bg-teal-500 hover:translate-y-2 hover:shadow-xl hover:text-white hover:shadow-white/50 transition-all duration-300 font-semibold text-lg">
                  Purchase Now
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-gray-900 rounded-2xl p-10 relative overflow-hidden transition-all duration-300 border border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-110">
                <h2 className="text-3xl font-semibold text-gray-300 mb-5">
                  Pro Plan
                </h2>
                <p className="text-gray-500 mb-5 text-lg">/3 Layers</p>
                <p className="text-4xl font-bold text-white mb-6">
                  $5000{" "}
                  <span className="text-base text-teal-700">
                    / Starting price
                  </span>
                </p>
                <ul className="space-y-5 mb-8 text-base">
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 1 - Daily income - 1.5% ROI - 60 Days - Dedicated
                      support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 2 - Weekly income - 10.5% ROI - 8 Weeks - Dedicated
                      support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 3 - Monthly income - 45.0% ROI - 2 Months -
                      Dedicated support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">Capital back - Yes</span>
                  </li>
                </ul>
                <button className="w-full bg-transparent text-teal-500 border border-gray-800 py-4 px-6 rounded-full hover:bg-teal-500 hover:translate-y-2 hover:shadow-xl hover:text-white hover:shadow-white/50 transition-all duration-300 font-semibold text-lg">
                  Purchase Now
                </button>
              </div>

              {/* Ultimate Plan */}
              <div className="bg-gray-900 rounded-2xl p-10 relative overflow-hidden transition-all duration-300 border border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-110">
                <h2 className="text-3xl font-semibold text-gray-300 mb-5">
                  Ultimate Plan
                </h2>
                <p className="text-gray-500 mb-5 text-lg">/3 Layers</p>
                <p className="text-4xl font-bold text-white mb-6">
                  $50000{" "}
                  <span className="text-base text-teal-700">
                    / Starting price
                  </span>
                </p>
                <ul className="space-y-5 mb-8 text-base">
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 1 - Daily income - 1.8% ROI - 65 Days - Dedicated
                      Support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 2 - Weekly income - 12.6% ROI - 8 Weeks - Dedicated
                      Support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">
                      Layer 3 - Monthly income - 54.0% ROI - 2 Months -
                      Dedicated Support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon
                      className="text-white rounded-full p-1 h-4 bg-teal-400 mr-3 mt-1"
                      icon={faCheck}
                    />
                    <span className="text-gray-400">Capital Back - Yes</span>
                  </li>
                </ul>
                <button className="w-full bg-transparent text-teal-500 border border-gray-800 py-4 px-6 rounded-full hover:bg-teal-500 hover:translate-y-2 hover:shadow-xl hover:text-white hover:shadow-white/50 transition-all duration-300 font-semibold text-lg">
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
