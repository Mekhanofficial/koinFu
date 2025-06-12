import { useState, useEffect } from "react";
import { Range } from "react-range";
import px12 from "../../pictures/px12.png";

const ExchangeRateContainer = ({
  type,
  currency,
  rate,
  color = "teal-700",
  currency2,
  rate2,
  color2 = "teal-700",
}) => {
  return (
    <div className="bg-gray-950 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h1 className="text-white text-lg font-semibold">{type}</h1>

      <h4 className="text-white flex flex-col  ">
        <div>
          <span className={`text-${color}`}>{currency} </span>= {rate}
        </div>
        <div>
          <span className={`text-${color2}`}> {currency2} </span>= {rate2}
        </div>
      </h4>
    </div>
  );
};

const exchangeRates = [
  {
    type: "Exchange Rate",
    currency: "1 ETH",
    rate: "$1,865.36",
    color: "teal-700",
    currency2: "1 BTC",
    rate2: "$27,066.60",
    color2: "teal-700",
  },
  {
    type: "Monthly Rate",
    currency: "BTC",
    rate: "$27,066.60",
    color: "teal-700",
    currency2: "HIGH",
    rate2: "$27,066.60",
    color2: "teal-700",
  },
  {
    type: "Private Sales",
    currency: "1 BTC",
    rate: "$27,066.60",
    color: "teal-700",
    currency2: "Bonus",
    rate2: "65% (1.10)",
    color2: "teal-700",
  },
  {
    type: "Public Sales",
    currency: "1 BTC",
    rate: "$27,066.60",
    color: "teal-700",
    currency2: "Bonus",
    rate2: "65% (1.10)",
    color2: "teal-700",
  },
  {
    type: "Investors",
    rate: "890,000.00",
    currency2: "Ave. Invest($) ",
    rate2: ": 1200",
    color2: "teal-700",
  },
  {
    type: "Pivot Points",
    currency: "1 ETH",
    rate: " $39000.00",
    color: "teal-700",
    currency2: "1 BTC",
    rate2: "$120.00",
    color2: "teal-700",
  },
];

export default function TokenSection() {
  const [values, setValues] = useState([0, 100]); // Initial range values

  // Convert range values to prices
  const minPrice = values[0] * 3000; // Rp. 0 to Rp. 300,000
  const maxPrice = values[1] * 3000;

  const CountdownTimer = () => {
    // Set the target date to 30 days from now
    const [targetDate] = useState(() => {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date;
    });

    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
          clearInterval(timer);
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-400">Days</p>
          <p className="text-2xl font-bold">{timeLeft.days}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Hours</p>
          <p className="text-2xl font-bold">{timeLeft.hours}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Mins</p>
          <p className="text-2xl font-bold">{timeLeft.minutes}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Sec</p>
          <p className="text-2xl font-bold">{timeLeft.seconds}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-900 p-5 z-50 relative">
        <div className="text-center mb-12">
          <h1 className="text-teal-600 text-lg font-semibold mb-3">
            Token Sales
          </h1>
          <h2 className="text-white text-3xl font-bold mb-4">
            ICO Token Sales
          </h2>
          <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
            Our platform is designed to be accessible to everyone, regardless of
            their technical expertise or background.
          </h4>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Crypto Containers (3 rows, 2 columns) */}
          <div className="grid grid-cols-2 gap-6 md:w-2/3">
            {exchangeRates.map((item, index) => (
              <ExchangeRateContainer
                key={index}
                type={item.type}
                currency={item.currency}
                rate={item.rate}
                color={item.color}
                currency2={item.currency2}
                rate2={item.rate2}
                color2={item.color2}
              />
            ))}
          </div>

          {/* Token Sale Container (Right Side) */}
          <div className="bg-gray-950 text-white p-6 rounded-lg shadow-lg md:w-1/3">
            {/* Token Sale Countdown */}
            <h2 className="text-xl font-semibold mb-4">Token Sale Start in</h2>
            <CountdownTimer />

            {/* Currency Values */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">
                  Rp. {minPrice.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  Rp. {maxPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Soft Cap, Crowdsale, Hard Cap */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-400">Soft Cap</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Crowdsale</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Hard Cap</p>
              </div>
            </div>

            {/* Dual-Thumb Range Slider */}
            <div className="mb-6">
              <Range
                step={1}
                min={0}
                max={100}
                values={values}
                onChange={(newValues) => setValues(newValues)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#4A5568",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${values[1] - values[0]}%`,
                        backgroundColor: "#2DD4BF",
                        borderRadius: "8px",
                        position: "absolute",
                        left: `${values[0]}%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      backgroundColor: isDragged ? "#2DD4BF" : "#FFFFFF",
                      borderRadius: "50%",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )}
              />
            </div>

            {/* Centered Image */}
            <div className="flex justify-center items-center">
              <img src={px12} alt="Token Sale" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
