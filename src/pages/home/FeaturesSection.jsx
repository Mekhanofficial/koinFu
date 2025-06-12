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
  {
    image: px9,
    title: "Low Fees",
    description:
      "KoinFu offers some of the lowest fees in the industry, ensuring you keep more of your profits.",
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
      "Access your investments from anywhere in the world with KoinFu's globally available platform.",
    lineColor: "#FF7F7F", // Gradient starts with green
  },
];
export default function FeaturesSection() {
  return (
    <>
      <div className="bg-slate-950 relative z-50 py-12 px-8 md:px-16">
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
    </>
  );
}
