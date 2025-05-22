import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ParticlesComponent from "../../components/ParticlesBackground.jsx";
import px1 from "../../pictures/px1.png";
import px2 from "../../pictures/px2.png";
import px3 from "../../pictures/px3.png";
import px4 from "../../pictures/px4.png";
import px5 from "../../pictures/px5.png";
import px6 from "../../pictures/px6.png";
import px7 from "../../pictures/px7.png";
import px8 from "../../pictures/px8.png";
import px9 from "../../pictures/px9.png";
import px10 from "../../pictures/px10.png";
import px11 from "../../pictures/px11.png";
import px12 from "../../pictures/px12.png";
import moon1 from "../../pictures/moon1.jpg";
import dp1 from "../../pictures/dp1.jpeg";
import dp2 from "../../pictures/dp2.jpeg";
import dp3 from "../../pictures/dp3.jpg";
import dp4 from "../../pictures/dp4.jpg";
import dp5 from "../../pictures/dp5.jpg";
import dp6 from "../../pictures/dp6.jpg";

import vd15 from "../../pictures/vd15.mp4";
import { Range } from "react-range";
import backgroundImage from "../../pictures/backgroundImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faCheck,
  faEye,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import FAQ from "../../components/faq/index.jsx";
import ContactUs from "../../components/ContactIndex.jsx";
import HomeHeaderPage from "../../components/HomeHeader.jsx";
import FooterPage from "../../components/Footer.jsx";

// CSS for floating animations
const floatingAnimations = `
  @keyframes float1 {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-25px); }
  }
  @keyframes float3 {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  .floating1 { animation: float1 4s ease-in-out infinite; }
  .floating2 { animation: float2 5s ease-in-out infinite; }
  .floating3 { animation: float3 3.5s ease-in-out infinite; }
`;

const ExchangeRateContainer = ({
  type,
  currency,
  rate,
  color = "teal-700",
  currency2,
  rate2,
  color2 = "teal-700",
}) => {
  return (
    <div className="bg-gray-950 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h1 className="text-white text-lg font-semibold">{type}</h1>

      <h4 className="text-white flex flex-col  ">
        <div>
          <span className={`text-${color}`}>{currency} </span>= {rate}
        </div>
        <div>
          <span className={`text-${color2}`}> {currency2} </span>= {rate2}
        </div>
      </h4>
    </div>
  );
};

