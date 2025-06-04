import ParticlesComponent from "../../components/ParticlesBackground";
import { useState ,useEffect} from "react";



export default function StatsPage(){
     const stats = [
        { id: "users-count", label: "USERS", value: "850K+" },
        { id: "countries-count", label: "COUNTRIES", value: "84" },
        { id: "payouts-count", label: "PAYOUTS", value: "$600,547,000+" },
        { id: "trades-count", label: "ACTIVE TRADES", value: "445,875" },
      ];
    
      const [hasAnimated, setHasAnimated] = useState(false);
    
      useEffect(() => {
        // Create an IntersectionObserver to detect when the section is in view
        const statsSection = document.getElementById("stats-section");
    
        if (!statsSection) return; // Ensure the element exists
    
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);
                startCounting();
                observer.disconnect(); // Stop observing once the stats have animated
              }
            });
          },
          { threshold: 0.5 } // Trigger when 50% of the section is in view
        );
    
        observer.observe(statsSection); // Start observing the section
    
        // Cleanup observer on component unmount
        return () => {
          observer.disconnect();
        };
      }, [hasAnimated]);
    
      // Function to format numbers with suffixes
      const formatNumber = (value) => {
        if (value >= 1000000) {
          return `$${(value / 1000000).toFixed(3).replace(/\.?0+$/, "")}M+`; // Format as $X.XXXM+
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}K`; // Format as XK+
        } else {
          return value.toLocaleString(); // Format as plain number
        }
      };
    
      // Function to animate the number count-up
      const startCounting = () => {
        const countUp = (id, start, end, duration, suffix = "") => {
          const element = document.getElementById(id);
          if (!element) return; // Ensure the element exists
    
          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const value = Math.min(
              start + (end - start) * (progress / duration),
              end
            );
            element.innerText = formatNumber(value) + suffix; // Apply formatting
            if (progress < duration) {
              window.requestAnimationFrame(step);
            } else {
              element.innerText = formatNumber(end) + suffix; // Ensure it ends exactly at 'end'
            }
          };
          window.requestAnimationFrame(step);
        };
    
        // Set up individual counts with their targets, durations, and suffixes
        countUp("users-count", 0, 850000, 2000); // 850K+
        countUp("countries-count", 0, 84, 3000); // 84
        countUp("payouts-count", 0, 600547000, 5000); // $600.547M+
        countUp("trades-count", 0, 445875, 3000, "+"); // 445,875+
      };
    
    return (
      <>
        <ParticlesComponent />

        <div
          id="stats-section"
          className="flex bg-slate-950 flex-wrap sm:flex-nowrap justify-between text-center  p-20  text-white space-y-6 sm:space-y-0 sm:space-x-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center w-full sm:w-1/4 border-teal-600 pb-6 sm:pb-0 ${
                index !== stats.length - 1 ? "sm:border-b-0 sm:border-r" : ""
              }`}
            >
              <h2 className="font-semibold">{stat.label}</h2>
              <p
                id={stat.id}
                className="text-teal-300 font-semibold text-2xl min-w-[100px]"
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </>
    );
}