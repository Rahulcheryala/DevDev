import type { KeyboardEvent } from "react";
import React, { useState, useRef, useEffect } from "react";
import { XCloseIcon } from "@zeak/icons";

interface ChipInputProps {
  label?: string;
  placeholder?: string;
  value?: string[];
  onChange?: (chips: string[]) => void;
  name?: string;
  suggestions?: string[]; // Optional suggestions array
}

export const ChipInput: React.FC<ChipInputProps> = ({
  label,
  placeholder = "Type and press enter",
  value = [],
  onChange,
  name,
  suggestions = [], // Default to empty array if not provided
}) => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState<string[]>(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !chips.includes(suggestion),
  );

  const addChip = (value: string) => {
    if (value.trim() && !chips.includes(value.trim())) {
      const newChips = [...chips, value.trim()];
      setChips(newChips);
      onChange?.(newChips);
      setInputValue("");
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        // If an suggestion is selected, add it
        addChip(filteredSuggestions[selectedIndex]);
      } else if (inputValue.trim()) {
        // If no suggestion is selected, add the input value
        addChip(inputValue);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    }
  };

  const removeChip = (index: number) => {
    const newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);
    onChange?.(newChips);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2" ref={wrapperRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <div className="min-h-[56px] p-2 border rounded-md flex flex-wrap gap-2 bg-white">
          {chips.map((chip, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
            >
              <span className="text-sm">{chip}</span>
              <button
                type="button"
                onClick={() => removeChip(index)}
                className="hover:text-red-500"
              >
                <XCloseIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
          <input
            type="text"
            name={name}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className="flex-1 min-w-[120px] outline-none border-none"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && inputValue && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => addChip(suggestion)}
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <div className="p-2">
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-blue-600"
                  onClick={() => addChip(inputValue)}
                >
                  Create "{inputValue}"
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
