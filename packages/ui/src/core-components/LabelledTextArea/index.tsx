import React, { useRef, useState, forwardRef } from "react";
import { Label } from "../../micro-components/Label";
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

    // Use the forwarded ref if provided, otherwise use the internal ref
    const resolvedRef = (ref ||
      textAreaRef) as React.RefObject<HTMLTextAreaElement>;

    const adjustHeight = () => {
      if (isExpandable && resolvedRef.current) {
        resolvedRef.current.style.height = "auto";
        resolvedRef.current.style.height = `${resolvedRef.current.scrollHeight}px`;
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e);
      if (isExpandable) {
        adjustHeight();
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (isExpandable) {
        setIsExpanded(true);
        adjustHeight();
      }
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (isExpandable) {
        setIsExpanded(false);
        if (resolvedRef.current) {
          resolvedRef.current.style.height = minHeight;
        }
      }
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <div className={cn("flex flex-col gap-3 relative", containerClassName)}>
        <Label
          htmlFor={id}
          className={cn(!isRequired && "h-7", labelClassName)}
        >
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
          className={cn(
            "relative w-full rounded-md overflow-hidden transition-all duration-200",
            isInvalid ? "border border-accent-red" : "border border-input",
            isDisabled && "opacity-50",
            isExpandable && !isExpanded ? `h-[${minHeight}]` : ""
          )}
        >
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
              "w-full resize-none p-3 outline-none text-foreground",
              "bg-inputBg border-0",
              "transition-all duration-200",
              isExpandable
                ? isExpanded
                  ? "overflow-auto"
                  : "overflow-hidden"
                : "min-h-[100px]",
              textareaClassName
            )}
            style={{ minHeight }}
            rows={isExpandable ? 1 : 3}
            {...props}
          />

          {/* Show truncated content when collapsed */}
          {isExpandable && !isExpanded && value && (
            <div
              className={cn(
                "absolute inset-0 p-3 pointer-events-none",
                "whitespace-nowrap overflow-hidden text-ellipsis",
                textareaClassName
              )}
            >
              {value}
            </div>
          )}
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
