import type { InputProps } from "@zeak/react";
import { FormControl, FormErrorMessage, Input as InputBase } from "@zeak/react";
import { useField } from "@zeak/remix-validated-form";
import { forwardRef } from "react";

type HiddenProps = InputProps & {
  name: string;
  value?: string | number;
};

const Hidden = forwardRef<HTMLInputElement, HiddenProps>(
  ({ name, value, ...rest }, ref) => {
    const { getInputProps, error } = useField(name);

    return (
      <FormControl isInvalid={!!error} className="hidden">
        <InputBase
          ref={ref}
          {...getInputProps({
            id: name,
            ...rest,
          })}
          value={value}
          type="hidden"
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  },
);

Hidden.displayName = "Hidden";

export default Hidden;
