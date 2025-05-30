import { motion } from "framer-motion";
import HomeHeaderPage from "../../components/HomeHeader";
import backgroundImage from "../../pictures/backgroundImage.jpg";
import px6 from "../../pictures/px6.png";
import px7 from "../../pictures/px7.png";
import px8 from "../../pictures/px8.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCheck,
  faHeadset,
  faShieldAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import FooterPage from "../../components/Footer";
const features = [
  {
    image: px6,
    title: "Investment Plans",
    description:
      "Choose from our tiered investment portfolios designed for all experience levels, from beginner to advanced traders. Our automated tools help optimize your returns while maintaining risk parameters tailored to your financial goals.",
    icon: faChartLine,
    color: "text-orange-400",
  },
  {
    image: px7,
    title: "User Dashboard",
    description:
      "Our comprehensive dashboard provides real-time analytics, portfolio tracking, and market insights in one intuitive interface. Monitor performance, track trends, and execute trades seamlessly across all your devices.",
    icon: faTachometerAlt,
    color: "text-teal-400",
  },
  {
    image: px8,
    title: "Security First",
    description:
      "We employ military-grade encryption, multi-signature wallets, and cold storage solutions to safeguard your assets. Regular third-party audits ensure our security protocols meet institutional-grade standards.",
    icon: faShieldAlt,
    color: "text-blue-400",
  },
  {
    image: px8,
    title: "Expert Support",
    description:
      "Access our team of certified crypto specialists 24/7 for personalized investment guidance. From market analysis to technical support, we provide white-glove service at every step of your investment journey.",
    icon: faHeadset,
    color: "text-purple-400",
  },
];

export default function ServicePage() {
  return (
    <>
      <HomeHeaderPage />
      <div
        className="relative -mt-24 top-1 flex items-center justify-center text-center"
        style={{ height: "100vh" }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-zinc-950 opacity-40"
          style={{ zIndex: "-1" }}
        ></div>

        <img
          style={{
            height: "100vh",
            width: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "-2",
            objectFit: "cover",
          }}
          src={backgroundImage}
          alt="Background image showcasing a restaurant or food ambiance"
        />

        <motion.div
          className="z-10"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-bold text-5xl text-white">Services</h1>
          <h3 className="text-teal-700 font-semibold text-md mt-2">
            <Link to="/">Home-</Link>
            <span className="text-white">Services</span>
          </h3>
        </motion.div>
      </div>

      <div className="bg-slate-950 py-20 px-4 sm:px-8 lg:px-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-teal-500 font-semibold text-lg mb-3">
            KoinFu Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Enterprise-Grade Crypto Solutions
          </h2>
          <p className="text-gray-400 text-lg">
            Harness the full potential of digital assets with our
            institutional-quality platform designed for both retail and
            professional investors.
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 p-8 rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                {/* Icon with colored background */}
                <div
                  className={`mb-6 p-4 rounded-full ${feature.color.replace(
                    "text",
                    "bg"
                  )} bg-opacity-10`}
                >
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className={`text-2xl ${feature.color}`}
                  />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-4 ${feature.color}`}>
                  {feature.title}
                </h3>

                {/* Extended Description */}
                <p className="text-gray-400 text-base leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <a
                  href="#"
                  className="mt-6 text-md font-medium hover:underline text-teal-600 hover:text-teal-400 transition-colors"
                >
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-slate-950 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage} // Replace with your actual image path
            alt="Crypto background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/30"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Text Content */}
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Looking for a Crypto Expert?
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                At Quantumedgecoin, we're committed to delivering premium
                cryptocurrency mining services. Whether you're investing in
                Bitcoin, Ethereum, or other digital assets, our platform
                combines intuitive design with competitive fees and exceptional
                returns. Join our growing community of savvy investors and start
                building your crypto portfolio with confidence.
              </p>
            </div>

            {/* CTA Button */}
            <button className="bg-teal-600/20 hover:bg-teal-600/40 border border-teal-600/60 hover:border-teal-600 text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-teal-600/20 whitespace-nowrap min-w-[180px] justify-center">
              <FontAwesomeIcon
                icon={faMessage}
                className="h-4 w-4 bg-teal-600 p-1.5 rounded-full"
              />
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-950 text-white py-12 px-6 sm:px-10 md:px-16 lg:px-20 ">
        <div className="text-center mb-12">
          <h1 className="text-teal-500 text-lg font-semibold mb-3">
            Pricing Plan
          </h1>
          <h2 className="text-white text-5xl font-bold mb-4">
            Investment Plan
          </h2>
          <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
            Our plans are designed to provide high returns and reliable mining
            operations, with expert guidance and support every step of the way.
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
                      Layer 2 - Weekly income - 10.5% ROI - 8 Weeks - Dedicated
                      support
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
                      Layer 2 - Weekly income - 12.6% ROI - 8 Weeks - Dedicated
                      Support
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
      <FooterPage />
    </>
  );
}
