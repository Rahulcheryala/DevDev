import type { InputProps } from "@zeak/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputRightElement,
} from "@zeak/react";
import { useField } from "@zeak/remix-validated-form";
import type { MutableRefObject } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { IoIosInformationCircleOutline, IoMdClose } from "react-icons/io";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator";
import PasswordHintItem from "../PasswordHintItem";
import { MdError } from "react-icons/md";
import { WebEyeClosed, WebEye, XCloseIcon } from "@zeak/icons";

type FormPasswordProps = InputProps & {
  name: string;
  label?: string;
  isRequired?: boolean;
  rightBottomElement?: JSX.Element;
  externalErrors?: string[];
  handleExtraErrorOnError?: any;
  showPasswordHelper?: boolean;
  showInfoIcon?: boolean;
};

const Password = forwardRef<HTMLInputElement, FormPasswordProps>(
  (
    {
      name,
      label,
      isRequired,
      rightBottomElement,
      externalErrors,
      handleExtraErrorOnError,
      showPasswordHelper = false,
      showInfoIcon = false,
      ...rest
    },
    ref,
  ) => {
    let { getInputProps, error, validate } = useField(name);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [helperMenuVisible, setHelperMenuVisible] =
      useState(showPasswordHelper);
    const [extraErrors, setExtraErrors] = useState(externalErrors);
    const [distance, setDistance] = useState({ top: 0, left: 0 });

    useEffect(() => {
      setExtraErrors(externalErrors);
    }, [externalErrors]);

    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const clearablePasswordInputRef: any = ref ?? inputRef;

    const clearInput = (
      inputElementRef: MutableRefObject<HTMLInputElement>,
    ) => {
      if (inputElementRef.current) {
        inputElementRef.current.value = "";
        validate();
      }
    };

    const onFormChange = () => {
      if (extraErrors && extraErrors?.length && handleExtraErrorOnError) {
        handleExtraErrorOnError();
      }
    };

    const updateDistance = () => {
      const element = clearablePasswordInputRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollLeft = window.scrollX;

        setDistance({
          top: rect.top,
          left: rect.left + scrollLeft,
        });
      }
    };

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        updateDistance();
      }, 100);

      const container = document.getElementById("project-x-layout");
      if (container) {
        const handleResize = (): void => updateDistance();
        const handleScroll = (): void => updateDistance();

        container.addEventListener("resize", handleResize);
        container.addEventListener("scroll", handleScroll);

        return () => {
          container.removeEventListener("resize", handleResize);
          container.removeEventListener("scroll", handleScroll);
          clearTimeout(timeoutId);
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isFieldInvalid = () =>
      error || (!!extraErrors && !!extraErrors.length);

    return (
      <FormControl
        isInvalid={!!error}
        isRequired={isRequired}
        onChange={onFormChange}
        className="relative"
      >
        {label && (
          <FormLabel
            className="text-sm text-accent mb-3 flex items-center gap-2"
            htmlFor={name}
          >
            <span>{label}</span>
            {showInfoIcon && (
              <button type="button">
                <IoIosInformationCircleOutline className="text-tertiary" />
              </button>
            )}
          </FormLabel>
        )}
        <div className={`relative flex w-full`}>
          {/* error || (!!extraErrors && !!extraErrors.length) */}
          <Input
            {...getInputProps({
              id: name,
              ...rest,
              isInvalid: isFieldInvalid(),
              onChange: (e) => {
                setInputValue(e.target.value);
                if (showPasswordHelper && !helperMenuVisible)
                  setHelperMenuVisible(true);
                if (rest.onChange) {
                  rest.onChange(e);
                }
              },
            })}
            ref={clearablePasswordInputRef}
            type={passwordVisible ? "text" : "password"}
            className={`${inputValue ? "pr-[84px]" : "pr-[52px]"}`}
          />
          <InputRightElement className="w-[87px] pr-0 absolute right-0">
            <IconButton
              aria-label={passwordVisible ? "Show password" : "Hide password"}
              icon={
                passwordVisible ? (
                  <WebEye size="20" />
                ) : (
                  <WebEyeClosed size="20" />
                )
              }
              variant="ghost"
              tabIndex={-1}
              onClick={() => {
                setPasswordVisible(!passwordVisible);
              }}
              className="hover:bg-transparent p-0"
            />
            {inputValue && (
              <IconButton
                aria-label={"clear"}
                icon={<XCloseIcon size="20" />}
                variant="ghost"
                tabIndex={-1}
                onClick={() => clearInput(clearablePasswordInputRef)}
                className={`p-0 ${
                  error || (!!extraErrors && !!extraErrors.length)
                    ? "text-accent-red"
                    : "text-muted-foreground"
                }`}
              />
            )}
          </InputRightElement>
        </div>

        {helperMenuVisible ? (
          <PasswordStrengthHelperIndicator
            closePopup={() => setHelperMenuVisible(false)}
            password={inputRef.current?.value ?? ""}
            distance={distance}
          />
        ) : null}
        {/* {error && (
        <FormErrorMessage className='mt-[12px] flex'>
          <RiErrorWarningLine size={20} className='mr-2' />
          {error}
        </FormErrorMessage>
      )} */}
        <div
          className={`flex mt-3 ${
            error || (!!extraErrors && !!extraErrors.length)
              ? "justify-end"
              : "justify-end"
          }`}
        >
          {!!extraErrors && !!extraErrors.length ? (
            <div className="flex absolute left-0 top-[100%_+12px]">
              <MdError size={20} className="mr-2" />
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
            !!error && (
              <FormErrorMessage className="flex top-[100%_+_0]">
                <MdError size={20} className="mr-2" /> {error}
              </FormErrorMessage>
            )
          )}

          <div>{rightBottomElement}</div>
        </div>
      </FormControl>
    );
  },
);

