import { Slot, Slottable } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cloneElement, forwardRef } from "react";

import { Spinner } from "./Spinner";
import { cn } from "./utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent shadow-sm",
        secondary:
          "border border-input bg-background hover:bg-accent hover:text-accent",
        solid: "bg-primary/25 text-accent hover:bg-primary/35",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        ghost:
          "bg-transparent hover:bg-primary/10 text-accent hover:text-accent/90",
        link: "text-foreground hover:text-foreground underline-offset-4 hover:underline",
        white: "bg-white text-accent hover:bg-white",
        custom: "bg-transparent",
        blue: "text-accent-primary hover:bg-accent-primary hover:text-white",
        warning:
          "bg-[rgba(255,_204,_0,_0.5)] border border-accent-yellow text-accent-darkYellow",
        "outline-primary": "bg-white border border-stroke text-accent-primary",
      },
      size: {
        md: "h-8 rounded-sm text-sm",
        lg: "h-11 rounded-lg text-base",
        xl: "h-[56px]",
      },
      isDisabled: {
        true: "opacity-50 disabled:cursor-not-allowed",
      },
      isLoading: {
        true: "opacity-50 pointer-events-none",
      },
      isIcon: {
        true: "",
        false: "",
      },
      isRound: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    compoundVariants: [
      {
        size: "md",
        isIcon: true,
        class: "w-8 p-2",
      },
      {
        size: "lg",
        isIcon: true,
        class: "w-11 p-2",
      },
      {
        size: "md",
        isIcon: false,
        class: "px-4",
      },
      {
        size: "lg",
        isIcon: false,
        class: "px-6",
      },
      {
        size: "xl",
        isIcon: false,
        class: "px-[44px]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      isRound: false,
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isDisabled?: boolean;
  isIcon?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  isRound?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      variant,
      size,
      isDisabled,
      isIcon = false,
      isLoading,
      isRound = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        {...props}
        className={cn(
          buttonVariants({
            variant,
            size,
            isDisabled,
            isIcon,
            isLoading,
            isRound,
            className,
          }),
        )}
        type={asChild ? undefined : (props.type ?? "button")}
        disabled={isDisabled || props.disabled}
        role={asChild ? undefined : "button"}
        ref={ref}
      >
        {isLoading && <Spinner className="mr-2" />}
        {!isLoading &&
          leftIcon &&
          cloneElement(leftIcon, {
            className: !leftIcon.props?.size
              ? cn("mr-2 h-4 w-4", leftIcon.props.className)
              : cn("mr-2", leftIcon.props.className),
          })}
        <Slottable>{children}</Slottable>
        {rightIcon &&
          cloneElement(rightIcon, {
            className: !rightIcon.props?.size
              ? cn("ml-2 h-4 w-4", rightIcon.props.className)
              : cn("ml-2", rightIcon.props.className),
          })}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button };
