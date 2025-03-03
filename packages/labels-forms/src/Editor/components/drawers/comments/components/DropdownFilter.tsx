import { Dropdown, Menu } from "antd";
import React from "react";
import { FilterIcon } from "../../icons";

export type FilterOption = "date" | "resolved" | "currentPage";

type DropdownFilterProps = {
  onFilterChange: (filter: FilterOption) => void;
};

export default function DropdownFilter({
  onFilterChange,
}: DropdownFilterProps) {
  const handleFilterSelection = ({ key }: { key: string }) => {
    onFilterChange(key as FilterOption);
  };

  const menu = (
    <Menu onClick={handleFilterSelection} className="w-[260px]">
      <Menu.Item key="date" className="mb-5">
        Sort by Date
      </Menu.Item>
      <Menu.Item key="resolved" className="mb-5">
        Resolved Comments
      </Menu.Item>
      <Menu.Item key="currentPage" className="mb-2">
        Only Current Label Comments
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <button>
        <FilterIcon />
      </button>
    </Dropdown>
  );
}
