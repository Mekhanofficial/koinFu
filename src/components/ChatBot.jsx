import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaTimes,
  FaCog,
  FaVolumeUp,
  FaVolumeMute,
  FaTrash,
  FaLock,
} from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { SiBitcoincash } from "react-icons/si";
import cryptoQuestions from "./CryptoQuestions";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const cryptoApi = {
    getPrice: async (symbol) => {
      const prices = {
        btc: { price: 62850, change: 2.4 },
        eth: { price: 3450, change: -1.2 },
        sol: { price: 150, change: 5.7 },
        ada: { price: 0.48, change: 0.8 },
        doge: { price: 0.15, change: -3.2 },
      };
      const coin = symbol.toLowerCase();
      const data = prices[coin] || { price: "N/A", change: "N/A" };
      return `Current ${symbol.toUpperCase()} price: $${data.price.toLocaleString()} (${
        data.change > 0 ? "📈" : "📉"
      } ${Math.abs(data.change)}%)`;
    },
    getPortfolio: async () => {
      return "Your portfolio: 0.5 BTC ($31,425), 3.2 ETH ($11,040), 50 SOL ($7,500). Total: $49,965 📊";
    },
    getNews: async () => {
      const headlines = [
        "Bitcoin ETF approval expected next month",
        "Ethereum completes major network upgrade",
        "Crypto market cap surpasses $2.5 trillion",
      ];
      return `Latest crypto news:\n${headlines
        .map((h, i) => `${i + 1}. ${h}`)
        .join("\n")}`;
    },
  };

  // Show welcome message only once on page load
  useEffect(() => {
    if (!hasWelcomed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        addBotMessage(
          "Welcome to KoinFu! 👋\nHow can I assist you with crypto today?"
        );
        setHasWelcomed(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasWelcomed]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTyping) {
        console.warn("Resetting stuck typing indicator");
        setIsTyping(false);
        addBotMessage("Sorry for the delay. Please try your question again.");
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [isTyping]);

  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { text, sender: "bot", timestamp: new Date() },
    ]);
    if (soundEnabled) {
      new Audio("/sounds/notification.mp3")
        .play()
        .catch((e) => console.log("Sound error:", e));
    }
  };

  const getAIResponse = async (query) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsTyping(true);

    try {
      const quickQuestion = cryptoQuestions.find((q) =>
        query.toLowerCase().includes(q.keyword.toLowerCase())
      );

      if (quickQuestion) {
        typingTimeoutRef.current = setTimeout(() => {
          addBotMessage(quickQuestion.response);
          setIsTyping(false);
        }, 1000);
        return;
      }

      const commands = {
        price: async () => {
          const coinMatch = query.match(
            /(btc|bitcoin|eth|ethereum|sol|solana|ada|cardano|doge|dogecoin)/i
          );
          const symbol = coinMatch ? coinMatch[0].slice(0, 3) : "btc";
          return await cryptoApi.getPrice(symbol);
        },
        portfolio: async () => await cryptoApi.getPortfolio(),
        news: async () => await cryptoApi.getNews(),
        help: async () =>
          "I can help with:\n• Prices\n• Portfolio\n• News\nTry: 'BTC price' or 'Show my portfolio'",
      };

      for (const [keyword, handler] of Object.entries(commands)) {
        if (query.toLowerCase().includes(keyword)) {
          const response = await handler();
          addBotMessage(response);
          setIsTyping(false);
          return;
        }
      }

      typingTimeoutRef.current = setTimeout(() => {
        addBotMessage(
          "I specialize in crypto information. Try asking about:\n• Prices (BTC/ETH/SOL)\n• Your portfolio\n• Market news"
        );
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Response error:", error);
      typingTimeoutRef.current = setTimeout(() => {
        addBotMessage("Oops! Let me try that again...");
        setIsTyping(false);
      }, 500);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg = {
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    await getAIResponse(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const clearChat = () => {
    setMessages([]);
    setShowOptions(false);
    addBotMessage("Chat cleared. Ask me anything about crypto!");
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-full max-w-md h-[32rem] bg-slate-900 border border-teal-500/50 rounded-xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-2 rounded-lg">
                <SiBitcoincash className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-white flex items-center">
                  KoinFu Assistant
                  <span className="ml-2 bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded-full flex items-center">
                    <BsLightningChargeFill className="mr-1" /> AI Powered
                  </span>
                </h3>
                <p className="text-xs text-teal-300">
                  Real-time crypto support
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-slate-300 hover:text-teal-300 transition-colors p-1 rounded-full hover:bg-slate-700"
              >
                <FaCog />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-teal-300 transition-colors p-1 rounded-full hover:bg-slate-700"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Options */}
          {showOptions && (
            <div className="absolute right-3 top-14 bg-slate-800 shadow-xl rounded-lg border border-teal-500/30 z-10 w-56 overflow-hidden">
              <button
                onClick={toggleSound}
                className="w-full text-left px-4 py-3 hover:bg-slate-700/80 text-sm text-white flex items-center border-b border-slate-700"
              >
                <div className="mr-3">
                  {soundEnabled ? (
                    <FaVolumeUp className="text-teal-400" />
                  ) : (
                    <FaVolumeMute className="text-slate-400" />
                  )}
                </div>
                Sound {soundEnabled ? "On" : "Off"}
              </button>
              <button
                onClick={clearChat}
                className="w-full text-left px-4 py-3 hover:bg-slate-700/80 text-sm text-white flex items-center"
              >
                <div className="mr-3">
                  <FaTrash className="text-rose-400" />
                </div>
                Clear Conversation
              </button>
              <div className="px-4 py-3 bg-slate-900/80 border-t border-slate-700 flex items-center text-xs text-slate-400">
                <FaLock className="mr-2 text-xs" />
                <span>End-to-end encrypted</span>
              </div>
            </div>
          )}

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-900/70 to-slate-900">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-slate-500">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center max-w-xs">
                  <div className="bg-gradient-to-br from-teal-600 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SiBitcoincash className="text-white text-xl" />
                  </div>
                  <h3 className="font-medium text-white mb-2">
                    Crypto Assistant
                  </h3>
                  <p className="text-sm mb-4">
                    Ask me about prices, portfolios, trading, or crypto news
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setInputValue("Price of BTC")}
                      className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-teal-300 border border-slate-700 transition-colors"
                    >
                      Price of BTC
                    </button>
                    <button
                      onClick={() => setInputValue("My portfolio")}
                      className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-teal-300 border border-slate-700 transition-colors"
                    >
                      My portfolio
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl relative ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-teal-700/80 to-teal-800 text-white rounded-br-none"
                          : "bg-slate-800/70 text-slate-100 rounded-bl-none border border-slate-700"
                      }`}
                    >
                      {msg.sender === "bot" && (
                        <div className="absolute -left-2 -top-2 bg-gradient-to-br from-cyan-500 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center border-2 border-slate-900">
                          <SiBitcoincash className="text-white text-xs" />
                        </div>
                      )}
                      <div className="whitespace-pre-line">{msg.text}</div>
                      <div
                        className={`text-xs mt-2 ${
                          msg.sender === "user"
                            ? "text-teal-300/70"
                            : "text-slate-500"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/70 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-150" />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-300" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex items-center space-x-2">
              <textarea
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 resize-none bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                placeholder="Ask me something about crypto..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-lg transition-colors"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-br from-teal-500 to-slate-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform animate-pulse"
        >
          <SiBitcoincash className="text-2xl" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500 to-slate-500 opacity-75 animate-ping"></span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
