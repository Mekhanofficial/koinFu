import { useState, useEffect } from "react";
import useSound from "use-sound";
import alert from "../../public/sound/alert.wav";

// Grouped by region/culture for better matching
const USERS = [
  // North America
  { name: "Jane Smith", country: "United States" },
  { name: "Michael Johnson", country: "United States" },
  { name: "Emily Williams", country: "Canada" },
  { name: "David Brown", country: "Canada" },

  // Europe
  { name: "Robert Wilson", country: "United Kingdom" },
  { name: "Jennifer Jones", country: "United Kingdom" },
  { name: "William Taylor", country: "France" },
  { name: "Linda Martinez", country: "Spain" },
  { name: "James Anderson", country: "Sweden" },

  // Africa
  { name: "Kwame Appiah", country: "Ghana" },
  { name: "Amina Nwokolo", country: "Nigeria" },
  { name: "Moussa Diop", country: "Senegal" },
  { name: "Fatoumata Keita", country: "Mali" },
  { name: "Lwazi Ndlovu", country: "South Africa" },

  // Latin America
  { name: "Carlos Silva", country: "Brazil" },
  { name: "Ana Santos", country: "Brazil" },
  { name: "Rafael Pereira", country: "Mexico" },
  { name: "Mariana Oliveira", country: "Argentina" },

  // Asia
  { name: "Ayo Adeyemi", country: "India" },
  { name: "Tariq Abubakar", country: "Pakistan" },
  { name: "Chinwe Onyeka", country: "China" },
  { name: "Sekou Toure", country: "Japan" },
];

const ACTIONS = [
  { text: "just signed up", hasAmount: false },
  { text: "purchased [amount] Koin tokens", hasAmount: true },
  { text: "upgraded to Premium plan", hasAmount: false },
  { text: "referred a friend", hasAmount: false },
  { text: "started a new investment of [amount]", hasAmount: true },
  { text: "withdrew [amount]", hasAmount: true },
  { text: "completed KYC verification", hasAmount: false },
];

const INITIAL_DELAY = 12000;       // Wait 10s before starting
const DISPLAY_DURATION = 10000;    // Show each user for 10s
const TRANSITION_DURATION = 2000;  // Fade-in/out takes 2s

const formatAmount = (min, max) => {
  const amount = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

const RandomAlert = () => {
  const [currentAlert, setCurrentAlert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [playSound] = useSound(alert, {
    volume: 0.1,
    interrupt: true,
  });

  

  // Handle user interaction to enable sound
  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const generateRandomAlert = () => {
    const randomUser = USERS[Math.floor(Math.random() * USERS.length)];
    const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let actionText = randomAction.text;
    if (randomAction.hasAmount) {
      const amount = actionText.includes("Koin tokens")
        ? formatAmount(10, 500)
        : formatAmount(100, 10000);
      actionText = actionText.replace("[amount]", amount);
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      name: randomUser.name,
      country: randomUser.country,
      action: actionText,
      time,
    };
  };

  const showNewAlert = () => {
    const newAlert = generateRandomAlert();
    setCurrentAlert(newAlert);
    setIsVisible(true);

    // Only play sound if user has interacted with the page
    if (hasUserInteracted) {
      try {
        playSound();
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);

      setTimeout(() => {
        showNewAlert();
      }, TRANSITION_DURATION);
    }, DISPLAY_DURATION);

    return () => clearTimeout(hideTimeout);
  };

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      showNewAlert();
    }, INITIAL_DELAY);

    return () => clearTimeout(initialDelay);
  }, [hasUserInteracted]);

  return (
    <div className="fixed left-4 bottom-4 z-50 w-64">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {currentAlert && (
          <div className="bg-slate-800 rounded-lg shadow-xl border-l-4 border-teal-500 overflow-hidden">
            <div className="p-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-900 flex items-center justify-center text-teal-300 font-bold">
                  {currentAlert.name.charAt(0)}
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-slate-100">
                    {currentAlert.name}{" "}
                    <span className="text-xs text-slate-400">
                      ({currentAlert.country})
                    </span>
                  </p>
                  <p className="text-xs text-teal-300">{currentAlert.action}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {currentAlert.time}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="h-0.5 w-full bg-teal-500 animate-progress"
              style={{ animationDuration: `${DISPLAY_DURATION}ms` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomAlert;
