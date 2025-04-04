import React from "react";

type Props = {
  className?: string;
};

export const CornerRightUp = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`
                M7.00195 3.00933C9.94836 3.00933 11.5753 2.85795 12.4907 3.77328C13.406 4.68862 13.2522 5.53191 13.2522 8.47832
                `}
        stroke="#141527"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
