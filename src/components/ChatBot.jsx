import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaRobot, FaPaperPlane, FaTimes, FaCog, FaVolumeUp, FaVolumeMute, FaTrash, FaLock } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { SiBitcoincash } from "react-icons/si";
import cryptoQuestions from "./CryptoQuestion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Simulated AI API integration
  const cryptoApi = {
    getPrice: async (symbol) => {
      const prices = {
        btc: { price: 62850, change: 2.4 },
        eth: { price: 3450, change: -1.2 },
        sol: { price: 150, change: 5.7 },
        ada: { price: 0.48, change: 0.8 },
        doge: { price: 0.15, change: -3.2 }
      };
      
      const coin = symbol.toLowerCase();
      const data = prices[coin] || { price: "N/A", change: "N/A" };
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(`Current ${symbol.toUpperCase()} price: $${data.price.toLocaleString()} (${data.change > 0 ? '📈' : '📉'} ${Math.abs(data.change)}%)`);
        }, 800);
      });
    },
    
    getPortfolio: async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("Your portfolio: 0.5 BTC ($31,425), 3.2 ETH ($11,040), 50 SOL ($7,500). Total: $49,965 📊");
        }, 1000);
      });
    },
    
    getNews: async () => {
      const headlines = [
        "Bitcoin ETF approval expected next month",
        "Ethereum completes major network upgrade",
        "Crypto market cap surpasses $2.5 trillion",
        "New regulation proposal for stablecoins"
      ];
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(`Latest crypto news:\n${headlines.map((h, i) => `${i+1}. ${h}`).join('\n')}`);
        }, 1200);
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
        addBotMessage("Welcome to KoinFu! 👋\nHow can I assist you with your crypto questions today?");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isTyping && typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text) => {
    setMessages(prev => [
      ...prev,
      {
        text,
        sender: "bot",
        timestamp: new Date()
      }
    ]);
    
    if (soundEnabled) {
      playNotificationSound();
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio("/sounds/notification.mp3");
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const getAIResponse = async (query) => {
    setIsTyping(true);
    
    // Check for predefined quick questions
    const quickQuestion = cryptoQuestions.find(q => 
      query.toLowerCase().includes(q.keyword.toLowerCase())
    );
    
    if (quickQuestion) {
      setTimeout(() => {
        addBotMessage(quickQuestion.response);
        setIsTyping(false);
      }, 1000);
      return;
    }
    
    // Handle specific commands
    if (query.toLowerCase().includes("price") || query.toLowerCase().includes("how much")) {
      const coinMatch = query.match(/(btc|bitcoin|eth|ethereum|sol|solana|ada|cardano|doge|dogecoin)/i);
      const symbol = coinMatch ? coinMatch[0].slice(0, 3) : "btc";
      const response = await cryptoApi.getPrice(symbol);
      addBotMessage(response);
      setIsTyping(false);
      return;
    }
    
    if (query.toLowerCase().includes("portfolio") || query.toLowerCase().includes("balance")) {
      const response = await cryptoApi.getPortfolio();
      addBotMessage(response);
      setIsTyping(false);
      return;
    }
    
    if (query.toLowerCase().includes("news") || query.toLowerCase().includes("update")) {
      const response = await cryptoApi.getNews();
      addBotMessage(response);
      setIsTyping(false);
      return;
    }
    
    // Default response for other queries
    typingTimeoutRef.current = setTimeout(() => {
      addBotMessage("I can help with crypto prices, portfolio info, news, and trading strategies. Try asking:\n• 'What's the price of ETH?'\n• 'Show my portfolio balance'\n• 'Latest crypto news'");
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    // Add user message
    const userMsg = {
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setConversationHistory(prev => [...prev, userMsg]);
    setInputValue("");
    
    // Get AI response
    await getAIResponse(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const clearChat = () => {
    setMessages([]);
    setConversationHistory([]);
    setShowOptions(false);
    addBotMessage("Chat history cleared. How can I assist you with your crypto questions today?");
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-full max-w-md h-[32rem] bg-slate-900 border border-teal-500/50 rounded-xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-lg">
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
                <p className="text-xs text-teal-300">Real-time crypto support</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-slate-300 hover:text-teal-300 transition-colors p-1 rounded-full hover:bg-slate-700"
                aria-label="Options"
              >
                <FaCog />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-teal-300 transition-colors p-1 rounded-full hover:bg-slate-700"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Options Menu */}
          {showOptions && (
            <div className="absolute right-3 top-14 bg-slate-800 shadow-xl rounded-lg border border-teal-500/30 z-10 w-56 overflow-hidden">
              <button
                onClick={toggleSound}
                className="w-full text-left px-4 py-3 hover:bg-slate-700/80 text-sm text-white flex items-center border-b border-slate-700"
              >
                <div className="mr-3">
                  {soundEnabled ? <FaVolumeUp className="text-teal-400" /> : <FaVolumeMute className="text-slate-400" />}
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

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-900/70 to-slate-900">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-slate-500">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center max-w-xs">
                  <div className="bg-gradient-to-br from-teal-600 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SiBitcoincash className="text-white text-xl" />
                  </div>
                  <h3 className="font-medium text-white mb-2">Crypto Assistant</h3>
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
                    <button
                      onClick={() => setInputValue("Crypto news")}
                      className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-teal-300 border border-slate-700 transition-colors"
                    >
                      Crypto news
                    </button>
                    <button
                      onClick={() => setInputValue("How to buy ETH")}
                      className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-teal-300 border border-slate-700 transition-colors"
                    >
                      Buy ETH
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="flex flex-col">
                    <div
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
                            msg.sender === "user" ? "text-teal-300/70" : "text-slate-500"
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/70 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-end">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about crypto..."
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-slate-500 resize-none pr-12"
                  rows={1}
                  style={{ minHeight: "3rem", maxHeight: "8rem" }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`absolute right-3 bottom-3 p-2 rounded-full ${
                    inputValue.trim()
                      ? "bg-gradient-to-br from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white"
                      : "text-slate-500"
                  } transition-all`}
                  aria-label="Send message"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`
            bg-gradient-to-br from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 
            p-5 rounded-full shadow-xl transition-all duration-300
            hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900
            animate-bounce-slow
          `}
          aria-label="Open chat"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 bg-emerald-400/30 rounded-full animate-ping-slow"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                <SiBitcoincash className="text-white text-xl" />
              </div>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;