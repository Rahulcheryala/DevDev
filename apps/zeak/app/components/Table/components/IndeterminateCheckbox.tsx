import { Checkbox } from "@zeak/react";
import type { MouseEvent } from "react";

type IndeterminateCheckboxProps = {
  checked: boolean;
  indeterminate: boolean;
  onChange: (e: MouseEvent<HTMLInputElement>) => void;
  [key: string]: any;
};

const IndeterminateCheckbox = ({
  indeterminate,
  checked,
  onChange,
  ...rest
}: IndeterminateCheckboxProps) => {
  const handleChange = (checked: boolean) => {
    onChange({
      target: { checked },
    } as unknown as MouseEvent<HTMLInputElement>);
  };

  return (
    <Checkbox
      isChecked={!!checked || !!indeterminate}
      isIndeterminate={indeterminate}
      className="ml-0 rounded-full border-checkboxBorder !text-white"
      onCheckedChange={handleChange}
      {...rest}
    >
      <span className="sr-only">Select Row</span>
    </Checkbox>
  );
};

IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

export default IndeterminateCheckbox;
