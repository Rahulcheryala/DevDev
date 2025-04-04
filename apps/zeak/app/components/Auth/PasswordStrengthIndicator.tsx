import { cn } from "@zeak/react";
import type { FieldErrors, FieldValues, UseFormWatch } from "react-hook-form";
import { BiX } from "react-icons/bi";
import { useState } from "react";

// Type for errors
type ErrorsType = FieldErrors<FieldValues>;

// Type for watch
type WatchType = UseFormWatch<FieldValues>;

export const PasswordStrengthIndicator = ({
  errors,
  watch,
  className,
}: {
  errors: ErrorsType;
  watch: WatchType;
  className?: string;
}) => {
  const password = watch("password");
  const [visible, setVisible] = useState(true);

  // Check individual password requirements
  const isLengthValid = password && password.length >= 8;
  const hasCapitalLetter = password && /[A-Z]/.test(password);
  const hasLowercaseLetter = password && /[a-z]/.test(password);
  const hasNumber = password && /\d/.test(password);
  const hasSpecialChar = password && /[\W_]/.test(password);

  return (
    <div
      className={cn(
        "absolute -left-[200px] -top-10   p-[32px]  bg-white w-[327px] rounded-[12px] z-50 text-suisse text-[14px]",
        className,
        {
          hidden: !visible,
        },
      )}
    >
      <div className="relative">
        <p>Setup a strong password with at least:</p>
        <BiX
          className="absolute -top-2 -right-2 cursor-pointer h-4 w-4"
          onClick={() => setVisible(!visible)}
        />
      </div>

      <div className="flex my-4 gap-2 ">
        <div
          className={cn(
            "h-1 w-10 rounded-md",
            isLengthValid ? "bg-green-500" : "bg-gray-300",
          )}
        />
        <div
          className={cn(
            "h-1 w-10 rounded-md",
            hasCapitalLetter ? "bg-green-500" : "bg-gray-300",
          )}
        />
        <div
          className={cn(
            "h-1 w-10 rounded-md",
            hasLowercaseLetter ? "bg-green-500" : "bg-gray-300",
          )}
        />
        <div
          className={cn(
            "h-1 w-10 rounded-md",
            hasSpecialChar ? "bg-green-500" : "bg-gray-300",
          )}
        />
        <div
          className={cn(
            "h-1 w-10 rounded-md",
            hasNumber ? "bg-green-500" : "bg-gray-300",
          )}
        />
      </div>

      <ul className="space-y-1 text-[14px] font-suisse ">
        <li className="flex items-center gap-2">
          <div
            className={cn("rounded-full  w-1 h-1", {
              "bg-green-600": isLengthValid,
              "bg-gray-300": !isLengthValid,
            })}
          ></div>
          <span
            className={cn("", {
              "line-through text-gray-500": isLengthValid,
            })}
          >
            8 characters
          </span>
        </li>
        <li className="flex items-center gap-2">
          <div
            className={cn("rounded-full  w-1 h-1", {
              "bg-green-600": hasCapitalLetter,
              "bg-gray-300": !hasCapitalLetter,
            })}
          ></div>
          <span
            className={cn("", {
              "line-through text-gray-500": hasCapitalLetter,
            })}
          >
            Upper case letter
          </span>
        </li>
        <li className="flex items-center gap-2">
          <div
            className={cn("rounded-full  w-1 h-1", {
              "bg-green-600": hasLowercaseLetter,
              "bg-gray-300": !hasLowercaseLetter,
            })}
          ></div>
          <span
            className={cn("", {
              "line-through text-gray-500": hasLowercaseLetter,
            })}
          >
            Lower case letter
          </span>
        </li>
        <li className="flex items-center gap-2">
          <div
            className={cn("rounded-full  w-1 h-1", {
              "bg-green-600": hasSpecialChar,
              "bg-gray-300": !hasSpecialChar,
            })}
          ></div>
          <span
            className={cn("", {
              "line-through text-gray-500": hasSpecialChar,
            })}
          >
            1 Special character - !@#$%^&*()_-+=
          </span>
        </li>
        <li className="flex items-center gap-2">
          <div
            className={cn("rounded-full  w-1 h-1", {
              "bg-green-600": hasNumber,
              "bg-gray-300": !hasNumber,
            })}
          ></div>
          <span
            className={cn("", {
              "line-through text-gray-500": hasNumber,
            })}
          >
            1 number
          </span>
        </li>
      </ul>
    </div>
  );
};
