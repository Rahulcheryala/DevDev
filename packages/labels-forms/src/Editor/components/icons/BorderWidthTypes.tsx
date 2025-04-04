import React from "react";

type Props = {
  className?: string;
};

export const BorderWidthTypes = ({ className }: Props): JSX.Element => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33301 4.66602H12.6663"
        stroke="#141527"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 8H12.6663"
        stroke="#141527"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 11.332H12.6663"
        stroke="#141527"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
