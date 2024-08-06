import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", error, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 scroll-pl-1.5">
          {label}
        </label>
      )}{" "}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  );
});

export default Input;
