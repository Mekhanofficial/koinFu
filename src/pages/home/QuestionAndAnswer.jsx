import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPlus,
  faMinus,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function QuestionAndAnswer() {
  const Question = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div
        className="cursor-pointer border-b border-gray-700 py-5 transition-all duration-300 hover:bg-gray-800/30 rounded-lg"
        onClick={toggleAnswer}
      >
        <div className="flex items-center justify-between px-5 text-white">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 transition-all ${
                isOpen ? "bg-teal-500" : "bg-gray-700"
              }`}
            >
              <FontAwesomeIcon
                className={`text-white transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                icon={isOpen ? faMinus : faPlus}
                size="xs"
              />
            </div>
            <h3 className="font-medium text-lg lg:text-xl">{question}</h3>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-gray-400 ml-2 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            size="sm"
          />
        </div>
        {isOpen && (
          <p className="mt-4 text-gray-300 px-5 pl-16 pb-3 text-base lg:text-lg">
            {answer}
          </p>
        )}
      </div>
    );
  };

  const [selectedCategory, setSelectedCategory] = useState("General Question");

  const KoinFuItems = [
    "General Question",
    "Token Sales",
    "Client Related",
    "Pre-ICO",
    "Legal Info",
    "Pre sales",
  ];

  const questionsData = {
    "General Question": [
      {
        question: "Can I make payment directly from an Exchange?",
        answer:
          "No, payments cannot be made directly from an exchange. You need to transfer funds to a wallet first.",
      },
      {
        question:
          "What is the process for transferring funds from an exchange to a wallet?",
        answer:
          "Log in to your exchange account, navigate to the withdrawal section, enter your wallet address, and confirm the transaction.",
      },
      {
        question:
          "Are there fees for transferring funds from an exchange to a wallet?",
        answer:
          "Yes, most exchanges charge a withdrawal fee for transferring funds to an external wallet.",
      },
      {
        question:
          "How long does it take to transfer funds from an exchange to a wallet?",
        answer:
          "Transfer times vary depending on the blockchain network, but it typically takes between a few minutes to an hour.",
      },
      {
        question: "Can I use any wallet to receive funds from an exchange?",
        answer:
          "Yes, as long as the wallet supports the cryptocurrency you are transferring and you provide the correct wallet address.",
      },
    ],
    "Token Sales": [
      {
        question: "How do I participate in the token sale?",
        answer:
          "To participate in the token sale, you need to register on our platform, complete KYC, and follow the instructions provided.",
      },
      {
        question: "What currencies are accepted for the token sale?",
        answer: "We accept BTC, ETH, and USDT for the token sale.",
      },
      {
        question: "Is there a minimum investment amount for the token sale?",
        answer:
          "Yes, the minimum investment amount is $100 or its equivalent in other accepted currencies.",
      },
      {
        question: "When will I receive my tokens after the sale?",
        answer:
          "Tokens will be distributed to your wallet within 7 business days after the token sale concludes.",
      },
      {
        question: "Can I cancel my participation in the token sale?",
        answer:
          "No, once you have participated and the transaction is confirmed, it cannot be canceled.",
      },
    ],
    "Client Related": [
      {
        question: "How do I contact customer support?",
        answer:
          "You can contact customer support via email at support@example.com or through the live chat on our website.",
      },
      {
        question: "What are the customer support hours?",
        answer:
          "Our customer support team is available 24/7 to assist you with any queries.",
      },
      {
        question: "How do I reset my account password?",
        answer:
          "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions.",
      },
      {
        question: "Can I change my registered email address?",
        answer:
          "Yes, you can change your email address by contacting customer support and verifying your identity.",
      },
      {
        question: "What should I do if I encounter a technical issue?",
        answer:
          "Please report the issue to our technical support team at techsupport@example.com, and we will assist you promptly.",
      },
    ],
    "Pre-ICO": [
      {
        question: "What is the difference between Pre-ICO and ICO?",
        answer:
          "Pre-ICO is an early-stage sale with discounted tokens, while ICO is the main token sale event.",
      },
      {
        question: "Who can participate in the Pre-ICO?",
        answer:
          "Only whitelisted participants who have completed KYC can participate in the Pre-ICO.",
      },
      {
        question: "What are the benefits of participating in the Pre-ICO?",
        answer:
          "Pre-ICO participants receive tokens at a discounted price and exclusive bonuses.",
      },
      {
        question: "How do I get whitelisted for the Pre-ICO?",
        answer:
          "You need to register on our platform, complete KYC, and submit the required documents for whitelisting.",
      },
      {
        question: "Can I transfer my Pre-ICO tokens to another wallet?",
        answer:
          "Yes, once the tokens are distributed, you can transfer them to any compatible wallet.",
      },
    ],
    "Legal Info": [
      {
        question: "Is the token sale compliant with regulations?",
        answer:
          "Yes, our token sale complies with all applicable regulations in the jurisdictions we operate in.",
      },
      {
        question: "What legal documents govern the token sale?",
        answer:
          "The token sale is governed by our Terms and Conditions, Privacy Policy, and Token Purchase Agreement.",
      },
      {
        question: "Are there any restrictions on who can participate?",
        answer:
          "Yes, participants from restricted jurisdictions are not allowed to participate in the token sale.",
      },
      {
        question: "What happens if the token sale is canceled?",
        answer:
          "In the unlikely event of cancellation, all funds will be returned to participants within 30 business days.",
      },
      {
        question: "Can I get a refund after participating in the token sale?",
        answer:
          "No, refunds are not allowed once the transaction is confirmed and tokens are distributed.",
      },
    ],
    "Pre sales": [
      {
        question: "What is the purpose of the pre-sales phase?",
        answer:
          "The pre-sales phase allows early investors to purchase tokens at a discounted rate before the public sale.",
      },
      {
        question: "How do I qualify for the pre-sales?",
        answer:
          "You need to be whitelisted and meet the minimum investment requirements to qualify for the pre-sales.",
      },
      {
        question: "What is the minimum investment for the pre-sales?",
        answer:
          "The minimum investment for the pre-sales is $500 or its equivalent.",
      },
      {
        question: "Are pre-sales tokens subject to a lock-up period?",
        answer:
          "Yes, pre-sales tokens are subject to a 6-month lock-up period after distribution.",
      },
      {
        question: "Can I participate in the pre-sales from any country?",
        answer:
          "No, participants from restricted jurisdictions are not allowed to participate in the pre-sales.",
      },
    ],
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-900 min-h-screen py-16 px-4 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block relative mb-5">
            <span className="text-teal-400 text-sm font-semibold tracking-wider uppercase bg-teal-400/10 px-4 py-1.5 rounded-full">
              <FontAwesomeIcon
                icon={faPlay}
                className="text-teal-400 mr-2 h-3"
              />
              FAQ
            </span>
            <div className="absolute inset-0 bg-teal-400 rounded-full blur-lg opacity-20 -z-10 animate-pulse"></div>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-5">
            Frequently Asked <span className="text-teal-400">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Find answers to common questions about our platform, token sales,
            and investment processes.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl shadow-gray-900/50 p-1">
              <ul className="space-y-1">
                {KoinFuItems.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`flex items-center w-full p-4 rounded-lg text-lg transition-all duration-300 ${
                        selectedCategory === item
                          ? "text-white bg-gray-800 shadow-lg shadow-teal-500/10"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      }`}
                      onClick={() => handleCategoryClick(item)}
                    >
                      <FontAwesomeIcon
                        className={`mr-3 transition-all ${
                          selectedCategory === item
                            ? "text-teal-400 transform scale-110"
                            : "text-gray-500"
                        }`}
                        icon={faChevronRight}
                        size="xs"
                      />
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Questions Container */}
          <div className="w-full lg:w-3/4">
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl shadow-gray-900/50 overflow-hidden">
              <div className="p-1">
                <div className="bg-gradient-to-r from-teal-500/10 to-purple-500/10 p-5">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedCategory}
                  </h3>
                  <p className="text-gray-400 mt-1">
                    {questionsData[selectedCategory]?.length} questions
                  </p>
                </div>

                <div className="divide-y divide-gray-700">
                  {questionsData[selectedCategory]?.map((item, index) => (
                    <Question
                      key={index}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
