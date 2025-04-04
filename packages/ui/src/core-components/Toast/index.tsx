import React from "react";
import { Toaster as Sonner, toast as sonnerToast } from "sonner";
import { GoCheckCircleFill } from "react-icons/go";
import { BiSolidErrorCircle, BiSolidMessageError } from "react-icons/bi";
import { HiExclamationTriangle } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { cn } from "../../utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

type ToastAction = {
  label: string;
  onClick: () => void;
};

type ToastType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "errorWithColoredActions";

interface CustomToastOptions {
  actions?: ToastAction[];
  duration?: number;
  dismissible?: boolean;
}

// Get the icon component based on toast type
const getToastIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <GoCheckCircleFill className="h-8 w-8 text-[#16ca61]" />;
    case "error":
      return <BiSolidErrorCircle className="h-8 w-8 text-[#D11149]" />;
    case "info":
      return <BiSolidMessageError className="h-8 w-8 text-[#0d77d3]" />;
    case "warning":
      return <HiExclamationTriangle className="h-8 w-8 text-[#FDB404]" />;
    case "errorWithColoredActions":
      return <BiSolidErrorCircle className="h-8 w-8 text-[#D11149]" />;
    default:
      return <GoCheckCircleFill className="h-8 w-8 text-[#D11149]" />;
  }
};

const option1styles = "bg-[#0D0844] hover:bg-navy-800 text-white";
const option2styles = "bg-white hover:bg-gray-100 text-text-dark";

// Get styles based on toast type
const getToastStyles = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        background: "bg-[linear-gradient(96deg,_#C2FFDB_0%,_#74FFAE_100%)]",
        primaryBtnBg: option1styles,
        secondaryBtnBg: option2styles,
      };
    case "error":
      return {
        background: "bg-[linear-gradient(94deg,_#FFD7EF_3.6%,_#FF93D2_100%)]",
        primaryBtnBg: option1styles,
        secondaryBtnBg: option2styles,
      };
    case "info":
      return {
        background: "bg-[linear-gradient(94deg,_#C9F3FF_3.6%,_#46D4FF_100%)]",
        primaryBtnBg: option1styles,
        secondaryBtnBg: option2styles,
      };
    case "warning":
      return {
        background: "bg-[linear-gradient(94deg,_#FFFCBE_3.6%,_#FFF871_100%)]",
        primaryBtnBg: option1styles,
        secondaryBtnBg: option2styles,
      };
    case "errorWithColoredActions":
      return {
        background: "bg-white",
        primaryBtnBg: "bg-accent-brightGreen text-white",
        secondaryBtnBg: "bg-accent-pink3 text-white",
      };
    default:
      return {
        background: "bg-white",
        primaryBtnBg: "bg-green-500 text-white",
        secondaryBtnBg: "bg-red-500 text-white",
      };
  }
};

// Modified toast function with standalone title and description
const createToast =
  (type: ToastType) =>
    (title: string, description: string, options?: CustomToastOptions) => {
      const {
        actions = [],
        duration = 5000,
        dismissible = true,
      } = options || {};

      // Limit actions to max 2
      const visibleActions = actions.slice(0, 2);

      // Get styles based on toast type
      const styles = getToastStyles(type);

      return sonnerToast.custom(
        (id) => (
          <div className="flex min-w-[746px] items-center gap-4">
            <div
              className={cn(
                "flex justify-between items-center gap-x-4 ps-4 pe-5 py-6 rounded-zeak w-full shadow-[0px_0px_15px_0px_rgba(161,182,193,0.4)]",
                styles.background
              )}
            >
              <div className="flex-shrink-0">{getToastIcon(type)}</div>

              <div className="flex-1 flex justify-between items-center gap-x-16">
                <div className="flex flex-col items-start">
                  {title && (
                    <div className="font-semibold text-accent-dark">{title}</div>
                  )}
                  {description && (
                    <div className="font-normal text-sm text-text-dark">
                      {description}
                    </div>
                  )}
                </div>

                {visibleActions.length > 0 && (
                  <div className="flex justify-end items-center gap-4">
                    {visibleActions.map((action, index) => {
                      // For errorWithColoredActions, use index-based styling
                      if (type === "errorWithColoredActions") {
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              action.onClick();
                              sonnerToast.dismiss(id);
                            }}
                            className={cn(
                              "w-40 h-14 min-w-[160px] max-w-[600px] truncate px-6 py-4 rounded-md font-medium transition-colors",
                              index === 0
                                ? styles.primaryBtnBg
                                : styles.secondaryBtnBg
                            )}
                          >
                            {action.label}
                          </button>
                        );
                      }

                      // For other toast types, first item is primary by default
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            action.onClick();
                            sonnerToast.dismiss(id);
                          }}
                          className={cn(
                            "w-40 h-14 min-w-[160px] max-w-[600px] truncate px-6 py-4 rounded-md font-medium transition-colors",
                            index === 0
                              ? styles.primaryBtnBg
                              : styles.secondaryBtnBg
                          )}
                        >
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {dismissible && (
              <button
                onClick={() => sonnerToast.dismiss(id)}
                className="text-[#9BA2AC] hover:text-gray-700 flex-shrink-0"
                aria-label="Close"
              >
                <IoClose className="h-5 w-5" />
              </button>
            )}
          </div>
        ),
        { duration }
      );
    };

// Create the final toast object with the new API
const toast = {
  ...sonnerToast,
  success: createToast("success"),
  error: createToast("error"),
  info: createToast("info"),
  warning: createToast("warning"),
  errorWithColoredActions: createToast("errorWithColoredActions")
};

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <div className="relative">
      <Sonner
        className="toaster group"
        offset={10}
        position="bottom-right"
        visibleToasts={3}
        expand={false}
        toastOptions={{
          duration: 5000,
          className: "overflow-hidden right-0",
        }}
        {...props}
      />
    </div>
  );
};

export { Toaster, toast };
