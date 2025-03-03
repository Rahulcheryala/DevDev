import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "./utils/cn";

const tagsVariants = cva(
  "inline-flex items-center rounded-[24px] px-[10px] py-[2px] h-[24px] text-[12px] tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-[#F0F5FF] text-[#2F54EB]",
        green: "bg-[#F6FFED] text-[#04A777]",
        orange: "bg-[#FFF7E6] text-[#FA8C16]",
        destructive: "bg-[#FFF1F0] text-[#D11149]",
        secondary: "bg-secondary text-secondary hover:bg-secondary/80",
        outline: "text-foreground",
        red: "bg-red-100 text-red-800",
        blue: "bg-blue-100 text-blue-800",
        gray: "bg-muted hover:bg-muted/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TagsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagsVariants> {}

function Tags({ className, variant, ...props }: TagsProps) {
  return (
    <div className={cn(tagsVariants({ variant }), className)} {...props} />
  );
}

export { Tags, tagsVariants };
