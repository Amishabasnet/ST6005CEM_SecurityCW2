import { forwardRef } from "react";

const Input = forwardRef(({ label, error, type = "text", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="label-field">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={`input-field ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500" : ""}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
