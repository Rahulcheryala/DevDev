import React, { useState } from "react";
import { Input } from "../../micro-components/Input";
import Label from "../../micro-components/Label-cpy";
import InfoTooltip from "../ToolTip";
import { cn } from "../../utils";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineRedo } from "react-icons/ai";

export interface LabelledInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  id: string;
  name: string;
  value: string | number;
  isRequired?: boolean;
  showTooltip?: boolean;
  tooltipTitle?: string;
  tooltipContent?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  onChange: any;
  onBlur?: any;
  size?: "xs" | "sm" | "md" | "lg";
  /** Whether to show "None" for value 0 in number inputs */
  showNoneForZero?: boolean;
  // Editing option for code
  isCode?: boolean;
}

export const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  id,
  name,
  value,
  isRequired = false,
  showTooltip = false,
  tooltipTitle = "",
  tooltipContent = "",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  errorMessage = "",
  isInvalid = false,
  isDisabled = false,
  placeholder = "",
  onChange,
  onBlur,
  size = "md",
  showNoneForZero = false,
  type,
  isCode = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [retryCode, setRetryCode] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 8;
    const timestamp = new Date().getTime().toString().slice(-4);
    let result = "";
    for (let i = 0; i < length / 2; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    result += timestamp;
    return result;
  };

  const handleRetryCode = () => {
    setRetryCode((prev) => prev + 1);
    const newCode = generateCode();
    onChange({
      target: { value: newCode, name: name },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (isCode && retryCode === 0 && !isEditing && !value) {
      const newCode = generateCode();
      onChange({
        target: { value: newCode, name: name },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsEditing(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  // Display logic for number inputs
  const displayValue =
    showNoneForZero && type === "number" && value === 0
      ? "" // Empty string so placeholder will show
      : value;

  return (
    <div className={cn("flex flex-col gap-3 relative", containerClassName)}>
      <Label htmlFor={id} className={cn(labelClassName)}>
        <span className="flex gap-1 items-center">
          {label}{" "}
          {isRequired && <span className="text-lg text-accent-orange">*</span>}
          {showTooltip && (
            <InfoTooltip title={tooltipTitle} subtext={tooltipContent} />
          )}
        </span>
        {isCode && (
          <span className="flex items-center gap-2.5 mr-1">
            <FiEdit3
              className="w-4 h-4 hover:cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            />
            <AiOutlineRedo
              className="w-4 h-4 hover:cursor-pointer transition-transform duration-500 rotate-0"
              style={{
                transform: `rotate(${retryCode * 360}deg)`,
                transition: "transform 0.5s ease-in-out",
              }}
              onClick={handleRetryCode}
            />
          </span>
        )}
      </Label>
      <Input
        id={id}
        name={name}
        placeholder={
          showNoneForZero && type === "number" && value === 0 && !isFocused
            ? "None"
            : placeholder
        }
        className={cn("bg-inputBg border-0", inputClassName)}
        value={displayValue}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        size={size}
        type={type}
        isReadOnly={isCode && !isEditing}
        {...rest}
      />
      <p
        className={cn(
          "text-accent-red text-sm absolute left-1 transition-all duration-300",
          errorMessage
            ? "top-full translate-y-0.5 opacity-100"
            : "opacity-0 top-1/2"
        )}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default LabelledInput;
