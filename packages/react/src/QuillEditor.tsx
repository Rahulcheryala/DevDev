import type { HTMLAttributes } from "react";
import React, { forwardRef, useState, Suspense } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/cn";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuill = React.lazy(() => import("react-quill"));

// Define editor variants using cva
const editorVariants = cva(
  "border  custom-quill rounded-lg transition-all duration-300 bg-white border-stroke-primary",
  {
    variants: {
      size: {
        // lg: "h-96 p-4 text-lg",
        md: "h-[250px] py-1 px-3 text-md",
        // sm: "h-48 p-2 text-sm",
      },
      isDisabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-text",
      },
      hasError: {
        true: "border-accent-red",
        false: "border-stroke",
      },
    },
    defaultVariants: {
      size: "md",
      isDisabled: false,
      hasError: false,
    },
  },
);
export interface QuillEditorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof editorVariants> {
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  hasError?: boolean;
}

const QuillEditor = forwardRef<HTMLDivElement, QuillEditorProps>(
  (
    {
      className,
      size,
      isDisabled = false,
      hasError = false,
      value = "",
      onChange,
      ...props
    },
    ref,
  ) => {
    const [content, setContent] = useState(value);

    const handleContentChange = (value: string) => {
      setContent(value);
      if (onChange) {
        onChange(value);
      }
    };

    return (
      <Suspense fallback={<div>Loading Editor...</div>}>
        <div
          ref={ref}
          className={cn(
            editorVariants({ size, isDisabled, hasError, className }),
          )}
          {...props}
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            readOnly={isDisabled}
            className="h-full"
            modules={{
              toolbar: !isDisabled
                ? [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ]
                : false,
            }}
          />
        </div>
      </Suspense>
    );
  },
);

QuillEditor.displayName = "QuillEditor";

export { QuillEditor };
