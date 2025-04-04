import {
  cn,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Select as SelectBase,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@zeak/react";
import { useControlField, useField } from "@zeak/remix-validated-form";
import { timezones } from "@zeak/utils";
import { MdClose } from "react-icons/md";
import type { SelectProps } from "./Select";
import { RiErrorWarningLine } from "react-icons/ri";

type TimezoneProps = Omit<SelectProps, "options"> & {
  size?: "sm" | "md" | "lg";
  labelClasses?: string;
};

const Timezone = ({
  name,
  label,
  helperText,
  isReadOnly,
  isClearable,
  placeholder,
  labelClasses,
  size,
  ...props
}: TimezoneProps) => {
  const { getInputProps, error, validate } = useField(name);
  const [value, setValue] = useControlField<string | undefined>(name);

  return (
    <FormControl isInvalid={!!error}>
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
          ...(value && { value }),
        })}
        type="hidden"
        name={name}
        id={name}
        // value={value ?? undefined}
      />
      <HStack spacing={1}>
        <SelectBase
          value={value}
          onValueChange={(value) => {
            setValue(value);
            validate();
          }}
          disabled={isReadOnly}
        >
          <SelectTrigger size={size} className="min-w-[160px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {timezones.map(({ label, options }, index: number) => (
              <SelectGroup key={label}>
                <SelectLabel>{label}</SelectLabel>
                {options.map((option, subIndex: number) => (
                  <SelectItem
                    key={`${index} -${subIndex}-${label}-${option.value}`}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </SelectBase>
        {isClearable && !isReadOnly && value && (
          <IconButton
            variant="ghost"
            aria-label="Clear"
            icon={<MdClose />}
            onClick={() => setValue("")}
            size={size === "sm" ? "md" : size}
          />
        )}
      </HStack>

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

Timezone.displayName = "Timezone";

export default Timezone;
