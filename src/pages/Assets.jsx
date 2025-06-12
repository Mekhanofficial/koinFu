import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useParams } from "react-router-dom";
import axios from "axios";

// Helper functions
const abbreviateVolume = (volume) => {
  if (volume >= 1_000_000_000) {
    return `$${(volume / 1_000_000_000).toFixed(1)}B`;
  } else if (volume >= 1_000_000) {
    return `$${(volume / 1_000_000).toFixed(1)}M`;
  } else if (volume >= 1_000) {
    return `$${(volume / 1_000).toFixed(1)}K`;
  }
  return `$${volume.toLocaleString()}`;
};

const CryptoCard = ({ crypto }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`bg-gradient-to-r rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border hover:border-teal-500 hover:shadow-teal-500/50 hover:scale-[1.02] flex items-center ${
        theme === "dark"
          ? "from-slate-900 to-slate-800 border-slate-600"
          : "from-slate-100 to-slate-200 border-gray-300"
      }`}
    >
      <img src={crypto.image} alt={crypto.name} className="w-10 h-10 mr-4" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span
            className={`text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {crypto.name}
          </span>
          <span
            className={`text-sm font-semibold ${
              crypto.change.startsWith("-") ? "text-red-400" : "text-green-400"
            }`}
          >
            {crypto.change}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h2
            className={`text-lg font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {crypto.price}
          </h2>
          <span
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Vol: {crypto.volume}
          </span>
        </div>
      </div>
    </div>
  );
};

const NewsCard = ({ article }) => {
  const { theme } = useTheme();

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:opacity-80 transition-opacity"
    >
      <div className="flex items-start space-x-4">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-32 h-32 object-cover rounded-md"
        />
        <div>
          <h3
            className={`font-semibold text-sm mb-2 line-clamp-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {article.title}
          </h3>
          <p
            className={`text-xs line-clamp-3 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {article.description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default function AssetPage() {
  const [cryptoData, setCryptoData] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({
    crypto: true,
    news: true,
  });
  const [error, setError] = useState({
    crypto: null,
    news: null,
  });
  const { theme } = useTheme();
  const { symbol } = useParams();

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,ethereum,tether,ripple,binancecoin,solana,usd-coin,cardano,dogecoin,polkadot,uniswap,litecoin,chainlink,bitcoin-cash,stellar,filecoin,vechain,monero,avalanche-2,polygon,cosmos,tron",
              order: "market_cap_desc",
              per_page: 22,
              page: 1,
              sparkline: false,
            },
          }
        );

        const formattedData = response.data.map((crypto) => ({
          name: crypto.name,
          symbol: crypto.symbol.toUpperCase(),
          price: `$${crypto.current_price.toLocaleString()}`,
          change: `${crypto.price_change_percentage_24h.toFixed(2)}%`,
          volume: abbreviateVolume(crypto.total_volume),
          image: crypto.image,
        }));

        setCryptoData(formattedData);
      } catch (err) {
        console.error("Error fetching crypto data:", err);
        setError((prev) => ({ ...prev, crypto: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, crypto: false }));
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "crypto",
            apiKey: "cd73ac3d48314b67b9b116b14a37fcdb",
          },
          headers: {
            Accept: "application/json",
          },
        });

        if (response.data.articles) {
          const filteredNews = response.data.articles
            .filter((article) => article.urlToImage)
            .slice(0, 4);
          setNews(filteredNews);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError((prev) => ({ ...prev, news: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, news: false }));
      }
    };

    fetchNews();
  }, [symbol]);

  return (
    <section
      className={`overflow-x-hidden min-h-screen p-6 ${
        theme === "dark" ? "bg-gray-900" : "bg-slate-50"
      }`}
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-4 md:p-6">
        {/* Crypto Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {loading.crypto ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 h-24 animate-pulse ${
                  theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                }`}
              />
            ))
          ) : error.crypto ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-400">Error loading crypto data</p>
            </div>
          ) : (
            cryptoData.map((crypto, index) => (
              <CryptoCard key={`${crypto.symbol}-${index}`} crypto={crypto} />
            ))
          )}
        </div>

        {/* News Section */}
        <div
          className={`w-full lg:w-1/3 p-6 rounded-lg shadow-md border ${
            theme === "dark"
              ? "bg-slate-800 border-slate-600"
              : "bg-white border-gray-300"
          }`}
        >
          <h2
            className={`text-lg font-bold mb-6 ${
              theme === "dark" ? "text-teal-400" : "text-teal-600"
            }`}
          >
            LIVE NEWS
          </h2>
          <div className="space-y-6">
            {loading.news ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 animate-pulse"
                >
                  <div
                    className={`w-32 h-32 rounded-md ${
                      theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  />
                  <div className="flex-1 space-y-2">
                    <div
                      className={`h-4 rounded w-3/4 ${
                        theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                      }`}
                    />
                    <div
                      className={`h-3 rounded w-full ${
                        theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                      }`}
                    />
                    <div
                      className={`h-3 rounded w-5/6 ${
                        theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                      }`}
                    />
                  </div>
                </div>
              ))
            ) : error.news ? (
              <p className="text-red-400">Error loading news</p>
            ) : news.length > 0 ? (
              news.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))
            ) : (
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-500"}
              >
                No news available
              </p>
            )}

            <a
              href="https://www.example.com/crypto-news"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-block w-full text-center font-semibold py-2 px-4 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              }`}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
