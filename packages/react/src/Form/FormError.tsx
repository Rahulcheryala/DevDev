import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { FormControlOptions } from "./FormControl";
import { useFormControlContext } from "./FormControl";

export interface FormErrorMessageProps
  extends ComponentProps<"div">,
    FormControlOptions {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FormErrorMessage = forwardRef<
  HTMLDivElement,
  FormErrorMessageProps
>((props, ref) => {
  const field = useFormControlContext();

  if (!field?.isInvalid) return null;

  return (
    <div
      {...field?.getErrorMessageProps(props, ref)}
      className={cn(
        "text-accent-red text-sm tracking-[0.5px] flex items-start absolute top-[calc(100%_+_8px)] left-0",
        props.className,
      )}
    />
  );
});

FormErrorMessage.displayName = "FormErrorMessage";
