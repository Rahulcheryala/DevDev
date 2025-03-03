import React from "react";
import { Dropdown, Space } from "antd";
import StatusOption from "./StatusOption";
import DownArrow from "../../icons/DownArrow";
import { documentStatus } from "../../../consts/toolbar";
import PropTypes from "prop-types";

type StatusDropdownProps = {
  status: string;
  statusClasses: string;
  statusDropdownClass: string;
  handlestatus: (status: string) => void;
};

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  status,
  statusClasses,
  statusDropdownClass,
  handlestatus,
}) => {
  const statusOptions = [
    documentStatus.DRAFT,
    documentStatus.SUBMITTED,
    documentStatus.APPROVED,
    documentStatus.NOT_APPROVED,
  ];

  const dropdownRender = () => (
    <div className="custom-dropdown-menu">
      {statusOptions.map((option) => (
        <StatusOption
          key={option}
          label={option}
          onClick={() => handlestatus(option)}
        />
      ))}
    </div>
  );

  return (
    <div className="cursor-pointer">
      <Dropdown
        trigger={["click"]}
        dropdownRender={dropdownRender}
        className={`${statusClasses} rounded-full px-4 py-2  w-full text-[12px] 
                    outline-none rounded-full font-semibold`}
      >
        <Space>
          {status}
          <DownArrow statusDropdownClass={statusDropdownClass} />
        </Space>
      </Dropdown>
    </div>
  );
};

StatusDropdown.propTypes = {
  status: PropTypes.string.isRequired,
  statusClasses: PropTypes.string.isRequired,
  statusDropdownClass: PropTypes.string.isRequired,
  handlestatus: PropTypes.func.isRequired,
};

export default StatusDropdown;
