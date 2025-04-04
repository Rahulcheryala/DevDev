import { cn } from "@zeak/react";
import { forwardRef } from "react";

type PasswordStrengthIndicatorProps = {
  variant?: "warning" | "success" | "neutral";
  className?: string;
};

const variantClasses = {
  warning: "bg-accent-orange",
  success: "bg-accent-green",
  neutral: "bg-accent-grayDeep",
};

const PasswordStrengthIndicator = forwardRef<
  HTMLSpanElement,
  PasswordStrengthIndicatorProps
>(({ variant = "neutral", className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "h-[3px] w-full rounded-[40px]",
        variantClasses[variant],
        className,
      )}
      {...props}
    ></span>
  );
});

PasswordStrengthIndicator.displayName = "PasswordStrengthIndicator";

export default PasswordStrengthIndicator;
