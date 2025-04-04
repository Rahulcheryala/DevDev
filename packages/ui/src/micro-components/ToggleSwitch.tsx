import React from "react";
import { cn } from "../utils";
import { Label } from "./Label";

export interface ToggleSwitchProps {
  isOn: boolean;
  onChange: (isOn: boolean) => void;
  isRequired?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onText?: string;
  offText?: string;
  disabled?: boolean;
  id?: string;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  labelFirst?: boolean;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  ariaLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onChange,
  isRequired = false,
  label = "Toggle Switch",
  size = "md",
  showText = false,
  onText = "Yes",
  offText = "No",
  disabled = false,
  id = `toggle-${Math.random().toString(36).substring(2, 9)}`,
  activeColor,
  inactiveColor,
  className = "",
  labelFirst = true,
  onFocus,
  onBlur,
  ariaLabel,
}) => {
  // Size mappings
  const sizeClasses = {
    sm: {
      toggle: "w-8 h-5",
      knob: "w-4 h-4 top-0.5",
      movement: isOn ? "right-0.5" : "left-0.5",
    },
    md: {
      toggle: "w-11 h-6",
      knob: "w-5 h-5 top-0.5",
      movement: isOn ? "right-0.5" : "left-0.5",
    },
    lg: {
      toggle: "w-14 h-7",
      knob: "w-6 h-6 top-0.5",
      movement: isOn ? "right-0.5" : "left-0.5",
    },
  };

  // Handle key events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(!isOn);
    }
  };

  // Default colors
  const defaultActiveColor = "bg-accent-brightGreen";
  const defaultInactiveColor = "bg-gray-200";

  // Build toggle container classes
  const toggleClasses = cn(
    "relative p-0.5 rounded-full cursor-pointer transition-colors duration-300",
    sizeClasses[size].toggle,
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    isOn
      ? activeColor || defaultActiveColor
      : inactiveColor || defaultInactiveColor,
    className
  );

  // Build knob classes
  const knobClasses = cn(
    "absolute bg-white rounded-full transform transition-transform duration-300",
    sizeClasses[size].knob,
    sizeClasses[size].movement
  );

  // Create toggle component
  const toggleComponent = (
    <div className="flex items-center gap-3">
      <div
        role="switch"
        tabIndex={disabled ? -1 : 0}
        aria-checked={isOn}
        aria-disabled={disabled}
        aria-label={ariaLabel || label}
        id={id}
        className={toggleClasses}
        onClick={() => !disabled && onChange(!isOn)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        data-state={isOn ? "checked" : "unchecked"}
      >
        <div className={knobClasses} />
      </div>
      {showText && <span className="text-sm">{isOn ? onText : offText}</span>}
    </div>
  );

  // If no label, just return the toggle
  if (!label) {
    return toggleComponent;
  }

  // Return with label
  return (
    <div className="flex flex-col gap-3">
      {labelFirst ? (
        <>
          <Label htmlFor={id}>
            {label}{" "}
            {isRequired && <span className="text-accent-orange">*</span>}
          </Label>
          {toggleComponent}
        </>
      ) : (
        <div className="flex items-center gap-3">
          {toggleComponent}
          <Label htmlFor={id}>
            {label}{" "}
            {isRequired && <span className="text-accent-orange">*</span>}
          </Label>
        </div>
      )}
    </div>
  );
};

export default ToggleSwitch;
