import { motion } from "framer-motion";
import px1 from "../../pictures/px1.png";
import px2 from "../../pictures/px2.png";
import px3 from "../../pictures/px3.png";
import px4 from "../../pictures/px4.png";
import backgroundImage from "../../pictures/backgroundImage.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

export default function HeroPage() {
  // Slower animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Increased from 0.2
        delayChildren: 0.8, // Increased from 0.3
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2, // Increased from 0.5
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    float1: {
      y: [0, -20, 0],
      transition: {
        duration: 8, // Increased from 4
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    float2: {
      y: [0, -25, 0],
      transition: {
        duration: 10, // Increased from 5
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    float3: {
      y: [0, -15, 0],
      transition: {
        duration: 7, // Increased from 3.5
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Foreground Content */}
      <motion.div
        className="flex flex-col relative z-50 md:flex-row items-center gap-32 justify-between p-8 min-h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Content */}
        <motion.div
          className="text-center md:text-left md:left-10 md:w-1/2 relative"
          variants={itemVariants}
        >
          <div
            className="absolute -left-4 md:-left-8"
            style={{
              width: "4px",
              height: "500px",
              background:
                "linear-gradient(to bottom, teal 0%, rgba(0, 128, 128, 0) 100%)",
            }}
          ></div>

          <motion.div
            className="flex items-center justify-center md:justify-start mb-4"
            variants={itemVariants}
          >
            <div className="rounded-full bg-teal-500 bg-opacity-60 text-white flex items-center justify-center p-2 w-8 h-10 relative left-3">
              <FontAwesomeIcon className="h-6" icon={faEye} />
            </div>
            <button className="bg-gray-600 bg-opacity-20 border-teal-300 text-white px-4 py-2 rounded-full">
              AI Auto Trading Assistant
            </button>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-5xl text-white font-bold mb-6"
            variants={itemVariants}
          >
            Next Generation Invest in the future of cryptocurrency with KoinFu
          </motion.h1>

          <motion.h4
            className="text-base md:text-lg text-gray-400 mb-8"
            variants={itemVariants}
          >
            Our cutting-edge technology and expert team make it easy for anyone
            to get involved in the world of digital assets. Join us today and
            start growing your wealth.
          </motion.h4>

          <motion.div variants={itemVariants}>
            <Link to="/Dashboard">
              <button className="bg-teal-600 font-semibold bg-opacity-20 border-opacity-70 border border-teal-800 text-white px-6 py-3 rounded-full mb-6 flex items-center justify-center md:justify-start gap-2 mx-auto md:mx-0 hover:bg-teal-300 hover:text-slate-900 hover:shadow-teal-300 hover:shadow-lg transition duration-300">
                <FontAwesomeIcon
                  className="h-4 bg-teal-600 p-1 rounded-full"
                  icon={faBitcoin}
                />
                Start Trading
              </button>
            </Link>
          </motion.div>

          <motion.h3
            className="text-xl md:text-xl text-white flex items-center justify-center md:justify-start"
            variants={itemVariants}
          >
            <FontAwesomeIcon
              className="text-white bg-teal-400 rounded-full p-1 w-4 h-4 flex-shrink-0 mr-1"
              icon={faCheck}
              style={{ lineHeight: 0 }}
            />
            Available on Android & iOS Mobile Apps
          </motion.h3>
        </motion.div>

        {/* Right Images */}
        <motion.div
          className="relative md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.5, // Increased from 0.8
            ease: "easeOut",
            delay: 0.5, // Added delay to sync with left content
          }}
        >
          <img src={px2} alt="" className="max-w-md" />
          <motion.img
            src={px1}
            alt=""
            className="absolute -left-10 md:-left-16 top-10 md:top-20 w-48 md:w-72 h-auto"
            variants={floatingVariants}
            animate="float1"
          />
          <motion.img
            src={px3}
            alt=""
            className="absolute -right-5 md:-right-7 top-20 md:top-32 w-48 md:w-72 h-auto"
            variants={floatingVariants}
            animate="float2"
          />
          <motion.img
            src={px4}
            alt=""
            className="absolute -left-20 md:-left-32 -bottom-5 w-48 md:w-72 h-auto"
            variants={floatingVariants}
            animate="float3"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
