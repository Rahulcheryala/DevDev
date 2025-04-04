import type { ReactElement } from "react";
import { cloneElement, forwardRef, isValidElement } from "react";

import type { ButtonProps } from "./Button";
import { Button } from "./Button";

export interface IconButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
  "aria-label": string;
  icon: ReactElement;
  isRound?: boolean;
  tooltipText?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, "aria-label": ariaLabel, isRound, tooltipText, children, ...props },
    ref,
  ) => {
    /**
     * Passing the icon as prop or children should work
     */
    const element = icon || children;
    const _children = isValidElement(element)
      ? cloneElement(element as any, {
          "aria-hidden": true,
          focusable: false,
          className: "w-5 h-5",
        })
      : null;

    return (
      <Button
        className="inline-block relative group"
        aria-label={ariaLabel}
        ref={ref}
        isIcon
        isRound={isRound}
        {...props}
      >
        {_children}
        {tooltipText && (
          <span
            id="tooltip-right"
            role="tooltip"
            className="absolute hidden mt-2 left-50% top-full -translate-x-1/2 z-10  group-hover:inline-flex max-w-[223px] w-[max-content] whitespace-normal group-hover:group-opacity-1 p-3 text-xs font-normal text-white bg-accent-dark rounded-lg shadow-sm tooltip"
          >
            {tooltipText}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-[6px] border-t-transparent  border-b-accent-dark border-r-transparent border-l-transparent"></span>
          </span>
        )}
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton };
