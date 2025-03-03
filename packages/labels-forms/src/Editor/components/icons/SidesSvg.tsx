import React from "react";

type Props = {
  className?: string;
};

export const SidesSvg = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="3" r="2" fill="black" />
      <circle cx="3" cy="13" r="2" fill="black" />
      <circle cx="13" cy="13" r="2" fill="black" />
    </svg>
  );
};
