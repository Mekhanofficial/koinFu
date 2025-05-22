import React from "react";

const Input = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  required,
  readOnly,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        className="w-full p-3 border rounded-lg bg-gray-100"
      />
    </div>
  );
};

export default Input;
