import React from "react";

const DownArrow = ({
  statusDropdownClass,
}: {
  statusDropdownClass: string;
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.832 7.50065L9.9987 13.334L4.16536 7.50065"
        stroke={statusDropdownClass}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownArrow;
