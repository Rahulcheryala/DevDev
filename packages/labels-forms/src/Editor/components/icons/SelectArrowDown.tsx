import React from "react";

type Props = {
  className?: string;
};

export const SelectArrowDown = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12.6673 6L8.00065 10.6667L3.33398 6"
        stroke="#141527"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
