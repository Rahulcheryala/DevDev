import React from "react";

type Props = {
  className?: string;
};

export const Angle = ({ className }: Props): JSX.Element => {
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
        d="M14 13.3333H2V3.33325"
        stroke="#141527"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 9V9C4.20914 9 6 10.7909 6 13V13"
        stroke="#141527"
        strokeWidth="1.2"
      />
    </svg>
  );
};