export default function HomeHeroPage() {
  const stats = [
    { id: "users-count", label: "USERS", value: "850K+" },
    { id: "countries-count", label: "COUNTRIES", value: "84" },
    { id: "payouts-count", label: "PAYOUTS", value: "$600,547,000+" },
    { id: "trades-count", label: "ACTIVE TRADES", value: "445,875" },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Create an IntersectionObserver to detect when the section is in view
    const statsSection = document.getElementById("stats-section");

    if (!statsSection) return; // Ensure the element exists

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startCounting();
            observer.disconnect(); // Stop observing once the stats have animated
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    observer.observe(statsSection); // Start observing the section

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  // Function to format numbers with suffixes
  const formatNumber = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(3).replace(/\.?0+$/, "")}M+`; // Format as $X.XXXM+
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`; // Format as XK+
    } else {
      return value.toLocaleString(); // Format as plain number
    }
  };

  // Function to animate the number count-up
  const startCounting = () => {
    const countUp = (id, start, end, duration, suffix = "") => {
      const element = document.getElementById(id);
      if (!element) return; // Ensure the element exists

      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const value = Math.min(
          start + (end - start) * (progress / duration),
          end
        );
        element.innerText = formatNumber(value) + suffix; // Apply formatting
        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          element.innerText = formatNumber(end) + suffix; // Ensure it ends exactly at 'end'
        }
      };
      window.requestAnimationFrame(step);
    };

    // Set up individual counts with their targets, durations, and suffixes
    countUp("users-count", 0, 850000, 2000); // 850K+
    countUp("countries-count", 0, 84, 3000); // 84
    countUp("payouts-count", 0, 600547000, 5000); // $600.547M+
    countUp("trades-count", 0, 445875, 3000, "+"); // 445,875+
  };

  const [values, setValues] = useState([0, 100]); // Initial range values

  // Convert range values to prices
  const minPrice = values[0] * 3000; // Rp. 0 to Rp. 300,000
  const maxPrice = values[1] * 3000;
  const features = [
    {
      image: px6,
      title: "Early Bonus Cash",
      description:
        "Get a head start on growing your wealth with koinfu's early cash bonus offer - a limited-time opportunity to earn extra returns on your investment.",
      lineColor: "orange", // Gradient starts with teal
    },
    {
      image: px7,
      title: "Secure Transactions",
      description:
        "Enjoy peace of mind with koinfu's state-of-the-art security measures, ensuring your transactions and investments are always protected.",
      lineColor: "teal", // Gradient starts with blue
    },
    {
      image: px8,
      title: "Transparent Reporting",
      description:
        "Stay informed with koinfu's transparent reporting system, providing real-time updates on your investment performance.",
      lineColor: "#87CEEB", // Gradient starts with purple
    },
    {
      image: px9,
      title: "Low Fees",
      description:
        "koinfu offers some of the lowest fees in the industry, ensuring you keep more of your profits.",
      lineColor: "purple", // Gradient starts with orange
    },
    {
      image: px10,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions or issues.",
      lineColor: "#87CEEB", // Gradient starts with pink
    },
    {
      image: px11,
      title: "Global Access",
      description:
        "Access your investments from anywhere in the world with koinfu's globally available platform.",
      lineColor: "#FF7F7F", // Gradient starts with green
    },
  ];

  const exchangeRates = [
    {
      type: "Exchange Rate",
      currency: "1 ETH",
      rate: "$1,865.36",
      color: "teal-700",
      currency2: "1 BTC",
      rate2: "$27,066.60",
      color2: "teal-700",
    },
    {
      type: "Monthly Rate",
      currency: "BTC",
      rate: "$27,066.60",
      color: "teal-700",
      currency2: "HIGH",
      rate2: "$27,066.60",
      color2: "teal-700",
    },
    {
      type: "Private Sales",
      currency: "1 BTC",
      rate: "$27,066.60",
      color: "teal-700",
      currency2: "Bonus",
      rate2: "65% (1.10)",
      color2: "teal-700",
    },
    {
      type: "Public Sales",
      currency: "1 BTC",
      rate: "$27,066.60",
      color: "teal-700",
      currency2: "Bonus",
      rate2: "65% (1.10)",
      color2: "teal-700",
    },
    {
      type: "Investors",
      rate: "890,000.00",
      currency2: "Ave. Invest($) ",
      rate2: ": 1200",
      color2: "teal-700",
    },
    {
      type: "Pivot Points",
      currency: "1 ETH",
      rate: " $39000.00",
      color: "teal-700",
      currency2: "1 BTC",
      rate2: "$120.00",
      color2: "teal-700",
    },
  ];

  const [plan, setPlan] = useState("basic");
  const [amount, setAmount] = useState("");
  const [profit, setProfit] = useState("0.00");

  // Return multipliers for each plan (scales upwards)
  const profitMultipliers = {
    basic: [4, 7], // 4x to 7x
    standard: [5, 8],
    silver: [6, 9],
    premium: [7, 10],
    platinum: [8, 12],
  };

  // Calculate profit based on investment
  const calculateProfit = (investAmount, planType) => {
    if (!investAmount) return "0.00";

    // Get min and max multiplier for the selected plan
    const [minMultiplier, maxMultiplier] = profitMultipliers[planType];

    // Generate a random multiplier within the range
    const randomMultiplier =
      Math.random() * (maxMultiplier - minMultiplier) + minMultiplier;

    // Calculate profit
    return (investAmount * randomMultiplier).toFixed(2);
  };

  // Handle input change
  const handleAmountChange = (e) => {
    const investAmount = parseFloat(e.target.value) || 0;
    setAmount(e.target.value);
    setProfit(calculateProfit(investAmount, plan));
  };

  // Handle plan change
  const handlePlanChange = (e) => {
    const newPlan = e.target.value;
    setPlan(newPlan);
    setProfit(calculateProfit(parseFloat(amount) || 0, newPlan));
  };

  useEffect(() => {
    // Prevent scrolling on focus
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        e.preventDefault();
        e.target.scrollIntoView({ behavior: "auto", block: "nearest" });
      });
    });
    // Cleanup event listeners
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", (e) => {
          e.preventDefault();
          e.target.scrollIntoView({ behavior: "auto", block: "nearest" });
        });
      });
    };
  }, []);

  const reviews = [
    {
      image: dp1,
      title: "Amy Whyatt",
      description:
        "I've been investing with CoinLog for over a year now, and I'm extremely satisfied with their services. The team is knowledgeable, responsive, and always keeps me updated on the latest cryptocurrency trends. Thanks to their expertise, my investments have grown significantly!",
      lineColor: "orange",
    },
    {
      image: dp2,
      title: "Michel Murphy",
      description:
        "koinfu is the best cryptocurrency investment company I've come across. Their team of professionals guided me through the investment process, answered all my questions, and helped me make informed decisions. I've seen remarkable returns on my investments, and I highly recommend them to anyone looking to enter the world of cryptocurrencies.",
      lineColor: "teal",
    },
    {
      image: dp3,
      title: "Abraham Wilson",
      description:
        "I can't thank CoinLog enough for their exceptional services. Their platform is user-friendly, their investment strategies are well-researched, and their customer support is top-notch. They genuinely care about their clients' success and go the extra mile to ensure we achieve our financial goals. I'm thrilled to be a part of the CoinLog community!",
      lineColor: "#87CEEB",
    },
    {
      image: dp4,
      title: "Daniel Morris",
      description:
        "koinfu has revolutionized my approach to investing. With their expert advice and seamless platform, I've diversified my portfolio and gained exposure to a variety of cryptocurrencies. The team's transparency and dedication to delivering consistent results have earned my trust, and I'm excited to continue growing my investments with them.",
      lineColor: "purple",
    },
    {
      image: dp5,
      title: "Sophia Luther",
      description:
        "Choosing koinfu  was the best decision I made for my cryptocurrency investments. Their team possesses in-depth knowledge of the market, and they tailor their strategies to individual investors' goals. I've experienced significant growth in my portfolio, and I'm grateful for their guidance and support. I wholeheartedly recommend CoinLog to anyone seeking reliable and profitable cryptocurrency investments.",
      lineColor: "#87CEEB", // Gradient starts with pink
    },
    {
      image: dp6,
      title: "Jeff Botch",
      description:
        "koinfu has provided me with an excellent investment experience. Their platform is intuitive, their investment options are diverse, and their team is professional and friendly. I've witnessed remarkable returns on my investments, and I appreciate the peace of mind that comes with knowing my assets are in capable hands. I couldn't be happier with their services!",
      lineColor: "#FF7F7F", // Gradient starts with green
    },
  ];

  const Question = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div
        className="cursor-pointer border-b border-gray-200 bg-slate-900 opacity-80 rounded-md py-5"
        onClick={toggleAnswer}
      >
        <div className="flex items-center mx-4 text-white">
          <FontAwesomeIcon
            className={`text-white rounded-full p-1 h-3 bg-teal-300 mr-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            icon={isOpen ? faMinus : faPlus}
          />
          <h3 className="font-medium text-lg">{question}</h3>
        </div>
        {isOpen && <p className="mt-2 text-gray-200 p-5">{answer}</p>}
      </div>
    );
  };

  const [selectedCategory, setSelectedCategory] = useState("General Question");

  const koinfuItems = [
    "General Question",
    "Token Sales",
    "Client Related",
    "Pre-ICO",
    "Legal Info",
    "Pre sales",
  ];

  const questionsData = {
    "General Question": [
      {
        question: "Can I make payment directly from an Exchange?",
        answer:
          "No, payments cannot be made directly from an exchange. You need to transfer funds to a wallet first.",
      },
      {
        question:
          "What is the process for transferring funds from an exchange to a wallet?",
        answer:
          "Log in to your exchange account, navigate to the withdrawal section, enter your wallet address, and confirm the transaction.",
      },
      {
        question:
          "Are there fees for transferring funds from an exchange to a wallet?",
        answer:
          "Yes, most exchanges charge a withdrawal fee for transferring funds to an external wallet.",
      },
      {
        question:
          "How long does it take to transfer funds from an exchange to a wallet?",
        answer:
          "Transfer times vary depending on the blockchain network, but it typically takes between a few minutes to an hour.",
      },
      {
        question: "Can I use any wallet to receive funds from an exchange?",
        answer:
          "Yes, as long as the wallet supports the cryptocurrency you are transferring and you provide the correct wallet address.",
      },
    ],
    "Token Sales": [
      {
        question: "How do I participate in the token sale?",
        answer:
          "To participate in the token sale, you need to register on our platform, complete KYC, and follow the instructions provided.",
      },
      {
        question: "What currencies are accepted for the token sale?",
        answer: "We accept BTC, ETH, and USDT for the token sale.",
      },
      {
        question: "Is there a minimum investment amount for the token sale?",
        answer:
          "Yes, the minimum investment amount is $100 or its equivalent in other accepted currencies.",
      },
      {
        question: "When will I receive my tokens after the sale?",
        answer:
          "Tokens will be distributed to your wallet within 7 business days after the token sale concludes.",
      },
      {
        question: "Can I cancel my participation in the token sale?",
        answer:
          "No, once you have participated and the transaction is confirmed, it cannot be canceled.",
      },
    ],
    "Client Related": [
      {
        question: "How do I contact customer support?",
        answer:
          "You can contact customer support via email at support@example.com or through the live chat on our website.",
      },
      {
        question: "What are the customer support hours?",
        answer:
          "Our customer support team is available 24/7 to assist you with any queries.",
      },
      {
        question: "How do I reset my account password?",
        answer:
          "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions.",
      },
      {
        question: "Can I change my registered email address?",
        answer:
          "Yes, you can change your email address by contacting customer support and verifying your identity.",
      },
      {
        question: "What should I do if I encounter a technical issue?",
        answer:
          "Please report the issue to our technical support team at techsupport@example.com, and we will assist you promptly.",
      },
    ],
    "Pre-ICO": [
      {
        question: "What is the difference between Pre-ICO and ICO?",
        answer:
          "Pre-ICO is an early-stage sale with discounted tokens, while ICO is the main token sale event.",
      },
      {
        question: "Who can participate in the Pre-ICO?",
        answer:
          "Only whitelisted participants who have completed KYC can participate in the Pre-ICO.",
      },
      {
        question: "What are the benefits of participating in the Pre-ICO?",
        answer:
          "Pre-ICO participants receive tokens at a discounted price and exclusive bonuses.",
      },
      {
        question: "How do I get whitelisted for the Pre-ICO?",
        answer:
          "You need to register on our platform, complete KYC, and submit the required documents for whitelisting.",
      },
      {
        question: "Can I transfer my Pre-ICO tokens to another wallet?",
        answer:
          "Yes, once the tokens are distributed, you can transfer them to any compatible wallet.",
      },
    ],
    "Legal Info": [
      {
        question: "Is the token sale compliant with regulations?",
        answer:
          "Yes, our token sale complies with all applicable regulations in the jurisdictions we operate in.",
      },
      {
        question: "What legal documents govern the token sale?",
        answer:
          "The token sale is governed by our Terms and Conditions, Privacy Policy, and Token Purchase Agreement.",
      },
      {
        question: "Are there any restrictions on who can participate?",
        answer:
          "Yes, participants from restricted jurisdictions are not allowed to participate in the token sale.",
      },
      {
        question: "What happens if the token sale is canceled?",
        answer:
          "In the unlikely event of cancellation, all funds will be returned to participants within 30 business days.",
      },
      {
        question: "Can I get a refund after participating in the token sale?",
        answer:
          "No, refunds are not allowed once the transaction is confirmed and tokens are distributed.",
      },
    ],
    "Pre sales": [
      {
        question: "What is the purpose of the pre-sales phase?",
        answer:
          "The pre-sales phase allows early investors to purchase tokens at a discounted rate before the public sale.",
      },
      {
        question: "How do I qualify for the pre-sales?",
        answer:
          "You need to be whitelisted and meet the minimum investment requirements to qualify for the pre-sales.",
      },
      {
        question: "What is the minimum investment for the pre-sales?",
        answer:
          "The minimum investment for the pre-sales is $500 or its equivalent.",
      },
      {
        question: "Are pre-sales tokens subject to a lock-up period?",
        answer:
          "Yes, pre-sales tokens are subject to a 6-month lock-up period after distribution.",
      },
      {
        question: "Can I participate in the pre-sales from any country?",
        answer:
          "No, participants from restricted jurisdictions are not allowed to participate in the pre-sales.",
      },
    ],
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <style>{floatingAnimations}</style>
      <ParticlesComponent />
      <section className="overflow-x-hidden" style={{ height: "100vh" }}>
        <HomeHeaderPage />

        <div
          className="flex flex-col md:flex-row items-center  gap-32 justify-between mt- p-8 z-50 relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          {/* Left Section - Text Content */}
          <div className="text-center md:text-left md:left-10 md:w-1/2 relative">
            {/* Vertical Teal Line */}
            <div
              className="absolute -left-4 md:-left-8"
              style={{
                width: "4px",
                height: "500px",
                background:
                  "linear-gradient(to bottom, teal 0%, rgba(0, 128, 128, 0) 100%)",
              }}
            ></div>

            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="rounded-full bg-teal-500 text-white flex items-center justify-center w-10 h-10 relative left-3">
                <FontAwesomeIcon className="h-6" icon={faEye} />
              </div>
              <button className="bg-gray-600 bg-opacity-40 border-teal-300 text-white px-4 py-2 rounded-full">
                AI Auto Trading Assistant
              </button>
            </div>
            <h1 className="text-3xl md:text-5xl text-white font-bold mb-6">
              Next Generation Invest in the future of cryptocurrency with koinfu
            </h1>
            <h4 className="text-base md:text-lg text-gray-400 mb-8">
              Our cutting-edge technology and expert team make it easy for
              anyone to get involved in the world of digital assets. Join us
              today and start growing your wealth.
            </h4>
            <Link to="/Dashboard">
              <button className="bg-teal-600 font-semibold bg-opacity-20 border-opacity-70 border border-teal-800 text-white px-6 py-3 rounded-full mb-6 flex items-center justify-center md:justify-start gap-2 mx-auto md:mx-0 hover:bg-teal-300 hover:text-slate-900 hover:shadow-teal-300 hover:shadow-lg transition duration-300">
                <FontAwesomeIcon
                  className="h-4 bg-teal-600 p-1 rounded-full"
                  icon={faBitcoin}
                />
                Start Trading
              </button>
            </Link>
            <h3 className="text-xl md:text-xl text-white flex items-center justify-center md:justify-start">
              <FontAwesomeIcon
                className="text-white bg-green-400 rounded-full p-1 w-5 h-5 flex-shrink-0 mr-1"
                icon={faCheck}
                style={{ lineHeight: 0 }}
              />
              Available on Android & iOS Mobile Apps
            </h3>
          </div>

          {/* Right Section - Images */}
          <div className="relative md:w-1/2 flex justify-center">
            <img src={px2} alt="" className="max-w-md" />
            <img
              src={px1}
              alt=""
              className="absolute -left-10 md:-left-16 top-10 md:top-20 w-48 md:w-72 h-auto floating1"
            />
            <img
              src={px3}
              alt=""
              className="absolute -right-5 md:-right-7 top-20 md:top-32 w-48 md:w-72 h-auto floating2"
            />
            <img
              src={px4}
              alt=""
              className="absolute -left-20 md:-left-32 -bottom-5 w-48 md:w-72 h-auto floating3"
            />
          </div>
        </div>

        <div
          id="stats-section"
          className="flex bg-slate-950 flex-wrap sm:flex-nowrap justify-between text-center  p-20  text-white space-y-6 sm:space-y-0 sm:space-x-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center w-full sm:w-1/4 border-teal-600 pb-6 sm:pb-0 ${
                index !== stats.length - 1 ? "sm:border-b-0 sm:border-r" : ""
              }`}
            >
              <h2 className="font-semibold">{stat.label}</h2>
              <p
                id={stat.id}
                className="text-teal-300 font-semibold text-2xl min-w-[100px]"
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 flex flex-col md:flex-row items-center justify-center p-8 gap-12 z-50 relative">
          {/* Image Section */}
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <img
              src={px5}
              alt="koinfu Platform"
              className="max-w-full md:max-w-lg rounded-lg  rotate-slowly"
            />
          </div>

          {/* Text Content Section */}
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-teal-600 font-semibold text-lg mb-3">
              What is koinfu?
            </h2>
            <h4 className="text-white text-2xl font-bold mb-6">
              Leading Cryptocurrency Investment Platform
            </h4>
            <p className="text-gray-400 mb-4">
              koinfu is a leading cryptocurrency investment platform that allows
              anyone to participate in the exciting world of digital assets. Our
              platform is designed to simplify the process of investing in
              cryptocurrency and earning a return on your investment.
            </p>
            <p className="text-gray-400 mb-4">
              With low fees and reliable mining operations, koinfu ensures your
              investments are secure and profitable. We use state-of-the-art
              facilities and equipment to maximize efficiency, and our team of
              experienced professionals is dedicated to delivering the best
              returns.
            </p>
            <p className="text-gray-400 mb-6">
              Transparency is at the core of what we do. With koinfu, you'll
              always know exactly how your investments are performing, thanks to
              our clear and detailed reporting.
            </p>
            <p className="text-gray-400 mb-6">
              koinfu Ltd is a registered company in the British Virgin Islands
              (BVI Company Number 2086929). Our registered office is located at
              C/O Vistra (BVI) Limited, Vistra Corporate Services Centre,
              Wickhams Cay II, Road Town, Tortola, VG1110.
            </p>
            <button className="bg-gray-600 bg-opacity-40 border-opacity-70 border border-teal-300 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 mx-auto md:mx-0 hover:bg-teal-300 hover:text-slate-900 hover:shadow-teal-300 hover:shadow-lg transition duration-300">
              <FontAwesomeIcon icon={faBitcoin} />
              Read More
            </button>
          </div>
        </div>

        <div className="bg-slate-950 py-12 px-8 md:px-16">
          {/* Heading Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-lg font-semibold mb-3">
              koinfu Features
            </h1>
            <h2 className="text-white text-3xl font-bold mb-4">
              Crypto Best Features
            </h2>
            <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
              Investing in cryptocurrency is a smart choice for those who want
              to capitalize on the growth of this rapidly-evolving field.
            </h4>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-50 relative">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
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

        <div className=" bg-gray-900 p-5 z-50 relative">
          <div className="text-center mb-12 ">
            <h1 className="text-teal-600 text-lg font-semibold mb-3">
              Token Sales
            </h1>
            <h2 className="text-white text-3xl font-bold mb-4">
              ICO Token Sales
            </h2>
            <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
              Our platform is designed to be accessible to everyone, regardless
              of their technical expertise or background.
            </h4>
          </div>

          <div className="flex flex-col  md:flex-row gap-6 p-6">
            {/* Crypto Containers (3 rows, 2 columns) */}
            <div className="grid  grid-cols-2 gap-6 md:w-2/3">
              {exchangeRates.map((item, index) => (
                <ExchangeRateContainer
                  key={index}
                  type={item.type}
                  currency={item.currency}
                  rate={item.rate}
                  color={item.color}
                  currency2={item.currency2}
                  rate2={item.rate2}
                  color2={item.color2}
                />
              ))}
            </div>

            {/* Token Sale Container (Right Side) */}
            <div className="bg-gray-950 text-white p-6 rounded-lg shadow-lg md:w-1/3">
              {/* Token Sale Countdown */}
              <h2 className="text-xl font-semibold mb-4">
                Token Sale Start in
              </h2>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Days</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Hours</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Mins</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Sec</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>

              {/* Currency Values */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-400">
                    Rp. {minPrice.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    Rp. {maxPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Soft Cap, Crowdsale, Hard Cap */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Soft Cap</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Crowdsale</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Hard Cap</p>
                </div>
              </div>

              {/* Dual-Thumb Range Slider */}
              <div className="mb-6">
                <Range
                  step={1}
                  min={0}
                  max={100}
                  values={values}
                  onChange={(newValues) => setValues(newValues)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#4A5568", // Default track color (gray-700)
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${values[1] - values[0]}%`,
                          backgroundColor: "#2DD4BF", // Teal color for the active range
                          borderRadius: "8px",
                          position: "absolute",
                          left: `${values[0]}%`,
                        }}
                      />
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "20px",
                        width: "20px",
                        backgroundColor: isDragged ? "#2DD4BF" : "#FFFFFF", // Teal when dragged, white otherwise
                        borderRadius: "50%",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  )}
                />
              </div>

              {/* Centered Image */}
              <div className="flex justify-center items-center">
                <img src={px12} alt="Token Sale" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative text-center text-white px-6 sm:px-10 md:px-16 lg:px-20 pb-20">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: `url(${moon1})` }}
          />

          {/* Section Title */}
          <div className="relative z-10 mb-12 p-10 ">
            <h1 className="text-3xl sm:text-5xl font-semibold top-5 relative ">
              Profit <span className="text-teal-600">Calculator</span>
            </h1>
            <h4 className="text-slate-100 font-semibold top-12 relative text-lg ">
              You must know the calculation before investing in any plan, so you
              never make mistakes.
              <br /> Check the calculation and you will get as our calculator
              says.
            </h4>
          </div>

          {/* Calculator Section */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-10">
            {/* Video Background Container */}
            <div className="relative w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl">
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              >
                <source src={vd15} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Calculator Content */}
              <div className="relative z-10 bg-gray-900 bg-opacity-90 rounded-xl p-6 sm:p-8 lg:p-10 border border-teal-900 backdrop-blur-sm">
                {/* Plan & Investment Inputs */}
                <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
                  <div className="w-full sm:w-1/2">
                    <label className="text-white mb-2 text-lg font-medium">
                      Choose Plan
                    </label>
                    <select
                      className="w-full rounded-lg bg-gray-800 text-white p-3 outline-none hover:bg-gray-700 focus:ring-2 focus:ring-teal-600 transition-all"
                      value={plan}
                      onChange={handlePlanChange}
                    >
                      <option value="basic">Basic Package</option>
                      <option value="standard">Standard Package</option>
                      <option value="silver">Silver Package</option>
                      <option value="premium">Premium Package</option>
                      <option value="platinum">Platinum Package</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="text-white mb-2 text-lg font-medium">
                      Invest Amount
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none hover:bg-gray-700 focus:ring-2 focus:ring-teal-600 transition-all"
                    />
                  </div>
                </div>

                {/* Profit Output */}
                <div className="mb-8">
                  <label className="text-white mb-2 text-lg font-medium">
                    Profit Amount
                  </label>
                  <input
                    type="text"
                    placeholder="0.00"
                    value={profit}
                    readOnly
                    className="w-full rounded-lg border border-teal-600 bg-teal-700 bg-opacity-20 p-3 text-white outline-none focus:ring-2 focus:ring-teal-600 transition-all"
                  />
                </div>

                {/* Call-to-Action Button */}
                <div>
                  <button className="w-full bg-transparent text-teal-500 border border-teal-600 py-3 px-6 rounded-full hover:bg-teal-600 hover:text-white hover:shadow-lg hover:shadow-teal-600/30 transition-all duration-300 font-semibold">
                    Start Investing Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 py-12 px-8 md:px-16 relative z-10">
          {/* Heading Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-500 text-lg font-semibold mb-3">
              koinfu Testimonials
            </h1>
            <h2 className="text-white text-5xl font-bold mb-4">
              This are what some of our clients are saying
            </h2>
            <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
              Investing in cryptocurrency is a smart choice for those who want
              to capitalize on the growth of this rapidly-evolving field.
            </h4>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-50 relative">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="group bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center relative">
                  {/* Image Container */}
                  <div className="relative">
                    {/* Image */}
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-20 h-20 mb-6 relative z-10 rounded-full"
                    />
                    {/* Blurred Shadow (Pseudo-element) */}
                    <div
                      className="absolute inset-0 w-28 h-28 opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300 rounded-full z-0"
                      style={{
                        top: "50%",
                        left: "55%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: review.lineColor,
                      }}
                    ></div>
                  </div>

                  {/* Vertical Line with Gradient */}
                  <div
                    className="w-1 h-12 mb-6"
                    style={{
                      background: `linear-gradient(to bottom, ${review.lineColor} 0%, rgba(0, 0, 0, 0) 100%)`,
                    }}
                  ></div>

                  {/* Title and Description */}
                  <h3
                    className="text-white text-2xl font-semibold mb-3 text-center transition-colors duration-300 group-hover:text-[${review.lineColor}]"
                    style={{
                      // Dynamically set hover color using inline style
                      // Tailwind doesn't support dynamic values in classes, so we use inline styles
                      "--hover-color": review.lineColor,
                    }}
                  >
                    {review.title}
                  </h3>
                  <p className="text-gray-400 text-lg text-center">
                    {review.description}
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

        <div className="bg-slate-950 shadow-md relative z-10 p-10">
          <div className="text-center mb-12">
            <h1 className="text-teal-500 text-lg font-semibold mb-3">FAQ</h1>
            <h2 className="text-white text-5xl font-bold mb-4">
              Question & Answer
            </h2>
            <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
              we pride ourselves on our team of skilled and experienced
              professionals who are dedicated to providing our users with the
              best possible investment experience.
            </h4>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Side: koinfuItems */}
            <div className="w-full md:w-1/4 p-4 bg-slate-800 rounded-lg shadow-lg mb-4 md:mb-0">
              <ul className="space-y-3">
                {koinfuItems.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center p-3 rounded-lg text-lg transition-all duration-300 ${
                      selectedCategory === item
                        ? "text-teal-400 bg-slate-700 border-l-4 border-teal-400"
                        : "text-gray-300 hover:bg-slate-700 hover:text-teal-400"
                    } cursor-pointer`}
                    onClick={() => handleCategoryClick(item)}
                  >
                    <FontAwesomeIcon
                      className={`text-white rounded-full p-1 h-4 bg-teal-400 mr-3 ${
                        selectedCategory === item ? "opacity-100" : "opacity-80"
                      }`}
                      icon={faPlay}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: Questions and Answers */}
            <div className="w-full md:w-3/4 p-4 md:p-6 bg-slate-900 rounded-lg shadow-lg md:ml-4">
              <div className="max-w-2xl mx-auto">
                {questionsData[selectedCategory]?.map((item, index) => (
                  <Question
                    key={index}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <ContactUs />
        <FooterPage />
      </section>
    </>
  );
}
