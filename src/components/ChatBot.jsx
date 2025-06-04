import React, { useState, useEffect } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showGDPR, setShowGDPR] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [welcomeShown, setWelcomeShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setMessages([
        {
          text: "Welcome to KoinFu! 👋\nHow can I assist you with your crypto questions today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setWelcomeShown(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAIResponse = async (query) => {
    const mockResponses = {
      "price btc": "BTC is currently at $62,450. 📈 +2.4% in 24h.",
      "my balance": "Your portfolio: 0.5 BTC ($31,225), 3.2 ETH ($9,600).",
      "buy eth": "To buy ETH, go to Trade → Spot → Select ETH/USDT.",
      default:
        "I can check prices, portfolios, or help with trades. Try: 'What's SOL's price?'",
    };

    const responseKey = Object.keys(mockResponses).find((key) =>
      query.toLowerCase().includes(key)
    );
    return mockResponses[responseKey || "default"];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const aiResponse = await getAIResponse(inputValue);
    setMessages((prev) => [
      ...prev,
      {
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-full max-w-md h-[32rem] bg-slate-800 border border-teal-400 rounded-xl shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 to-slate-700 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-teal-400 rounded-full animate-pulse"></div>
              <div className="flex items-center">
                <img
                  src="../../public/assistanticon.png"
                  alt="KoinFu Logo"
                  className="h-6 w-6 mr-2 rounded-full"
                />
                <h3 className="font-bold text-white">
                  KoinFu Assistant
                  <span className="block text-xs font-normal text-teal-200">
                    Real-time crypto support
                  </span>
                </h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-white hover:text-teal-300 transition-colors"
                aria-label="Options"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-teal-300 transition-colors"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Options Menu */}
          {showOptions && (
            <div className="absolute right-4 top-14 bg-slate-700 shadow-lg rounded-md border border-teal-400 z-10 w-60">
              <button
                onClick={toggleSound}
                className="w-full text-left px-4 py-2 hover:bg-slate-600 text-sm text-white flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343"
                  />
                </svg>
                Sound {soundEnabled ? "On" : "Off"}
                <div className="ml-auto flex items-center">
                  <div
                    className={`w-10 h-5 flex items-center rounded-full p-1 ${
                      soundEnabled ? "bg-teal-500" : "bg-gray-500"
                    }`}
                  >
                    <div
                      className={`bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${
                        soundEnabled ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </button>

              <button
                className="w-full text-left px-4 py-2 text-sm text-slate-400 flex items-center cursor-not-allowed"
                disabled
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download transcript
              </button>

              <button
                onClick={() => setShowGDPR(!showGDPR)}
                className="w-full text-left px-4 py-2 hover:bg-slate-600 text-sm text-white flex items-center justify-between"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Privacy Policy
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showGDPR ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showGDPR && (
                <div className="px-4 py-3 bg-slate-800 text-xs text-slate-300 border-t border-slate-600">
                  <p className="mb-2">
                    We process personal data in compliance with GDPR
                    regulations. Your data is used solely to provide customer
                    service and improve your experience.
                  </p>
                  <p>
                    For more information about how we handle your data, please
                    contact our support team.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-800">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-slate-400">
                <p className="mb-4">
                  Ask me about crypto prices, portfolios, or trading
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setInputValue("Price of BTC")}
                    className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg text-teal-200"
                  >
                    Price of BTC
                  </button>
                  <button
                    onClick={() => setInputValue("My balance")}
                    className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg text-teal-200"
                  >
                    My balance
                  </button>
                  <button
                    onClick={() => setInputValue("How to buy ETH")}
                    className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg text-teal-200"
                  >
                    How to buy ETH
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="flex flex-col">
                    {index === 0 && (
                      <div className="text-center text-slate-400 text-xs mb-2">
                        {formatTime(msg.timestamp)}
                      </div>
                    )}
                    <div
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg whitespace-pre-line ${
                          msg.sender === "user"
                            ? "bg-teal-600 text-white"
                            : "bg-slate-700 text-slate-100"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700 bg-slate-800">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about crypto..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-l-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-slate-400"
              />
              <button
                onClick={handleSendMessage}
                className="bg-teal-600 hover:bg-teal-700 px-4 rounded-r-lg text-white transition-colors flex items-center justify-center"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`
            bg-gradient-to-r from-teal-600 to-slate-700 hover:from-teal-500 hover:to-slate-600 
            p-4 rounded-full shadow-lg transition-all duration-300
            ${isVisible ? "opacity-100" : "opacity-100"} 
            hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500
            animate-pulse
          `}
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h.01" />
            <path d="M12 10h.01" />
            <path d="M16 10h.01" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
