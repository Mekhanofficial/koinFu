import React from "react";

const Input = ({ id, type, label, placeholder }) => {
  return (
    <div className="grid gap-3">
      <label htmlFor={id} className="text-white uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`border border-[rgba(101,_119,_151,_0.4)] w-full rounded-sm text-[#97afd5] outline-none placeholder:text-[#97afd5] placeholder:opacity-70 px-5 py-3 bg-transparent`}
      />
    </div>
  );
};

export default Input;
