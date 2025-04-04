import { Button, IconButton, Input } from "@zeak/react";
import { BiPlus, BiX } from "react-icons/bi";

interface OptionsFieldProps {
  options: string[];
  onChange: (options: string[]) => void;
  isEditing: boolean;
}

export function OptionsField({
  options,
  onChange,
  isEditing,
}: OptionsFieldProps) {
  const handleAddOption = () => {
    onChange([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    onChange(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onChange(newOptions);
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            disabled={!isEditing}
            className={`${!isEditing ? "bg-gray-50" : ""} w-full p-2 border-b border-stroke rounded-none outline-none focus:border-accent-primary`}
          />
          {isEditing && (
            <IconButton
              aria-label="Remove option"
              type="button"
              variant="ghost"
              icon={<BiX className="h-6 w-6" />}
              onClick={() => handleRemoveOption(index)}
            />
          )}
        </div>
      ))}
      {isEditing && (
        <div className="mt-3">
          <Button
            type="button"
            onClick={handleAddOption}
            className="w-full"
            size="lg"
          >
            <BiPlus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>
      )}
    </div>
  );
}
