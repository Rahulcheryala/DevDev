import { cn } from "@zeak/react";
import { forwardRef } from "react";
import { FiCheck } from "react-icons/fi";

type PasswordHintItemProps = {
  checked?: boolean;
  className?: string;
  content: string;
};

const PasswordHintItem = forwardRef<HTMLLIElement, PasswordHintItemProps>(
  ({ checked = false, content = "", className, ...props }, ref) => {
    return (
      <li ref={ref} className="flex items-center gap-3" {...props}>
        {checked ? (
          <span className="w-2.5 h-2.5 shrink-0 rounded-full text-[8px] flex items-center justify-center text-white bg-accent-green">
            <FiCheck />
          </span>
        ) : (
          <span className="w-1 h-1 shrink-0 rounded-full bg-primary-blue block"></span>
        )}
        <span
          className={cn(
            "text-sm font-light",
            checked ? "line-through text-tertiary" : "text-accent",
          )}
        >
          {content}
        </span>
      </li>
    );
  },
);

PasswordHintItem.displayName = "PasswordHintItem";

export default PasswordHintItem;
