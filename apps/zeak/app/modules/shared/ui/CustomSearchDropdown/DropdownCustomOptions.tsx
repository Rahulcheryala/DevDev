import { Avatar, Button, Checkbox } from "@zeak/react";
import { type DropdownCustomOption } from "../../types";

type ListOptionType = {
  item: DropdownCustomOption;
  onCheckedChange: (item: DropdownCustomOption) => void;
};

const ListOption = ({ item, onCheckedChange }: ListOptionType) => {
  return (
    <li className={`py-3 px-4 hover:bg-accent-bgHoverNew rounded-md`}>
      <div className="flex items-center">
        <div className="flex items-center">
          <Checkbox
            className="h-[18px] w-[18px] custom__checkbox !text-white"
            checked={item.isChecked}
            onCheckedChange={() => {
              onCheckedChange({ ...item, isChecked: !item.isChecked });
            }}
          />
          <Avatar name={item.avatarName} className="ml-4" />
        </div>
        <div className="pl-[20px]">
          <h3 className="text-sm text-accent">{item.labelHeading}</h3>
          <p className="text-primary-blue text-xs">{item.labelSubheading}</p>
        </div>
      </div>
    </li>
  );
};

type DropdownCustomOptionsProps = {
  options: Array<DropdownCustomOption>;
  name?: string;
  show: boolean;
  onSubmit: (list: Array<DropdownCustomOption>) => void;
  onCheckChange: (item: DropdownCustomOption, index: number) => void;
};

const DropdownCustomOptions = ({
  options = [],
  onSubmit,
  show,
  onCheckChange,
}: DropdownCustomOptionsProps) => {
  const handleSubmit = () => {
    onSubmit(options.filter((o) => o.isChecked));
  };

  return (
    !!options?.length &&
    show && (
      <div className="absolute top-full w-full p-4 left-0 bg-card shadow-lg rounded-lg">
        <ul className="py-1 max-h-[300px] overflow-y-auto">
          {options.map((item, index) => (
            <ListOption
              item={item}
              key={`custom-dropdown-{index}`}
              onCheckedChange={(item: DropdownCustomOption) =>
                onCheckChange(item, index)
              }
            />
          ))}
        </ul>
        <Button
          variant="primary"
          size="xl"
          className="w-full rounded-sm mt-4"
          onClick={handleSubmit}
        >
          Select
        </Button>
      </div>
    )
  );
};

export default DropdownCustomOptions;
