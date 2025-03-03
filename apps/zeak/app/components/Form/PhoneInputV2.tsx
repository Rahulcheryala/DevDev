import type { ForwardRefExoticComponent, MutableRefObject } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import "intl-tel-input/build/css/intlTelInput.css";
import type { InputProps } from "@zeak/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputRightElement,
} from "@zeak/react";
import { useField, useControlField } from "@zeak/remix-validated-form";
import type { Iti } from "intl-tel-input";
import { RiErrorWarningLine } from "react-icons/ri";
import { XCloseIcon } from "@zeak/icons";

type IntlPhoneInputProps = InputProps & {
  name: string;
  label?: string;
  isRequired?: boolean;
  onPhoneNumberChange?: (value: string) => void;
  defaultValue?: string;
  hideClose?: boolean;
  isReadOnly?: boolean;
  validateOnChange?: boolean;
};

const PhoneInputV2: ForwardRefExoticComponent<IntlPhoneInputProps> = forwardRef<
  HTMLInputElement,
  IntlPhoneInputProps
>(
  (
    {
      name,
      label,
      isRequired,
      defaultValue,
      onPhoneNumberChange,
      validateOnChange = false,
      hideClose = false,
      ...rest
    },
    ref,
  ) => {
    const inputItiRef = useRef<HTMLInputElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const { getInputProps, error, validate } = useField(name);
    const [controlValue, setControlValue] = useControlField<string>(name);
    const [intlPhoneNumber, setIntlPhoneNumber] = useState(defaultValue ?? "");
    const [isMounted, setIsMounted] = useState(false);
    const [isOnceBlurred, setIsOnceBlurred] = useState(false);
    const inputRef: any = ref ?? inputItiRef;
    const iti = useRef<Iti | null>(null);

    const inputProps = getInputProps({
      id: name,
      ...rest,
    });

    useEffect(() => {
      if (isMounted) {
        setControlValue(intlPhoneNumber);
        onPhoneNumberChange?.(intlPhoneNumber);
        (isOnceBlurred || validateOnChange) && validate();
      }
    }, [
      intlPhoneNumber,
      isMounted,
      setControlValue,
      isOnceBlurred,
      onPhoneNumberChange,
      validateOnChange,
      validate,
    ]);

    useEffect(() => {
      const loadIntlTelInput = async () => {
        const intlTelInput = (
          await import("intl-tel-input/intlTelInputWithUtils")
        ).default;
        iti.current = intlTelInput(inputRef.current!, {
          separateDialCode: true,
          initialCountry: "us",
          strictMode: true,
        });

        if (defaultValue && iti.current) {
          iti.current.setNumber(defaultValue);
          setIntlPhoneNumber(iti.current.getNumber());
        }

        const handleChange = () => {
          if (iti.current) {
            const number = iti.current.getNumber();
            setIntlPhoneNumber(number);
            hiddenInputRef.current?.blur();
          }
        };

        inputRef.current!.addEventListener("countrychange", handleChange);
        inputRef.current!.addEventListener("input", handleChange);
        inputRef.current!.addEventListener("blur", () => {
          setIsOnceBlurred(true);
        });

        setIsMounted(true);
        return () => {
          inputRef.current!.removeEventListener("countrychange", handleChange);
          inputRef.current!.removeEventListener("input", handleChange);
          iti.current?.destroy();
        };
      };

      loadIntlTelInput();
    }, [defaultValue, inputRef]);

    const clearInput = (
      inputElementRef: MutableRefObject<HTMLInputElement>,
    ) => {
      if (inputElementRef.current) {
        inputRef.current.value = "";
        setControlValue("");
        setIntlPhoneNumber("");
        validate();
      }
    };

    const isFieldInvalid = () => !!error;

    return (
      <FormControl
        isInvalid={!!error}
        isRequired={isRequired}
        className={`relative ${rest?.isReadOnly ? "disabled" : ""}`}
      >
        {label && (
          <FormLabel
            className="text-[14px] leading-[20px] text-accent mb-[12px]"
            htmlFor={name}
          >
            {label}
          </FormLabel>
        )}
        <div className={`relative flex w-full`}>
          <Input
            ref={inputRef}
            type="tel"
            placeholder="Enter phone number"
            className={`w-full !pl-3 bg-white ${
              controlValue && !hideClose ? "pr-[42px]" : ""
            }`}
            isInvalid={isFieldInvalid()}
            // style={{ width: "100%", padding: "10px", margin: "10px 0" }}
            {...rest}
          />

          {controlValue && !hideClose && (
            <InputRightElement className="w-[2.75rem] h-[54px] absolute right-0">
              <IconButton
                aria-label={"clear"}
                icon={<XCloseIcon size="24" />}
                variant="ghost"
                tabIndex={-1}
                onClick={() => clearInput(inputRef)}
                className="p-0 hover:bg-transparent hover:text-destructive text-[#D11149]"
              />
            </InputRightElement>
          )}
        </div>
        {error && (
          <FormErrorMessage className="mt-[12px] flex">
            <RiErrorWarningLine size={20} className="mr-2" />
            {error}
          </FormErrorMessage>
        )}
        <Input
          ref={hiddenInputRef}
          type="hidden"
          {...inputProps}
          value={controlValue}
        />
      </FormControl>
    );
  },
);

PhoneInputV2.displayName = "PhoneInputV2";

export default PhoneInputV2;
