import { motion } from "framer-motion";
import backgroundImage from "../../pictures/backgroundImage.jpg";
import px5 from "../../pictures/px5.png";
import px6 from "../../pictures/px6.png";
import px7 from "../../pictures/px7.png";
import px8 from "../../pictures/px8.png";
import { Link } from "react-router-dom";
import HomeHeaderPage from "../../components/HomeHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import brand from "../../../public/brand.png";
import brand2 from "../../../public/brand2.png";
import brand3 from "../../../public/brand3.png";
import brand4 from "../../../public/brand.png";
import FooterPage from "../../components/Footer";
import { useState, useEffect } from "react";
import SkillsSection from "./Skill";
import RandomAlert from "../../constants/RandomAlert";
import ChatBot from "../../components/ChatBot";

const features = [
  {
    image: px6,
    title: "Early Bonus Cash",
    description:
      "Get a head start on growing your wealth with KoinFu's early cash bonus offer - a limited-time opportunity to earn extra returns on your investment.",
    lineColor: "orange", // Gradient starts with teal
  },
  {
    image: px7,
    title: "Secure Transactions",
    description:
      "Enjoy peace of mind with KoinFu's state-of-the-art security measures, ensuring your transactions and investments are always protected.",
    lineColor: "teal", // Gradient starts with blue
  },
  {
    image: px8,
    title: "Transparent Reporting",
    description:
      "Stay informed with KoinFu's transparent reporting system, providing real-time updates on your investment performance.",
    lineColor: "#87CEEB", // Gradient starts with purple
  },
];

