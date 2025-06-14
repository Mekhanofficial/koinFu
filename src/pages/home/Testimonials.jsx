import dp1 from "../../pictures/dp10.jpg";
import dp2 from "../../pictures/dp1.jpeg";
import dp3 from "../../pictures/dp7.avif";
import dp4 from "../../pictures/dp4.jpg";
import dp5 from "../../pictures/dp8.jpg";
import dp6 from "../../pictures/dp6.jpg";

const reviews = [
  {
    image: dp1,
    title: "Amy Whyatt",
    description:
      "I've been investing with KoinFu for over a year now, and I'm extremely satisfied with their services. The team is knowledgeable, responsive, and always keeps me updated on the latest cryptocurrency trends. Thanks to their expertise, my investments have grown significantly!",
    lineColor: "orange",
  },
  {
    image: dp2,
    title: "Michel Murphy",
    description:
      "KoinFu is the best cryptocurrency investment company I've come across. Their team of professionals guided me through the investment process, answered all my questions, and helped me make informed decisions. I've seen remarkable returns on my investments, and I highly recommend them to anyone looking to enter the world of cryptocurrencies.",
    lineColor: "teal",
  },
  {
    image: dp3,
    title: "Abraham Wilson",
    description:
      "I can't thank KoinFu enough for their exceptional services. Their platform is user-friendly, their investment strategies are well-researched, and their customer support is top-notch. They genuinely care about their clients' success and go the extra mile to ensure we achieve our financial goals. I'm thrilled to be a part of the KoinFu community!",
    lineColor: "#87CEEB",
  },
  {
    image: dp4,
    title: "Daniel Morris",
    description:
      "KoinFu has revolutionized my approach to investing. With their expert advice and seamless platform, I've diversified my portfolio and gained exposure to a variety of cryptocurrencies. The team's transparency and dedication to delivering consistent results have earned my trust, and I'm excited to continue growing my investments with them.",
    lineColor: "purple",
  },
  {
    image: dp5,
    title: "Sophia Luther",
    description:
      "Choosing KoinFu  was the best decision I made for my cryptocurrency investments. Their team possesses in-depth knowledge of the market, and they tailor their strategies to individual investors' goals. I've experienced significant growth in my portfolio, and I'm grateful for their guidance and support. I wholeheartedly recommend KoinFu to anyone seeking reliable and profitable cryptocurrency investments.",
    lineColor: "#87CEEB", // Gradient starts with pink
  },
  {
    image: dp6,
    title: "Jeff Botch",
    description:
      "KoinFu has provided me with an excellent investment experience. Their platform is intuitive, their investment options are diverse, and their team is professional and friendly. I've witnessed remarkable returns on my investments, and I appreciate the peace of mind that comes with knowing my assets are in capable hands. I couldn't be happier with their services!",
    lineColor: "#FF7F7F", // Gradient starts with green
  },
];

export default function TestimonyPage() {
  return (
    <>
      <div className="bg-slate-950 py-12 px-8 md:px-16 relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-teal-500 text-lg font-semibold mb-3">
            KoinFu Testimonials
          </h1>
          <h2 className="text-white text-5xl font-bold mb-4">
            This are what some of our clients are saying
          </h2>
          <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
            Investing in cryptocurrency is a smart choice for those who want to
            capitalize on the growth of this rapidly-evolving field.
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
    </>
  );
}
