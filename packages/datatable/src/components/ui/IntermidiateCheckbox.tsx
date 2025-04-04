import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@zeak/react";

export default function IndeterminateCheckbox({
    indeterminate,
    className = '',
    checked,
    onChange,
    ...rest
}: { indeterminate?: boolean } & Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'checked' | 'onChange'> & {
    checked?: boolean;
    onChange?: () => void;
}) {
    const ref = React.useRef<HTMLButtonElement>(null!);

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            // Set data attribute for styling indeterminate state
            ref.current.dataset.indeterminate = (!checked && indeterminate).toString();
        }
    }, [ref, indeterminate, checked]);

    return (
        <CheckboxPrimitive.Root
            ref={ref}
            checked={checked}
            onCheckedChange={onChange}
            className={cn(
                "peer h-5 w-5 shrink-0 rounded-full bg-gray-200 cursor-pointer data-[state=checked]:border-none data-[state=checked]:bg-white data-[indeterminate=true]:bg-gray-400 ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...rest}
        >
            <CheckboxPrimitive.Indicator
                className={cn("flex items-center  justify-center text-current")}
            />
        </CheckboxPrimitive.Root>
    );
}