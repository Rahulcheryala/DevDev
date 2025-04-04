import * as React from "react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    icon?: React.ReactNode;
    title?: string;
    required?: boolean;
    width?: string; // New prop for dynamic width
    name: string;
    label?: string | React.ReactNode;
    labelClasses?: string;
    clearIconClasses?: string;
    inputClasses?: string;
    isRequired?: boolean;
    domain?: string;
    validateOnChange?: boolean;
    hideClose?: boolean;
    showErrors?: boolean;
    externalErrors?: string[];
    handleExtraErrorOnError?: (error: any) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        error,
        icon,
        title,
        required,
        width = '100%',
        name,
        label,
        labelClasses,
        clearIconClasses,
        inputClasses,
        isRequired,
        domain,
        validateOnChange,
        hideClose,
        showErrors,
        externalErrors,
        handleExtraErrorOnError,
        value,
        onChange,
        disabled,
        ...props
    }, ref) => {
        // Update localValue when value prop changes
        React.useEffect(() => {
            setLocalValue(value || '');
        }, [value]);

        const [localValue, setLocalValue] = React.useState(value || '');
        const [localErrors, setLocalErrors] = React.useState<string[]>([]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setLocalValue(newValue);

            if (validateOnChange) {
                // Add your validation logic here
                const errors: string[] = [];
                if (isRequired && !newValue) {
                    errors.push('This field is required');
                }
                if (domain && !newValue.includes(domain)) {
                    errors.push(`Domain must include ${domain}`);
                }
                setLocalErrors(errors);
                if (errors.length > 0 && handleExtraErrorOnError) {
                    handleExtraErrorOnError(errors);
                }
            }

            onChange?.(e);
        };

        const handleClear = () => {
            setLocalValue('');
            setLocalErrors([]);
            const e = {
                target: { value: '', name },
                currentTarget: { value: '', name }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange?.(e);
        };

        const displayErrors = showErrors ? [...localErrors, ...(externalErrors || [])] : [];
        const hasErrors = displayErrors.length > 0 || error;

        return (
            <div className="flex flex-col gap-2 w-full">
                {(label || title) && (
                    <div className="flex items-center gap-1">
                        <label
                            htmlFor={name}
                            className={cn(
                                "text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]",
                                labelClasses
                            )}
                        >
                            {(label || title).toString().replace('*', '')}
                        </label>
                        {(isRequired || required || title?.includes('*')) && (
                            <span className="text-red-500">*</span>
                        )}
                    </div>
                )}
                <div className="relative w-full">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {icon}
                        </div>
                    )}
                    <input
                        id={name}
                        name={name}
                        value={localValue}
                        onChange={handleChange}
                        placeholder="Input"
                        style={{ width }}
                        className={cn(
                            "flex h-14 items-center gap-2.5 self-stretch rounded-xl bg-white px-4 py-2 text-base text-[#0D0C22] tracking-[0.2px] font-[450] leading-6 font-suisse placeholder:text-[#677281] placeholder:font-normal placeholder:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
                            hasErrors && "border-red-500 focus-visible:ring-red-500",
                            icon && "pl-10",
                            !hideClose && localValue && "pr-10",
                            inputClasses,
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {!hideClose && localValue && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className={cn(
                                "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700",
                                clearIconClasses
                            )}
                            disabled={disabled}
                        >
                            ×
                        </button>
                    )}
                </div>
                {showErrors && displayErrors.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm mt-1">
                        {error}
                    </p>
                ))}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;