import React, { useState, useEffect } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate AI response
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

    // Add user message
    const userMsg = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Get AI response
    const aiResponse = await getAIResponse(inputValue);
    setMessages((prev) => [...prev, { text: aiResponse, sender: "bot" }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-96 bg-slate-800 border border-teal-400 rounded-xl shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 to-slate-700 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-teal-400 rounded-full animate-pulse"></div>
              <h3 className="font-bold text-white">Crypto Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-teal-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80 bg-slate-800">
            {messages.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <p>Ask me about crypto prices, your portfolio, or trading.</p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setInputValue("Price of BTC")}
                    className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg text-teal-200"
                  >
                    Price of BTC
                  </button>
                  <button
                    onClick={() => setInputValue("My balance")}
                    className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg text-teal-200 ml-2"
                  >
                    My balance
                  </button>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-teal-600 text-white"
                        : "bg-slate-700 text-slate-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
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
                placeholder="Ask about BTC, ETH, etc..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-l-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-slate-400"
              />
              <button
                onClick={handleSendMessage}
                className="bg-teal-600 hover:bg-teal-700 px-4 rounded-r-lg text-white transition-colors"
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
            p-4 rounded-full shadow-lg transition-all transform 
            ${isVisible ? "translate-y-0" : "-translate-"} 
            hover:scale-110 animate-pulse
            transition-transform duration-300 ease-in-out
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
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
