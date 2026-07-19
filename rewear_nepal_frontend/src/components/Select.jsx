import { forwardRef } from "react";

const Select = forwardRef(({ label, error, options = [], placeholder = "Select...", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="label-field">{label}</label>}
      <select
        ref={ref}
        className={`input-field ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500" : ""}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
});

Select.displayName = "Select";
export default Select;
