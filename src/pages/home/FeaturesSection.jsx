import px6 from "../../pictures/px6.png";
import px7 from "../../pictures/px7.png";
import px8 from "../../pictures/px8.png";
import px9 from "../../pictures/px9.png";
import px10 from "../../pictures/px10.png";
import px11 from "../../pictures/px11.png";

const features = [
  {
    image: px6,
    title: "Early Bonus Cash",
    description:
      "Get a head start on growing your wealth with KoinFu's early cash bonus offer - a limited-time opportunity to earn extra returns on your investment.",
    lineColor: "orange",
  },
  {
    image: px7,
    title: "Secure Transactions",
    description:
      "Enjoy peace of mind with KoinFu's state-of-the-art security measures, ensuring your transactions and investments are always protected.",
    lineColor: "teal",
  },
  {
    image: px8,
    title: "Transparent Reporting",
    description:
      "Stay informed with KoinFu's transparent reporting system, providing real-time updates on your investment performance.",
    lineColor: "#87CEEB",
  },
  {
    image: px9,
    title: "Low Fees",
    description:
      "KoinFu offers some of the lowest fees in the industry, ensuring you keep more of your profits.",
    lineColor: "purple",
  },
  {
    image: px10,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions or issues.",
    lineColor: "#87CEEB",
  },
  {
    image: px11,
    title: "Global Access",
    description:
      "Access your investments from anywhere in the world with KoinFu's globally available platform.",
    lineColor: "#FF7F7F",
  },
];

export default function FeaturesSection() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 relative z-50 py-16 px-4 sm:px-8">
      {/* Animated Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="inline-block relative mb-5">
          <span className="text-teal-400 text-sm font-semibold tracking-wider uppercase bg-teal-400/10 px-4 py-1.5 rounded-full">
            KoinFu Features
          </span>
          <div className="absolute inset-0 bg-teal-400 rounded-full blur-lg opacity-20 -z-10 animate-pulse"></div>
        </div>

        <h2 className="text-white text-4xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-500">
          Crypto Best Features
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Investing in cryptocurrency is a smart choice for those who want to
          capitalize on the growth of this rapidly-evolving field.
        </p>
      </div>

      {/* Modern Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-b from-gray-800/50 to-gray-900/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 hover:border-teal-400/30 hover:-translate-y-2"
            style={{
              boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)",
              backgroundImage:
                "radial-gradient(at top right, rgba(31,41,55,0.4) 0%, rgba(15,23,42,0.1) 60%)",
            }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-700/10 to-gray-900/10 border border-gray-700/30 pointer-events-none"></div>

            {/* Animated Image Container */}
            <div className="relative mb-4 flex justify-center">
              <div className="relative">
                {/* Floating image effect */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-28 h-28 z-10 relative transition-transform duration-500 group-hover:scale-110"
                />

                {/* Animated gradient ring */}
                <div
                  className="absolute inset-0 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(${feature.lineColor}, transparent 240deg)`,
                    mask: "radial-gradient(black 50%, transparent 65%)",
                    WebkitMask: "radial-gradient(black 50%, transparent 65%)",
                  }}
                ></div>

                {/* Floating particles */}
                <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full animate-float"
                      style={{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        backgroundColor: feature.lineColor,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        opacity: Math.random() * 0.5 + 0.3,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Line with Gradient - Restored */}
            <div className="flex justify-center mb-5">
              <div
                className="w-1 h-12"
                style={{
                  background: `linear-gradient(to bottom, ${feature.lineColor} 0%, transparent 100%)`,
                }}
              ></div>
            </div>

            {/* Animated content */}
            <div className="text-center relative z-10">
              <h3 className="text-xl font-bold mb-3.5">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-teal-300 group-hover:to-teal-200 transition-all duration-500">
                  {feature.title}
                </span>
              </h3>
              <p className="text-gray-400/90 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Hover gradient effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(400px circle at center, ${feature.lineColor}10, transparent 70%)`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
