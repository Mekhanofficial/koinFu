import React from "react";
import { useTheme } from "next-themes";

const exchanges = [
  {
    name: "Binance",
    url: "https://www.binance.com/en/buy-sell-crypto",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2560px-Binance_Logo.svg.png",
  },
  {
    name: "Bitcoin.com",
    url: "https://www.bitcoin.com/buy/",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
  },
  {
    name: "Coinbase",
    url: "https://www.coinbase.com/buy",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Coinbase.svg/1200px-Coinbase.svg.png",
  },
  {
    name: "Crypto.com",
    url: "https://crypto.com/app",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Crypto.com_logo.png",
  },
  {
    name: "Gemini",
    url: "https://www.gemini.com/buy",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Gemini.svg/1280px-Gemini.svg.png",
  },
  {
    name: "Kraken",
    url: "https://www.kraken.com/prices",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Kraken_logo.svg/1200px-Kraken_logo.svg.png",
  },
];

const BuyCrypto = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className={`min-h-screen flex flex-col items-center py-12 ${
        theme === "dark" ? "bg-slate-950" : "bg-gray-100"
      }`}>
        <h1 className={`text-4xl font-extrabold mb-4 ${
          theme === "dark" ? "text-teal-500" : "text-teal-600"
        }`}>
          Buy Cryptocurrency
        </h1>
        <p className={`text-lg mb-8 text-center max-w-xl ${
          theme === "dark" ? "text-slate-400" : "text-gray-500"
        }`}>
          Tap on any of the links below to purchase from our trusted partners
          and start your crypto journey today.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-6">
          {exchanges.map((exchange, index) => (
            <a
              key={index}
              href={exchange.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                theme === "dark"
                  ? "bg-slate-900 border border-teal-700 hover:border-teal-500 hover:shadow-teal-500/20"
                  : "bg-white border border-teal-400 hover:border-teal-300 hover:shadow-teal-400/20"
              }`}
            >
              <img
                src={exchange.img}
                alt={exchange.name}
                className="h-20 w-20 object-contain mb-4"
              />
              <span className={`text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}>
                {exchange.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuyCrypto;