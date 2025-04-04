import { PropertyVariantIcon } from "@zeak/icons";
import { RadioGroupItem } from "@zeak/react";
import { MdOutlineCalendarToday } from "react-icons/md";

type Props = {
  onChange: (type: string) => void;
  selected: string;
  value: string;
  label: string;
  disabled: boolean;
};

const EndTypeItem = ({ selected, value, disabled, label, onChange }: Props) => {
  return (
    <div
      className={`relative flex items-center border p-4 rounded-md ${
        selected === value
          ? "border-accent-primary ring-4 ring-[hsl(var(--accent-primary),_0.09)] bg-[hsl(var(--stroke-primary),_0.5)]"
          : "border-stroke"
      }`}
    >
      <RadioGroupItem
        onClick={() => onChange(value)}
        checked={selected === value}
        value={value}
        id={label}
        disabled={disabled}
      />
      <span className="pr-6 truncate inline-block">{label}</span>
      {value === "date" ? (
        <MdOutlineCalendarToday className="absolute right-4 top-1/2 -translate-y-1/2" />
      ) : null}
      {value === "event" ? (
        <PropertyVariantIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
      ) : null}
      {value === "occurences" ? (
        <MdOutlineCalendarToday className="absolute right-4 top-1/2 -translate-y-1/2" />
      ) : null}
    </div>
  );
};

export default EndTypeItem;
