import React from "react";

type Props = {
  className?: string;
};

export const CornerLeftDown = ({ className }: Props): JSX.Element => {
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
        d={`M9.26195 13.4696C6.31523 13.4696 4.69305 13.6222 3.77762 12.7068C2.86218 11.7913 3.011 10.9467 3.011 8`}
        stroke="#141527"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
