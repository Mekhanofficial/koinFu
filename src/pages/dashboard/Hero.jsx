// src/pages/dashboard/DashPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import Layout from "../../components/Layout";
import WelcomeCard from "./WelcomeCard";
import BalanceCard from "./BalanceCard";
import QuickActions from "./QuickAction";
import StatsGrid from "./StatsGrid";
import TradeVolumes from "./TradeVolumes";
import TradeProgress from "./TradeProgress";
import VerifyAccount from "./VerifyBar";
import CryptoTiles from "./CryptoTiles";
import { auth, db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

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
  const [userName, setUserName] = useState("User");
  const [kycStatus, setKycStatus] = useState("not_verified");
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserName(data.name || "User");

        // Check for temporary verification flag
        const tempVerified = localStorage.getItem("tempKycVerified") === "true";

        // Use temp flag if exists, otherwise use Firestore status
        setKycStatus(
          tempVerified ? "verified" : data.kycStatus || "not_verified"
        );

        setUserBalance(data.balance || 0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
  const kycBg =
    theme === "dark"
      ? "bg-teal-900 border-teal-700 text-teal-100"
      : "bg-teal-50 border-teal-300 text-teal-800";

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">Loading dashboard...</div>
    );
  }

  return (
    <Layout user={{ name: userName }}>
      <section
        className={`flex flex-col px-5 py-10 lg:flex-row min-h-screen ${bgColor} ${textColor} overflow-x-hidden`}
      >
        {/* Left Column */}
        <div className="w-full lg:w-1/2 lg:pr-4">
          <WelcomeCard
            user={{ name: userName }}
            theme={theme}
            borderColor={borderColor}
            secondaryText={secondaryText}
          />

          <BalanceCard
            balance={userBalance}
            currency="USD"
            isKycVerified={kycStatus === "verified"}
            theme={theme}
            borderColor={borderColor}
          />

          {/* KYC Notice */}
          {kycStatus === "not_verified" && (
            <div className={`p-4 my-4 rounded-lg border ${kycBg} shadow-md`}>
              <p className="font-semibold text-sm">
                Please complete your{" "}
                <span className="underline">KYC verification</span> to enable
                deposits and trading.
              </p>
            </div>
          )}

          <QuickActions
            theme={theme}
            isKycVerified={kycStatus === "verified"}
          />

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

        {/* Right Column */}
        <div className="w-full lg:w-1/2 lg:pl-4">
          <TradeProgress theme={theme} borderColor={borderColor} />

          <VerifyAccount
            theme={theme}
            isKycVerified={kycStatus === "verified"}
          />

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
