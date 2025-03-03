import React from "react";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  Icon?: any;
  options?: { value: string; label: string }[];
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  Icon,
  options,
  rows,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;
  const inputClassName = `block w-full ${
    Icon ? "pl-10" : "px-3"
  } pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
    error ? "border-red-500" : ""
  }`;

  const renderInput = () => {
    if (type === "select" && options) {
      return (
        <select {...register(name)} className={inputClassName}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          {...register(name)}
          rows={rows || 4}
          className={inputClassName}
          placeholder={placeholder}
        />
      );
    }

    return (
      <input
        {...register(name)}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        {renderInput()}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
