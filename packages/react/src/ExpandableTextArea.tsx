import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import clsx from 'clsx';

const DEFAULT_HEIGHT = 'h-[56px]'; // Default collapsed height

export interface ExpandableTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  inputClassname?: string;
}

const ExpandableTextArea = forwardRef<HTMLTextAreaElement, ExpandableTextAreaProps>(
  ({ id, name, className, inputClassname, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [value, setValue] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Expose ref to parent
    useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement);

    /** Dynamically adjust height based on content */
    const adjustHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto'; // Reset height to calculate accurately
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust dynamically
      }
    };

    /** Handle input event */
    const handleInput = () => {
      adjustHeight();
    };

    /** Expand on focus */
    const handleFocus = () => {
      setIsExpanded(true);
      adjustHeight();
    };

    /** Reset height on blur */
    const handleBlur = () => {
      setIsExpanded(false);
      if (textAreaRef.current) {
        textAreaRef.current.style.height = ''; // Reset to default height
      }
    };

    return (
      <div
        className={clsx(
          'relative w-full max-w-md rounded-md overflow-hidden transition-all duration-200 min-h-[56px] ',
          !isExpanded && DEFAULT_HEIGHT,
          className
        )}
      >
        <textarea
          id={id}
          name={name}
          ref={textAreaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleInput();
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(
            'w-full resize-none p-2 outline-none text-gray-700 transition-all duration-200 h-full',
            'placeholder:text-gray-400 placeholder:leading-[40px] placeholder:px-2',
            inputClassname,
            isExpanded ? 'overflow-auto' : 'overflow-hidden'
          )}
          placeholder="Type something..."
          rows={1}
          {...props}
        />
        {/* Truncate overflow content on blur */}
        {!isExpanded && value && (
          <div className={`absolute inset-0 p-2 pt-4 pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis ${inputClassname}`}>
            {value}
          </div>
        )}
      </div>
    );
  }
);

ExpandableTextArea.displayName = 'ExpandableTextArea';

export { ExpandableTextArea }
