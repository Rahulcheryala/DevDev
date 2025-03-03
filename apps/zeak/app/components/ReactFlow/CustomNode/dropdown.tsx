import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

export interface Option {
  value: string;
  name: string;
}

interface DropdownComponentProps {
  options?: any[];
  multiSelect?: boolean;
  onChange?: (selectedOptions: Option[]) => void;
  placeholder?: string;
  value?: Option[];
}

const mockOptions: Option[] = [
  { value: "", name: "" },
  { value: "", name: "" },
];

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  options = mockOptions,
  multiSelect = false,
  onChange,
  placeholder = "Select option",
  value = [],
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOptionClick = useCallback(
    (option: Option) => {
      if (onChange) {
        if (multiSelect) {
          const isSelected = value.some((item) => item.value === option.value);
          if (isSelected) {
            onChange(value.filter((item) => item.value !== option.value));
          } else {
            onChange([...value, option]);
          }
        } else {
          onChange([option]);
          setIsOpen(false);
        }
      }
    },
    [multiSelect, onChange, value],
  );

  const isOptionSelected = useCallback(
    (option: Option) => {
      return value.some((item) => item.value === option.value);
    },
    [value],
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {value.length > 0
            ? value.map((option) => option.name).join(", ")
            : placeholder}
        </span>
        <FaChevronDown className="w-5 h-5 text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, i) => (
            <div
              key={`${option.value}-${i}`}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              <div
                className={`w-5 h-5 mr-3 rounded-full flex items-center justify-center ${
                  isOptionSelected(option)
                    ? "bg-black"
                    : "border-2 border-gray-400"
                }`}
              >
                {isOptionSelected(option) && (
                  <FaCheck className="w-3 h-3 text-white" />
                )}
              </div>
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
