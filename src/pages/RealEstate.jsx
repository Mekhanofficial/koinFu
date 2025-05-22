import { useState } from "react";
import px17 from "../pictures/px17.png";
import px18 from "../pictures/px18.png";
import px19 from "../pictures/px19.png";
import px20 from "../pictures/px20.png";
import px21 from "../pictures/px21.png";
import px22 from "../pictures/px22.png";
import Modal from "./Modal";
import ProjectDetail from "./RealEstatedetails";
import { useTheme } from "next-themes";

const realest = [
  {
    id: 1,
    name: "Hilton Philadelphia City Avenue",
    image: px17,
    profitRate:
      "Discounted acquisition of a recently renovated hotel property in Philadelphia with below-market, assumable debt.",
    amount: "$33,000.00",
    botLevel: "25",
    Roi: "68.7%",
  },
  {
    id: 2,
    name: "Fabian Labs, Palo Alto",
    image: px18,
    profitRate:
      "Two-building life science conversion in the heart of Silicon Valley and minutes from Stanford University.",
    amount: "$24,000.00",
    botLevel: "30",
    Roi: "57%",
  },
  {
    id: 3,
    name: "Go Store It Nashville",
    image: px19,
    profitRate:
      "Class A self-storage development in one of Nashville's fastest growing suburbs with constrained supply.",
    amount: "$15,000.00",
    Roi: "18%",
  },
  {
    id: 4,
    name: "The Mirage - Texas State Student Housing",
    image: px20,
    profitRate:
      "A Texas State University student housing acquisition assuming below-market fixed-rate debt.",
    amount: "$32,500.00",
    Roi: "84.35%",
  },
  {
    id: 5,
    name: "Palmetto Industrial Park",
    image: px21,
    profitRate:
      "Acquisition of a newly constructed three-building industrial property, attracting prospective tenants.",
    amount: "$25,000.00",
    Roi: "78%",
  },
  {
    id: 6,
    name: "Bridge Labs at Pegasus Park",
    image: px22,
    profitRate:
      "Life science redevelopment within a thriving new biotech-focused campus in Dallas.",
    amount: "$12,000.00",
    Roi: "85%",
  },
];

export default function RealestPage() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedReal, setSelectedReal] = useState(null);

  const handleInvestClick = (real) => {
    setSelectedReal(real);
    setIsModalOpen(true);
  };

  const handleViewClick = (real) => {
    setSelectedReal(real);
    setIsDetailOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <>
      <section
        className={`p-8 min-h-screen ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        }`}
      >
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Real Estate
          </h1>
          <p
            className={`mt-4 max-w-2xl mx-auto text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Invest in projects and earn passive income
          </p>
          <h4
            className={`text-xl font-semibold mt-6 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            My Projects
          </h4>
        </div>

        <h1
          className={`text-3xl font-bold mb-8 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          All Projects
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {realest.map((real) => (
            <div
              key={real.id}
              className={`p-6 rounded-xl flex flex-col items-center text-center shadow-lg border transition-transform duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-slate-900 border-gray-800 hover:shadow-teal-500/20"
                  : "bg-white border-gray-200 hover:shadow-teal-400/20"
              }`}
            >
              <img
                className="w-full h-64 rounded-2xl object-cover mb-4 p-2"
                src={real.image}
                alt={real.name}
              />
              <h2
                className={`text-2xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {real.name}
              </h2>
              <p
                className={`mb-4 text-lg ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {real.profitRate}
              </p>
              <div
                className={`flex justify-between w-full px-6 text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <div className="text-center">
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {real.amount}
                  </h1>
                  <p
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    MINIMUM
                  </p>
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {real.Roi}
                  </h1>
                </div>
                <div className="text-center">
                  <h1
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    ROI
                  </h1>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-orange-400" : "text-orange-500"
                    }`}
                  >
                    Growth & Income
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    STRATEGY
                  </p>
                </div>
              </div>
              <div className="flex gap-4 w-full mt-6">
                <button
                  onClick={() => handleViewClick(real)}
                  className={`w-full px-4 py-3 rounded-lg shadow-lg transition duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white hover:from-slate-800 hover:to-slate-700"
                      : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-200"
                  }`}
                >
                  View
                </button>
                <button
                  onClick={() => handleInvestClick(real)}
                  className={`w-full px-4 py-3 rounded-lg shadow-lg transition duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-teal-700 to-teal-900 text-white hover:from-teal-800 hover:to-teal-700"
                      : "bg-gradient-to-r from-teal-500 to-teal-700 text-white hover:from-teal-600 hover:to-teal-500"
                  }`}
                >
                  Invest Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className={`p-8 rounded-lg w-full max-w-md ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className={`text-2xl text-center font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {selectedReal?.name}
            </h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Amount:
            </p>
            <div
              className={`flex items-center justify-between rounded-lg my-4 w-full ${
                theme === "dark"
                  ? "bg-slate-700 text-gray-300"
                  : "bg-gray-100 text-gray-800"
              } p-3`}
            >
              {selectedReal?.amount}
              <span
                className={`p-1 rounded-md ${
                  theme === "dark"
                    ? "bg-teal-800 text-white"
                    : "bg-teal-600 text-white"
                }`}
              >
                USD
              </span>
            </div>
            <select
              className={`flex items-center justify-between rounded-lg my-4 w-full ${
                theme === "dark"
                  ? "bg-slate-700 text-gray-300"
                  : "bg-gray-100 text-gray-800"
              } p-3`}
            >
              <option>Duration (Days):</option>
              <option>3 Days</option>
              <option>5 Days</option>
              <option>7 Days</option>
              <option>30 Days</option>
            </select>
            <div
              className={`flex items-center justify-between rounded-lg my-4 w-full ${
                theme === "dark"
                  ? "bg-slate-700 text-gray-300"
                  : "bg-gray-100 text-gray-800"
              } p-3`}
            >
              {selectedReal?.Roi}
            </div>
            <button
              className={`w-full px-4 py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-teal-600 hover:bg-teal-500 text-white"
                  : "bg-teal-500 hover:bg-teal-400 text-white"
              }`}
              onClick={closeModal}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {isDetailOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeDetail}
        >
          <div
            className={`p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectDetail
              project={selectedReal}
              onClose={closeDetail}
              theme={theme}
            />
          </div>
        </div>
      )}
    </>
  );
}