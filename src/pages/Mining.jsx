import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import bg2 from "../pictures/bg12.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import HeaderPage from "../components/Header";
import CoinLibHorizontalliveTicker from "../components/CoinLib";
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons";

export default function MiningPage() {
  const { theme } = useTheme();
  const [cryptoData, setCryptoData] = useState({
    BTC: { balance: 0, value: 0, hashPower: "GH/s" },
    ETH: { balance: 0, value: 0, hashPower: "GH/s" },
    BNB: { balance: 0, value: 0, hashPower: "0 GH/s" },
    DOGE: { balance: 0, value: 0, hashPower: "GH/s" },
    ATOM: { balance: 0, value: 0, hashPower: "GH/s" },
  });

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,dogecoin,cosmos&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptoData((prev) => ({
          BTC: { ...prev.BTC, value: data.bitcoin.usd },
          ETH: { ...prev.ETH, value: data.ethereum.usd },
          BNB: { ...prev.BNB, value: data.binancecoin.usd },
          DOGE: { ...prev.DOGE, value: data.dogecoin.usd },
          ATOM: { ...prev.ATOM, value: data.cosmos.usd },
        }));
      });
  }, []);

  return (
    <>
      <section
        className={`overflow-x-hidden min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <CoinLibHorizontalliveTicker />

        <div className="flex-col md:flex-row gap-6 p-6">
          {/* Main Content */}
          <div
            className={`flex-1 flex flex-col p-3 rounded-lg shadow-lg ${
              theme === "dark" ? "bg-zinc-900" : "bg-white"
            } h-60`}
          >
            {/* Balance Section */}
            <div
              className="mb-4 p-10 rounded-lg relative overflow-hidden"
              style={{
                backgroundImage: `url(${bg2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className={`absolute inset-0 ${
                  theme === "dark"
                    ? "bg-black bg-opacity-50"
                    : "bg-black bg-opacity-30"
                }`}
              />
              <div className="relative flex justify-between pb-4 mb-4 text-white">
                <div className="text-center">
                  <h2
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-amber-300" : "text-amber-500"
                    }`}
                  >
                    $0.00
                  </h2>
                  <h6
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-200"
                    }
                  >
                    Balance
                  </h6>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 justify-between">
              <button
                className={`border px-4 py-2 rounded-md transition duration-300 ${
                  theme === "dark"
                    ? "border-amber-700 bg-transparent text-white hover:border-slate-500 hover:text-amber-300"
                    : "border-amber-500 bg-transparent text-gray-800 hover:border-gray-400 hover:text-amber-600"
                }`}
              >
                BUY CONTRACT
              </button>
              <button
                className={`border px-4 py-2 rounded-md transition duration-300 ${
                  theme === "dark"
                    ? "border-amber-700 bg-transparent text-white hover:border-green-700 hover:text-amber-300"
                    : "border-amber-500 bg-transparent text-gray-800 hover:border-green-500 hover:text-amber-600"
                }`}
              >
                MY CONTRACTS
              </button>
            </div>
          </div>

          {/* Crypto Data Widget */}
          <div className="space-y-4 mt-10">
            {Object.entries(cryptoData).map(([key, data]) => (
              <div
                key={key}
                className={`flex items-center justify-between p-4 rounded-lg shadow-lg border ${
                  theme === "dark"
                    ? "bg-zinc-900 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={
                      key === "BTC"
                        ? faBitcoin
                        : key === "ETH"
                        ? faEthereum
                        : faCoins
                    }
                    className={`text-2xl ${
                      theme === "dark" ? "text-amber-400" : "text-amber-500"
                    }`}
                  />
                  <div>
                    <h3
                      className={`text-lg font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {key}
                    </h3>
                    <p
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      {data.balance.toFixed(6)} {key}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    ${data.value.toLocaleString()}
                  </p>
                  <p
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    {data.hashPower}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
