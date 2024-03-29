import React from "react";

export default function Input({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  errorMessage,
}) {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="inline-password"
        >
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        />
        <p className="text-xs pt-2 text-center text-red-400 ">{errorMessage}</p>
      </div>
    </div>
  );
}
