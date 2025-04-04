import { cva, type VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
} from "react";
import { forwardRef } from "react";
import { MdClose } from "react-icons/md";

import { cn } from "./utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-3 py-1 h-7 text-sm tracking-[0.5px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        green: "border-transparent bg-[#dff8e2] text-accent-darkGreen",
        greenishBlue:
          "border-transparent bg-[hsl(var(--greenish-blue),_0.09)] text-accent-greenishBlue",
        yellow: "border-transparent bg-yellow-100 text-yellow-800",
        warning:
          "border-transparent bg-[hsl(var(--accent-yellow),_0.09)] text-accent-accentYellow",
        orange: "border-transparent bg-orange-100 text-orange-800",
        red: "border-transparent bg-red-100 text-red-800",
        blue: "border-transparent bg-blue-100 text-blue-800",
        gray: "border-transparent bg-[#e1e3e6] text-textLink hover:bg-[#e1e3e6]",
        muted: "border-transparent bg-[rgba(142,_142,_147,_0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

const BadgeCloseButton = forwardRef<
  ElementRef<"button">,
  ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    className={cn(
      "ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      className,
    )}
    {...props}
  >
    <MdClose className="h-3 w-3 text-muted-foreground hover:text-foreground" />
  </button>
));
BadgeCloseButton.displayName = "BadgeCloseButton";
export { Badge, BadgeCloseButton, badgeVariants };
