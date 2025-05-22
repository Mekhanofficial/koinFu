"use client";
import React from "react";

const Button = ({
  children,
  type,
  className,
  onClick,
  isLoading,
  disabled,
}) => {
  return (
    <button
      onClick={() => onClick()}
      className={` border-2 px-5 py-2 rounded-full text-white text-sm ${className} ${
        type === "outline"
          ? "border-[#f42f54]"
          : type === "fill"
          ? " border-[#f42f54] bg-[#f42f54]"
          : "border-transparent"
      } ${disabled && "opacity-50"}`}
      disabled={disabled}
    >
      {isLoading ? (
        <span className="block w-5 h-5 border-2 border-white border-l-transparent rounded-full border-b-transparent animate-spin mx-auto"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
