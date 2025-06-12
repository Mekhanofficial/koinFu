import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

export default function WelcomeCard({
  user,
  theme,
  borderColor,
  secondaryText,
}) {
  return (
    <div
      className={`bg-gradient-to-r ${
        theme === "dark"
          ? "from-teal-700 to-teal-950"
          : "from-teal-500 to-teal-700"
      } border-2 ${borderColor} rounded-lg p-4 lg:p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hidden lg:block`}
    >
      <h1 className="text-xl lg:text-2xl font-bold mb-2">
        Welcome{" "}
        <span className="truncate max-w-[180px] inline-block align-bottom">
          {user.name}
        </span>{" "}
        to koinfu!
      </h1>
      <p className={`text-sm lg:text-base ${secondaryText} mb-4`}>
        Your gateway to the exciting world of cryptocurrency trading.
      </p>
      <button
        className={`${
          theme === "dark"
            ? "bg-gray-300 hover:bg-teal-600 hover:text-black text-teal-600"
            : "bg-white hover:bg-teal-600 text-teal-700"
        } px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 text-sm lg:text-base`}
      >
        <FontAwesomeIcon icon={faBitcoin} />
        Crypto Update
      </button>
    </div>
  );
}
