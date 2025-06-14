import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function QuestionAndAnswer() {
  const Question = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div
        className="cursor-pointer border-b border-gray-200 bg-slate-900 opacity-80 rounded-md py-5"
        onClick={toggleAnswer}
      >
        <div className="flex items-center mx-4 text-white">
          <FontAwesomeIcon
            className={`text-white rounded-full p-1 h-3 bg-teal-300 mr-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            icon={isOpen ? faMinus : faPlus}
          />
          <h3 className="font-medium text-lg">{question}</h3>
        </div>
        {isOpen && <p className="mt-2 text-gray-200 p-5">{answer}</p>}
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
    <>
      <div className="bg-slate-950 shadow-md relative z-10 p-10">
        <div className="text-center mb-12">
          <h1 className="text-teal-500 text-lg font-semibold mb-3">FAQ</h1>
          <h2 className="text-white text-5xl font-bold mb-4">
            Question & Answer
          </h2>
          <h4 className="text-gray-400 text-xl max-w-2xl mx-auto">
            we pride ourselves on our team of skilled and experienced
            professionals who are dedicated to providing our users with the best
            possible investment experience.
          </h4>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Side: KoinFuItems */}
          <div className="w-full md:w-1/4 p-4 bg-slate-800 rounded-lg shadow-lg mb-4 md:mb-0">
            <ul className="space-y-3">
              {KoinFuItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center p-3 rounded-lg text-lg transition-all duration-300 ${
                    selectedCategory === item
                      ? "text-teal-400 bg-slate-700 border-l-4 border-teal-400"
                      : "text-gray-300 hover:bg-slate-700 hover:text-teal-400"
                  } cursor-pointer`}
                  onClick={() => handleCategoryClick(item)}
                >
                  <FontAwesomeIcon
                    className={`text-white rounded-full p-1 h-4 bg-teal-400 mr-3 ${
                      selectedCategory === item ? "opacity-100" : "opacity-80"
                    }`}
                    icon={faPlay}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Questions and Answers */}
          <div className="w-full md:w-3/4 p-4 md:p-6 bg-slate-900 rounded-lg shadow-lg md:ml-4">
            <div className="max-w-2xl mx-auto">
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
    </>
  );
}
