
import {
  ACCOUNT_QUESTIONS,
  FAQ_TABS,
  GENERAL_QUESTIONS,
  INVESTMENT_QUESTIONS,
} from "../../constants/faq.constants";
import { useState } from "react";
import FaqItem from "./FaqItem";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <section id="faq" className="custom-container mx-10">
      <h2 className="section-title">FAQS</h2>
      <p className="text-[#d8d8d8] max-w-lg mx-auto text-center mt-10">
        Below we’ve provided answers to the most frequently asked questions. If
        you have any other questions, please get in touch.
      </p>

      <div className="mt-10">
        {/* Tabs */}
        <div className="grid grid-cols-3 gap-5 sm:gap-10 ">
          {FAQ_TABS.map((tab, i) => (
            <div
              key={i}
              onClick={() => setActiveTab(tab)}
              className={`text-center text-sm rounded-md transition-all duration-500 border p-1 text-white  cursor-pointer hover:bg-[#f3f35677] ${
                activeTab === tab && "bg-[#c7bd2d67]"
              }`}
            >
              {tab} Questions
            </div>
          ))}
        </div>

        {/* General FAQ */}
        {activeTab === "General" && (
          <div className="grid gap-5 mt-10 ">
            {GENERAL_QUESTIONS.map((faq, i) => (
              <FaqItem ques={faq.ques} ans={faq.ans} />
            ))}
          </div>
        )}

        {/* Acccount FAQ */}
        {activeTab === "Account" && (
          <div className="grid gap-5 mt-10">
            {ACCOUNT_QUESTIONS.map((faq, i) => (
              <FaqItem ques={faq.ques} ans={faq.ans} />
            ))}
          </div>
        )}

        {/* Investment FAQ */}
        {activeTab === "Investment" && (
          <div className="grid gap-5 mt-10">
            {INVESTMENT_QUESTIONS.map((faq, i) => (
              <FaqItem ques={faq.ques} ans={faq.ans} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
