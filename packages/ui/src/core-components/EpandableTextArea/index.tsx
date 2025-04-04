import { useEffect, useRef, TextareaHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    value?: string;
    defaultValue?: string;
}

const ExpandableTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, placeholder = "Enter text here...", value, defaultValue, ...props }, forwardedRef) => {
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        const [isExpanded, setIsExpanded] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [displayValue, setDisplayValue] = useState(value || defaultValue || '');

        // Merge refs
        const handleRef = (element: HTMLTextAreaElement | null) => {
            textareaRef.current = element;

            if (typeof forwardedRef === 'function') {
                forwardedRef(element);
            } else if (forwardedRef) {
                forwardedRef.current = element;
            }
        };

        // Update display value when value prop changes
        useEffect(() => {
            if (value !== undefined) {
                setDisplayValue(value);
            }
        }, [value]);

        const adjustHeight = () => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            textarea.style.height = 'auto'; // Reset height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height

            // Check if height exceeds 56px
            setIsExpanded(textarea.scrollHeight > 56);
        };

        useEffect(() => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            // Initial height adjustment
            if (isEditing) {
                adjustHeight();
            } else {
                textarea.style.height = '56px'; // Set to 56px when not focused
                setIsExpanded(false);
            }

            const handleInput = (e: Event) => {
                adjustHeight();
                const target = e.target as HTMLTextAreaElement;
                setDisplayValue(target.value);
            };

            textarea.addEventListener('input', handleInput);
            return () => {
                textarea.removeEventListener('input', handleInput); // Cleanup
            };
        }, [isEditing]);

        useEffect(() => {
            // Handle clicks outside the component
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node) &&
                    isEditing
                ) {
                    setIsEditing(false);

                    if (textareaRef.current) {
                        textareaRef.current.style.height = '56px';
                    }
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [isEditing]);

        const handleMouseDown = () => {
            if (textareaRef.current === document.activeElement) {
                adjustHeight();
            }
        };

        const handleOverlayClick = () => {
            setIsEditing(true);
            // Focus the textarea after state update
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                }
            }, 0);
        };

        return (
            <div className="relative" ref={containerRef}>
                {isEditing ? (
                    <textarea
                        ref={handleRef}
                        className={cn(
                            "rounded-zeak bg-[#f7f7f7] focus:outline-[#007AF5] min-h-[56px] overflow-hidden w-full p-4 text-[16px]",
                            isExpanded && "absolute z-50",
                            className
                        )}
                        rows={1}
                        onMouseDown={handleMouseDown}
                        placeholder={placeholder}
                        defaultValue={value}
                        {...props}
                    />
                ) : (
                    <div className="relative cursor-pointer bg-[#f7f7f7] rounded-zeak">
                        <div className="p-4 text-[16px] font-medium text-ellipsis overflow-hidden whitespace-nowrap text-overflow-ellipsis text-[#0D0C22]">
                            {displayValue || placeholder}
                        </div>

                        {/* Overlay Trigger button */}
                        <div onClick={handleOverlayClick} className="absolute bg-transparent inset-0 flex items-center justify-center" />
                    </div>
                )}
            </div>
        );
    }
);

ExpandableTextArea.displayName = 'ExpandableTextArea';

export default ExpandableTextArea;