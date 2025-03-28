import { Button, cn, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from '@zeak/react'
import { ReactNode } from 'react';
import { IoChevronUp } from 'react-icons/io5'

// Define the types for the props
export interface ButtonProps {
    id: string;
    label: string | ReactNode;
    className?: string;
    options?: Array<ButtonProps>;
    onClickHandler: (id: string) => void;
}

/**
 * SaveButton component renders a button with a dropdown menu.
 * 
 * @param {string} id - The unique identifier for the button.
 * @param {string} label - The label displayed on the button.
 * @param {Array<{id: string, label: string, onOptionHandler: (id: string) => void}>} options - The dropdown options.
 * @param {(id: string) => void} onClickHandler - Function to handle button click.
 * 
 * @returns {JSX.Element} The rendered SaveButton component.
 * 
 * @example
 * // Example usage of SaveButton component
 * const options = [
 *     { id: '1', label: 'Option 1', onOptionHandler: (id) => console.log(id) },
 *     { id: '2', label: 'Option 2', onOptionHandler: (id) => console.log(id) },
 * ];
 * 
 * const handleClick = (id) => {
 *     console.log('Button clicked with id:', id);
 * };
 * 
 * <SaveButton 
 *     id="save-button" 
 *     label="Save" 
 *     options={options} 
 *     onClickHandler={handleClick} 
 * />
 */
const SaveButton: React.FC<ButtonProps> = ({ id, label, className, options, onClickHandler }: ButtonProps): JSX.Element => {
    return (
        <div className="flex items-center gap-[1px]">
            <Button
                className={cn("bg-[#0D0844] p-3 w-[180px] h-[56px] rounded-none cursor-pointer rounded-l-md", className)}
                id={id}
                onClick={() => onClickHandler(id)}>{label}</Button>
            {options?.length ? <DropdownMenu >
                <DropdownMenuTrigger>
                    <Button className={cn("bg-[#0D0844] p-3 w-14 h-[56px] rounded-none  rounded-r-md")}>
                        <IoChevronUp />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuPortal >
                    <DropdownMenuContent align="end">
                        {options.map(({ id: optId, label: optLabel, className: optclassName, onClickHandler: onOptionHandler }) => <DropdownMenuItem
                            id={optId}
                            className={cn("w-60  py-4 cursor-pointer", optclassName)}
                            onClick={() => onOptionHandler(optId)}>
                            {optLabel}
                        </DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenuPortal>
            </DropdownMenu> : <></>}
        </div>
    )
}

export default SaveButton
