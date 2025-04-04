import React from "react";

type Props = {
  className?: string;
};

export const CornerLeftUp = ({ className }: Props): JSX.Element => {
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
        d="
            M9.26195 3.00936C6.31523 3.00936 4.69305 2.85794 3.77762 3.77337C2.86218 4.6888 3.011 5.53221 3.011 8.47894
            "
        stroke="#141527"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
