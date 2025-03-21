import type { ButtonProps } from "@zeak/react";
import { Button } from "@zeak/react";
import { useIsSubmitting } from "@zeak/remix-validated-form";
import { forwardRef } from "react";

type SubmitProps = ButtonProps & { formId?: string; text?: string };

export const Submit = forwardRef<HTMLButtonElement, SubmitProps>(
  ({ formId, children, isDisabled, ...props }, ref) => {
    const isSubmitting = useIsSubmitting(formId);
    return (
      <Button
        ref={ref}
        form={formId}
        type="submit"
        disabled={isDisabled || isSubmitting}
        isLoading={isSubmitting}
        isDisabled={isDisabled || isSubmitting}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
Submit.displayName = "Submit";
export default Submit;
