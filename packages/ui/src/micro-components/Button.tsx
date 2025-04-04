import React, { forwardRef } from "react";
import { cn } from "../utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  spinner?: React.ReactNode;
  isFullWidth?: boolean;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      bgColor,
      textColor,
      leftIcon,
      rightIcon,
      variant = "primary",
      size = "md",
      isLoading = false,
      spinner,
      isFullWidth = false,
      className = "",
      disabled = false,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base style classes
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none";

    // Size classes
    const sizeClasses = {
      sm: "text-xs px-2.5 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
    };

    // Variant classes (background and text colors)
    const variantClasses = {
      primary: "bg-primary hover:bg-primary-dark text-white",
      secondary: "bg-secondary hover:bg-secondary-dark text-white",
      outline:
        "bg-transparent border border-input hover:bg-muted text-foreground",
      ghost: "bg-transparent hover:bg-muted text-foreground",
      destructive: "bg-accent-red hover:bg-red-700 text-white",
      link: "bg-transparent underline-offset-4 hover:underline text-primary p-0 h-auto",
    };

    // Default spinner for loading state
    const defaultSpinner = (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={cn(
          baseClasses,
          sizeClasses[size],
          !bgColor && !textColor && variantClasses[variant],
          isFullWidth && "w-full",
          bgColor, // Custom background color if provided
          textColor, // Custom text color if provided
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            {spinner ? (
              <span className="animate-spin">{spinner}</span>
            ) : (
              defaultSpinner
            )}
            <span className="ml-2">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
