import React, { useState, useRef, useEffect, useMemo } from "react";
import { FaChevronDown, FaSearch, FaCheck } from "react-icons/fa";

export interface Option {
  value: string;
  name: string;
}

interface SearchableDropdownProps {
  options: any[];
  onChange: (selectedOptions: Option[]) => void;
  placeholder?: string;
  value?: Option[];
  isMultiSelect?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options = [],
  onChange,
  placeholder = "Select option",
  value = [],
  isMultiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const handleOptionClick = (option: Option) => {
    if (isMultiSelect) {
      const newValue = value.some((item) => item.value === option.value)
        ? value.filter((item) => item.value !== option.value)
        : [...value, option];
      onChange(newValue);
    } else {
      onChange([option]);
      setIsOpen(false);
    }
    setSearchTerm("");
  };

  const sortedOptions = useMemo(() => {
    return [...options].sort((a, b) => a.name.localeCompare(b.name));
  }, [options]);

  const filteredOptions = useMemo(() => {
    return sortedOptions.filter((option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [sortedOptions, searchTerm]);

  const displayValue = useMemo(() => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) return value[0].name;
    return `${value.length} items selected`;
  }, [value, placeholder]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        value={"Select option"}
      >
        <span className="truncate">{displayValue}</span>
        <FaChevronDown className="w-5 h-5 text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b border-gray-300">
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          {filteredOptions.map((option, index) => (
            <div
              key={`${option.value}-${index}`}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {isMultiSelect && (
                <div className="mr-2">
                  {value.some((item) => item.value === option.value) && (
                    <FaCheck className="text-blue-500" />
                  )}
                </div>
              )}
              <span>{option.name}</span>
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
