import type { InputProps } from "@zeak/react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input as InputBase,
  VStack,
} from "@zeak/react";
import { useField, useFieldArray } from "@zeak/remix-validated-form";
import { forwardRef } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";

type FormArrayProps = InputProps & {
  name: string;
  label?: string;
  isRequired?: boolean;
};

const Array = forwardRef<HTMLInputElement, FormArrayProps>(
  ({ name, label, isRequired, ...rest }, ref) => {
    const [items, { push, remove }, error] = useFieldArray<string>(name);

    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && <FormLabel htmlFor={`${name}`}>{label}</FormLabel>}
        <VStack className="mb-4">
          {items.map((item, index) => (
            <ArrayInput
              autoFocus={index === items.length - 1}
              key={`${item}-${index}`}
              id={`${name}[${index}]`}
              name={`${name}[${index}]`}
              ref={index === 0 ? ref : undefined}
              onRemove={() => remove(index)}
              {...rest}
            />
          ))}
          <Button
            variant="secondary"
            leftIcon={<IoMdAdd />}
            onClick={() => push("")}
          >
            New Option
          </Button>
        </VStack>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  },
);

Array.displayName = "Array";

type ArrayInputProps = InputProps & {
  name: string;
  onRemove: () => void;
};

const ArrayInput = forwardRef<HTMLInputElement, ArrayInputProps>(
  ({ name, onRemove, ...rest }, ref) => {
    const { getInputProps, error } = useField(name);

    return (
      <FormControl isInvalid={!!error} isRequired>
        <HStack className="w-full content-between">
          <InputBase
            ref={ref}
            {...getInputProps({
              id: name,
              ...rest,
            })}
          />
          <IconButton
            variant="ghost"
            aria-label="Remove item"
            icon={<IoMdClose />}
            onClick={onRemove}
          />
        </HStack>

        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  },
);

ArrayInput.displayName = "ArrayInput";

export default Array;
