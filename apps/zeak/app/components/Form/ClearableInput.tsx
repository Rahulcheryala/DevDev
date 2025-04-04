import type { InputProps } from "@zeak/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputRightElement,
  cn,
} from "@zeak/react";
import { useControlField, useField } from "@zeak/remix-validated-form";
import type { MutableRefObject, ReactNode } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { MdError } from "react-icons/md";
import { XCloseIcon } from "@zeak/icons";

type FormClearableInputProps = InputProps & {
  name: string;
  label?: string | ReactNode;
  labelClasses?: string;
  clearIconClasses?: string;
  inputClasses?: string;
  isRequired?: boolean;
  domain?: string;
  validateOnChange?: boolean;
  hideClose?: boolean;
  showErrors?: boolean;
  externalErrors?: string[];
  handleExtraErrorOnError?: any;
};

const ClearableInput = forwardRef<HTMLInputElement, FormClearableInputProps>(
  (
    {
      name,
      label,
      labelClasses,
      clearIconClasses,
      inputClasses,
      isRequired,
      domain,
      validateOnChange,
      hideClose = false,
      showErrors = true,
      externalErrors,
      handleExtraErrorOnError,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useControlField<string | number>(name);
    const [isMounted, setIsMounted] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const { getInputProps, error, validate } = useField(name);
    const clearableInputRef: any = ref ?? inputRef;
    const [extraErrors, setExtraErrors] = useState(externalErrors);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      if (isMounted) {
        setInputValue(rest.value as string | number);
        if (validateOnChange) validate();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rest.value]);

    useEffect(() => {
      setExtraErrors(externalErrors);
    }, [externalErrors]);

    const clearInput = (
      inputElementRef: MutableRefObject<HTMLInputElement>,
    ) => {
      if (inputElementRef.current) {
        setInputValue("");

        if (rest.onChange) {
          // Create a new event and cast it to the correct type
          const event = new Event("input", { bubbles: true, cancelable: true });
          Object.defineProperty(event, "target", {
            writable: true,
            value: { value: "" },
          });

          rest.onChange(event as any as React.ChangeEvent<HTMLInputElement>);
        }

        validate();
      }
    };

    const onFormChange = () => {
      if (extraErrors && extraErrors?.length && handleExtraErrorOnError) {
        handleExtraErrorOnError();
      }
    };

    const isFieldInvalid = () => {
      if (error || (Boolean(extraErrors?.length) && showErrors)) {
        return true;
      } else {
        return false;
      }
    };

    return (
      <FormControl
        isInvalid={!!error}
        isRequired={isRequired}
        onChange={onFormChange}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      >
        {label && (
          <FormLabel
            className={cn(
              "text-sm text-skin-baseLight text-left font-normal mb-3",
              labelClasses ? labelClasses : "",
            )}
            htmlFor={name}
          >
            {label}
          </FormLabel>
        )}
        <div className={`relative flex w-full`}>
          <Input
            {...getInputProps({
              id: name,
              ...rest,
              value: inputValue || rest.value,
              isInvalid: isFieldInvalid(),
              onChange: (e) => {
                setInputValue(e.target.value);
                if (rest.onChange) {
                  rest.onChange(e);
                }
              },
            })}
            ref={clearableInputRef}
            type={"text"}
            className={`placeholder:text-tertiary placeholder:font-normal placeholder:leading-[21px] placeholder:tracking-wider placeholder:font-sans ${
              inputValue && inputFocus && !hideClose ? "pr-[42px]" : ""
            } ${inputClasses ? inputClasses : ""}`}
          />
          {inputValue && inputFocus && !hideClose && (
            <InputRightElement className="w-[2.75rem] absolute right-0">
              <IconButton
                aria-label={"clear"}
                icon={<XCloseIcon size="24" />}
                variant="ghost"
                tabIndex={-1}
                onMouseDown={() => clearInput(clearableInputRef)}
                className={cn(
                  "hover:text-destructive p-0",
                  (error || Boolean(extraErrors?.length)) && showErrors
                    ? "text-accent-red"
                    : "text-muted-foreground",
                  clearIconClasses ? clearIconClasses : "",
                )}
              />
            </InputRightElement>
          )}

          {domain ? (
            <div className="text-base font-normal leading-[21px] h-full flex items-center justify-center mr-[10px] translate-x-[-6px]">
              <span>{domain}</span>
            </div>
          ) : null}
        </div>
        <div
          className={`flex ${
            error || Boolean(extraErrors?.length)
              ? "justify-end"
              : "justify-end"
          }`}
        >
          {showErrors &&
            (extraErrors?.length ? (
              <div className="flex absolute left-0 top-[100%_+_8px]">
                <MdError size={20} className="text-accent-red mr-2" />
                <div>
                  {extraErrors.map((error, key) => (
                    <p
                      key={key}
                      className="text-accent-red text-sm tracking-[0.5px] flex items-start"
                    >
                      {error}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              error && (
                <FormErrorMessage className="flex">
                  <MdError size={20} className="mr-2" />
                  {error}
                </FormErrorMessage>
              )
            ))}
        </div>
      </FormControl>
    );
  },
);

ClearableInput.displayName = "ClearableInput";

export default ClearableInput;
