// "use client"

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
} from "react";
import { forwardRef } from "react";
import { MdClose } from "react-icons/md";

import { cn } from "./utils/cn";

type ModalContentProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> &
  VariantProps<typeof ModalContentVariants> & {
    hideCloseBtn?: boolean;
  };

const Modal = DialogPrimitive.Root;

const ModalTrigger = DialogPrimitive.Trigger;

const ModalPortal = DialogPrimitive.Portal;

const ModalClose = DialogPrimitive.Close;

const ModalOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      // 'z-50 fixed h-full w-full left-0 top-0',
      // 'bg-alternative/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      "bg-black/30 backdrop-blur-[1px]",
      "z-50 fixed inset-0 grid place-items-center overflow-y-auto data-open:animate-overlay-show data-closed:animate-overlay-hide",
      className,
    )}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const ModalContentVariants = cva(
  cn(
    "relative z-50 w-full duration-200",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%",
    "data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%]",
    "sm:rounded-[16px] md:w-full",
    "bg-white",
  ),
  {
    variants: {
      size: {
        tiny: `sm:align-middle sm:w-full sm:max-w-xs`,
        small: `sm:align-middle sm:w-full sm:max-w-[480px]`,
        medium: `sm:align-middle sm:w-full sm:max-w-[1318px]`,
        large: `sm:align-middle sm:w-full max-w-xl`,
        xlarge: `sm:align-middle sm:w-full max-w-3xl`,
        xxlarge: `sm:align-middle sm:w-full max-w-6xl`,
        xxxlarge: `sm:align-middle sm:w-full max-w-7xl`,
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

const ModalContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, size, hideCloseBtn = false, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay>
      <DialogPrimitive.Content
        ref={ref}
        className={cn(ModalContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {!hideCloseBtn && (
          <DialogPrimitive.Close className="absolute right-5 top-[21px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground-muted">
            <MdClose className="h-5 w-5" size={20} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </ModalOverlay>
  </ModalPortal>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left py-[16px] pl-[20px] pr-[40px] border-b border-border",
      className,
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full", className)} {...props} />
);
ModalBody.displayName = "ModalBody";

const ModalFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-6",
      className,
    )}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-semibold tracking-wider text-foreground",
      className,
    )}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
};
