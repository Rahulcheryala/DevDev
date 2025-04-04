import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "./utils/cn";

const alertVariants = cva(
  "relative w-full rounded-[10px] p-[16px] [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-[16px] [&>svg]:top-[16px] [&>svg]:text-foreground min-h-[56px] flex flex-col justify-center",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning: "text-secondary [&>svg]:text-warning bg-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("m-0 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
