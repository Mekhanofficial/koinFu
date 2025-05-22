import { useState } from "react";
import traderImages from "./MyTradersImg"; 
import { useTheme } from "next-themes";


const names = [
  "Lisa Dawson",
  "John Cerasani",
  "Defend Dark",
  "Tori Trades",
  "GirlGone_Crypto",
  "Molly Elmore",
  "Dontrece_HD〽️",
  "Taylor Hamilton",
  "Laurent Jones",
  "Kevin Kruze",
  "Angelo",
  "Crypto Tea",
  "Clarity Crypto",
  "Mrturnupthehustle",
  "TwentyEight",
  "Loudmouth.eth",
  "TJR",
  "Renzo",
  "Randi Hipper",
  "Cryptologicjohn",
  "Micheal Rodriguez",
  "Tradetravelchill",
  "Penny2x",
  "Micheal S Gibson",
  "Jpdandrea",
  "Crypto Rover",
  "Luke Belmar",
  "BAM INVESTOR",
  "Chris Buziness",
  "Coach Vince",
  "Milly",
  "Laurent Boutiller",
  "Dom Lucre",
  "Mason Versluis",
  "Greg",
  "Cole Jafari",
  "Evca Wolf",
  "Jenny",
  "SlumDoge",
  "Layah Woods",
  "Eva Savagiou",
  "CrypNuevo",
  "Zach Humphries",
  "Justin Wallers",
  "Oscar Ramos",
  "Brian Jung",
  "Calvin Williams",
  "Ixnkong",
  "Tiffany",
  "Tarabull808",
  "Tyler",
  "Stephan Borg",
  "Mona",
  "Blonde Broker",
  "Tommy Bryson",
  "JA",
  "Josh Lenny Lewis",
  "Lainylainylainy",
  "Chris Buziness",
  "Layah Heilpern",
  "Arno Wingen",
  "Kadin Thompson",
  "Tiago Andrade",
  "Hamza Hamed",
  "Rico",
  "Roc Zacharias",
  "Rey",
  "STXRBOY999",
  "NinjaScalp",
  "Thomas Kralow",
  "Alex Gonzalez",
  "Bob Smith",
  "Charlie Davis",
  "Diana Evans",
  "Ethan Wilson",
  "Fiona Carter",
  "George Adams",
  "Hannah Scott",
  "Ian Thompson",
  "Julia Baker",
  "Alice Johnson",
  "Bob Smith",
  "Charlie Davis",
  "Diana Evans",
  "Ethan Wilson",
  "Fiona Carter",
  "George Adams",
  "Hannah Scott",
  "Ian Thompson",
  "Julia Baker",
];

const traders = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: names[i % names.length],
  winRate: Math.floor(Math.random() * 31) + 70,
  profitShare: Math.floor(Math.random() * 21) + 10,
  balance: (Math.random() * 500 + 200).toFixed(2),
  losses: Math.floor(Math.random() * 10),
  wins: Math.floor(Math.random() * 50) + 1,
  image: traderImages[i % traderImages.length],
}));

export default function MyTraderPage() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [copyStatus, setCopyStatus] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const filteredTraders = traders.filter((trader) =>
    trader.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id) => {
    setLoadingId(id);
    setCopyStatus((prev) => ({
      ...prev,
      [id]: "Copying...",
    }));

    setTimeout(() => {
      setLoadingId(null);
      setCopyStatus((prev) => ({
        ...prev,
        [id]: "Copied!",
      }));
    }, 2000);
  };

  return (
    <div className={`p-10 min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-800 to-black text-white' 
        : 'bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800'
    }`}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search traders..."
        className={`w-full p-3 mb-6 rounded-lg focus:ring-2 focus:outline-none ${
          theme === 'dark'
            ? 'bg-gray-700 text-white border-gray-600 focus:ring-amber-300'
            : 'bg-white text-gray-800 border-gray-300 focus:ring-amber-500'
        } border`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Trader Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTraders.map((trader) => (
          <div
            key={trader.id}
            className={`p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800 hover:border-yellow-500 hover:shadow-yellow-500/50'
                : 'bg-white border-gray-200 hover:border-yellow-400 hover:shadow-yellow-400/50'
            } border`}
          >
            {/* Trader Image */}
            <div className="relative mx-auto w-24 h-24">
              <img
                src={trader.image}
                alt={trader.name}
                className="w-full h-full rounded-full border-4 border-white"
              />
              <span className={`absolute bottom-0 right-1 w-6 h-6 rounded-full border-2 ${
                theme === 'dark' ? 'bg-green-500 border-gray-900' : 'bg-green-400 border-white'
              }`}></span>
            </div>

            {/* Trader Name and Balance */}
            <h2 className={`mt-4 font-bold text-xl ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {trader.name}
            </h2>
            <p className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-amber-300' : 'text-amber-500'
            }`}>
              ${trader.balance}
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Profit Share: {trader.profitShare}%
            </p>

            {/* Win Rate and Losses */}
            <div className="flex justify-between items-center mt-4 text-sm">
              <div className={`text-left ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                <div className="flex gap-2 items-center">
                  <p className="font-bold text-xl">{trader.winRate}%</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>WIN RATE</p>
                </div>
                <p className="font-bold text-md">{trader.wins} WINS</p>
              </div>
              <div className={`w-px h-10 ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
              }`}></div>
              <div className={`text-right ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                <p className="font-bold text-xl">{trader.losses}</p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  LOSSES
                </p>
              </div>
            </div>

            {/* Copy Button */}
            <button
              className={`mt-6 w-full font-bold py-3 rounded-lg transition duration-200 hover:scale-[1.03] focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-black'
                  : 'bg-gradient-to-r from-orange-400 to-amber-300 text-black'
              }`}
              onClick={() => handleCopy(trader.id)}
              disabled={loadingId === trader.id}
            >
              {loadingId === trader.id ? (
                <div className="flex justify-center items-center">
                  <div className={`animate-spin rounded-full h-5 w-5 ${
                    theme === 'dark' ? 'border-b-2 border-black' : 'border-b-2 border-gray-800'
                  }`}></div>
                </div>
              ) : (
                copyStatus[trader.id] || "Copy"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}