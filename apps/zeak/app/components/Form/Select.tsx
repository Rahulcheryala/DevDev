import {
  cn,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@zeak/react";

import { useControlField, useField } from "@zeak/remix-validated-form";
import { useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { Select as SelectBase } from "~/components";
import type { SelectProps as SelectBaseProps } from "~/components/Select";

export type SelectChangeEvent = {
  value: string;
  label?: string;
  name: string;
};

export type SelectProps = Omit<SelectBaseProps, "onChange"> & {
  name: string;
  label?: string;
  helperText?: string;
  selectedValue?: string;
  labelClasses?: string;
  onChange?: (newValue: SelectChangeEvent | null) => void;
};

const Select = ({
  name,
  label,
  selectedValue,
  helperText,
  labelClasses,
  value,
  ...props
}: SelectProps) => {
  const { getInputProps, error } = useField(name);
  const [_value, setValue] = useControlField<string | undefined>(name);

  const onChange = (value: string) => {
    const selectedValue = props.options.find((o) => o.value === value);
    if (selectedValue) {
      props?.onChange?.({ ...selectedValue, name });
    } else {
      props?.onChange?.(null);
    }
  };

  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue ?? "");
      onChange(selectedValue ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl isInvalid={!!error} className={props.className}>
      {label && (
        <FormLabel
          className={cn(
            "text-[14px] leading-[20px] text-accent mb-[12px]",
            labelClasses ? labelClasses : "",
          )}
          htmlFor={name}
        >
          {label}
        </FormLabel>
      )}
      <input
        {...getInputProps({
          id: name,
        })}
        type="hidden"
        name={name}
        id={name}
        value={_value ?? value}
      />
      <SelectBase
        {...props}
        value={_value ?? value}
        onChange={(newValue) => {
          setValue(newValue ?? "");
          onChange(newValue ?? "");
        }}
        className="w-full text-base bg-card"
      />

      {error ? (
        <FormErrorMessage className="mt-[12px] flex">
          <RiErrorWarningLine size={20} className="mr-2" />
          {error}
        </FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

Select.displayName = "Select";

export default Select;
