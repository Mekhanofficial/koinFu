
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,

} from "@fortawesome/free-solid-svg-icons";

export default function (){
    return (
      <>
        <div className="bg-slate-950 text-white py-12 px-6 sm:px-10 md:px-16 lg:px-20 relative z-40">
          <div className="text-center mb-12">
            <h1 className="text-teal-500 text-lg font-semibold mb-3">
              Pricing Plan
            </h1>
            <h2 className="text-white text-5xl font-bold mb-4">
              Investment Plan
            </h2>
            <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
              Our plans are designed to provide high returns and reliable mining
              operations, with expert guidance and support every step of the
              way.
            </h4>
          </div>
          <div className="text-white py-16 px-6 sm:px-10 md:px-16 lg:px-20">
            <div className="mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Starter Plan */}
                <div className="bg-gray-900 rounded-xl p-8 relative overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105">
                  <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                    Starter Plan
                  </h2>
                  <p className="text-gray-600 mb-4">/3 Layers</p>
                  <p className="text-3xl font-bold text-white mb-6">
                    $100{" "}
                    <span className="text-sm text-teal-700">
                      / Starting price
                    </span>
                  </p>
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 1 - Daily income - 0.9% ROI - 60 Days - Dedicated
                        support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 2 - Weekly iconic - 6.5% ROI - 8 Weeks - Dedicated
                        Support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 3 - Monthly iconic - 28.0% ROI - 2 Months -
                        Dedicated Support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">Capital Back - Yes</span>
                    </li>
                  </ul>
                  <button className="w-full bg-transparent text-teal-500 border border-gray-800 py-3 px-6 rounded-full hover:bg-teal-500 hover:translate-y-2 hover:shadow-xl hover:text-white hover:shadow-white/50 transition-all duration-300 font-semibold">
                    Purchase Now
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gray-900 rounded-xl p-8 relative overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105">
                  <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                    Pro Plan
                  </h2>
                  <p className="text-gray-600 mb-4">/3 Layers</p>
                  <p className="text-3xl text-white font-bold mb-6">
                    $5000{" "}
                    <span className="text-sm text-teal-700">
                      / Starting price
                    </span>
                  </p>
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 1 - Daily income - 1.5% ROI - 60 Days - Dedicated
                        support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 2 - Weekly income - 10.5% ROI - 8 Weeks -
                        Dedicated support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 3 - Monthly income - 45.0% ROI - 2 Months -
                        Dedicated support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">Capital back - Yes</span>
                    </li>
                  </ul>
                  <button className="w-full bg-transparent text-teal-500 border border-gray-800 py-3 px-6 rounded-full hover:bg-teal-500 hover:translate-y-2 hover:shadow-xl hover:text-white hover:shadow-white/50 transition-all duration-300 font-semibold">
                    Purchase Now
                  </button>
                </div>

                {/* Ultimate Plan */}
                <div className="bg-gray-900 rounded-xl p-8 relative overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-800 hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-105">
                  <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                    Ultimate Plan
                  </h2>
                  <p className="text-gray-600 mb-4">/3 Layers</p>
                  <p className="text-3xl text-white font-bold mb-6">
                    $50000{" "}
                    <span className="text-sm text-teal-700">
                      / Starting price
                    </span>
                  </p>
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 1 - Daily income - 1.8% ROI - 65 Days - Dedicated
                        Support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 2 - Weekly income - 12.6% ROI - 8 Weeks -
                        Dedicated Support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">
                        Layer 3 - Monthly income - 54.0% ROI - 2 Months -
                        Dedicated Support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon
                        className="text-white rounded-full p-1 h-3 bg-teal-400 mr-2"
                        icon={faCheck}
                      />
                      <span className="text-gray-600">Capital Back - Yes</span>
                    </li>
                  </ul>
                  <button className="w-full bg-transparent text-teal-500 border border-gray-800 py-3 px-6 rounded-full hover:bg-teal-500 hover:translate-y-2 hover:shadow-xl hover:text-white hover:shadow-white/50 transition-all duration-300 font-semibold">
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