export default function AboutPage() {
    const stats = [
      {
        id: "digital-products",
        label: "Digital Products",
        value: 58745,
        suffix: "M+",
        prefix: "$",
      },
      {
        id: "active-users",
        label: "Happy Active Users",
        value: 680000,
        suffix: "+",
      },
      {
        id: "transactions",
        label: "Transactions Done",
        value: 600547000,
        prefix: "$",
        suffix: "+",
      },
      {
        id: "community-btc",
        label: "Community BTC",
        value: 445875,
        suffix: "+",
      },
    ];

    const [hasAnimated, setHasAnimated] = useState(false);
    const [animatedValues, setAnimatedValues] = useState(
      stats.reduce((acc, stat) => ({ ...acc, [stat.id]: 0 }), {})
    );

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startCounting();
          }
        },
        { threshold: 0.25 }
      );

      const statsSection = document.getElementById("stats-section");
      if (statsSection) observer.observe(statsSection);

      return () => observer.disconnect();
    }, [hasAnimated]);

    const formatNumber = (num) => {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
      }
      return num.toLocaleString();
    };

    const animateValue = (id, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);

        setAnimatedValues((prev) => ({
          ...prev,
          [id]: currentValue,
        }));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const startCounting = () => {
      stats.forEach((stat) => {
        animateValue(stat.id, 0, stat.value, 2000);
      });
    };
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
          <h1 className="font-bold text-5xl text-white">About Us</h1>
          <h3 className="text-teal-700 font-semibold text-md mt-2">
            <Link to="/">Home-</Link>
            <span className="text-white">About US</span>
          </h3>
        </motion.div>
      </div>

      <div className="bg-slate-900 flex flex-col md:flex-row items-center justify-center p-8 gap-12 relative z-50  ">
        {/* Image Section */}
        <figure className="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src={px5}
            alt="KoinFu Platform Dashboard"
            className="max-w-full md:max-w-lg rounded-lg animate-spin-slow"
          />
        </figure>

        {/* Content Section */}
        <section className="max-w-2xl text-center md:text-left mx-4 md:mx-0">
          <header className="mb-6">
            <h2 className="text-teal-600 font-semibold text-lg mb-2">
              About KoinFu
            </h2>
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Leading Cryptocurrency Investment Platform
            </h1>
          </header>

          <p className="text-gray-400 mb-6 text-xl leading-relaxed">
            KoinFu is a premier cryptocurrency investment platform designed to
            democratize access to digital assets. We simplify cryptocurrency
            investing with low fees, reliable mining operations, and
            user-friendly tools to help you maximize your returns.
          </p>

          <ul className="space-y-3">
            <li className="flex items-center text-white text-xl">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-white bg-teal-400 rounded-full p-1 w-5 h-5 mr-2 flex-shrink-0"
              />
              Customer-focused feature prioritization
            </li>
            <li className="flex items-center text-white text-xl">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-white bg-teal-400 rounded-full p-1 w-5 h-5 mr-2 flex-shrink-0"
              />
              Bank-grade security and reliability
            </li>
            <li className="flex items-center text-white text-xl">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-white bg-teal-400 rounded-full p-1 w-5 h-5 mr-2 flex-shrink-0"
              />
              Competitive low fee structure
            </li>
          </ul>
        </section>
      </div>

      <div className="relative overflow-hidden bg-slate-950 py-10">
        <div className="inline-flex items-center animate-infinite-scroll whitespace-nowrap">
          {/* Duplicate the brands for seamless looping */}
          <img
            src={brand}
            alt="Brand 1"
            className="mx-8 h-12 w-auto object-contain"
          />
          <img
            src={brand}
            alt="Brand 1"
            className="mx-8 h-12 w-auto object-contain"
          />
          <img
            src={brand2}
            alt="Brand 2"
            className="mx-8 h-12 w-auto object-contain"
          />
          <img
            src={brand3}
            alt="Brand 3"
            className="mx-8 h-12 w-auto object-contain"
          />
          <img
            src={brand4}
            alt="Brand 4"
            className="mx-8 h-12 w-auto object-contain"
          />
          {/* Repeat the same set */}
          <img
            src={brand}
            alt="Brand 1"
            className="mx-8 h-12 w-auto object-contain"
          />
          <img
            src={brand}
            alt="Brand 1"
            className="mx-8 h-12 w-auto object-contain"
          />
          <img
            src={brand2}
            alt="Brand 2"
            className="mx-8 h-12 w-auto object-contain"
          />
          <img
            src={brand3}
            alt="Brand 3"
            className="mx-8 h-12 w-auto object-contain"
          />
          <img
            src={brand4}
            alt="Brand 4"
            className="mx-8 h-12 w-auto object-contain"
          />
        </div>
      </div>

      <div className="bg-gray-950 relative z-50 py-12 px-8 md:px-16">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-teal-600 text-lg font-semibold mb-3">
            KoinFu Features
          </h1>
          <h2 className="text-white text-3xl font-bold mb-4">
            Crypto Best Features
          </h2>
          <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
            Investing in cryptocurrency is a smart choice for those who want to
            capitalize on the growth of this rapidly-evolving field.
          </h4>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-50 relative">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group  p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center relative">
                {/* Image Container */}
                <div className="relative">
                  {/* Image */}
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-24 h-24 mb-6 relative z-10"
                  />
                  {/* Blurred Shadow (Pseudo-element) */}
                  <div
                    className="absolute inset-0 w-28 h-28 opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300 rounded-full z-0"
                    style={{
                      top: "50%",
                      left: "55%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: feature.lineColor,
                    }}
                  ></div>
                </div>

                {/* Vertical Line with Gradient */}
                <div
                  className="w-1 h-12 mb-6"
                  style={{
                    background: `linear-gradient(to bottom, ${feature.lineColor} 0%, rgba(0, 0, 0, 0) 100%)`,
                  }}
                ></div>

                {/* Title and Description */}
                <h3
                  className="text-white text-xl font-semibold mb-3 text-center transition-colors duration-300 group-hover:text-[${feature.lineColor}]"
                  style={{
                    // Dynamically set hover color using inline style
                    // Tailwind doesn't support dynamic values in classes, so we use inline styles
                    "--hover-color": feature.lineColor,
                  }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>

              {/* Add a CSS rule for hover effect */}
              <style jsx>{`
                .group:hover h3 {
                  color: var(--hover-color);
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>

      <SkillsSection/>

      <div
        id="stats-section"
        className="bg-gray-950 py-16 px-4 sm:px-8 lg:px-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center text-center p-6 ${
                index < stats.length - 1 ? "lg:border-r lg:border-gray-700" : ""
              }`}
            >
              <h3 className="text-gray-300 text-lg font-medium mb-3">
                {stat.label}
              </h3>
              <p className="text-teal-400 text-3xl font-bold">
                {stat.prefix || ""}
                {formatNumber(animatedValues[stat.id])}
                {stat.suffix || ""}
              </p>
            </div>
          ))}
        </div>
      </div>
      <RandomAlert/>
      <ChatBot/>
      <FooterPage />
    </>
  );
}
