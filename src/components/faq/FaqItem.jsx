import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const FaqItem = ({ ques, ans }) => {
  const [showAns, setShowAns] = useState(false);

  return (
    <div
      className={`bg-[rgba(77,72,48,0.1)] p-3 rounded-md   grid gap-5  overflow-hidden transition-all ${
        showAns ? "h-full" : "h-[50px]"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto] items-center">
        <p className={`font-semibold ${showAns ? "text-[#b6ad36]" : "text-white"}`}>
          {ques}
        </p>

        <div
          onClick={() => setShowAns(!showAns)}
          className="text-[#eeeccf] text-xl cursor-pointer"
        >
          {showAns ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>

      <p className= {`text-[#82836c] font-semibold ${showAns ? "block" : "hidden"}`}>{ans}</p>
    </div>
  );
};

export default FaqItem;
