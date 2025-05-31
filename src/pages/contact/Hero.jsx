import { motion } from "framer-motion";
import HomeHeaderPage from "../../components/HomeHeader";
import backgroundImage from "../../pictures/backgroundImage.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactUs from "../../components/ContactIndex";
import FooterPage from "../../components/Footer";
import { faMessage, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faSquarePhone } from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: faPaperPlane,
      iconColor: "bg-orange-500",
      title: "Address Info",
      description:
        "C/O Vistra (BVI) Limited, Vistra Corporate Services Centre, Wickhams Cay II, Road Town, Tortola, VG1110",
    },
    {
      icon: faMessage,
      iconColor: "bg-blue-500",
      title: "Email Address",
      description: "support@koinfu.com",
    },
    {
      icon: faSquarePhone,
      iconColor: "bg-teal-500",
      title: "Phone Number",
      description: "+44 7529 419490",
    },
  ];

  return (
    <>
      <HomeHeaderPage />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={backgroundImage}
            alt="Restaurant ambiance background"
          />
          <div className="absolute inset-0 bg-zinc-950 opacity-40"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          className="z-10 px-4"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-bold text-5xl text-white mb-2">Contact Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="flex justify-center items-center space-x-2">
              <li>
                <Link
                  to="/"
                  className="text-teal-700 font-semibold hover:text-teal-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-white">/</li>
              <li className="text-white">Contact Us</li>
            </ol>
          </nav>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-slate-950 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon
                  className={`${method.iconColor} p-3 rounded-full text-white`}
                  icon={method.icon}
                  size="lg"
                />
                <h2 className="text-xl font-semibold">{method.title}</h2>
              </div>
              <p className="text-gray-300">{method.description}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactUs />
      <FooterPage />
    </>
  );
}
