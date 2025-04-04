import type { InputProps } from "@zeak/react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as InputBase,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@zeak/react";
import { useField } from "@zeak/remix-validated-form";
import { forwardRef } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

type FormInputProps = InputProps & {
  name: string;
  label?: string;
  isRequired?: boolean;
  helperText?: string;
  prefix?: string;
  suffix?: string;
};

const Input = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, isRequired, helperText, prefix, suffix, ...rest }, ref) => {
    const { getInputProps, error } = useField(name);

    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && (
          <FormLabel
            className="text-[14px] leading-[20px] text-accent mb-[12px]"
            htmlFor={name}
          >
            {label}
          </FormLabel>
        )}
        {prefix || suffix ? (
          <InputGroup>
            {prefix && <InputLeftAddon children={prefix} />}
            <InputBase
              ref={ref}
              {...getInputProps({
                id: name,
                ...rest,
              })}
            />
            {suffix && <InputRightAddon children={suffix} />}
          </InputGroup>
        ) : (
          <InputBase
            ref={ref}
            {...getInputProps({
              id: name,
              ...rest,
            })}
          />
        )}

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {error && (
          <FormErrorMessage className="mt-[12px] flex">
            <RiErrorWarningLine size={20} className="mr-2" />
            {error}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  },
);

Input.displayName = "Input";

export default Input;
