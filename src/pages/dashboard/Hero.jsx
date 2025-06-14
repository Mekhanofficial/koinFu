import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import Layout from "../../components/Layout";
import WelcomeCard from "../../pages/dashboard/WelcomeCard";
import BalanceCard from "../../pages/dashboard/BalanceCard";
import QuickActions from "../../pages/dashboard/QuickAction";
import StatsGrid from "../../pages/dashboard/StatsGrid";
import TradeVolumes from "../../pages/dashboard/TradeVolumes";
import TradeProgress from "../../pages/dashboard/TradeProgress";
import VerifyAccount from "../../pages/dashboard/VerifyBar";
import CryptoTiles from "../../pages/dashboard/CryptoTiles";
import { auth } from "../../../firebase";

const abbreviateVolume = (volume) => {
  if (volume >= 1_000_000_000) {
    return `$${(volume / 1_000_000_000).toFixed(1)}B`;
  } else if (volume >= 1_000_000) {
    return `$${(volume / 1_000_000).toFixed(1)}M`;
  } else if (volume >= 1_000) {
    return `$${(volume / 1_000).toFixed(1)}K`;
  } else {
    return `$${volume.toLocaleString()}`;
  }
};

   
export default function DashPage() {
  const { theme } = useTheme();
  const [cryptoData, setCryptoData] = useState([]);
  const [user, setUser] = useState({ name: "", isKycVerified: false });
  const [userBalance, setUserBalance] = useState(0); // Initial zero balance

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
         isKycVerified: currentUser.isKycVerified || false, // Adjust according to your auth data
      });
    }
  }, []);


  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,ethereum,tether,ripple,binancecoin,solana,usd-coin,cardano,dogecoin,uniswap,litecoin,chainlink,filecoin,vechain,monero,avalanche-2,polygon",
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
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  const bgColor = theme === "dark" ? "bg-zinc-950" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-slate-900" : "bg-white";
  const borderColor = theme === "dark" ? "border-slate-700" : "border-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const secondaryText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <Layout user={user}>
      <section
        className={`flex flex-col px-5 py-10 lg:flex-row min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-white  overflow-x-hidden`}
      >
        <div className="w-full lg:w-1/2 lg:pr-4">
          <WelcomeCard
            user={user}
            theme={theme}
            borderColor={borderColor}
            secondaryText={secondaryText}
          />

      <BalanceCard
            balance={userBalance}
            currency="USD"
            isKycVerified={user.isKycVerified}
            theme={theme}
            borderColor={borderColor}
          />

 {/* Show deposit button or message only if KYC verified */}
          {user.isKycVerified ? (
            <QuickActions theme={theme} />
          ) : (
            <div className="p-4 my-4 border border-yellow-400 bg-yellow-100 rounded text-yellow-800">
              Please complete your KYC to enable deposits.
            </div>
          )}

        <QuickActions theme={theme} isKycVerified={user.isKycVerified} />

          <StatsGrid
            theme={theme}
            borderColor={borderColor}
            secondaryText={secondaryText}
          />

          <TradeVolumes
            theme={theme}
            borderColor={borderColor}
            textColor={textColor}
            secondaryText={secondaryText}
          />
        </div>



        <div className="w-full lg:w-1/2 lg:pl-4">
          <TradeProgress theme={theme} borderColor={borderColor} />

       <VerifyAccount theme={theme} isKycVerified={user.isKycVerified} />


          <CryptoTiles
            cryptoData={cryptoData}
            theme={theme}
            borderColor={borderColor}
            secondaryText={secondaryText}
            textColor={textColor}
          />
        </div>
      </section>
    </Layout>
  );
}
