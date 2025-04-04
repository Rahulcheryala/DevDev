import React, { useRef, useState, forwardRef, useEffect } from "react";
import Label from "../../micro-components/Label-cpy";
import InfoTooltip from "../ToolTip";
import { cn } from "../../utils";

export interface LabeledTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  name: string;
  value: string;
  isRequired?: boolean;
  showTooltip?: boolean;
  tooltipTitle?: string;
  tooltipContent?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  minHeight?: string;
  isExpandable?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const LabeledTextArea = forwardRef<
  HTMLTextAreaElement,
  LabeledTextAreaProps
>(
  (
    {
      label,
      id,
      name,
      value,
      isRequired = false,
      showTooltip = false,
      tooltipTitle = "",
      tooltipContent = "",
      errorMessage = "",
      isInvalid = false,
      isDisabled = false,
      containerClassName = "",
      labelClassName = "",
      textareaClassName = "",
      minHeight = "56px",
      isExpandable = true,
      placeholder = "Type something...",
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Use the forwarded ref if provided, otherwise use the internal ref
    const resolvedRef = (ref ||
      textAreaRef) as React.RefObject<HTMLTextAreaElement>;

    // Calculate numeric minHeight value
    const numericMinHeight = parseInt(minHeight.replace(/\D/g, ""));

    // Automatically adjust height on value changes
    useEffect(() => {
      if (isExpandable && resolvedRef.current) {
        if (isExpanded) {
          adjustHeight();
        } else {
          resolvedRef.current.style.height = minHeight;
        }
      }
    }, [value, isExpanded]);

    const adjustHeight = () => {
      if (isExpandable && resolvedRef.current) {
        // Save scroll position
        const scrollTop = resolvedRef.current.scrollTop;

        // Reset height to auto to get accurate scrollHeight
        resolvedRef.current.style.height = "auto";

        // Calculate new height
        const newHeight = Math.max(
          resolvedRef.current.scrollHeight,
          numericMinHeight
        );

        // Apply new height
        resolvedRef.current.style.height = `${newHeight}px`;

        // Restore scroll position
        resolvedRef.current.scrollTop = scrollTop;
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (isExpandable) {
        setIsExpanded(true);
      }
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (isExpandable) {
        setIsExpanded(false);
      }
      if (onBlur) {
        onBlur(e);
      }
    };

    // Helper function to generate display text with ellipsis if needed
    const truncateWithEllipsis = (text: string) => {
      const maxChars = 50; // Adjust as needed for your design
      if (text.length > maxChars) {
        return text.substring(0, maxChars) + "...";
      }
      return text;
    };

    return (
      <div className={cn("flex flex-col gap-3 relative", containerClassName)}>
        <Label htmlFor={id} className={cn("h-7", labelClassName)}>
          <span>
            {label}{" "}
            {isRequired && (
              <span className="text-lg text-accent-orange">*</span>
            )}
          </span>
          {showTooltip && (
            <InfoTooltip title={tooltipTitle} subtext={tooltipContent} />
          )}
        </Label>

        <div
          ref={wrapperRef}
          className={cn(
            "relative w-full transition-all duration-150 ease-in-out bg-inputBg rounded-md",
            isInvalid && "border border-accent-red",
            isDisabled && "opacity-50"
          )}
          style={{
            height: isExpanded ? "auto" : minHeight,
          }}
        >
          {/* Visual overlay for when collapsed - shows truncated text with ellipsis */}
          {isExpandable && !isExpanded && (
            <div className="absolute top-0 left-0 right-0 bottom-0 p-4 pointer-events-none text-accent-dark truncate whitespace-nowrap overflow-hidden bg-inputBg  rounded-md">
              <span className="text-gray-400">
                {!value && placeholder}
              </span>
              {truncateWithEllipsis(value)}
            </div>
          )}

          <textarea
            id={id}
            name={name}
            ref={resolvedRef}
            value={value}
            disabled={isDisabled}
            onChange={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(
              "w-full resize-none p-4 outline-none text-accent-dark placeholder:pt-0.5 bg-inputBg border-0 rounded-md",
              "transition-all duration-150 ease-in-out hide-scrollbar",
              isExpandable && isExpanded ? "opacity-100" : "opacity-0",
              isExpandable ? "overflow-auto" : "min-h-[100px]",
              textareaClassName
            )}
            style={{
              minHeight,
              height: isExpanded ? "auto" : minHeight,
            }}
            rows={isExpandable ? 1 : 3}
            {...props}
          />
        </div>

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
  }
);

LabeledTextArea.displayName = "LabeledTextArea";

export default LabeledTextArea;
