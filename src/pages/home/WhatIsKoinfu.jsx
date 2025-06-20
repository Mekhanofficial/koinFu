import px5 from "../../pictures/px5.png";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function WhatIsKoinfuPage() {
  return (
    <>
      <div className="bg-slate-900 flex flex-col md:flex-row items-center justify-center p-8 gap-12 z-50 relative">
        {/* Image Section */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src={px5}
            alt="KoinFu Platform"
            className="max-w-full md:max-w-lg rounded-lg  rotate-slowly"
          />
        </div>

        {/* Text Content Section */}
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-2xl flex gap-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-800">
            <h2> What </h2>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-700">
              is Ko
              <span className=" bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-cyan-900">
                inFu?
              </span>
            </span>
          </h2>
          <h4 className="text-white text-2xl font-bold mb-6">
            Leading Cryptocurrency Investment Platform
          </h4>
          <p className="text-gray-400 mb-4">
            KoinFu is a leading cryptocurrency investment platform that allows
            anyone to participate in the exciting world of digital assets. Our
            platform is designed to simplify the process of investing in
            cryptocurrency and earning a return on your investment.
          </p>
          <p className="text-gray-400 mb-4">
            With low fees and reliable mining operations, KoinFu ensures your
            investments are secure and profitable. We use state-of-the-art
            facilities and equipment to maximize efficiency, and our team of
            experienced professionals is dedicated to delivering the best
            returns.
          </p>
          <p className="text-gray-400 mb-6">
            Transparency is at the core of what we do. With KoinFu, you'll
            always know exactly how your investments are performing, thanks to
            our clear and detailed reporting.
          </p>
          <p className="text-gray-400 mb-6">
            KoinFu Ltd is a registered company in the British Virgin Islands
            (BVI Company Number 2086929). Our registered office is located at
            C/O Vistra (BVI) Limited, Vistra Corporate Services Centre, Wickhams
            Cay II, Road Town, Tortola, VG1110.
          </p>
          <button className="bg-gray-600 bg-opacity-40 border-opacity-70 border border-teal-300 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 mx-auto md:mx-0 hover:bg-teal-300 hover:text-slate-900 hover:shadow-teal-300 hover:shadow-lg transition duration-300">
            <FontAwesomeIcon icon={faBitcoin} />
            Read More
          </button>
        </div>
      </div>
    </>
  );
}
