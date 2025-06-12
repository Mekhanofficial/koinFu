export default function VerifyAccount({ theme }) {
  return (
    <button
      className={`w-full bg-gradient-to-r ${
        theme === "dark"
          ? "from-teal-950 to-teal-700"
          : "from-teal-600 to-teal-800"
      } text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300 shadow-lg mb-6 hover:shadow-xl text-sm lg:text-base`}
    >
      VERIFY ACCOUNT
    </button>
  );
}
