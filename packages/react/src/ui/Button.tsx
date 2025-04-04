import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils/cn"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[8px] h-[56px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-[#0D0844] text-white hover:bg-[#17233A] focus:bg-[#17233A] focus:ring-4 ring-opacity-10 disabled:bg-[#EFF1F4]",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",

                table: "bg-transparent text-[#007AF5] hover:bg-[#D3DFE8] rounded-zeak disabled:bg-[#9BA2AC]",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-transparent text-[#677281] hover:bg-[#D3DFE8] focus:ring-4 ring-opacity-10 ring-gray-400 focus:bg-white disabled:bg-[#9BA2AC]",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-[56px] px-6 py-3",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, leftIcon, rightIcon, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {leftIcon && leftIcon}
                {props.children}
                {rightIcon && rightIcon}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export default Button;