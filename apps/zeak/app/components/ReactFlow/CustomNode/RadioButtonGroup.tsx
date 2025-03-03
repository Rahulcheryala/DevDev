import React, { useState } from "react";

interface Option {
  id: string;
  label: string;
}

interface RadioButtonGroupProps {
  options?: Option[];
  onChange?: (selectedOption: Option) => void;
}

const mockData: Option[] = [
  { id: "create", label: "Create" },
  { id: "update", label: "Update" },
  { id: "delete", label: "Delete" },
];

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options = mockData,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option.id);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="flex flex-row space-x-4 gap-20">
      {options.map((option) => (
        <label key={option.id} className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="radio"
              className="sr-only"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option)}
            />
            <div
              className={`w-6 h-6 border-2 border-gray-400 rounded-full ${
                selectedOption === option.id ? "bg-black" : "bg-white"
              }`}
            >
              {selectedOption === option.id && (
                <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
          </div>
          <span className="ml-2 text-gray-700 font-normal text-base">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
