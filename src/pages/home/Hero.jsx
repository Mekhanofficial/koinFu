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
  return (
    <>
          <style>{floatingAnimations}</style>
    
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
            Next Generation Invest in the future of cryptocurrency with KoinFu
          </h1>
          <h4 className="text-base md:text-lg text-gray-400 mb-8">
            Our cutting-edge technology and expert team make it easy for anyone
            to get involved in the world of digital assets. Join us today and
            start growing your wealth.
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
              className="text-white bg-teal-400 rounded-full p-1 w-4 h-4 flex-shrink-0 mr-1"
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
    </>
  );
}