Password.displayName = "Password";

type PasswordCriteria = {
  minLength?: number;
  upperCase?: boolean;
  lowerCase?: boolean;
  digit?: boolean;
  specialChar?: boolean;
};

const defaultCriteria: PasswordCriteria = {
  minLength: 8,
  upperCase: true,
  lowerCase: true,
  digit: true,
  specialChar: true,
};

type Distance = {
  top: number;
  left: number;
};

const PasswordStrengthHelperIndicator = ({
  password,
  criteria = defaultCriteria,
  closePopup,
  distance,
}: {
  password: string;
  criteria?: PasswordCriteria;
  closePopup: () => void;
  distance: Distance;
}) => {
  const criteriaChecks = {
    minLength: password.length >= (criteria.minLength || 0),
    upperCase: criteria.upperCase ? /[A-Z]/.test(password) : true,
    lowerCase: criteria.lowerCase ? /[a-z]/.test(password) : true,
    digit: criteria.digit ? /\d/.test(password) : true,
    specialChar: criteria.specialChar
      ? /[!@#$%^&*()_\-+=]/.test(password)
      : true,
  };

  return (
    <>
      <div
        className="hidden lg:block border border-stroke fixed shadow-4xl bg-white text-sm font-light rounded-md w-[337px] p-8 after:absolute after:top-1/4 after:left-[calc(100%-6px)] after:-mt-2 after:h-[14px] after:w-[14px] after:bg-white after:border-r after:border-t after:border-r-stroke after:border-t-stroke after:rotate-45 z-[9999]"
        style={{
          left: `${distance.left - 360}px`,
          top: `${distance.top - 40}px`,
        }}
      >
        <button
          className="absolute top-[18px] right-[18px]"
          type="button"
          onClick={closePopup}
        >
          <IoMdClose size={20} />
        </button>
        <div className="">
          Setup a strong password <br />
          with at least
        </div>
        <div className="flex items-center gap-5 mt-2.5">
          {criteria.minLength && (
            <PasswordStrengthIndicator
              variant={criteriaChecks.minLength ? "success" : "neutral"}
            />
          )}
          {criteria.upperCase && (
            <PasswordStrengthIndicator
              variant={criteriaChecks.upperCase ? "success" : "neutral"}
            />
          )}
          {criteria.lowerCase && (
            <PasswordStrengthIndicator
              variant={criteriaChecks.lowerCase ? "success" : "neutral"}
            />
          )}
          {criteria.specialChar && (
            <PasswordStrengthIndicator
              variant={criteriaChecks.specialChar ? "success" : "neutral"}
            />
          )}
          {criteria.digit && (
            <PasswordStrengthIndicator
              variant={criteriaChecks.digit ? "success" : "neutral"}
            />
          )}
        </div>

        <ul className="password__hints_container flex flex-col gap-2 mt-4">
          {criteria.minLength && (
            <PasswordHintItem
              content="8 character"
              checked={criteriaChecks.minLength}
            />
          )}
          {criteria.upperCase && (
            <PasswordHintItem
              content="Upper case letter"
              checked={criteriaChecks.upperCase}
            />
          )}
          {criteria.lowerCase && (
            <PasswordHintItem
              content="Lower case letter"
              checked={criteriaChecks.lowerCase}
            />
          )}
          {criteria.specialChar && (
            <PasswordHintItem
              content="1 Special character - !@#$%^&*()_-+="
              checked={criteriaChecks.specialChar}
            />
          )}
          {criteria.digit && (
            <PasswordHintItem
              content="1 number"
              checked={criteriaChecks.digit}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default Password;
