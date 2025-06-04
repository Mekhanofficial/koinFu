import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import px12 from "../pictures/px12.png";

export default function FooterPage() {
  return (
    <footer className="bg-gray-950 text-white p-10 relative z-40">
      <div className="flex flex-wrap justify-between gap-10 items-start">
        <div className="max-w-md">
          <h1 className="text-lg font-semibold leading-relaxed">
            Expert insights, innovative technology, and unmatched support -
            discover the KoinFu advantage.
          </h1>
          <div className="flex gap-3 mt-4">
            {[faFacebook, faTwitter, faInstagram, faPinterest].map(
              (icon, index) => (
                <FontAwesomeIcon
                  key={index}
                  className="bg-slate-900 p-3 rounded-full h-6 w-6 cursor-pointer hover:bg-gray-800 transition"
                  icon={icon}
                />
              )
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Categories</h2>
          <ul className="mt-4 space-y-2 text-gray-300">
            {["What is ICO", "Token", "Road Map", "Advisor", "Payments"].map(
              (item, index) => (
                <li key={index} className="hover:text-white cursor-pointer">
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Useful Links</h2>
          <ul className="mt-4 space-y-2 text-gray-300">
            {[
              "Payment & TAX",
              "Terms of Services",
              "My Account",
              "Return Policy",
              "Discount",
            ].map((item, index) => (
              <li key={index} className="hover:text-white cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-sm">
          <h2 className="text-lg font-semibold">Newsletter</h2>
          <p className="text-gray-300 mt-2 mb-4">
            Get a 20% discount on your first order by subscribing to our
            newsletter.
          </p>
          <div className="flex items-center bg-gray-900 rounded-2xl overflow-hidden">
            <input
              className="bg-gray-900 p-2 w-full text-white placeholder-gray-400 focus:outline-none"
              type="email"
              placeholder="Enter Your Email"
            />
            <button className="bg-slate-950 p-3 rounded-r-2xl hover:bg-teal-700 transition">
              <FontAwesomeIcon
                className="h-5 w-5 text-white"
                icon={faPaperPlane}
              />
            </button>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="flex flex-wrap justify-between items-center text-gray-400 text-sm">
        <p>koinfuLTD © 2025. All Rights Reserved</p>
        <div className="flex gap-4">
          <p className="hover:text-white cursor-pointer">Privacy Policy</p>
          <p className="hover:text-white cursor-pointer">Terms & Conditions</p>
        </div>
        <img src={px12} alt="koinfu Logo" className="h-10" />
      </div>
    </footer>
  );
}
