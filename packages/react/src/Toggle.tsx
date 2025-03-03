import type { HTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/cn";

// Define Toggle variants using cva
const toggleVariants = cva(
  "relative bg-[hsl(240, 2%, 92%)] inline-flex items-center transition-colors duration-300 cursor-pointer rounded-full",
  {
    variants: {
      size: {
        // lg: "w-14 h-8",
        md: "w-[51px] h-[31px]",
        // sm: "w-10 h-5",
        // xs: "w-8 h-4",
      },
      isDisabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
      isOn: {
        true: "bg-accent-brightGreen",
        false: "bg-gray-300",
      },
    },
    defaultVariants: {
      size: "md",
      isDisabled: false,
      isOn: false,
    },
  },
);

// Define the ball (toggle) inside the switch
const toggleBallVariants = cva(
  "bg-white rounded-full shadow-md transition-transform duration-300",
  {
    variants: {
      size: {
        // lg: "w-7 h-7",
        md: "w-[27px] h-[27px]",
        // sm: "w-4 h-4",
        // xs: "w-3 h-3",
      },
      isOn: {
        true: "translate-x-[calc(100%_-_5px)]",
        false: "translate-x-[2px]",
      },
    },
    defaultVariants: {
      size: "md",
      isOn: false,
    },
  },
);
export interface ToggleProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleVariants> {
  isOn?: boolean;
  label?: string;
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
}

const Toggle = forwardRef<HTMLDivElement, ToggleProps>(
  (
    {
      className,
      label,
      size,
      isDisabled = false,
      isOn = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = useState(isOn);

    const handleToggle = () => {
      if (!isDisabled) {
        setChecked(!checked);
        if (onChange) {
          onChange(!checked);
        }
      }
    };

    return (
      <div className="flex items-center">
        <div
          ref={ref}
          role="switch"
          aria-checked={checked}
          onClick={handleToggle}
          className={cn(
            toggleVariants({ size, isDisabled, isOn: checked, className }),
          )}
          {...props}
        >
          <div className={cn(toggleBallVariants({ size, isOn: checked }))} />
        </div>
        {label && (
          <label className="inline-block ml-2 text-accent-dark font-medium">
            {label}
          </label>
        )}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";

export { Toggle };
