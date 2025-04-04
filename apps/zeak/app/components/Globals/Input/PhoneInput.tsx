import * as React from "react";
import { cn } from "~/components/Common/Utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@zeak/react";
import PrimaryInput from "./PrimaryInput";

interface CountryOption {
    value: string;
    label: string;
    code: string;
    flag: string;
}

const countries: CountryOption[] = [
    { value: "us", label: "United States", code: "+1", flag: "🇺🇸" },
    { value: "ca", label: "Canada", code: "+1", flag: "🇨🇦" },
    { value: "gb", label: "United Kingdom", code: "+44", flag: "🇬🇧" },
    // Add more countries as needed
];

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    error?: boolean;
    value?: string;
    errorMessage?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    title?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ className, error, value, errorMessage = "Please enter valid number", onChange, title = 'Title*', ...props }, ref) => {
        const [selectedCountry, setSelectedCountry] = React.useState<CountryOption>(countries[0]);
        const [validationError, setValidationError] = React.useState<string>("");

        // Validate default value on mount and value changes
        React.useEffect(() => {
            if (value && /[^\d-]/.test(value)) {
                setValidationError(errorMessage);
            } else {
                setValidationError("");
            }
        }, [value, errorMessage]);

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawInput = e.target.value;

            // Check if input contains any non-numeric characters (excluding hyphens)
            if (/[^\d-]/.test(rawInput)) {
                setValidationError(errorMessage);
                return;
            }

            // Clear validation error if input is valid
            setValidationError("");

            // Remove all non-digits and limit to 10 digits
            const input = rawInput.replace(/\D/g, '').slice(0, 10);

            // Format as user types
            let formatted = input;
            if (input.length > 3) formatted = input.slice(0, 3) + "-" + input.slice(3);
            if (input.length > 6) formatted = formatted.slice(0, 7) + "-" + formatted.slice(7);

            onChange?.({
                target: {
                    value: formatted
                }
            } as React.ChangeEvent<HTMLInputElement>);
        };

        return (
            <div className="flex flex-col gap-1">
                {title && (
                    <div className="flex items-center gap-1">
                        <label className="text-[#475467] font-suisse text-sm font-semibold leading-5 tracking-[0.2px]">
                            {title.replace('*', '')}
                        </label>
                        {title.includes('*') && (
                            <span className="text-red-500">*</span>
                        )}
                    </div>
                )}
                <div className="flex gap-2">
                    <Select
                        value={selectedCountry.value}
                        onValueChange={(value) => {
                            const country = countries.find((c) => c.value === value);
                            if (country) setSelectedCountry(country);
                        }}
                    >
                        <SelectTrigger className="w-[140px] h-14 bg-white rounded-xl border-0">
                            <SelectValue>
                                <div className="flex items-center gap-2">
                                    <span>{selectedCountry.flag}</span>
                                    <span>{selectedCountry.code}</span>
                                </div>
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country) => (
                                <SelectItem
                                    key={country.value}
                                    value={country.value}
                                    className="hover:text-white hover:bg-[#9BA2AC] focus:text-white focus:bg-[#9BA2AC]"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{country.flag}</span>
                                        <span>{country.code}</span>
                                        <span className="text-sm text-inherit">{country.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <PrimaryInput
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9-]*"
                        maxLength={12}
                        placeholder="123-456-7890"
                        value={value}
                        onChange={handlePhoneChange}
                        error={error || !!validationError}
                        className={cn("flex-1", className)}
                        ref={ref}
                        title=""
                        {...props}
                    />
                </div>
                {validationError && (
                    <span className="text-sm text-red-500 pl-2">{validationError}</span>
                )}
            </div>
        );
    }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;