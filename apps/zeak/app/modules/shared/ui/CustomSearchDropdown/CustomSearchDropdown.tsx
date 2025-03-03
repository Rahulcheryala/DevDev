import { Input } from "@zeak/react";
import { FiSearch } from "react-icons/fi";
import DropdownCustomOptions from "./DropdownCustomOptions";
import { type DropdownCustomOption } from "../../types";
import { useEffect, useState } from "react";

type CustomSearchDropdownProps = {
  allOptions: Array<DropdownCustomOption>;
  onSearchChange?: (e: string) => void;
  onSubmit: (list: Array<DropdownCustomOption>) => void;
};

const CustomSearchDropdown = ({
  allOptions,
  onSearchChange,
  onSubmit,
}: CustomSearchDropdownProps) => {
  const [options, setOptions] = useState<Array<DropdownCustomOption>>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setOptions(allOptions);
  }, [allOptions]);

  const handleSearchChange = (searchText: string) => {
    setOptions(
      allOptions.filter((o) =>
        o.labelHeading.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
    if (onSearchChange) onSearchChange(searchText);
    setShow(true);
  };

  const handleSubmit = (list: Array<DropdownCustomOption> = []) => {
    onSubmit(list);
    setShow(false);
  };

  const handleOptionCheck = (item: DropdownCustomOption, index: number) => {
    const arr = options;
    arr[index] = item;
    setOptions([...arr]);
  };

  return (
    <div className="sticky top-0 left-0 z-[1] bg-card">
      <div className="relative">
        <Input
          className="w-full h-[50px] pl-10"
          placeholder="Search by name or email address"
          size="md"
          onClick={() => setShow(!show)}
          onChange={(e) => handleSearchChange(e?.target?.value as string)}
        />
        <FiSearch
          className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary"
          size={20}
        />
      </div>
      <DropdownCustomOptions
        options={options}
        onSubmit={handleSubmit}
        show={show}
        onCheckChange={handleOptionCheck}
      />
    </div>
  );
};

export default CustomSearchDropdown;
