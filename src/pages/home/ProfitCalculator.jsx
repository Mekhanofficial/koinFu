import { useState,useEffect } from "react";
import moon1 from "../../pictures/moon1.jpg";
import vd15 from "../../pictures/vd15.mp4";




export default function ProfitCalculator(){
      const [plan, setPlan] = useState("basic");
      const [amount, setAmount] = useState("");
      const [profit, setProfit] = useState("0.00");
    
      // Return multipliers for each plan (scales upwards)
      const profitMultipliers = {
        basic: [4, 7], // 4x to 7x
        standard: [5, 8],
        silver: [6, 9],
        premium: [7, 10],
        platinum: [8, 12],
      };
    
      // Calculate profit based on investment
      const calculateProfit = (investAmount, planType) => {
        if (!investAmount) return "0.00";
    
        // Get min and max multiplier for the selected plan
        const [minMultiplier, maxMultiplier] = profitMultipliers[planType];
    
        // Generate a random multiplier within the range
        const randomMultiplier =
          Math.random() * (maxMultiplier - minMultiplier) + minMultiplier;
    
        // Calculate profit
        return (investAmount * randomMultiplier).toFixed(2);
      };
    
      // Handle input change
      const handleAmountChange = (e) => {
        const investAmount = parseFloat(e.target.value) || 0;
        setAmount(e.target.value);
        setProfit(calculateProfit(investAmount, plan));
      };
    
      // Handle plan change
      const handlePlanChange = (e) => {
        const newPlan = e.target.value;
        setPlan(newPlan);
        setProfit(calculateProfit(parseFloat(amount) || 0, newPlan));
      };
    
      useEffect(() => {
        // Prevent scrolling on focus
        const inputs = document.querySelectorAll("input, select");
        inputs.forEach((input) => {
          input.addEventListener("focus", (e) => {
            e.preventDefault();
            e.target.scrollIntoView({ behavior: "auto", block: "nearest" });
          });
        });
        // Cleanup event listeners
        return () => {
          inputs.forEach((input) => {
            input.removeEventListener("focus", (e) => {
              e.preventDefault();
              e.target.scrollIntoView({ behavior: "auto", block: "nearest" });
            });
          });
        };
      }, []);
    return (
      <>
        <div className="relative text-center text-white px-6 sm:px-10 md:px-16 lg:px-20 pb-20">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: `url(${moon1})` }}
          />

          {/* Section Title */}
          <div className="relative z-10 mb-12 p-10 ">
            <h1 className="text-3xl sm:text-5xl font-semibold top-5 relative ">
              Profit <span className="text-teal-600">Calculator</span>
            </h1>
            <h4 className="text-slate-100 font-semibold top-12 relative text-lg ">
              You must know the calculation before investing in any plan, so you
              never make mistakes.
              <br /> Check the calculation and you will get as our calculator
              says.
            </h4>
          </div>

          {/* Calculator Section */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-10">
            {/* Video Background Container */}
            <div className="relative w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl">
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              >
                <source src={vd15} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Calculator Content */}
              <div className="relative z-10 bg-gray-900 bg-opacity-90 rounded-xl p-6 sm:p-8 lg:p-10 border border-teal-900 backdrop-blur-sm">
                {/* Plan & Investment Inputs */}
                <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
                  <div className="w-full sm:w-1/2">
                    <label className="text-white mb-2 text-lg font-medium">
                      Choose Plan
                    </label>
                    <select
                      className="w-full rounded-lg bg-gray-800 text-white p-3 outline-none hover:bg-gray-700 focus:ring-2 focus:ring-teal-600 transition-all"
                      value={plan}
                      onChange={handlePlanChange}
                    >
                      <option value="basic">Basic Package</option>
                      <option value="standard">Standard Package</option>
                      <option value="silver">Silver Package</option>
                      <option value="premium">Premium Package</option>
                      <option value="platinum">Platinum Package</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="text-white mb-2 text-lg font-medium">
                      Invest Amount
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none hover:bg-gray-700 focus:ring-2 focus:ring-teal-600 transition-all"
                    />
                  </div>
                </div>

                {/* Profit Output */}
                <div className="mb-8">
                  <label className="text-white mb-2 text-lg font-medium">
                    Profit Amount
                  </label>
                  <input
                    type="text"
                    placeholder="0.00"
                    value={profit}
                    readOnly
                    className="w-full rounded-lg border border-teal-600 bg-teal-700 bg-opacity-20 p-3 text-white outline-none focus:ring-2 focus:ring-teal-600 transition-all"
                  />
                </div>

                {/* Call-to-Action Button */}
                <div>
                  <button className="w-full bg-transparent text-teal-500 border border-teal-600 py-3 px-6 rounded-full hover:bg-teal-600 hover:text-white hover:shadow-lg hover:shadow-teal-600/30 transition-all duration-300 font-semibold">
                    Start Investing Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}