import React from "react";

type Props = {
  className?: string;
};

export const CornerRightDown = ({ className }: Props): JSX.Element => {
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
        d={`M13.2522 8C13.2522 10.9464 13.406 11.7909 12.4907 12.7062C11.5753 13.6216 9.94836 13.469 7.00195 13.469`}
        stroke="#141527"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
